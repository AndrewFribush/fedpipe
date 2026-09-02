# API v2

Source: https://www.bls.gov/developers/api_signature_v2.htm

---

BLS Public Data API Signatures (Version 2.0) : U.S. Bureau of Labor Statistics

- BROWSE
DEVELOPER'S SITE

- API Signatures v2

- Single Series

- Multiple Series

- One or More Series with Optional Parameters

- Latest Series

- Popular Series

- All Surveys

- Single Survey

- API Signatures v1

- Single Series

- Multiple Series

- One or More Series, Specifying Years

- Sample Code

- C#

- Java

- PHP

- Python

- R Script

- Ruby/Ruby on Rails

- SAS

- Unix Command Line

- Matlab

- Julia

- Terms Of Service

- FAQs

- Release Notes

- Contact Us

SEARCH DEVELOPER'S SITE

# BLS Public Data API Signatures (Version 2.0)

### The BLS Public Data API utilizes the following three signatures:

- Single Series

- Multiple Series

- One or More Series with Optional Parameters

- Latest Series

- Popular Series

- All Surveys

- Single Survey

All signatures must include an HTTP type, a RESTful URL, and at least one series ID. The series ID(s) can include an underscore (_), dash (-) and hash (#), but must not include lower case letters or special characters. All requests specifying years must include a four-digit start and end year in numeric format (e.g. YYYY).

The following are sample responses for each of API signature with added white spaces for easier readability.

## Single Series

Use this signature to retrieve data for a single time series for the past three years. Be sure to include the specific series ID at the end of the URL. Parameters are optional.:

HTTP Type:
GET

URL (JSON):
https://api.bls.gov/publicAPI/v2/timeseries/data/

URL for Excel output:
https://api.bls.gov/publicAPI/v2/timeseries/data/.xlsx

Payload:
series_id

Example Payload:

LAUCN040010000000005

Sample JSON Response:

{
"status": "REQUEST_SUCCEEDED",
"responseTime": 16,
"message": [

],
"Results": [
{
"series": [
{
"seriesID": "LAUCN040010000000005",
"data": [
{
"year": "2013",
"period": "M11",
"periodName": "November",
"value": "16393",
"footnotes": [
{
"code": "P",
"text": "Preliminary."
}
]
},
{
"year": "2013",
"period": "M10",
"periodName": "October",
"value": "16536",
"footnotes": [
{
...
}
]
}
]
}
]
}
]
}

## Multiple Series

Use this signature to retrieve data for more than one timeseries for the past three years. Registered users can include up to 50 series IDs, each separated with a comma, in the body of a request.

HTTP Type:
POST

URL (JSON):
https://api.bls.gov/publicAPI/v2/timeseries/data/

URL (Excel):
https://api.bls.gov/publicAPI/v2/timeseries/data.xlsx

Header:
Content-Type= application/json

Payload (JSON):
{"seriesid":["Series1",..., "SeriesN"], "startyear":"yearX", "endyear":"yearY",
"catalog":true|false, "calculations":true|false, "annualaverage":true|false,"aspects":true|false,
"registrationkey":"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" }

Example Payload:

{"seriesid":["LAUCN040010000000005", "LAUCN040010000000006",

"OEUN000000056--5747213213"]}

Sample Response:

{
"status": "REQUEST_SUCCEEDED",
"responseTime": 37,
"message": [ ],
"Results": [
{
"series": [
{
"seriesID": "LAUCN040010000000005",
"data": [
{
"year": "2013",
"period": "M11",
"periodName": "November",
"value": "16393",
"footnotes": [
{
"code": "P",
"text": "Preliminary."
}
],
. . .
{
"seriesID": "LAUCN040010000000006",
"data": [
{
"year": "2013",
"period": "M11",
"periodName": "November",
"value": "20155",
"footnotes": [
{
"code": "P",
"text": "Preliminary."
}
],
. . .
}

HTTP Type:
POST

URL (JSON):
https://api.bls.gov/publicAPI/v2/timeseries/data/

URL (Excel):
https://api.bls.gov/publicAPI/v2/timeseries/data.xlsx

Header:
Content-Type=application/x-www-form-urlencoded

Payload:
seriesid=series1,series2 ...

Example Payload without Parameters:

seriesid=OEUN000000056--5747213213,LUU0202891000,

OEUN000000056--5747213213

Example Payload with Parameters:

seriesid=OEUN000000056--5747213213,LUU0202891000,

OEUN000000056--5747213213

&registrationkey=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

&catalog=true&startyear=2010&endyear=2014

&calculations=true&annualaverage=true&aspects=true

Sample of a JSON Response:

{
"status": "REQUEST_SUCCEEDED",
"responseTime": 37,
"message": [ ],
"Results": [
{
"series": [
{
"seriesID": "LAUCN040010000000005",
"data": [
{
"year": "2013",
"period": "M11",
"periodName": "November",
"value": "16393",
"footnotes": [
{
"code": "P",
"text": "Preliminary."
}
],
. . .
{
"seriesID": "LAUCN040010000000006",
"data": [
{
"year": "2013",
"period": "M11",
"periodName": "November",
"value": "20155",
"footnotes": [
{
"code": "P",
"text": "Preliminary."
}
],
. . .
}

## One or More Series with Optional Parameters

Use this signature to retrieve data for one or more timeseries within a set time frame of up to 20 years. This signature also provides the option of retrieving calculations, annual averages, aspects, and catalog data. To retrieve these optional parameters, users must include their assigned registration key. Unless otherwise specified, the catalog, calculations, annualaverage and aspects values will default to false.

Users should also include at least one series ID, the start year, and the end year in the body of the request. If you include multiple series IDs, be sure to separate each with a comma.

HTTP Type:
POST

URL:
https://api.bls.gov/publicAPI/v2/timeseries/data/

URL with parameters (JSON):
https://api.bls.gov/publicAPI/v2/timeseries/data/
?registrationkey=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&
catalog=true&startyear=2010&endyear=2014&calculations=true &annualaverage=true&aspects=true

URL for Excel output with parameters:
https://api.bls.gov/publicAPI/v2/timeseries/data/
.xlsx?registrationkey=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&
catalog=true&startyear=2010&endyear=2014&calculations=true&annualaverage=true&aspects=true

Payload:
JSON Payload:

{"seriesid":["Series1",..., "SeriesN"],
"startyear":"yearX",
"endyear":"yearY",
"catalog":true|false,
"calculations":true|false,
"annualaverage":true|false,
"aspects":true|false,
"registrationkey":"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}

Example Payload:

{"seriesid":["WMU00140201020000001300002500", "WMU00140201020000001300002500"], "startyear":"2018",

"endyear":"2018", "catalog":true,

"calculations":true, "annualaverage":true, "aspects":true,

"registrationkey":"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}

Example Payload with Parameters:

{"seriesid":["WMU00140201020000001300002500", "WMU00140201020000001300002500"],

"startyear":"2018", "endyear":"2018", "catalog":true,

"calculations":true, "annualaverage":true, "aspects":true,

"registrationkey":"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}

Sample Response:

{
"status": "REQUEST_SUCCEEDED",
"responseTime": 706,
"message": [ ],
"Results": [
{
"series": [{
"seriesID": "WMU00140201020000001300002500",
"catalog": {
"series_title": "Average hourly wage for business and financial operations occupations, full-time, in Bloomington, IN",
"series_id": "WMU00140201020000001300002500",
"seasonality": "Not Seasonally Adjusted",
"survey_name": "Modeled Wage Estimates",
"survey_abbreviation": "WM",
"measure_data_type": "Average Hourly Wage",
"commerce_industry": "All industries",
"occupation": "Business and Financial Operations Occupations",
"occupation_work_class": "Civilian workers",
"area": "Bloomington, IN"
},
"data": [{
"year": "2018",
"period": "A01",
"periodName": "Annual",
"latest": "true",
"value": "30.71",
"aspects": [{
"name": "Relative Standard Error",
"value": "1.9",
"footnotes": [{}]
}],
"footnotes": [{}]
}]
},
. . .
}

## Latest Series Data

Use this signature to retrieve the most recent data point for a given BLS series ids.

HTTP Type:
GET

URL (JSON):
https://api.bls.gov/publicAPI/v2/timeseries/data/

Parameters:
series_id, latest

Example URL:
https://api.bls.gov/publicAPI/v2/timeseries/data/LAUCN040010000000005?latest=true

Sample JSON Response:

{
"status":"REQUEST_SUCCEEDED",
"responseTime":253,
"message":[],
"Results": {
"series": [
{
"seriesID":"LAUCN040010000000005",
"data":[
{
"year": "2013",
"period": "M11",
"periodName": "November",
"latest": "true",
"value": "16393",
"footnotes": [
{
"code": "P",
"text": "Preliminary."
}
]
}]
]
}
}

## Popular Series

Use this signature to retrieve a list of series IDs for the 25 most popular BLS and survey-specific series. Parameters for retrieving series IDs for survey-specific series are optional.

HTTP Type:
GET

URL (JSON):
https://api.bls.gov/publicAPI/v2/timeseries/popular

Example URL without Parameters:
https://api.bls.gov/publicAPI/v2/timeseries/popular

Sample JSON Response:

{"status":"REQUEST_SUCCEEDED","responseTime":29,"message":[],"Results":{
"series":
[{"seriesID":"LNS14000000"},
{"seriesID":"CUUR0000SA0"},
{"seriesID":"CES0000000001"},
{"seriesID":"LNS14000006"},
{"seriesID":"CUSR0000SA0"},
{"seriesID":"LNS11300000"},
{"seriesID":"CUUR0000SA0L1E"},
{"seriesID":"CES3000000001"},
{"seriesID":"CES0500000003"},
{"seriesID":"LNU04000000"},
{"seriesID":"PCU327320327320"},
{"seriesID":"PCU33312033312014"},
{"seriesID":"LNS12000000"},
{"seriesID":"CUSR0000SA0L1E"},
{"seriesID":"CUUR0000SAM1"},
{"seriesID":"CUUR0000SEMC01"},
{"seriesID":"LNS12300000"},
{"seriesID":"LNS12035019"},
{"seriesID":"CUUR0000SEMC"},
{"seriesID":"CUUR0000SS5702"},
{"seriesID":"CUUR0000SS5703"},
{"seriesID":"CUUR0000SEMC02"},
{"seriesID":"CES0500000001"},
{"seriesID":"CUUR0100SEMC"},
{"seriesID":"CUUR0100SAM1"}]
}}

Parameters:
survey

Example URL with Parameters:
https://api.bls.gov/publicAPI/v2/timeseries/popular?survey=LA

Sample JSON Response:

{"status":"REQUEST_SUCCEEDED","responseTime":38,"message":[],"Results":{
"series":
[{"seriesID":"LASST060000000000003"},
{"seriesID":"LASST260000000000003"},
{"seriesID":"LASST480000000000003"},
{"seriesID":"LASST340000000000003"},
{"seriesID":"LASST120000000000003"},
{"seriesID":"LASST360000000000003"},
{"seriesID":"LASST420000000000003"},
{"seriesID":"LASST210000000000003"},
{"seriesID":"LASST080000000000003"},
{"seriesID":"LASST370000000000003"},
{"seriesID":"LASST180000000000003"},
{"seriesID":"LASST390000000000003"},
{"seriesID":"LASST550000000000003"},
{"seriesID":"LASST170000000000003"},
{"seriesID":"LASST010000000000003"},
{"seriesID":"LASST130000000000003"},
{"seriesID":"LASST040000000000003"},
{"seriesID":"LASST280000000000003"},
{"seriesID":"LASST510000000000003"},
{"seriesID":"LASST530000000000003"},
{"seriesID":"LASST250000000000003"},
{"seriesID":"LASST270000000000003"},
{"seriesID":"LASST290000000000003"},
{"seriesID":"LASST320000000000003"},
{"seriesID":"LASST470000000000003"}]
}}

## All Surveys

Use this signature to retrieve a list of all BLS surveys.

HTTP Type:
GET

URL (JSON):
https://api.bls.gov/publicAPI/v2/surveys

Sample JSON Response:

{
"status":"REQUEST_SUCCEEDED",
"responseTime":424,
"message":[],
"Results": {
"survey": [
{
"survey_abbreviation": "AP",
"survey_name": "Consumer Price Index - Average Price Data"
},
{
"survey_abbreviation": "BD",
"survey_name": "Business Employment Dynamics"
},
{
"survey_abbreviation": "BG",
"survey_name": "Collective Bargaining Agreements-State and Local Government"
},
{
"survey_abbreviation": "BP",
"survey_name": "Collective Bargaining Agreements-Private Sector"
},
]
}
}

## Single Survey

Use this signature to retrieve the metadata associated with a single BLS survey. Be sure to include the specific survey abbreviation.

HTTP Type:
GET

URL (JSON):
https://api.bls.gov/publicAPI/v2/surveys/

Payload:
Survey abbreviation

Example Payload:
TU

Sample JSON Response:

{
"status":"REQUEST_SUCCEEDED",
"responseTime":46,
"message":[],
"Results":{
"survey": [{
"survey_name":"American Time Use",
"survey_abbreviation":"TU",
"allowsNetChange":"false",
"allowsPercentChange":"false",
"hasAnnualAverages":"false"
}]
}
}

To help you get started, sample code for some of the most popular programming languages has been written:

API Version 2.0

API Version 1.0

- Java

- PHP

- Python

- R

- Ruby/Ruby on Rails

- SAS

- Unix Command Line

- Java

- PHP

- Python

- R

- Ruby/Ruby on Rails

- SAS

- Unix Command Line

Last Modified Date: October 5, 2020

- Developers
