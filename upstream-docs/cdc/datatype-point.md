# datatype point

Source: https://dev.socrata.com/docs/datatypes/point.html

---

Point Datatype | Socrata

Toggle navigation

SODA Developers

App Developers

- App Developers

- Getting Started

- Finding Open Data

- Examples

- Data Visualization with Plotly and Pandas

- Data Analysis with Python and pandas using Jupyter Notebook

- Using R and Shiny to Find Outliers with Scatter and Box Plots

- Analyzing Open Data with SAS

- Building SMS Applications with Twilio

- Forecasting with RSocrata

- Making a heatmap with R

- Create a column chart with Highcharts

- Generating a within_box() query with Leaflet.js

- Using a jQueryUI date slider to build a SODA Query

- Data Analysis with Python, Pandas, and Bokeh

- Animated Heatmap with Heatmap.js

- Build a physical "Traffic Light"

- Google Maps Mashup

- Google Maps with KML

- Simple column chart with D3

- SDKs & Libraries

- PhpSoda

- Google Android

- .NET

- DataSync SDK (Java)

- Elixr

- ember-socrata

- go-soda

- Apple iOS

- Java

- javascript

- Julia

- PHP

- PowerShell

- Python (Dataset Management API)

- Python

- R

- Ruby

- Scala

- Swift

Data Publishers

- Data Publishers

- Publisher Guide

- APIs for Publishing Data

- SODA Producer API

- Dataset Management API

- Tools & Connectors

- Connectors & ETL Templates

- Pentaho Kettle

- RSocrata

- Safe FME

- Socrata Datasync

- SDKs & Libraries

- PhpSoda

- .NET

- DataSync SDK (Java)

- ember-socrata

- go-soda

- Java

- javascript

- PHP

- PowerShell

- Python (Dataset Management API)

- Python

- R

- Ruby

- Examples

- Visualizing data using the Google Calendar Chart

- Scrubbing data with Python

- Gauge Visualizations using the Google Charts library

- Pulling data from Hadoop and Publishing to Socrata

- Using Pentaho to Read data from Salesforce and Publish to Socrata

- Using a SSIS to write to a Socrata Dataset

- Pentaho Kettle ETL Toolkit

- Using a Wufoo form to write to a Socrata Dataset

- Pushing Sensor Data to Socrata

- Using the FME Socrata Writer

- Upsert via soda-ruby

API Docs

- Overview

- API Endpoints

- Row Identifiers

- RESTful Verbs

- Application Tokens

- Authentication

- Response Codes & Headers

- System Fields

- CORS & JSONP

- Querying

- SoQL Queries

- SoQL Function and Keyword Listing

- Data Transform Functions

- Data Formats

- JSON

- GeoJSON

- CSV

- RDF-XML

- Datatypes

- Checkbox

- Fixed Timestamp

- Floating Timestamp

- Line

- Location

- MultiLine

- MultiPoint

- MultiPolygon

- Number

- Point

- Polygon

- Text

- URL

- Other APIs

Libraries & SDKs

Socrata was acquired by Tyler Technologies in 2018 and is now the Data and Insights division of Tyler. The platform is still powered by the same software formerly known as Socrata but you will see references to Data & Insights going forward.

Learn more...

:
For more information see status.socrata.com.

# Point Datatype

- Overview

- API Endpoints

- Row Identifiers

- RESTful Verbs

- Application Tokens

- Authentication

- Response Codes & Headers

- System Fields

- CORS & JSONP

- Querying

- SoQL Queries

- SoQL Function and Keyword Listing

- Data Transform Functions

- Data Formats

- JSON

- GeoJSON

- CSV

- RDF-XML

- Datatypes

- Checkbox

- Fixed Timestamp

- Floating Timestamp

- Line

- Location

- MultiLine

- MultiPoint

- MultiPolygon

- Number

- Point

- Polygon

- Text

- URL

- Other APIs

The Point datatype is very similar to the Location datatype. It represents a location on the Earth as a WGS84 Latitude and Longitude. The location is encoded as a GeoJSON “point”. Example:

{
"type": "Point",
"coordinates": [
-87.653274,
41.936172
]
}

The Point datatype is displayed in Well Known Text (WKT) format in the dataset user interface. The Well Known Text format is also used when ingressing Point columns using certain tools, like DataSync. Example:

POINT (-87.653274 41.936172)

Heads up! Contrary to the normal convention of "latitude, longitude" ordering in the coordinates property, GeoJSON and Well Known Text order the coordinates as "longitude, latitude" (X coordinate, Y coordinate), as other GIS coordinate systems are encoded. Note that the SoQL within_box and within_circle functions use the more conventional ordering, however.

The following operators can be used on Point fields:

Operator
Description

IS NULL
TRUE for values that are NULL.

IS NOT NULL
TRUE for values that are not NULL.

And the following functions can be used with them:

3.0
2.1
2.0

Keyword Name
Description
Availability

distinct
Returns distinct set of records
2.1 and 3.0

Function Name
Description
Availability

case(...)
Returns different values based on the evaluation of boolean comparisons
2.1 and 3.0

convex_hull(...)
Returns the minimum convex geometry that encloses all of another geometry
2.1 and 3.0

count(...)
Returns a count of a given set of records
2.0, 2.1, and 3.0

distance_in_meters(...)
Returns the distance between two Points in meters
2.1 and 3.0

extent(...)
Returns a bounding box that encloses a set of geometries
2.1 and 3.0

intersects(...)
Allows you to compare two geospatial types to see if they intersect or overlap each other
2.1 and 3.0

num_points(...)
Returns the number of vertices in a geospatial data record
2.1 and 3.0

within_box(...)
Returns the rows that have geodata within the specified box, defined by latitude, longitude corners
2.0, 2.1, and 3.0

within_circle(...)
Returns the rows that have locations within a specified circle, measured in meters
2.0, 2.1, and 3.0

within_polygon(...)
Returns the rows that have locations within the specified box, defined by latitude, longitude corners
2.1 and 3.0

Just like the Location datatype, you can use thewithin_circle(...) function to look for points within a given range. For example, to get all of the crimes within 500 meters of Chicago City Hall:

The TryIt macro has been disabled until future notice while we upgrade this site to SODA3.

However, there are also a ton of additional geo query functions that come with the Point datatype. For example, to aggregate that same dataset by ward and return polygons surrounding each cluster, in GeoJSON:

The TryIt macro has been disabled until future notice while we upgrade this site to SODA3.

## Why are the latitude and longitude backwards?!

Back in school, you were taught that points on the earth were defined as “degrees of latitude and longitude”, right? You probably used them to find locations on the globe, to locate your campsite, or to plot the location of that prime fishing spot or anchorage. So why then are locations in the Point datatype encoded as $longitude, $latitude?

Well, a latitude and longitude pair, usually used on a Mercator projection is actually only one of many many different ways of translating locations on our (semi-)spherical world onto a flat piece of paper (or an LCD monitor). Not only are there dozens of ways of flattening that globe into a plane (called map projections), but there are also thousands of ways of actually mapping coordinates onto those projections.

GeoJSON and Well Known Text are designed to be flexible to work with many different map projections and coordinate projections, and just like the Cartesian coordinates you learned in math class, those coordinates are encoded in “X, Y” order. With the EPSG:4326 coordinate system that we use for our geospatial datatypes, that means that the coordinates are encoded in $longitude, $latitude order.

For fun, check out this excellent XKCD comic to see what your favorite map projection says about you.
