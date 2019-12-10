# NYC-GHG-Visualization

Visualization of New York City Greenhouse Gas Inventory

Patrick Landy

Live Link: https://patrickdlandy.github.io/NYC-GHG-Visualization/

# Background and Overview

Climate change is an extremely pressing problem that calls for aggressive, data driven policy action. In order to reduce severe and often life-threatening risks to marginalized people, global greenhouse gas emissions must be reduced drastically in the near-term.

To better inform decision-making in response to climate change, cities like New York City have implemented local laws requiring data collection and reporting of greenhouse gas emissions.  The New York City Greenhouse Gas inventory tracks the annual greenhouse gas emissions of the city going back to 2005, broken down by categories.

This data visualization utilizes the D3 JavaScript Library to display greenhouse gas emission in a "sun-burst" graph, broken down into multiple layers of categorization (such as source category and fuel type).

# Wireframes

The app consists of a single page with an interactive "Sun-Burst" plot in the center. The upper left will have the page title and the lower right will have my name and links to my personal pages. The upper right will have key metrics with labels and a slider bar or dropdown for year.

If implemented, the bonus feature bar chart animation will be shown below the "Sun-Burst" plot.

Wireframe link: https://wireframe.cc/36Ilrd


# Functionality and MVP Features

* Displays "Sun-Burst" of 2017 NYC Greenhouse Gas Inventory (most recent dataset year) with the following layers of heirarchy, from broadest to most specific:
  * Sector
  * Category
  * Source
* Displays total Annual NYC Emissions and on hover over a slice reveals the % of the total 
* Displays drop-down to adjust the "sun-burst" by year between 2005 and 2017
* Bonus: "Sequences" feature to highlight only the slice that is hovered over.
* Bonus: Stacked-to-grouped bar-chart animation of emissions from 2005-2017 


# Architecture and Technologies

The site is implemented using pure javascript (no jQuery or React), scalable vector graphics, and the D3 (Data Driven Documents) library.

* Technology: Pure Javascript
* Technology: D3
* Technology: SVG
* Technology: Webpack

# Data and APIs

Data for 2005-2017 was downloaded as a single .csv file from https://nyc-ghg-inventory.cusp.nyu.edu/#data. This will be stored locally as JSON.

# Implementation Timeline

Monday, October 14th: select dataset, complete and submit proposal with wireframe
Tuesday, October 15th: complete multiple D3 Tutorials, set up javascript project, revise proposal with TA feedback
Wednesday, October 16th: continue D3 Tutorials, begin coding MVP 1 (2017 Sun-burst)
Thursday, October 17th: continue MVP 1, begin MVP 2 (hover % effect)
Friday, October 18th: complete MVP 2, begin MVP 3 (time dropdown)
Weekend, October 19th-20th: Complete MVP 3 and do bonus features if time allows

