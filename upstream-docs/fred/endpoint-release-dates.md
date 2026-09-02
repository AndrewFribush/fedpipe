# endpoint release dates

Source: https://fred.stlouisfed.org/docs/api/fred/release_dates.html

---

St. Louis Fed Web Services: fred/release/dates

Skip to main content

Terms of Use

# fred/release/dates

- Description

- Examples

- XML

- JSON

Parameters

- api_key

- file_type

- release_id

- realtime_start

- realtime_end

- limit

- offset

- sort_order

- include_release_dates_with_no_data

## Description

Get release dates for a release of economic data.

Note that release dates are published by data sources and do not necessarily represent when data will be available
on the FRED or ALFRED websites.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/release/dates?release_id=82&api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<release_dates realtime_start="1776-07-04" realtime_end="9999-12-31" order_by="release_date" sort_order="asc" count="17" offset="0" limit="10000">
<release_date release_id="82">1997-02-10</release_date>
<release_date release_id="82">1998-02-10</release_date>
<release_date release_id="82">1999-02-04</release_date>
<release_date release_id="82">2000-02-10</release_date>
<release_date release_id="82">2001-01-16</release_date>
<release_date release_id="82">2002-02-06</release_date>
<release_date release_id="82">2003-02-07</release_date>
<release_date release_id="82">2004-02-09</release_date>
<release_date release_id="82">2005-02-17</release_date>
<release_date release_id="82">2006-02-13</release_date>
<release_date release_id="82">2007-02-16</release_date>
<release_date release_id="82">2008-02-11</release_date>
<release_date release_id="82">2009-03-03</release_date>
<release_date release_id="82">2010-02-11</release_date>
<release_date release_id="82">2011-02-23</release_date>
<release_date release_id="82">2012-10-24</release_date>
<release_date release_id="82">2013-04-10</release_date>
</release_dates>

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/release/dates?release_id=82&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"realtime_start": "1776-07-04",
"realtime_end": "9999-12-31",
"order_by": "release_date",
"sort_order": "asc",
"count": 17,
"offset": 0,
"limit": 10000,
"release_dates": [
{
"release_id": 82,
"date": "1997-02-10"
},
{
"release_id": 82,
"date": "1998-02-10"
},
{
"release_id": 82,
"date": "1999-02-04"
},
{
"release_id": 82,
"date": "2000-02-10"
},
{
"release_id": 82,
"date": "2001-01-16"
},
{
"release_id": 82,
"date": "2002-02-06"
},
{
"release_id": 82,
"date": "2003-02-07"
},
{
"release_id": 82,
"date": "2004-02-09"
},
{
"release_id": 82,
"date": "2005-02-17"
},
{
"release_id": 82,
"date": "2006-02-13"
},
{
"release_id": 82,
"date": "2007-02-16"
},
{
"release_id": 82,
"date": "2008-02-11"
},
{
"release_id": 82,
"date": "2009-03-03"
},
{
"release_id": 82,
"date": "2010-02-11"
},
{
"release_id": 82,
"date": "2011-02-23"
},
{
"release_id": 82,
"date": "2012-10-24"
},
{
"release_id": 82,
"date": "2013-04-10"
}
]
}

## Parameters

### api_key

Read API Keys for more information.

- 32 character alpha-numeric lowercase string, required

### release_id

The id for a release.

- integer, required

### file_type

A key or file extension that indicates the type of file to send.

- string, optional, default: xml

- One of the following values: 'xml', 'json'

xml = Extensible Markup Language. The HTTP Content-Type is text/xml.

json = JavaScript Object Notation. The HTTP Content-Type is application/json.

### realtime_start

The start of the real-time period. For more information, see Real-Time Periods.

- YYYY-MM-DD formatted string, optional, default: 1776-07-04 (earliest available)

### realtime_end

The end of the real-time period. For more information, see Real-Time Periods.

- YYYY-MM-DD formatted string, optional, default: 9999-12-31 (latest available)

### limit

The maximum number of results to return.

- integer between 1 and 10000, optional, default: 10000

### offset

- non-negative integer, optional, default: 0

### sort_order

Sort results is ascending or descending release date order.

- One of the following strings: 'asc', 'desc'.

- optional, default: asc

### include_release_dates_with_no_data

Determines whether release dates with no data available are returned.
The defalut value 'false' excludes release dates that do not have data.
In particular, this excludes future release dates which may be available in the
FRED release calendar or the ALFRED release calendar.

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
