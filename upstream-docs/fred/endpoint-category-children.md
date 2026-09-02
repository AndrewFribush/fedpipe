# endpoint category children

Source: https://fred.stlouisfed.org/docs/api/fred/category_children.html

---

St. Louis Fed Web Services: fred/category/children

Skip to main content

Terms of Use

# fred/category/children

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

Get the child categories for a specified parent category.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

For category_id 13 (U.S. Trade & International Transactions):

https://api.stlouisfed.org/fred/category/children?category_id=13&api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<?xml version="1.0" encoding="utf-8" ?>
<categories>
<category id="16" name="Exports" parent_id="13"/>
<category id="17" name="Imports" parent_id="13"/>
<category id="3000" name="Income Payments & Receipts" parent_id="13"/>
<category id="125" name="Trade Balance" parent_id="13"/>
<category id="127" name="U.S. International Finance" parent_id="13"/>
</categories>

The category tag's notes attribute is optional.

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/category/children?category_id=13&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"categories": [
{
"id": 16,
"name": "Exports",
"parent_id": 13
},
{
"id": 17,
"name": "Imports",
"parent_id": 13
},
{
"id": 3000,
"name": "Income Payments & Receipts",
"parent_id": 13
},
{
"id": 125,
"name": "Trade Balance",
"parent_id": 13
},
{
"id": 127,
"name": "U.S. International Finance",
"parent_id": 13
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

- integer, default: 0 (root category)

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
