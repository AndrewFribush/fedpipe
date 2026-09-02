# datatype text

Source: https://dev.socrata.com/docs/datatypes/text.html

---

Text Datatype | Socrata

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

# Text Datatype

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

A string of text is an arbitrary sequence of Unicode characters. How the characters are encoded for response will be dependent on the negotiated HTTP charset. If there are characters in the string that cannot be represented in the negotiated charset, they will be replaced. It is strongly recommended that all clients use UTF–8 to prevent this from happening.

Important! Matching behavior differs between endpoint versions:

- On 2.0 endpoints, matching is case-insensitive. eg: 'FOO' == 'foo'

- On 2.1 and 3.0 endpoints, matching is case-sensitive, to be more consistent with SQL. eg: 'FOO' != 'foo'. To make matches case-insensitive, you can use the upper(...) SoQL function, like $where=UPPER(field_name) = 'FOO'.

When using SoQL, string literals are created using the single quote ('). For example:

text_value='string literal'

To escape a single quote within a string, double it. For example:

text_value='Bob''s string'

The following operators can be used on text fields:

Operator
Description

<
TRUE for strings that are alphanumerically before this string

<=
TRUE for strings that are alphanumerically before or equal to this string

>
TRUE for strings that are alphanumerically after this string

>=
TRUE for strings that are alphanumerically after or equal to this string

=
TRUE for strings that are equal to this string

!=
TRUE for strings that are not equal to this string

IS NULL
TRUE for strings that are NULL.

IS NOT NULL
TRUE for strings that are not NULL.

Concatenate two strings together

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

like '...'
Allows for substring searches in text strings
2.1 and 3.0

lower(...)
Returns the lowercase equivalent of a string of text
2.1 and 3.0

max(...)
Returns the maximum of a given set of numbers
2.1 and 3.0

min(...)
Returns the minimum of a given set of numbers
2.1 and 3.0

not in(...)
Matches values not in a given set of options
2.1 and 3.0

not like '...'
Allows for matching text fields that do not contain a substring
2.1 and 3.0

starts_with(...)
Matches on text strings that start with a given substring
2.1 and 3.0

unaccent(...)
Removes accents (diacritical marks) from a string.
2.1 and 3.0

upper(...)
Returns the uppercase equivalent of a string of text
2.1 and 3.0

For example, to query the City of Chicago Salaries to get only those employees who work for the aviation department (AVIATION):

The TryIt macro has been disabled until future notice while we upgrade this site to SODA3.

You could also use the starts_with(...) function to find all employees with CHIEF in their title:

The TryIt macro has been disabled until future notice while we upgrade this site to SODA3.
