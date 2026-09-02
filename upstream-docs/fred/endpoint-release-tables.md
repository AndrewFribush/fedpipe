# endpoint release tables

Source: https://fred.stlouisfed.org/docs/api/fred/release_tables.html

---

St. Louis Fed Web Services: fred/release/dates

Skip to main content

Terms of Use

# fred/release/tables

- Description

- Examples

- XML

- JSON

Parameters

- api_key

- file_type

- release_id

- element_id

- include_observation_values

- observation_date

## Description

Get release table trees for a given release. You can go directly to the tree structure by passing the appropriate
element_id. You may also use a drill-down approach to start at the root (top most) element by leaving the element_id
off.

Note that release dates are published by data sources and do not necessarily represent when data will be available
on the FRED or ALFRED websites.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/release/tables?release_id=53&api_key=abcdefghijklmnopqrstuvwxyz123456&element_id=12886

#### Response

<elements>
<name>Personal consumption expenditures</name>
<element_id>12886</element_id>
<release_id>53</release_id>
<element>
<element_id>12887</element_id>
<release_id>53</release_id>
<series_id>DGDSRL1A225NBEA</series_id>
<parent_id>12886</parent_id>
<line>3</line>
<type>series</type>
<name>Goods</name>
<level>1</level>
<children>
<element>
<element_id>12888</element_id>
<release_id>53</release_id>
<series_id>DDURRL1A225NBEA</series_id>
<parent_id>12887</parent_id>
<line>4</line>
<type>series</type>
<name>Durable goods</name>
<level>2</level>
<children/>
</element>
<element>
<element_id>12889</element_id>
<release_id>53</release_id>
<series_id>DNDGRL1A225NBEA</series_id>
<parent_id>12887</parent_id>
<line>5</line>
<type>series</type>
<name>Nondurable goods</name>
<level>2</level>
<children/>
</element>
</children>
</element>
<element>
<element_id>12888</element_id>
<release_id>53</release_id>
<series_id>DDURRL1A225NBEA</series_id>
<parent_id>12887</parent_id>
<line>4</line>
<type>series</type>
<name>Durable goods</name>
<level>2</level>
<children/>
</element>
<element>
<element_id>12889</element_id>
<release_id>53</release_id>
<series_id>DNDGRL1A225NBEA</series_id>
<parent_id>12887</parent_id>
<line>5</line>
<type>series</type>
<name>Nondurable goods</name>
<level>2</level>
<children/>
</element>
<element>
<element_id>12890</element_id>
<release_id>53</release_id>
<series_id>DSERRL1A225NBEA</series_id>
<parent_id>12886</parent_id>
<line>6</line>
<type>series</type>
<name>Services</name>
<level>1</level>
<children/>
</element>
</elements>

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/release/tables?release_id=53&api_key=abcdefghijklmnopqrstuvwxyz123456&element_id=12886&file_type=json

#### Response

{
{
"name": "Personal consumption expenditures",
"element_id": 12886,
"release_id": "53",
"elements": {
"12887": {
"element_id": 12887,
"release_id": 53,
"series_id": "DGDSRL1A225NBEA",
"parent_id": 12886,
"line": "3",
"type": "series",
"name": "Goods",
"level": "1",
"children": [
{
"element_id": 12888,
"release_id": 53,
"series_id": "DDURRL1A225NBEA",
"parent_id": 12887,
"line": "4",
"type": "series",
"name": "Durable goods",
"level": "2",
"children": [

]
},
{
"element_id": 12889,
"release_id": 53,
"series_id": "DNDGRL1A225NBEA",
"parent_id": 12887,
"line": "5",
"type": "series",
"name": "Nondurable goods",
"level": "2",
"children": [

]
}
]
},
"12888": {
"element_id": 12888,
"release_id": 53,
"series_id": "DDURRL1A225NBEA",
"parent_id": 12887,
"line": "4",
"type": "series",
"name": "Durable goods",
"level": "2",
"children": [

]
},
"12889": {
"element_id": 12889,
"release_id": 53,
"series_id": "DNDGRL1A225NBEA",
"parent_id": 12887,
"line": "5",
"type": "series",
"name": "Nondurable goods",
"level": "2",
"children": [

]
},
"12890": {
"element_id": 12890,
"release_id": 53,
"series_id": "DSERRL1A225NBEA",
"parent_id": 12886,
"line": "6",
"type": "series",
"name": "Services",
"level": "1",
"children": [

]
}
}
}

## Parameters

### api_key

Read API Keys for more information.

- 32 character alpha-numeric lowercase string, required

### release_id

The id for a release.

- integer, required

### file_type

A key or file extension that indicates the type of file to send.

- string, optional, default: xml

- One of the following values: 'xml', 'json'

xml = Extensible Markup Language. The HTTP Content-Type is text/xml.

json = JavaScript Object Notation. The HTTP Content-Type is application/json.

### element_id

The release table element id you would like to retrieve.

- integer, optional

- When the parameter is not passed, the root(top most) element for the release is given.

### include_observation_values

A flag to indicate that observations need to be returned. Observation value and date will only be returned for a series type element.

- One of the following strings: 'true', 'false'.

- optional, default: false

### observation_date

The observation date to be included with the returned release table.

- YYYY-MM-DD formatted string, optional, default: 9999-12-31 (latest available)

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
