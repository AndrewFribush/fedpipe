# endpoint series updates

Source: https://fred.stlouisfed.org/docs/api/fred/series_updates.html

---

St. Louis Fed Web Services: fred/series/updates

Skip to main content

Terms of Use

# fred/series/updates

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

- filter_value

- start_time

- end_time

## Description

Get economic data series sorted by when observations were updated on the FRED® server (attribute last_updated).
Results are limited to series updated within the last two weeks.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/series/updates?api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<seriess realtime_start="2013-08-14" realtime_end="2013-08-14" filter_variable="geography" filter_value="all" order_by="last_updated" sort_order="desc" count="143535" offset="0" limit="100">
<series id="PPIITM" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Producer Price Index: Intermediate Materials: Supplies & Components" observation_start="1947-04-01" observation_end="2013-07-01" frequency="Monthly" frequency_short="M" units="Index 1982=100" units_short="Index 1982=100" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2013-08-14 08:36:05-05" popularity="52"/>
<series id="PPILFE" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Producer Price Index: Finished Goods Less Food & Energy" observation_start="1974-01-01" observation_end="2013-07-01" frequency="Monthly" frequency_short="M" units="Index 1982=100" units_short="Index 1982=100" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2013-08-14 08:36:05-05" popularity="51"/>
<series id="PPIFGS" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Producer Price Index: Finished Goods" observation_start="1947-04-01" observation_end="2013-07-01" frequency="Monthly" frequency_short="M" units="Index 1982=100" units_short="Index 1982=100" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2013-08-14 08:36:04-05" popularity="62"/>
<series id="PPIFLE" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Producer Price Index: Finished Goods Less Energy" observation_start="1975-01-01" observation_end="2013-07-01" frequency="Monthly" frequency_short="M" units="Index 1982=100" units_short="Index 1982=100" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2013-08-14 08:36:04-05" popularity="21"/>
<series id="PPIFLF" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Producer Price Index: Finished Goods Excluding Foods" observation_start="1967-01-01" observation_end="2013-07-01" frequency="Monthly" frequency_short="M" units="Index 1982=100" units_short="Index 1982=100" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2013-08-14 08:36:04-05" popularity="12"/>
<series id="PPIIDC" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Producer Price Index: Industrial Commodities" observation_start="1913-01-01" observation_end="2013-07-01" frequency="Monthly" frequency_short="M" units="Index 1982=100" units_short="Index 1982=100" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2013-08-14 08:36:04-05" popularity="56"/>
<series id="PPIIEG" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Producer Price Index: Intermediate Energy Goods" observation_start="1974-01-01" observation_end="2013-07-01" frequency="Monthly" frequency_short="M" units="Index 1982=100" units_short="Index 1982=100" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2013-08-14 08:36:04-05" popularity="25"/>
<series id="PPIIFF" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Producer Price Index: Intermediate Foods & Feeds" observation_start="1967-01-01" observation_end="2013-07-01" frequency="Monthly" frequency_short="M" units="Index 1982=100" units_short="Index 1982=100" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2013-08-14 08:36:04-05" popularity="23"/>
<series id="PPICRM" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Producer Price Index: Crude Materials for Further Processing" observation_start="1947-04-01" observation_end="2013-07-01" frequency="Monthly" frequency_short="M" units="Index 1982=100" units_short="Index 1982=100" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2013-08-14 08:36:03-05" popularity="50"/>
<series id="PPIENG" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Producer Price Index: Fuels & Related Products & Power" observation_start="1926-01-01" observation_end="2013-07-01" frequency="Monthly" frequency_short="M" units="Index 1982=100" units_short="Index 1982=100" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2013-08-14 08:36:03-05" popularity="19"/>
<series id="PPIFCF" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Producer Price Index: Finished Consumer Foods" observation_start="1947-04-01" observation_end="2013-07-01" frequency="Monthly" frequency_short="M" units="Index 1982=100" units_short="Index 1982=100" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2013-08-14 08:36:03-05" popularity="42"/>
<series id="PPIFCG" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Producer Price Index: Finished Consumer Goods" observation_start="1947-04-01" observation_end="2013-07-01" frequency="Monthly" frequency_short="M" units="Index 1982=100" units_short="Index 1982=100" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2013-08-14 08:36:03-05" popularity="36"/>
<series id="PPIFEG" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Producer Price Index: Finished Energy Goods" observation_start="1974-01-01" observation_end="2013-07-01" frequency="Monthly" frequency_short="M" units="Index 1982=100" units_short="Index 1982=100" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2013-08-14 08:36:03-05" popularity="35"/>
<series id="PPIACO" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Producer Price Index: All Commodities" observation_start="1913-01-01" observation_end="2013-07-01" frequency="Monthly" frequency_short="M" units="Index 1982=100" units_short="Index 1982=100" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2013-08-14 08:36:02-05" popularity="73"/>
<series id="PPICEM" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Producer Price Index: Crude Energy Materials" observation_start="1974-01-01" observation_end="2013-07-01" frequency="Monthly" frequency_short="M" units="Index 1982=100" units_short="Index 1982=100" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2013-08-14 08:36:02-05" popularity="45"/>
<series id="PPICFF" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Producer Price Index: Crude Foodstuffs & Feedstuffs" observation_start="1969-01-01" observation_end="2013-07-01" frequency="Monthly" frequency_short="M" units="Index 1982=100" units_short="Index 1982=100" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2013-08-14 08:36:02-05" popularity="27"/>
<series id="PPICPE" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Producer Price Index: Finished Goods: Capital Equipment" observation_start="1947-04-01" observation_end="2013-07-01" frequency="Monthly" frequency_short="M" units="Index 1982=100" units_short="Index 1982=100" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2013-08-14 08:36:02-05" popularity="50"/>
<series id="PFCGEF" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Producer Price Index: Finished Consumer Goods Excluding Foods" observation_start="1947-04-01" observation_end="2013-07-01" frequency="Monthly" frequency_short="M" units="Index 1982=100" units_short="Index 1982=100" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2013-08-14 08:36:01-05" popularity="15"/>
<series id="USEPUINDXD" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Economic Policy Uncertainty Index for United States" observation_start="1985-01-01" observation_end="2013-08-14" frequency="Daily" frequency_short="D" units="Index" units_short="Index" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2013-08-14 08:21:05-05" popularity="62" notes="For additional details, including an analysis of the performance of the model, see: Baker, Scott, Nicholas Bloom and Steven Davis (2012), “Measuring Economic Policy Uncertainty,” (http://www.policyuncertainty.com/media/BakerBloomDavis.pdf)"/>
<series id="WLEMUINDXD" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Equity Market-related Economic Uncertainty Index" observation_start="1985-01-01" observation_end="2013-08-14" frequency="Daily" frequency_short="D" units="Index" units_short="Index" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2013-08-14 08:21:03-05" popularity="53" notes="For additional details, including an analysis of the performance of the model, see: Baker, Scott, Nicholas Bloom and Steven Davis (2012), “Measuring Economic Policy Uncertainty,” (http://www.policyuncertainty.com/media/BakerBloomDavis.pdf)"/>
...
</seriess>

