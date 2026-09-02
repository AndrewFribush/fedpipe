# endpoint series search tags

Source: https://fred.stlouisfed.org/docs/api/fred/series_search_tags.html

---

St. Louis Fed Web Services: fred/series/search/tags

Skip to main content

Terms of Use

# fred/series/search/tags

- Description

- Examples

- XML

- JSON

Parameters

- api_key

- file_type

- series_search_text

- realtime_start

- realtime_end

- tag_names

- tag_group_id

- tag_search_text

- limit

- offset

- order_by

- sort_order

## Description

Get the FRED tags for a series search.
Optionally, filter results by tag name, tag group, or tag search.
See the related request fred/series/search/related_tags.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/series/search/tags?series_search_text=monetary+service+index&api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<tags realtime_start="2013-08-14" realtime_end="2013-08-14" order_by="series_count" sort_order="desc" count="18" offset="0" limit="1000">
<tag name="academic data" group_id="gen" notes="Time series data created mainly by academia to address growing demand in understanding specific concerns in the economy that are not well modeled by ordinary statistical agencies." created="2012-08-29 10:22:19-05" popularity="62" series_count="25"/>
<tag name="anderson & jones" group_id="src" notes="Richard Anderson and Barry Jones" created="2013-06-21 10:22:49-05" popularity="46" series_count="25"/>
<tag name="divisia" group_id="gen" notes="Monetary Services Indexes" created="2012-02-27 10:18:19-06" popularity="46" series_count="25"/>
<tag name="frb stl" group_id="src" notes="Federal Reserve Bank of St. Louis (source)" created="2012-02-27 10:18:19-06" popularity="81" series_count="25"/>
<tag name="monetary aggregates" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="79" series_count="25"/>
<tag name="monthly" group_id="freq" notes="" created="2012-02-27 10:18:19-06" popularity="95" series_count="25"/>
<tag name="nation" group_id="geot" notes="Country Level" created="2012-02-27 10:18:19-06" popularity="100" series_count="25"/>
<tag name="usa" group_id="geo" notes="United States of America" created="2012-02-27 10:18:19-06" popularity="100" series_count="25"/>
<tag name="sa" group_id="seas" notes="Seasonally adjusted" created="2012-02-27 10:18:19-06" popularity="94" series_count="13"/>
<tag name="indexes" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="79" series_count="12"/>
<tag name="nsa" group_id="seas" notes="Not seasonally adjusted" created="2012-02-27 10:18:19-06" popularity="96" series_count="12"/>
<tag name="real" group_id="gen" notes="Inflation Adjusted Data" created="2012-02-27 10:18:19-06" popularity="81" series_count="12"/>
<tag name="assets" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="69" series_count="4"/>
<tag name="m2" group_id="gen" notes="M2 Money Stock" created="2012-02-27 10:18:19-06" popularity="75" series_count="3"/>
<tag name="m1" group_id="gen" notes="M1 Money Stock" created="2012-02-27 10:18:19-06" popularity="71" series_count="2"/>
<tag name="m3" group_id="gen" notes="M3 Money Stock" created="2012-02-27 10:18:19-06" popularity="50" series_count="2"/>
<tag name="mzm" group_id="gen" notes="MZM Money Stock" created="2012-02-27 10:18:19-06" popularity="61" series_count="2"/>
<tag name="discontinued" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="68" series_count="1"/>
</tags>

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/series/search/tags?series_search_text=monetary+service+index&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"order_by": "series_count",
"sort_order": "desc",
"count": 18,
"offset": 0,
"limit": 1000,
"tags": [
{
"name": "academic data",
"group_id": "gen",
"notes": "Time series data created mainly by academia to address growing demand in understanding specific concerns in the economy that are not well modeled by ordinary statistical agencies.",
"created": "2012-08-29 10:22:19-05",
"popularity": 62,
"series_count": 25
},
{
"name": "anderson & jones",
"group_id": "src",
"notes": "Richard Anderson and Barry Jones",
"created": "2013-06-21 10:22:49-05",
"popularity": 46,
"series_count": 25
},
{
"name": "divisia",
"group_id": "gen",
"notes": "Monetary Services Indexes",
"created": "2012-02-27 10:18:19-06",
"popularity": 46,
"series_count": 25
},
{
"name": "frb stl",
"group_id": "src",
"notes": "Federal Reserve Bank of St. Louis (source)",
"created": "2012-02-27 10:18:19-06",
"popularity": 81,
"series_count": 25
},
{
"name": "monetary aggregates",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 79,
"series_count": 25
},
{
"name": "monthly",
"group_id": "freq",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 95,
"series_count": 25
},
{
"name": "nation",
"group_id": "geot",
"notes": "Country Level",
"created": "2012-02-27 10:18:19-06",
"popularity": 100,
"series_count": 25
},
{
"name": "usa",
"group_id": "geo",
"notes": "United States of America",
"created": "2012-02-27 10:18:19-06",
"popularity": 100,
"series_count": 25
},
{
"name": "sa",
"group_id": "seas",
"notes": "Seasonally adjusted",
"created": "2012-02-27 10:18:19-06",
"popularity": 94,
"series_count": 13
},
{
"name": "indexes",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 79,
"series_count": 12
},
{
"name": "nsa",
"group_id": "seas",
"notes": "Not seasonally adjusted",
"created": "2012-02-27 10:18:19-06",
"popularity": 96,
"series_count": 12
},
{
"name": "real",
"group_id": "gen",
"notes": "Inflation Adjusted Data",
"created": "2012-02-27 10:18:19-06",
"popularity": 81,
"series_count": 12
},
{
"name": "assets",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 69,
"series_count": 4
},
{
"name": "m2",
"group_id": "gen",
"notes": "M2 Money Stock",
"created": "2012-02-27 10:18:19-06",
"popularity": 75,
"series_count": 3
},
{
"name": "m1",
"group_id": "gen",
"notes": "M1 Money Stock",
"created": "2012-02-27 10:18:19-06",
"popularity": 71,
"series_count": 2
},
{
"name": "m3",
"group_id": "gen",
"notes": "M3 Money Stock",
"created": "2012-02-27 10:18:19-06",
"popularity": 50,
"series_count": 2
},
{
"name": "mzm",
"group_id": "gen",
"notes": "MZM Money Stock",
"created": "2012-02-27 10:18:19-06",
"popularity": 61,
"series_count": 2
},
{
"name": "discontinued",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 68,
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

### series_search_text

The words to match against economic data series.

- string, required

### realtime_start

The start of the real-time period. For more information, see Real-Time Periods.

- YYYY-MM-DD formatted string, optional, default: today's date

### realtime_end

The end of the real-time period. For more information, see Real-Time Periods.

- YYYY-MM-DD formatted string, optional, default: today's date

### tag_names

A semicolon delimited list of tag names to only include in the response. See the related request fred/series/search/related_tags.

- String, optional, no filtering by tag names by default

- Example value: 'm1;m2'. This value filters results to only include tags 'm1' and 'm2'.

### tag_group_id

A tag group id to filter tags by type.

- String, optional, no filtering by tag group by default.

One of the following: 'freq', 'gen', 'geo', 'geot', 'rls', 'seas', 'src'.

freq = Frequency

gen = General or Concept

geo = Geography

geot = Geography Type

rls = Release

seas = Seasonal Adjustment

src = Source

### tag_search_text

The words to find matching tags with.

- String, optional, no filtering by search words by default.

### limit

The maximum number of results to return.

- integer between 1 and 1000, optional, default: 1000

### offset

- non-negative integer, optional, default: 0

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
