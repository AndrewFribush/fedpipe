# endpoint releases

Source: https://fred.stlouisfed.org/docs/api/fred/releases.html

---

St. Louis Fed Web Services: fred/releases

Skip to main content

Terms of Use

# fred/releases

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

- order_by

- sort_order

## Description

Get all releases of economic data.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/releases?api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<releases realtime_start="2013-08-13" realtime_end="2013-08-13" order_by="release_id" sort_order="asc" count="158" offset="0" limit="1000">
<release id="9" realtime_start="2013-08-13" realtime_end="2013-08-13" name="Advance Monthly Sales for Retail and Food Services" press_release="true" link="http://www.census.gov/retail/"/>
<release id="10" realtime_start="2013-08-13" realtime_end="2013-08-13" name="Consumer Price Index" press_release="true" link="http://www.bls.gov/cpi/"/>
<release id="11" realtime_start="2013-08-13" realtime_end="2013-08-13" name="Employment Cost Index" press_release="true" link="http://www.bls.gov/ncs/ect/"/>
<release id="13" realtime_start="2013-08-13" realtime_end="2013-08-13" name="G.17 Industrial Production and Capacity Utilization" press_release="true" link="http://www.federalreserve.gov/releases/g17/"/>
<release id="14" realtime_start="2013-08-13" realtime_end="2013-08-13" name="G.19 Consumer Credit" press_release="true" link="http://www.federalreserve.gov/releases/g19/"/>
<release id="15" realtime_start="2013-08-13" realtime_end="2013-08-13" name="G.5 Foreign Exchange Rates" press_release="true" link="http://www.federalreserve.gov/releases/g5/"/>
<release id="17" realtime_start="2013-08-13" realtime_end="2013-08-13" name="H.10 Foreign Exchange Rates" press_release="true" link="http://www.federalreserve.gov/releases/h10/"/>
<release id="18" realtime_start="2013-08-13" realtime_end="2013-08-13" name="H.15 Selected Interest Rates" press_release="true" link="http://www.federalreserve.gov/releases/h15/"/>
<release id="19" realtime_start="2013-08-13" realtime_end="2013-08-13" name="H.3 Aggregate Reserves of Depository Institutions and the Monetary Base" press_release="true" link="http://www.federalreserve.gov/releases/h3/"/>
<release id="20" realtime_start="2013-08-13" realtime_end="2013-08-13" name="H.4.1 Factors Affecting Reserve Balances" press_release="true" link="http://www.federalreserve.gov/releases/h41/"/>
<release id="21" realtime_start="2013-08-13" realtime_end="2013-08-13" name="H.6 Money Stock Measures" press_release="true" link="http://www.federalreserve.gov/releases/h6/"/>
<release id="22" realtime_start="2013-08-13" realtime_end="2013-08-13" name="H.8 Assets and Liabilities of Commercial Banks in the United States" press_release="true" link="http://www.federalreserve.gov/releases/h8/"/>
<release id="25" realtime_start="2013-08-13" realtime_end="2013-08-13" name="Manufacturing and Trade Inventories and Sales" press_release="true" link="http://www.census.gov/mtis/www/mtis.html"/>
<release id="26" realtime_start="2013-08-13" realtime_end="2013-08-13" name="Manufacturing ISM Report on Business" press_release="true" link="http://www.ism.ws/ISMReport/"/>
<release id="27" realtime_start="2013-08-13" realtime_end="2013-08-13" name="New Residential Construction" press_release="true" link="http://www.census.gov/construction/nrc/"/>
<release id="46" realtime_start="2013-08-13" realtime_end="2013-08-13" name="Producer Price Index" press_release="true" link="http://www.bls.gov/ppi/"/>
<release id="47" realtime_start="2013-08-13" realtime_end="2013-08-13" name="Productivity and Costs" press_release="true" link="http://www.bls.gov/lpc/"/>
<release id="49" realtime_start="2013-08-13" realtime_end="2013-08-13" name="U.S. International Transactions" press_release="true" link="http://www.bea.gov/newsreleases/international/transactions/transnewsrelease.htm"/>
<release id="50" realtime_start="2013-08-13" realtime_end="2013-08-13" name="Employment Situation" press_release="true" link="http://www.bls.gov/ces/"/>
<release id="51" realtime_start="2013-08-13" realtime_end="2013-08-13" name="U.S. International Trade in Goods and Services" press_release="true" link="http://www.bea.gov/newsreleases/international/trade/tradnewsrelease.htm"/>
...
</releases>

The release tag's link and notes attributes are optional.

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/releases?api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"order_by": "release_id",
"sort_order": "asc",
"count": 158,
"offset": 0,
"limit": 1000,
"releases": [
{
"id": 9,
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"name": "Advance Monthly Sales for Retail and Food Services",
"press_release": true,
"link": "http://www.census.gov/retail/"
},
{
"id": 10,
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"name": "Consumer Price Index",
"press_release": true,
"link": "http://www.bls.gov/cpi/"
},
{
"id": 11,
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"name": "Employment Cost Index",
"press_release": true,
"link": "http://www.bls.gov/ncs/ect/"
},
{
"id": 13,
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"name": "G.17 Industrial Production and Capacity Utilization",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/g17/"
},
{
"id": 14,
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"name": "G.19 Consumer Credit",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/g19/"
},
{
"id": 15,
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"name": "G.5 Foreign Exchange Rates",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/g5/"
},
{
"id": 17,
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"name": "H.10 Foreign Exchange Rates",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/h10/"
},
{
"id": 18,
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"name": "H.15 Selected Interest Rates",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/h15/"
},
{
"id": 19,
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"name": "H.3 Aggregate Reserves of Depository Institutions and the Monetary Base",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/h3/"
},
{
"id": 20,
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"name": "H.4.1 Factors Affecting Reserve Balances",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/h41/"
},
{
"id": 21,
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"name": "H.6 Money Stock Measures",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/h6/"
},
{
"id": 22,
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"name": "H.8 Assets and Liabilities of Commercial Banks in the United States",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/h8/"
},
{
"id": 25,
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"name": "Manufacturing and Trade Inventories and Sales",
"press_release": true,
"link": "http://www.census.gov/mtis/www/mtis.html"
},
{
"id": 26,
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"name": "Manufacturing ISM Report on Business",
"press_release": true,
"link": "http://www.ism.ws/ISMReport/"
},
{
"id": 27,
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"name": "New Residential Construction",
"press_release": true,
"link": "http://www.census.gov/construction/nrc/"
},
{
"id": 46,
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"name": "Producer Price Index",
"press_release": true,
"link": "http://www.bls.gov/ppi/"
},
{
"id": 47,
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"name": "Productivity and Costs",
"press_release": true,
"link": "http://www.bls.gov/lpc/"
},
{
"id": 49,
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"name": "U.S. International Transactions",
"press_release": true,
"link": "http://www.bea.gov/newsreleases/international/transactions/transnewsrelease.htm"
},
{
"id": 50,
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"name": "Employment Situation",
"press_release": true,
"link": "http://www.bls.gov/ces/"
},
{
"id": 51,
"realtime_start": "2013-08-13",
"realtime_end": "2013-08-13",
"name": "U.S. International Trade in Goods and Services",
"press_release": true,
"link": "http://www.bea.gov/newsreleases/international/trade/tradnewsrelease.htm"
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

### order_by

Order results by values of the specified attribute.

- One of the following strings: 'release_id', 'name', 'press_release', 'realtime_start', 'realtime_end'.

- optional, default: release_id

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