The series tag's notes attribute is optional.

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/series/updates?api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"filter_variable": "geography",
"filter_value": "all",
"order_by": "last_updated",
"sort_order": "desc",
"count": 143535,
"offset": 0,
"limit": 100,
"seriess": [
{
"id": "PPIITM",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Producer Price Index: Intermediate Materials: Supplies & Components",
"observation_start": "1947-04-01",
"observation_end": "2013-07-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 1982=100",
"units_short": "Index 1982=100",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2013-08-14 08:36:05-05",
"popularity": 52
},
{
"id": "PPILFE",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Producer Price Index: Finished Goods Less Food & Energy",
"observation_start": "1974-01-01",
"observation_end": "2013-07-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 1982=100",
"units_short": "Index 1982=100",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2013-08-14 08:36:05-05",
"popularity": 51
},
{
"id": "PPIFGS",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Producer Price Index: Finished Goods",
"observation_start": "1947-04-01",
"observation_end": "2013-07-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 1982=100",
"units_short": "Index 1982=100",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2013-08-14 08:36:04-05",
"popularity": 62
},
{
"id": "PPIFLE",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Producer Price Index: Finished Goods Less Energy",
"observation_start": "1975-01-01",
"observation_end": "2013-07-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 1982=100",
"units_short": "Index 1982=100",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2013-08-14 08:36:04-05",
"popularity": 21
},
{
"id": "PPIFLF",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Producer Price Index: Finished Goods Excluding Foods",
"observation_start": "1967-01-01",
"observation_end": "2013-07-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 1982=100",
"units_short": "Index 1982=100",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2013-08-14 08:36:04-05",
"popularity": 12
},
{
"id": "PPIIDC",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Producer Price Index: Industrial Commodities",
"observation_start": "1913-01-01",
"observation_end": "2013-07-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 1982=100",
"units_short": "Index 1982=100",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2013-08-14 08:36:04-05",
"popularity": 56
},
{
"id": "PPIIEG",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Producer Price Index: Intermediate Energy Goods",
"observation_start": "1974-01-01",
"observation_end": "2013-07-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 1982=100",
"units_short": "Index 1982=100",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2013-08-14 08:36:04-05",
"popularity": 25
},
{
"id": "PPIIFF",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Producer Price Index: Intermediate Foods & Feeds",
"observation_start": "1967-01-01",
"observation_end": "2013-07-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 1982=100",
"units_short": "Index 1982=100",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2013-08-14 08:36:04-05",
"popularity": 23
},
{
"id": "PPICRM",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Producer Price Index: Crude Materials for Further Processing",
"observation_start": "1947-04-01",
"observation_end": "2013-07-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 1982=100",
"units_short": "Index 1982=100",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2013-08-14 08:36:03-05",
"popularity": 50
},
{
"id": "PPIENG",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Producer Price Index: Fuels & Related Products & Power",
"observation_start": "1926-01-01",
"observation_end": "2013-07-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 1982=100",
"units_short": "Index 1982=100",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2013-08-14 08:36:03-05",
"popularity": 19
},
{
"id": "PPIFCF",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Producer Price Index: Finished Consumer Foods",
"observation_start": "1947-04-01",
"observation_end": "2013-07-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 1982=100",
"units_short": "Index 1982=100",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2013-08-14 08:36:03-05",
"popularity": 42
},
{
"id": "PPIFCG",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Producer Price Index: Finished Consumer Goods",
"observation_start": "1947-04-01",
"observation_end": "2013-07-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 1982=100",
"units_short": "Index 1982=100",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2013-08-14 08:36:03-05",
"popularity": 36
},
{
"id": "PPIFEG",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Producer Price Index: Finished Energy Goods",
"observation_start": "1974-01-01",
"observation_end": "2013-07-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 1982=100",
"units_short": "Index 1982=100",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2013-08-14 08:36:03-05",
"popularity": 35
},
{
"id": "PPIACO",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Producer Price Index: All Commodities",
"observation_start": "1913-01-01",
"observation_end": "2013-07-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 1982=100",
"units_short": "Index 1982=100",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2013-08-14 08:36:02-05",
"popularity": 73
},
{
"id": "PPICEM",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Producer Price Index: Crude Energy Materials",
"observation_start": "1974-01-01",
"observation_end": "2013-07-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 1982=100",
"units_short": "Index 1982=100",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2013-08-14 08:36:02-05",
"popularity": 45
},
{
"id": "PPICFF",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Producer Price Index: Crude Foodstuffs & Feedstuffs",
"observation_start": "1969-01-01",
"observation_end": "2013-07-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 1982=100",
"units_short": "Index 1982=100",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2013-08-14 08:36:02-05",
"popularity": 27
},
{
"id": "PPICPE",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Producer Price Index: Finished Goods: Capital Equipment",
"observation_start": "1947-04-01",
"observation_end": "2013-07-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 1982=100",
"units_short": "Index 1982=100",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2013-08-14 08:36:02-05",
"popularity": 50
},
{
"id": "PFCGEF",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Producer Price Index: Finished Consumer Goods Excluding Foods",
"observation_start": "1947-04-01",
"observation_end": "2013-07-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 1982=100",
"units_short": "Index 1982=100",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2013-08-14 08:36:01-05",
"popularity": 15
},
{
"id": "USEPUINDXD",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Economic Policy Uncertainty Index for United States",
"observation_start": "1985-01-01",
"observation_end": "2013-08-14",
"frequency": "Daily",
"frequency_short": "D",
"units": "Index",
"units_short": "Index",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2013-08-14 08:21:05-05",
"popularity": 62,
"notes": "For additional details, including an analysis of the performance of the model, see: \r\nBaker, Scott, Nicholas Bloom and Steven Davis (2012), “Measuring Economic Policy Uncertainty,” (http://www.policyuncertainty.com/media/BakerBloomDavis.pdf)"
},
{
"id": "WLEMUINDXD",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Equity Market-related Economic Uncertainty Index",
"observation_start": "1985-01-01",
"observation_end": "2013-08-14",
"frequency": "Daily",
"frequency_short": "D",
"units": "Index",
"units_short": "Index",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2013-08-14 08:21:03-05",
"popularity": 53,
"notes": "For additional details, including an analysis of the performance of the model, see: \r\nBaker, Scott, Nicholas Bloom and Steven Davis (2012), “Measuring Economic Policy Uncertainty,” (http://www.policyuncertainty.com/media/BakerBloomDavis.pdf)"
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

### limit

The maximum number of results to return.

- integer between 1 and 1000, optional, default: 1000

### offset

- non-negative integer, optional, default: 0

### filter_value

Limit results by geographic type of economic data series; namely 'macro', 'regional', and 'all'.

- String, optional, default: 'all' meaning no filter.

- One of the values: 'macro', 'regional', 'all'

- 'macro' limits results to macroeconomic data series. In general, these are series for entire countries that are not subregions of the United States.
'regional' limits results to series for parts of the US; namely, series for US states, counties, and Metropolitan Statistical Areas (MSA).
'all' does not filter results.

### start_time

Start time for limiting results for a time range, can filter down to minutes

- YYYYMMDDHhmm formatted string, optional, end_time is required if start_time is set

- Example: 2018-03-02 14:20 would be 201803021420

### end_time

End time for limiting results for a time range, can filter down to minutes

- YYYYMMDDHhmm formatted string, optional, , start_time is required if end_time is set

- Example: 2018-03-02 2:20 would be 201803020220

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
