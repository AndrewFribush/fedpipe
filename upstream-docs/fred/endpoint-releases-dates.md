# endpoint releases dates

Source: https://fred.stlouisfed.org/docs/api/fred/releases_dates.html

---

St. Louis Fed Web Services: fred/releases/dates

Skip to main content

Terms of Use

# fred/releases/dates

- Description

- Examples

- XML

- JSON

Parameters

- api_key

- file_type

- realtime_start

- realtime_end

- limit

- offset

- order_by

- sort_order

- include_release_dates_with_no_data

## Description

Get release dates for all releases of economic data.

Note that release dates are published by data sources and do not necessarily represent when data will be available
on the FRED or ALFRED websites.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/releases/dates?api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<release_dates realtime_start="2013-01-01" realtime_end="9999-12-31" order_by="release_date" sort_order="desc" count="1129" offset="0" limit="1000">
<release_date release_id="9" release_name="Advance Monthly Sales for Retail and Food Services">2013-08-13</release_date>
<release_date release_id="262" release_name="Failures and Assistance Transactions">2013-08-13</release_date>
<release_date release_id="25" release_name="Manufacturing and Trade Inventories and Sales">2013-08-13</release_date>
<release_date release_id="92" release_name="Selected Real Retail Sales Series">2013-08-13</release_date>
<release_date release_id="188" release_name="U.S. Import and Export Price Indexes">2013-08-13</release_date>
<release_date release_id="183" release_name="Gasoline and Diesel Fuel Update">2013-08-12</release_date>
<release_date release_id="18" release_name="H.15 Selected Interest Rates">2013-08-12</release_date>
<release_date release_id="269" release_name="National Accounts of Japan">2013-08-12</release_date>
<release_date release_id="71" release_name="Weekly Treasury Inflation-Indexed Securities">2013-08-12</release_date>
<release_date release_id="122" release_name="H.4.1 Factors Affecting Reserve Balances (data not included in press release)">2013-08-09</release_date>
<release_date release_id="22" release_name="H.8 Assets and Liabilities of Commercial Banks in the United States">2013-08-09</release_date>
<release_date release_id="63" release_name="M2 Related Series">2013-08-09</release_date>
<release_date release_id="61" release_name="Money Zero Maturity (MZM)">2013-08-09</release_date>
<release_date release_id="236" release_name="Monthly Housing Affordability Index">2013-08-09</release_date>
<release_date release_id="78" release_name="St. Louis Monthly Reserves and Monetary Base">2013-08-09</release_date>
<release_date release_id="105" release_name="St. Louis Weekly Reserves and Monetary Base">2013-08-09</release_date>
<release_date release_id="255" release_name="Bank Rate Monitor's Weekly Survey">2013-08-08</release_date>
<release_date release_id="53" release_name="Gross Domestic Product">2013-08-08</release_date>
<release_date release_id="19" release_name="H.3 Aggregate Reserves of Depository Institutions and the Monetary Base">2013-08-08</release_date>
<release_date release_id="283" release_name="H.3 Aggregate Reserves of Depository Institutions and the Monetary Base (data not included in press release)">2013-08-08</release_date>
...
</release_dates>

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/releases/dates?api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"realtime_start": "2013-01-01",
"realtime_end": "9999-12-31",
"order_by": "release_date",
"sort_order": "desc",
"count": 1129,
"offset": 0,
"limit": 1000,
"release_dates": [
{
"release_id": 9,
"release_name": "Advance Monthly Sales for Retail and Food Services",
"date": "2013-08-13"
},
{
"release_id": 262,
"release_name": "Failures and Assistance Transactions",
"date": "2013-08-13"
},
{
"release_id": 25,
"release_name": "Manufacturing and Trade Inventories and Sales",
"date": "2013-08-13"
},
{
"release_id": 92,
"release_name": "Selected Real Retail Sales Series",
"date": "2013-08-13"
},
{
"release_id": 188,
"release_name": "U.S. Import and Export Price Indexes",
"date": "2013-08-13"
},
{
"release_id": 183,
"release_name": "Gasoline and Diesel Fuel Update",
"date": "2013-08-12"
},
{
"release_id": 18,
"release_name": "H.15 Selected Interest Rates",
"date": "2013-08-12"
},
{
"release_id": 269,
"release_name": "National Accounts of Japan",
"date": "2013-08-12"
},
{
"release_id": 71,
"release_name": "Weekly Treasury Inflation-Indexed Securities",
"date": "2013-08-12"
},
{
"release_id": 122,
"release_name": "H.4.1 Factors Affecting Reserve Balances (data not included in press release)",
"date": "2013-08-09"
},
{
"release_id": 22,
"release_name": "H.8 Assets and Liabilities of Commercial Banks in the United States",
"date": "2013-08-09"
},
{
"release_id": 63,
"release_name": "M2 Related Series",
"date": "2013-08-09"
},
{
"release_id": 61,
"release_name": "Money Zero Maturity (MZM)",
"date": "2013-08-09"
},
{
"release_id": 236,
"release_name": "Monthly Housing Affordability Index",
"date": "2013-08-09"
},
{
"release_id": 78,
"release_name": "St. Louis Monthly Reserves and Monetary Base",
"date": "2013-08-09"
},
{
"release_id": 105,
"release_name": "St. Louis Weekly Reserves and Monetary Base",
"date": "2013-08-09"
},
{
"release_id": 255,
"release_name": "Bank Rate Monitor's Weekly Survey",
"date": "2013-08-08"
},
{
"release_id": 53,
"release_name": "Gross Domestic Product",
"date": "2013-08-08"
},
{
"release_id": 19,
"release_name": "H.3 Aggregate Reserves of Depository Institutions and the Monetary Base",
"date": "2013-08-08"
},
{
"release_id": 283,
"release_name": "H.3 Aggregate Reserves of Depository Institutions and the Monetary Base (data not included in press release)",
"date": "2013-08-08"
},
...
]
}

