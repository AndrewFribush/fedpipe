# endpoint category related

Source: https://fred.stlouisfed.org/docs/api/fred/category_related.html

---

St. Louis Fed Web Services: fred/category/related

Skip to main content

Terms of Use

# fred/category/related

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

## Description

Get the related categories for a category. A related category is a one-way relation between 2 categories that is not part of a parent-child category hierarchy.
Most categories do not have related categories.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/category/related?category_id=32073&api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<?xml version="1.0" encoding="utf-8" ?>
<categories>
<category id="149" name="Arkansas" parent_id="27281"/>
<category id="150" name="Illinois" parent_id="27281"/>
<category id="151" name="Indiana" parent_id="27281"/>
<category id="152" name="Kentucky" parent_id="27281"/>
<category id="153" name="Mississippi" parent_id="27281"/>
<category id="154" name="Missouri" parent_id="27281"/>
<category id="193" name="Tennessee" parent_id="27281"/>
</categories>

The category tag's notes attribute is optional.

Category I.D. 32073 has the parent-child category hierarchy:

Categories > Regional Data > Federal Reserve Districts > St. Louis > States in District

This category uses a related category to link to category I.D. 154 'Missouri' with hierarchy:

Categories > Regional Data > States > Missouri

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/category/related?category_id=32073&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"categories": [
{
"id": 149,
"name": "Arkansas",
"parent_id": 27281
},
{
"id": 150,
"name": "Illinois",
"parent_id": 27281
},
{
"id": 151,
"name": "Indiana",
"parent_id": 27281
},
{
"id": 152,
"name": "Kentucky",
"parent_id": 27281
},
{
"id": 153,
"name": "Mississippi",
"parent_id": 27281
},
{
"id": 154,
"name": "Missouri",
"parent_id": 27281
},
{
"id": 193,
"name": "Tennessee",
"parent_id": 27281
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
