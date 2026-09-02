# endpoint series

Source: https://fred.stlouisfed.org/docs/api/fred/series.html

---

St. Louis Fed Web Services: fred/series

Skip to main content

Terms of Use

# fred/series

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

## Description

Get an economic data series.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/series?series_id=GNPCA&api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<seriess realtime_start="2013-08-14" realtime_end="2013-08-14">
<series id="GNPCA" realtime_start="2013-08-14" realtime_end="2013-08-14" title="Real Gross National Product" observation_start="1929-01-01" observation_end="2012-01-01" frequency="Annual" frequency_short="A" units="Billions of Chained 2009 Dollars" units_short="Bil. of Chn. 2009 $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2013-07-31 09:26:16-05" popularity="39" notes="BEA Account Code: A001RX1"/>
</seriess>

The series tag's notes attribute is optional.

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/series?series_id=GNPCA&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"seriess": [
{
"id": "GNPCA",
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"title": "Real Gross National Product",
"observation_start": "1929-01-01",
"observation_end": "2012-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Billions of Chained 2009 Dollars",
"units_short": "Bil. of Chn. 2009 $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2013-07-31 09:26:16-05",
"popularity": 39,
"notes": "BEA Account Code: A001RX1"
}
]

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
