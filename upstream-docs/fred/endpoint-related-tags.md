# endpoint related tags

Source: https://fred.stlouisfed.org/docs/api/fred/related_tags.html

---

St. Louis Fed Web Services: fred/related_tags

Skip to main content

Terms of Use

# fred/related_tags

- Description

- Examples

- XML

- JSON

Parameters

- api_key

- file_type

- realtime_start

- realtime_end

- tag_names

- exclude_tag_names

- tag_group_id

- search_text

- limit

- offset

- order_by

- sort_order

## Description

Get the related FRED tags for one or more FRED tags.
Optionally, filter results by tag group or search.

FRED tags are attributes assigned to series.
Related FRED tags are the tags assigned to series that match all tags in the tag_names parameter and no tags in the exclude_tag_names parameter.
See the related request fred/tags.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/related_tags?tag_names=monetary+aggregates;weekly&api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<tags realtime_start="2013-08-14" realtime_end="2013-08-14" order_by="series_count" sort_order="desc" count="13" offset="0" limit="1000">
<tag name="nation" group_id="geot" notes="Country Level" created="2012-02-27 10:18:19-06" popularity="100" series_count="12"/>
<tag name="usa" group_id="geo" notes="United States of America" created="2012-02-27 10:18:19-06" popularity="100" series_count="12"/>
<tag name="frb" group_id="src" notes="Board of Governors of the Federal Reserve System" created="2012-02-27 10:18:19-06" popularity="90" series_count="10"/>
<tag name="nsa" group_id="seas" notes="Not seasonally adjusted" created="2012-02-27 10:18:19-06" popularity="96" series_count="6"/>
<tag name="sa" group_id="seas" notes="Seasonally adjusted" created="2012-02-27 10:18:19-06" popularity="94" series_count="6"/>
<tag name="m1" group_id="gen" notes="M1 Money Stock" created="2012-02-27 10:18:19-06" popularity="71" series_count="4"/>
<tag name="m2" group_id="gen" notes="M2 Money Stock" created="2012-02-27 10:18:19-06" popularity="75" series_count="4"/>
<tag name="currency" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="74" series_count="2"/>
<tag name="discontinued" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="68" series_count="2"/>
<tag name="frb stl" group_id="src" notes="Federal Reserve Bank of St. Louis (source)" created="2012-02-27 10:18:19-06" popularity="81" series_count="2"/>
<tag name="h6" group_id="rls" notes="H.6 Money Stock Measures" created="2012-08-16 15:21:17-05" popularity="41" series_count="2"/>
<tag name="m3" group_id="gen" notes="M3 Money Stock" created="2012-02-27 10:18:19-06" popularity="50" series_count="2"/>
<tag name="mzm" group_id="gen" notes="MZM Money Stock" created="2012-02-27 10:18:19-06" popularity="61" series_count="2"/>
</tags>

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/related_tags?tag_names=monetary+aggregates;weekly&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"order_by": "series_count",
"sort_order": "desc",
"count": 13,
"offset": 0,
"limit": 1000,
"tags": [
{
"name": "nation",
"group_id": "geot",
"notes": "Country Level",
"created": "2012-02-27 10:18:19-06",
"popularity": 100,
"series_count": 12
},
{
"name": "usa",
"group_id": "geo",
"notes": "United States of America",
"created": "2012-02-27 10:18:19-06",
"popularity": 100,
"series_count": 12
},
{
"name": "frb",
"group_id": "src",
"notes": "Board of Governors of the Federal Reserve System",
"created": "2012-02-27 10:18:19-06",
"popularity": 90,
"series_count": 10
},
{
"name": "nsa",
"group_id": "seas",
"notes": "Not seasonally adjusted",
"created": "2012-02-27 10:18:19-06",
"popularity": 96,
"series_count": 6
},
{
"name": "sa",
"group_id": "seas",
"notes": "Seasonally adjusted",
"created": "2012-02-27 10:18:19-06",
"popularity": 94,
"series_count": 6
},
{
"name": "m1",
"group_id": "gen",
"notes": "M1 Money Stock",
"created": "2012-02-27 10:18:19-06",
"popularity": 71,
"series_count": 4
},
{
"name": "m2",
"group_id": "gen",
"notes": "M2 Money Stock",
"created": "2012-02-27 10:18:19-06",
"popularity": 75,
"series_count": 4
},
{
"name": "currency",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 74,
"series_count": 2
},
{
"name": "discontinued",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 68,
"series_count": 2
},
{
"name": "frb stl",
"group_id": "src",
"notes": "Federal Reserve Bank of St. Louis (source)",
"created": "2012-02-27 10:18:19-06",
"popularity": 81,
"series_count": 2
},
{
"name": "h6",
"group_id": "rls",
"notes": "H.6 Money Stock Measures",
"created": "2012-08-16 15:21:17-05",
"popularity": 41,
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

### realtime_start

The start of the real-time period. For more information, see Real-Time Periods.

- YYYY-MM-DD formatted string, optional, default: today's date

### realtime_end

The end of the real-time period. For more information, see Real-Time Periods.

- YYYY-MM-DD formatted string, optional, default: today's date

### tag_names

A semicolon delimited list of tag names that series match all of. See the related request fred/tags.

- String, required, no default value.

- Example value: 'monetary+aggregates;weekly'.
Find the related tags for series having both tags 'monetary aggregates' and 'weekly'.
The '+' in 'monetary+aggregates;weekly' is an URL encoded space character.

### exclude_tag_names

A semicolon delimited list of tag names that series match none of.

- String, optional, no default value.

- Example value: 'discontinued;currency'.
Find the related tags for series having neither tag 'discontinued' nor tag 'currency'.

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

### search_text

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
