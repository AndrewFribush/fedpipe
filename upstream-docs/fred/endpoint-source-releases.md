# endpoint source releases

Source: https://fred.stlouisfed.org/docs/api/fred/source_releases.html

---

St. Louis Fed Web Services: fred/source/releases

Skip to main content

Terms of Use

# fred/source/releases

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

- limit

- offset

- order_by

- sort_order

## Description

Get the releases for a source.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/source/releases?source_id=1&api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<releases realtime_start="2013-08-14" realtime_end="2013-08-14" order_by="release_id" sort_order="asc" count="26" offset="0" limit="1000">
<release id="13" realtime_start="2013-08-14" realtime_end="2013-08-14" name="G.17 Industrial Production and Capacity Utilization" press_release="true" link="http://www.federalreserve.gov/releases/g17/"/>
<release id="14" realtime_start="2013-08-14" realtime_end="2013-08-14" name="G.19 Consumer Credit" press_release="true" link="http://www.federalreserve.gov/releases/g19/"/>
<release id="15" realtime_start="2013-08-14" realtime_end="2013-08-14" name="G.5 Foreign Exchange Rates" press_release="true" link="http://www.federalreserve.gov/releases/g5/"/>
<release id="17" realtime_start="2013-08-14" realtime_end="2013-08-14" name="H.10 Foreign Exchange Rates" press_release="true" link="http://www.federalreserve.gov/releases/h10/"/>
<release id="18" realtime_start="2013-08-14" realtime_end="2013-08-14" name="H.15 Selected Interest Rates" press_release="true" link="http://www.federalreserve.gov/releases/h15/"/>
<release id="19" realtime_start="2013-08-14" realtime_end="2013-08-14" name="H.3 Aggregate Reserves of Depository Institutions and the Monetary Base" press_release="true" link="http://www.federalreserve.gov/releases/h3/"/>
<release id="20" realtime_start="2013-08-14" realtime_end="2013-08-14" name="H.4.1 Factors Affecting Reserve Balances" press_release="true" link="http://www.federalreserve.gov/releases/h41/"/>
<release id="21" realtime_start="2013-08-14" realtime_end="2013-08-14" name="H.6 Money Stock Measures" press_release="true" link="http://www.federalreserve.gov/releases/h6/"/>
<release id="22" realtime_start="2013-08-14" realtime_end="2013-08-14" name="H.8 Assets and Liabilities of Commercial Banks in the United States" press_release="true" link="http://www.federalreserve.gov/releases/h8/"/>
<release id="52" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Z.1 Flow of Funds Accounts of the United States" press_release="true" link="http://www.federalreserve.gov/releases/z1/"/>
<release id="86" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Commercial Paper Outstanding" press_release="true" link="http://www.federalreserve.gov/releases/cp/"/>
<release id="89" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Household Debt Service and Financial Obligations Ratios" press_release="true" link="http://federalreserve.gov/releases/housedebt/"/>
<release id="101" realtime_start="2013-08-14" realtime_end="2013-08-14" name="FOMC Press Release" press_release="true" link="http://www.federalreserve.gov/fomc/"/>
<release id="103" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Discount Rate Meeting Minutes" press_release="true" link="http://www.federalreserve.gov/monetarypolicy/discountrate.htm"/>
<release id="104" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Federal Reserve Bulletin" press_release="true" link="http://www.federalreserve.gov/pubs/bulletin/"/>
<release id="106" realtime_start="2013-08-14" realtime_end="2013-08-14" name="M2 Own Rate" press_release="false"/>
<release id="121" realtime_start="2013-08-14" realtime_end="2013-08-14" name="H.6 Historical Data" press_release="false" link="http://www.federalreserve.gov/releases/h6/hist/"/>
<release id="122" realtime_start="2013-08-14" realtime_end="2013-08-14" name="H.4.1 Factors Affecting Reserve Balances (data not included in press release)" press_release="false"/>
<release id="131" realtime_start="2013-08-14" realtime_end="2013-08-14" name="G.13 Selected Interest Rates" press_release="true" link="http://federalreserve.gov/releases/g13/" notes="With the issue dated January 8, 2002 (containing data for December 2001), the Federal Reserve ceased publication of the monthly G.13 statistical release. Monthly interest rates continue to be available on the H.15 release."/>
<release id="170" realtime_start="2013-08-14" realtime_end="2013-08-14" name="U.S. Foreign Exchange Intervention" press_release="false"/>
<release id="185" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Interest on Required Balances and Excess Balances" press_release="false" link="http://www.federalreserve.gov/monetarypolicy/reqresbalances.htm"/>
<release id="186" realtime_start="2013-08-14" realtime_end="2013-08-14" name="G.5A Foreign Exchange Rates" press_release="true" link="http://www.federalreserve.gov/releases/g5a/"/>
<release id="191" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Senior Loan Officer Opinion Survey on Bank Lending Practices" press_release="true" link="http://www.federalreserve.gov/boarddocs/SnLoanSurvey/" notes="For further information, please refer to the Board of Governors of the Federal Reserve System's Senior Loan Officer Opinion Survey on Bank Lending Practices release, online at http://www.federalreserve.gov/boarddocs/SnLoanSurvey/."/>
<release id="216" realtime_start="2013-08-14" realtime_end="2013-08-14" name="E.2 Survey of Terms of Business Lending" press_release="true" link="http://www.federalreserve.gov/releases/e2/" notes="These data are collected during the middle month of each quarter and are released in the middle of the succeeding month."/>
<release id="231" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Charge-Off and Delinquency Rates on Loans and Leases at Commercial Banks" press_release="true" link="http://www.federalreserve.gov/releases/chargeoff/default.htm"/>
<release id="245" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Summary Measures of the Foreign Exchange Value of the Dollar" press_release="true" link="http://www.federalreserve.gov/releases/h10/summary/default.htm"/>
</releases>

