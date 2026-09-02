# endpoint series search related tags

Source: https://fred.stlouisfed.org/docs/api/fred/series_search_related_tags.html

---

St. Louis Fed Web Services: fred/series/search/related_tags

Skip to main content

Terms of Use

# fred/series/search/related_tags

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

- exclude_tag_names

- tag_group_id

- tag_search_text

- limit

- offset

- order_by

- sort_order

## Description

Get the related FRED tags for one or more FRED tags matching a series search.
Optionally, filter results by tag group or tag search.

FRED tags are attributes assigned to series.
For this request, related FRED tags are the tags assigned to series that match all tags in the tag_names parameter,
no tags in the exclude_tag_names parameter, and the search words set by the series_search_text parameter.
See the related request fred/series/search/tags.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/series/search/related_tags?series_search_text=mortgage+rate&tag_names=30-year;frb&api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<tags realtime_start="2013-08-14" realtime_end="2013-08-14" order_by="series_count" sort_order="desc" count="10" offset="0" limit="1000">
<tag name="conventional" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="63" series_count="3"/>
<tag name="h15" group_id="rls" notes="H.15 Selected Interest Rates" created="2012-08-16 15:21:17-05" popularity="84" series_count="3"/>
<tag name="interest rate" group_id="gen" notes="" created="2012-05-29 10:14:19-05" popularity="87" series_count="3"/>
<tag name="mortgage" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="68" series_count="3"/>
<tag name="nation" group_id="geot" notes="Country Level" created="2012-02-27 10:18:19-06" popularity="100" series_count="3"/>
<tag name="nsa" group_id="seas" notes="Not seasonally adjusted" created="2012-02-27 10:18:19-06" popularity="96" series_count="3"/>
<tag name="usa" group_id="geo" notes="United States of America" created="2012-02-27 10:18:19-06" popularity="100" series_count="3"/>
<tag name="weekly" group_id="freq" notes="" created="2012-02-27 10:18:19-06" popularity="82" series_count="2"/>
<tag name="discontinued" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="68" series_count="1"/>
<tag name="monthly" group_id="freq" notes="" created="2012-02-27 10:18:19-06" popularity="95" series_count="1"/>
</tags>

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/series/search/related_tags?series_search_text=mortgage+rate&tag_names=30-year;frb&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"order_by": "series_count",
"sort_order": "desc",
"count": 10,
"offset": 0,
"limit": 1000,
"tags": [
{
"name": "conventional",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 63,
"series_count": 3
},
{
"name": "h15",
"group_id": "rls",
"notes": "H.15 Selected Interest Rates",
"created": "2012-08-16 15:21:17-05",
"popularity": 84,
"series_count": 3
},
{
"name": "interest rate",
"group_id": "gen",
"notes": "",
"created": "2012-05-29 10:14:19-05",
"popularity": 87,
"series_count": 3
},
{
"name": "mortgage",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 68,
"series_count": 3
},
{
"name": "nation",
"group_id": "geot",
"notes": "Country Level",
"created": "2012-02-27 10:18:19-06",
"popularity": 100,
"series_count": 3
},
{
"name": "nsa",
"group_id": "seas",
"notes": "Not seasonally adjusted",
"created": "2012-02-27 10:18:19-06",
"popularity": 96,
"series_count": 3
},
{
"name": "usa",
"group_id": "geo",
"notes": "United States of America",
"created": "2012-02-27 10:18:19-06",
"popularity": 100,
"series_count": 3
},
{
"name": "weekly",
"group_id": "freq",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 82,
"series_count": 2
},
{
"name": "discontinued",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 68,
"series_count": 1
},
{
"name": "monthly",
"group_id": "freq",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 95,
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

A semicolon delimited list of tag names that series match all of. See the related request fred/series/search/tags.

- String, required, no default value.

- Example value: '30-year;frb'.
Find the related tags for series having both tags '30-year' and 'frb'.

### exclude_tag_names

A semicolon delimited list of tag names that series match none of.

- String, optional, no default value.

- Example value: 'discontinued;monthly'.
Find the related tags for series having neither tag 'discontinued' nor tag 'monthly'.

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