## Parameters

### api_key

Read API Keys for more information.

- 32 character alpha-numeric lowercase string, required

### file_type

A key or file extension that indicates the type of file to send.

- string, optional, default: xml

- One of the following values: 'xml', 'json'

xml = Extensible Markup Language. The HTTP Content-Type is text/xml.

json = JavaScript Object Notation. The HTTP Content-Type is application/json.

### realtime_start

The start of the real-time period. For more information, see Real-Time Periods.

- YYYY-MM-DD formatted string, optional, default: First day of the current year

### realtime_end

The end of the real-time period. For more information, see Real-Time Periods.

- YYYY-MM-DD formatted string, optional, default: 9999-12-31 (latest available)

### limit

The maximum number of results to return.

- integer between 1 and 1000, optional, default: 1000

### offset

- non-negative integer, optional, default: 0

### order_by

Order results by values of the specified attribute.

- One of the following strings: 'release_date', 'release_id', 'release_name'.

- optional, default: release_date

### sort_order

Sort results is ascending or descending release date order.

- One of the following strings: 'asc', 'desc'.

- optional, default: desc

### include_release_dates_with_no_data

Determines whether release dates with no data available are returned.
The defalut value 'false' excludes release dates that do not have data.
In particular, this excludes future release dates which may be available in the
FRED release calendar or the ALFRED release calendar.

If include_release_dates_with_no_data is set to true, the XML tag release_date has an extra attribute release_last_updated that can be compared to the release date to determine if data has been updated.

- One of the following strings: 'true', 'false'.

- optional, default: false

Back to Top

Filter
0

### Subscribe to the FRED newsletter

Subscribe

### Follow us

Saint Louis Fed linkedin page

Saint Louis Fed facebook page

Saint Louis Fed X page

Saint Louis Fed YouTube page

### Need Help?

Questions or Comments

FRED Help

Legal

Privacy Notice & Policy
