# datatype number

Source: https://dev.socrata.com/docs/datatypes/number.html

---

Number Datatype | Socrata

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

# Number Datatype

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

Numbers are arbitrary precision, arbitrary scale numbers. They can represent any number exactly, except for numbers whose digits repeat infinitely.

Since Numbers can be either larger or more precise than what JSON parsers allow, many formats, such as JSON, serialize them as strings. For example:

[ {
"number_column" : "42"
} ]

The following table describes the operators that can be used with Numbers.

Operator
Description

<
TRUE for numbers less than this one.

<=
TRUE for numbers that are less than or equal to this one.

>
TRUE for numbers that are greater than this one.

>=
TRUE for numbers that are greater than or equal to this one.

!=
TRUE for numbers that are not equal to this one.

=
TRUE for numbers that are equal to this one.

IS NULL
TRUE for numbers that are NULL.

IS NOT NULL
TRUE for numbers that are not NULL.

+
Adds two numbers

Subtracts one number from another

Multiplies two numbers

/
Divides one number by another

%
Returns the modulo of one number divided by another

^
Returns the modulo of one number divided by another

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

avg(...)
Returns the average of a given set of numbers
2.0, 2.1, and 3.0

between ... and ...
Returns TRUE for values in a given range
2.1 and 3.0

case(...)
Returns different values based on the evaluation of boolean comparisons
2.1 and 3.0

count(...)
Returns a count of a given set of records
2.0, 2.1, and 3.0

greatest(...)
Returns the largest value among its arguments, ignoring NULLs.
2.1 and 3.0

in(...)
Matches values in a given set of options
2.1 and 3.0

least(...)
Returns the smallest value among its arguments, ignoring NULLs.
2.1 and 3.0

ln(...)
Returns the natural log of a number
2.1 and 3.0

max(...)
Returns the maximum of a given set of numbers
2.1 and 3.0

min(...)
Returns the minimum of a given set of numbers
2.1 and 3.0

not between ... and ...
Returns TRUE for values not in a given range
2.1 and 3.0

not in(...)
Matches values not in a given set of options
2.1 and 3.0

regr_intercept(...)
Returns the y-intercept of the linear least squares fit
2.1 and 3.0

regr_r2(...)
Returns the square of the correlation coefficient (r²)
2.1 and 3.0

regr_slope(...)
Returns the slope of the linear least squares fit
2.1 and 3.0

stddev_pop(...)
Returns the population standard deviation of a given set of numbers
2.1 and 3.0

stddev_samp(...)
Returns a sampled standard deviation of a given set of numbers
2.1 and 3.0

sum(...)
Returns the sum of a given set of numbers
2.1 and 3.0

For example, to get all of the traffic sensors seeing more than 20,000 vehicles per day from the Chicago Average Daily Traffic Counts:

The TryIt macro has been disabled until future notice while we upgrade this site to SODA3.

You can also aggregate numbers, so you could also get the average daily count per sensor with avg(...):

The TryIt macro has been disabled until future notice while we upgrade this site to SODA3.