The release tag's link and notes attributes are optional.

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/source/releases?source_id=1&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"order_by": "release_id",
"sort_order": "asc",
"count": 26,
"offset": 0,
"limit": 1000,
"releases": [
{
"id": 13,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "G.17 Industrial Production and Capacity Utilization",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/g17/"
},
{
"id": 14,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "G.19 Consumer Credit",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/g19/"
},
{
"id": 15,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "G.5 Foreign Exchange Rates",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/g5/"
},
{
"id": 17,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "H.10 Foreign Exchange Rates",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/h10/"
},
{
"id": 18,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "H.15 Selected Interest Rates",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/h15/"
},
{
"id": 19,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "H.3 Aggregate Reserves of Depository Institutions and the Monetary Base",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/h3/"
},
{
"id": 20,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "H.4.1 Factors Affecting Reserve Balances",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/h41/"
},
{
"id": 21,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "H.6 Money Stock Measures",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/h6/"
},
{
"id": 22,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "H.8 Assets and Liabilities of Commercial Banks in the United States",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/h8/"
},
{
"id": 52,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Z.1 Flow of Funds Accounts of the United States",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/z1/"
},
{
"id": 86,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Commercial Paper Outstanding",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/cp/"
},
{
"id": 89,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Household Debt Service and Financial Obligations Ratios",
"press_release": true,
"link": "http://federalreserve.gov/releases/housedebt/"
},
{
"id": 101,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "FOMC Press Release",
"press_release": true,
"link": "http://www.federalreserve.gov/fomc/"
},
{
"id": 103,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Discount Rate Meeting Minutes",
"press_release": true,
"link": "http://www.federalreserve.gov/monetarypolicy/discountrate.htm"
},
{
"id": 104,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Federal Reserve Bulletin",
"press_release": true,
"link": "http://www.federalreserve.gov/pubs/bulletin/"
},
{
"id": 106,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "M2 Own Rate",
"press_release": false
},
{
"id": 121,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "H.6 Historical Data",
"press_release": false,
"link": "http://www.federalreserve.gov/releases/h6/hist/"
},
{
"id": 122,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "H.4.1 Factors Affecting Reserve Balances (data not included in press release)",
"press_release": false
},
{
"id": 131,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "G.13 Selected Interest Rates",
"press_release": true,
"link": "http://federalreserve.gov/releases/g13/",
"notes": "With the issue dated January 8, 2002 (containing data for December 2001), the Federal Reserve ceased publication of the monthly G.13 statistical release. Monthly interest rates continue to be available on the H.15 release."
},
{
"id": 170,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "U.S. Foreign Exchange Intervention",
"press_release": false
},
{
"id": 185,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Interest on Required Balances and Excess Balances",
"press_release": false,
"link": "http://www.federalreserve.gov/monetarypolicy/reqresbalances.htm"
},
{
"id": 186,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "G.5A Foreign Exchange Rates",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/g5a/"
},
{
"id": 191,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Senior Loan Officer Opinion Survey on Bank Lending Practices",
"press_release": true,
"link": "http://www.federalreserve.gov/boarddocs/SnLoanSurvey/",
"notes": "For further information, please refer to the Board of Governors of the Federal Reserve System's Senior Loan Officer Opinion Survey on Bank Lending Practices release, online at http://www.federalreserve.gov/boarddocs/SnLoanSurvey/."
},
{
"id": 216,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "E.2 Survey of Terms of Business Lending",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/e2/",
"notes": "These data are collected during the middle month of each quarter and are released in the middle of the succeeding month."
},
{
"id": 231,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Charge-Off and Delinquency Rates on Loans and Leases at Commercial Banks",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/chargeoff/default.htm"
},
{
"id": 245,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Summary Measures of the Foreign Exchange Value of the Dollar",
"press_release": true,
"link": "http://www.federalreserve.gov/releases/h10/summary/default.htm"
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
