require 'csv'
require 'json'

arr_of_rows = CSV.read("NYC_GHG_Inventory_05-17.csv")

# p arr_of_rows

num_cols = arr_of_rows[0].length
num_rows = arr_of_rows.length

# puts num_cols
# puts num_rows

header_row_1 = arr_of_rows[0] #this row contains the years starting at index 4 (2005)
header_row_2 = arr_of_rows[1] #this row only contains the unit CO2e for the data by year
header_row_3 = arr_of_rows[2] #this row contains the category labels at indices 0-3

arr_no_headers = arr_of_rows[3..-1]

# p arr_no_headers

#Note: Year columns are indices 4 - 16, inclusive
#Note: Non-header rows are indices 3 - 38, inclusive

#Heirarchy: year, sector, category, source


output_hash = Hash.new("")
output_hash["GHG Inventory"] = Hash.new("");

header_row_1.each_with_index do |year, idx|
    if idx > 3
        output_hash["GHG Inventory"][year] = Hash.new("")
        arr_no_headers.each do |row|
            output_hash["GHG Inventory"][year][row[0]] = Hash.new("")
        end
        arr_no_headers.each do |row|
            output_hash["GHG Inventory"][year][row[0]][row[1]] = Hash.new("")
        end
        arr_no_headers.each do |row|
            output_hash["GHG Inventory"][year][row[0]][row[1]][row[2]] = row[idx]
        end
    end
end

formatted_hash = Hash.new("")

output_hash.each do |k, v|
    formatted_hash["name"] = k
    formatted_hash["children"] = []
    v.each do |k1, v1|
        arr = Array.new
        v1.each do |k2, v2|
            arr2 = Array.new
            v2.each do |k3, v3|
                arr3 = Array.new
                v3.each do |k4, v4|
                    arr3 << {"name" => k4, "value" => v4}
                end
                arr2 << {"name" => k3, "children" => arr3 }
            end
            arr << { "name" => k2, "children" => arr2 }
        end
        formatted_hash["children"] << { "name" => k1, "children" => arr }
    end 
end


 File.open("data_ugly.json", "w") do |f|
    f.write(formatted_hash.to_json)
end

