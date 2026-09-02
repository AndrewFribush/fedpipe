# soql query

Source: https://dev.socrata.com/docs/queries/query.html

---

The query Option | Socrata

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

# The query Option

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

- Queries using SODA3

- The query Option

SoQL statements are broken into clauses similar to SQL statements. If a clause is not specified, then the default is used.

In this page, we will be using My super awesome Earthquakes dataset as an example.

## SELECT

A SoQL statement must have a SELECT clause; the most basic selects * which, in SoQL, means “all user columns”:

SELECT *

You may also specify a specific subset of columns. When referring to a column, it is best practice to surround it with backticks.

SELECT `earthquake_id`, `magnitude`, `depth`

You may also rename a selected field with the AS keyword.

SELECT `magnitude` AS `strength`

## FROM

If you’re used to SQL, you may have expected a FROM clause; in SoQL, this is atypical, because queries occur in the context of a view, which already identifies the data source.

## WHERE

The WHERE parameter allows you to filter your results using boolean operators. For example, to retrieve only quakes with a magnitude of greater than 3.0:

SELECT * WHERE `magnitude` > 3.0

Multiple conditions can be added using AND or OR.

Operator
Description
Example

AND
The logical and of two expressions.
a AND b will return true ONLY if a and b are both true.

OR
The logical or of two expressions.
a OR b will return true if either a or b are true.

NOT
The logical not of an expression.
NOT a will return true, ONLY if a is false.

IS NULL
Whether a value is null or not.
a IS NULL will return true, ONLY if a is null.

IS NOT NULL
Whether a values is not null.
a IS NOT NULL will return true, ONLY if a is not null

( ... )
Parentheses are used for defining order of operations.
b > 3 AND (a = 1 OR a = 2)

For example,

SELECT * WHERE `magnitude` > 3.0 AND `source` = 'pr'

## GROUP BY and HAVING

SoQL also provides a limited amount of aggregation functionality through its GROUP BY clause. GROUP BY must be used in conjunction with SELECT to provide the aggregation functions you wish to use. For example, to find the strongest earthquake by region, we would:

SELECT `region`, max(`magnitude`) GROUP BY `region`

Some grouping expressions:

Function
Datatypes Supported
Description

sum
Number
Sums up all the values in a grouping

count
All
Counts the number of values. null values are not counted

avg
Number
Finds the average value of numbers in this column

min
Number
Finds the minimum value of numbers in this column

max
Number
Finds the maximum value of numbers in this column

The HAVING clause allows you to filter your results of an aggregation using boolean operators. For example, to aggregate our earthquakes and get only the sources with more than 500 quakes:

SELECT `source`, count(*) as `count` GROUP BY `source` HAVING `count` > 500

## ORDER BY

The ORDER BY clause determines how the results should be sorted, using the values from the specified columns. Sorting can be performed in either ascending or descending order, the default being ascending, but you can also reverse the order with DESC.

SELECT * ORDER BY `magnitude` DESC

## LIMIT and OFFSET

It is also possible to manually set the LIMIT and OFFSET clauses, which accept an integer. However, this is not recommended and you should prefer to use the page parameter.

## Additional Notes

Just as in SQL, whitespace outside of string literals will be ignored, so you can format your SoQL query however you wish. You may also encode comments with most styles: end-of-line -- or // or block-level /* and */: but we make no guarantees that your comments will be preserved.
