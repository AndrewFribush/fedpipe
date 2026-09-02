# endpoint tags

Source: https://fred.stlouisfed.org/docs/api/fred/tags.html

---

St. Louis Fed Web Services: fred/tags

Skip to main content

Terms of Use

# fred/tags

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

- tag_group_id

- search_text

- limit

- offset

- order_by

- sort_order

## Description

Get FRED tags.
Optionally, filter results by tag name, tag group, or search.
FRED tags are attributes assigned to series.
See the related request fred/related_tags.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/tags?api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<tags realtime_start="2013-08-14" realtime_end="2013-08-14" order_by="series_count" sort_order="desc" count="4794" offset="0" limit="1000">
<tag name="nation" group_id="geot" notes="Country Level" created="2012-02-27 10:18:19-06" popularity="100" series_count="105200"/>
<tag name="nsa" group_id="seas" notes="Not seasonally adjusted" created="2012-02-27 10:18:19-06" popularity="96" series_count="100468"/>
<tag name="oecd" group_id="src" notes="Organisation for Economic Co-operation and Development" created="2012-02-27 10:18:19-06" popularity="76" series_count="61488"/>
<tag name="mei" group_id="rls" notes="Main Economic Indicators" created="2012-08-16 15:21:17-05" popularity="75" series_count="61160"/>
<tag name="annual" group_id="freq" notes="" created="2012-02-27 10:18:19-06" popularity="83" series_count="60142"/>
<tag name="usa" group_id="geo" notes="United States of America" created="2012-02-27 10:18:19-06" popularity="100" series_count="59469"/>
<tag name="sa" group_id="seas" notes="Seasonally adjusted" created="2012-02-27 10:18:19-06" popularity="94" series_count="43068"/>
<tag name="monthly" group_id="freq" notes="" created="2012-02-27 10:18:19-06" popularity="95" series_count="41183"/>
<tag name="quarterly" group_id="freq" notes="" created="2012-02-27 10:18:19-06" popularity="88" series_count="37741"/>
<tag name="employment" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="79" series_count="22014"/>
<tag name="gdp" group_id="gen" notes="Gross Domestic Product" created="2012-02-27 10:18:19-06" popularity="85" series_count="21862"/>
<tag name="bls" group_id="src" notes="U.S. Department of Labor: Bureau of Labor Statistics" created="2012-02-27 10:18:19-06" popularity="88" series_count="21479"/>
<tag name="rate" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="83" series_count="20524"/>
<tag name="labor force" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="69" series_count="16180"/>
<tag name="unemployment" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="80" series_count="15540"/>
<tag name="bea" group_id="src" notes="U.S. Department of Commerce: Bureau of Economic Analysis" created="2012-02-27 10:18:19-06" popularity="87" series_count="14137"/>
<tag name="cpi" group_id="gen" notes="Consumer Price Index" created="2012-02-27 10:18:19-06" popularity="78" series_count="13104"/>
<tag name="females" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="57" series_count="11914"/>
<tag name="males" group_id="gen" notes="" created="2012-02-27 10:18:19-06" popularity="56" series_count="11848"/>
<tag name="msa" group_id="geot" notes="Metropolitan Statistical Area" created="2012-02-27 10:18:19-06" popularity="72" series_count="11637"/>
...
</tags>

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/tags?api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"order_by": "series_count",
"sort_order": "desc",
"count": 4794,
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
"name": "oecd",
"group_id": "src",
"notes": "Organisation for Economic Co-operation and Development",
"created": "2012-02-27 10:18:19-06",
"popularity": 76,
"series_count": 61488
},
{
"name": "mei",
"group_id": "rls",
"notes": "Main Economic Indicators",
"created": "2012-08-16 15:21:17-05",
"popularity": 75,
"series_count": 61160
},
{
"name": "annual",
"group_id": "freq",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 83,
"series_count": 60142
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
"name": "sa",
"group_id": "seas",
"notes": "Seasonally adjusted",
"created": "2012-02-27 10:18:19-06",
"popularity": 94,
"series_count": 43068
},
{
"name": "monthly",
"group_id": "freq",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 95,
"series_count": 41183
},
{
"name": "quarterly",
"group_id": "freq",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 88,
"series_count": 37741
},
{
"name": "employment",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 79,
"series_count": 22014
},
{
"name": "gdp",
"group_id": "gen",
"notes": "Gross Domestic Product",
"created": "2012-02-27 10:18:19-06",
"popularity": 85,
"series_count": 21862
},
{
"name": "bls",
"group_id": "src",
"notes": "U.S. Department of Labor: Bureau of Labor Statistics",
"created": "2012-02-27 10:18:19-06",
"popularity": 88,
"series_count": 21479
},
{
"name": "rate",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 83,
"series_count": 20524
},
{
"name": "labor force",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 69,
"series_count": 16180
},
{
"name": "unemployment",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 80,
"series_count": 15540
},
{
"name": "bea",
"group_id": "src",
"notes": "U.S. Department of Commerce: Bureau of Economic Analysis",
"created": "2012-02-27 10:18:19-06",
"popularity": 87,
"series_count": 14137
},
{
"name": "cpi",
"group_id": "gen",
"notes": "Consumer Price Index",
"created": "2012-02-27 10:18:19-06",
"popularity": 78,
"series_count": 13104
},
{
"name": "females",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 57,
"series_count": 11914
},
{
"name": "males",
"group_id": "gen",
"notes": "",
"created": "2012-02-27 10:18:19-06",
"popularity": 56,
"series_count": 11848
},
{
"name": "msa",
"group_id": "geot",
"notes": "Metropolitan Statistical Area",
"created": "2012-02-27 10:18:19-06",
"popularity": 72,
"series_count": 11637
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

- YYYY-MM-DD formatted string, optional, default: today's date

### realtime_end

The end of the real-time period. For more information, see Real-Time Periods.

- YYYY-MM-DD formatted string, optional, default: today's date

### tag_names

A semicolon delimited list of tag names to only include in the response. See the related request fred/related_tags.

- String, optional, no filtering by tag names by default

- Example value: 'gdp;oecd'. This value filters results to only include tags 'gdp' and 'oecd'.

### tag_group_id

A tag group id to filter tags by type.

- String, optional, no filtering by tag group by default.

One of the following: 'freq', 'gen', 'geo', 'geot', 'rls', 'seas', 'src', 'cc'.

freq = Frequency

gen = General or Concept

geo = Geography

geot = Geography Type

rls = Release

seas = Seasonal Adjustment

src = Source

cc = Citation & Copyright

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
