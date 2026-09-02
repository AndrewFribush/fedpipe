# endpoint source

Source: https://fred.stlouisfed.org/docs/api/fred/source.html

---

St. Louis Fed Web Services: fred/source

Skip to main content

Terms of Use

# fred/source

- Description

- Examples

- XML

- JSON

Parameters

- api_key

- file_type

- source_id

- realtime_start

- realtime_end

## Description

Get a source of economic data.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/source?source_id=1&api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<sources realtime_start="2013-08-13" realtime_end="2013-08-13">
<source id="1" realtime_start="2013-08-13" realtime_end="2013-08-13" name="Board of Governors of the Federal Reserve System" link="http://www.federalreserve.gov/"/>
</sources>

The source tag's link and notes attributes are optional.

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/source?source_id=1&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"sources": [
{
"id": 1,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Board of Governors of the Federal Reserve System",
"link": "http://www.federalreserve.gov/"
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

### source_id

The id for a source.

- integer, required

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
