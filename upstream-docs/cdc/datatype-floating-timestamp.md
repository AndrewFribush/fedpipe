# datatype floating timestamp

Source: https://dev.socrata.com/docs/datatypes/floating_timestamp.html

---

Floating Timestamp Datatype | Socrata

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

# Floating Timestamp Datatype

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

Floating timestamps represent an instant in time with millisecond precision, with no timezone value, encoded as ISO8601 Times with no timezone offset. When writing data, accuracy to only the second is required, but the service will always return precision to the millisecond. For example:

[ {
"date_time_column": "2014-10-13T00:00:00.000"
} ]

Datasets will either specify what timezone they should be interpreted in, or you can usually assume they’re in the timezone of the publisher. For example, a dataset published by the City of Chicago will be published in Central Standard Time. While functionally a floating_timestamp is distinct from a text datatype, it may be helpful to think of the value of a floating_timestamp as simply a text string, with no inherent timezone information.

The following operators can be used to compare and manipulate floating_timestamp fields:

Operator
Description

<
TRUE when the first date is earlier than the second date

<=
TRUE when the first date is earlier than or at the same time as the second date

>
TRUE when the first date is after the second date

>=
TRUE when the first date is after or at the same time as the second date

!=
TRUE when two dates are not at the same time

=
TRUE when two dates are at the same time

IS NULL
TRUE for dates that are NULL.

IS NOT NULL
TRUE for dates that are not NULL.

And the following functions can be used to filter and manipulate them:

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

between ... and ...
Returns TRUE for values in a given range
2.1 and 3.0

case(...)
Returns different values based on the evaluation of boolean comparisons
2.1 and 3.0

count(...)
Returns a count of a given set of records
2.0, 2.1, and 3.0

date_extract_d(...)
Extracts the day from the date as an integer.
2.1 and 3.0

date_extract_dow(...)
Extracts the day of the week as an integer between 0 and 6 (inclusive).
2.1 and 3.0

date_extract_hh(...)
Extracts the hour of the day as an integer between 0 and 23 (inclusive).
2.1 and 3.0

date_extract_m(...)
Extracts the month as an integer.
2.1 and 3.0

date_extract_mm(...)
Extracts the minute from the time as an integer.
2.1 and 3.0

date_extract_ss(...)
Extracts the second from the time as an integer.
2.1 and 3.0

date_extract_woy(...)
Extracts the week of the year as an integer between 0 and 51 (inclusive).
2.1 and 3.0

date_extract_y(...)
Extracts the year as an integer.
2.1 and 3.0

date_trunc_y(...)
Truncates a calendar date at the year threshold
2.0, 2.1, and 3.0

date_trunc_ym(...)
Truncates a calendar date at the year/month threshold
2.0, 2.1, and 3.0

date_trunc_ymd(...)
Truncates a calendar date at the year/month/date threshold
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

For example, to get all of the crimes that occurred between noon and 2PM on January 10th, 2015 in Chicago:

The TryIt macro has been disabled until future notice while we upgrade this site to SODA3.

Text strings will be automatically be cast when used in comparisons, as shown above.
