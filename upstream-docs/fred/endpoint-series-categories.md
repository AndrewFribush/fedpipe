# endpoint series categories

Source: https://fred.stlouisfed.org/docs/api/fred/series_categories.html

---

St. Louis Fed Web Services: fred/series/categories

Skip to main content

Terms of Use

# fred/series/categories

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

Get the categories for an economic data series.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/series/categories?series_id=EXJPUS&api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<?xml version="1.0" encoding="utf-8" ?>
<categories>
<category id="95" name="Monthly Rates" parent_id="15"/>
<category id="275" name="Japan" parent_id="158"/>
</categories>

The category tag's notes attribute is optional.

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/series/categories?series_id=EXJPUS&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"categories": [
{
"id": 95,
"name": "Monthly Rates",
"parent_id": 15
},
{
"id": 275,
"name": "Japan",
"parent_id": 158
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
