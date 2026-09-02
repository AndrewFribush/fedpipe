# endpoint series tags

Source: https://fred.stlouisfed.org/docs/api/fred/series_tags.html

---

St. Louis Fed Web Services: fred/series/tags

Skip to main content

Terms of Use

# fred/series/tags

- Description

- Examples

- XML

- JSON

Parameters

- api_key

- file_type

- series_id

- realtime_start

- realtime_end

- order_by

- sort_order

## Description

Get the FRED tags for a series.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/series/tags?series_id=STLFSI&api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<tags realtime_start="2013-08-14" realtime_end="2013-08-14" order_by="series_count" sort_order="desc" count="8" offset="0" limit="1000">
<tag name="nation" group_id="geot" notes="Country Level" created="2012-02-27 10:18:19-06" popularity="100" series_count="105200"/>
<tag name="nsa" group_id="seas" notes="Not seasonally adjusted" created="2012-02-27 10:18:19-06" popularity="96" series_count="100468"/>
<tag name="usa" group_id="geo" notes="United States of America" created="2012-02-27 10:18:19-06" popularity="100" series_count="59469"/>
<tag name="frb stl" group_id="src" notes="Federal Reserve Bank of St. Louis (source)" created="2012-02-27 10:18:19-06" popularity="81" series_count="4329"/>
<tag name="financial" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="70" series_count="2134"/>
<tag name="weekly" group_id="freq" notes="" created="2012-02-27 10:18:19-06" popularity="82" series_count="2013"/>
<tag name="indexes" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="79" series_count="1567"/>
<tag name="stlfsi" group_id="rls" notes="St. Louis Financial Stress Index" created="2012-08-16 15:21:17-05" popularity="66" series_count="1"/>
</tags>

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/series/tags?series_id=STLFSI&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"order_by": "series_count",
"sort_order": "desc",
"count": 8,
"offset": 0,
"limit": 1000,
"tags": [
{
"name": "nation",
"group_id": "geot",
"notes": "Country Level",
"created": "2012-02-27 10:18:19-06",
"popularity": 100,
"series_count": 105200
},
{
"name": "nsa",
"group_id": "seas",
"notes": "Not seasonally adjusted",
"created": "2012-02-27 10:18:19-06",
"popularity": 96,
"series_count": 100468
},
{
"name": "usa",
"group_id": "geo",
"notes": "United States of America",
"created": "2012-02-27 10:18:19-06",
"popularity": 100,
"series_count": 59469
},
{
"name": "frb stl",
"group_id": "src",
"notes": "Federal Reserve Bank of St. Louis (source)",
"created": "2012-02-27 10:18:19-06",
"popularity": 81,
"series_count": 4329
},
{
"name": "financial",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 70,
"series_count": 2134
},
{
"name": "weekly",
"group_id": "freq",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 82,
"series_count": 2013
},
{
"name": "indexes",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 79,
"series_count": 1567
},
{
"name": "stlfsi",
"group_id": "rls",
"notes": "St. Louis Financial Stress Index",
"created": "2012-08-16 15:21:17-05",
"popularity": 66,
"series_count": 1
}
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

### series_id

The id for a series.

- string, required

### realtime_start

The start of the real-time period. For more information, see Real-Time Periods.

- YYYY-MM-DD formatted string, optional, default: today's date

### realtime_end

The end of the real-time period. For more information, see Real-Time Periods.

- YYYY-MM-DD formatted string, optional, default: today's date

### order_by

Order results by values of the specified attribute.

- One of the following strings: 'series_count', 'popularity', 'created', 'name', 'group_id'.

- optional, default: series_count

### sort_order

Sort results is ascending or descending order for attribute values specified by order_by.

- One of the following strings: 'asc', 'desc'.

- optional, default: asc

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
