# endpoint category tags

Source: https://fred.stlouisfed.org/docs/api/fred/category_tags.html

---

St. Louis Fed Web Services: fred/category/tags

Skip to main content

Terms of Use

# fred/category/tags

- Description

- Examples

- XML

- JSON

Parameters

- api_key

- file_type

- category_id

- realtime_start

- realtime_end

- tag_names

- tag_group_id

- search_text

- limit

- offset

- order_by

- sort_order

## Description

Get the FRED tags for a category.
Optionally, filter results by tag name, tag group, or search.
Series are assigned tags and categories.
Indirectly through series, it is possible to get the tags for a category.
No tags exist for a category that does not have series.
See the related request fred/category/related_tags.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/category/tags?category_id=125&api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<tags realtime_start="2013-08-13" realtime_end="2013-08-13" order_by="series_count" sort_order="desc" count="21" offset="0" limit="1000">
<tag name="bea" group_id="src" notes="U.S. Department of Commerce: Bureau of Economic Analysis" created="2012-02-27 10:18:19-06" popularity="87" series_count="24"/>
<tag name="nation" group_id="geot" notes="Country Level" created="2012-02-27 10:18:19-06" popularity="100" series_count="24"/>
<tag name="usa" group_id="geo" notes="United States of America" created="2012-02-27 10:18:19-06" popularity="100" series_count="24"/>
<tag name="balance" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="65" series_count="18"/>
<tag name="nsa" group_id="seas" notes="Not seasonally adjusted" created="2012-02-27 10:18:19-06" popularity="96" series_count="14"/>
<tag name="quarterly" group_id="freq" notes="" created="2012-02-27 10:18:19-06" popularity="88" series_count="14"/>
<tag name="sa" group_id="seas" notes="Seasonally adjusted" created="2012-02-27 10:18:19-06" popularity="94" series_count="10"/>
<tag name="bop" group_id="gen" notes="Balance of Payments" created="2013-01-28 14:10:13-06" popularity="60" series_count="8"/>
<tag name="services" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="72" series_count="8"/>
<tag name="annual" group_id="freq" notes="" created="2012-02-27 10:18:19-06" popularity="83" series_count="7"/>
<tag name="net" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="68" series_count="6"/>
<tag name="trade" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="60" series_count="6"/>
<tag name="goods" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="73" series_count="5"/>
<tag name="capital account" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="42" series_count="3"/>
<tag name="census" group_id="src" notes="U.S. Department of Commerce: Census Bureau" created="2012-02-27 10:18:19-06" popularity="78" series_count="3"/>
<tag name="current account" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="55" series_count="3"/>
<tag name="income" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="61" series_count="3"/>
<tag name="investment" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="67" series_count="3"/>
<tag name="monthly" group_id="freq" notes="" created="2012-02-27 10:18:19-06" popularity="95" series_count="3"/>
<tag name="transfers" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="50" series_count="3"/>
<tag name="payments" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="57" series_count="1"/>
</tags>

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/category/tags?category_id=125&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"order_by": "series_count",
"sort_order": "desc",
"count": 21,
"offset": 0,
"limit": 1000,
"tags": [
{
"name": "bea",
"group_id": "src",
"notes": "U.S. Department of Commerce: Bureau of Economic Analysis",
"created": "2012-02-27 10:18:19-06",
"popularity": 87,
"series_count": 24
},
{
"name": "nation",
"group_id": "geot",
"notes": "Country Level",
"created": "2012-02-27 10:18:19-06",
"popularity": 100,
"series_count": 24
},
{
"name": "usa",
"group_id": "geo",
"notes": "United States of America",
"created": "2012-02-27 10:18:19-06",
"popularity": 100,
"series_count": 24
},
{
"name": "balance",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 65,
"series_count": 18
},
{
"name": "nsa",
"group_id": "seas",
"notes": "Not seasonally adjusted",
"created": "2012-02-27 10:18:19-06",
"popularity": 96,
"series_count": 14
},
{
"name": "quarterly",
"group_id": "freq",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 88,
"series_count": 14
},
{
"name": "sa",
"group_id": "seas",
"notes": "Seasonally adjusted",
"created": "2012-02-27 10:18:19-06",
"popularity": 94,
"series_count": 10
},
{
"name": "bop",
"group_id": "gen",
"notes": "Balance of Payments",
"created": "2013-01-28 14:10:13-06",
"popularity": 60,
"series_count": 8
},
{
"name": "services",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 72,
"series_count": 8
},
{
"name": "annual",
"group_id": "freq",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 83,
"series_count": 7
},
{
"name": "net",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 68,
"series_count": 6
},
{
"name": "trade",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 60,
"series_count": 6
},
{
"name": "goods",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 73,
"series_count": 5
},
{
"name": "capital account",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 42,
"series_count": 3
},
{
"name": "census",
"group_id": "src",
"notes": "U.S. Department of Commerce: Census Bureau",
"created": "2012-02-27 10:18:19-06",
"popularity": 78,
"series_count": 3
},
{
"name": "current account",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 55,
"series_count": 3
},
{
"name": "income",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 61,
"series_count": 3
},
{
"name": "investment",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 67,
"series_count": 3
},
{
"name": "monthly",
"group_id": "freq",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 95,
"series_count": 3
},
{
"name": "transfers",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 50,
"series_count": 3
},
{
"name": "payments",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 57,
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

### category_id

The id for a category.

- integer, required

### realtime_start

The start of the real-time period. For more information, see Real-Time Periods.

- YYYY-MM-DD formatted string, optional, default: today's date

### realtime_end

The end of the real-time period. For more information, see Real-Time Periods.

- YYYY-MM-DD formatted string, optional, default: today's date

### tag_names

A semicolon delimited list of tag names to only include in the response. See the related request fred/category/related_tags.

- String, optional, no filtering by tag names by default

- Example value: 'trade;goods'. This value filters results to only include tags 'trade' and 'goods'.

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
