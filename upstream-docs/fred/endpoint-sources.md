# endpoint sources

Source: https://fred.stlouisfed.org/docs/api/fred/sources.html

---

St. Louis Fed Web Services: fred/sources

Skip to main content

Terms of Use

# fred/sources

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

Get all sources of economic data.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/sources?api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<sources realtime_start="2013-08-14" realtime_end="2013-08-14" order_by="source_id" sort_order="asc" count="58" offset="0" limit="1000">
<source id="1" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Board of Governors of the Federal Reserve System" link="http://www.federalreserve.gov/"/>
<source id="3" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Federal Reserve Bank of Philadelphia" link="http://www.philadelphiafed.org/"/>
<source id="4" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Federal Reserve Bank of St. Louis" link="http://www.stlouisfed.org/"/>
<source id="6" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Federal Financial Institutions Examination Council" link="http://www.ffiec.gov/"/>
<source id="11" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Dow Jones & Company" link="http://www.dowjones.com"/>
<source id="13" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Institute for Supply Management" link="http://www.ism.ws/"/>
<source id="14" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Thomson Reuters/University of Michigan" link="https://customers.reuters.com/community/university/default.aspx"/>
<source id="15" realtime_start="2013-08-14" realtime_end="2013-08-14" name="The White House: Council of Economic Advisors" link="http://www.whitehouse.gov/cea/"/>
<source id="16" realtime_start="2013-08-14" realtime_end="2013-08-14" name="The White House: Office of Management and Budget" link="http://www.whitehouse.gov/omb/"/>
<source id="17" realtime_start="2013-08-14" realtime_end="2013-08-14" name="U.S. Congress: Congressional Budget Office" link="http://www.cbo.gov/"/>
<source id="18" realtime_start="2013-08-14" realtime_end="2013-08-14" name="U.S. Department of Commerce: Bureau of Economic Analysis" link="http://www.bea.gov/"/>
<source id="19" realtime_start="2013-08-14" realtime_end="2013-08-14" name="U.S. Department of Commerce: Census Bureau" link="http://www.census.gov/"/>
<source id="21" realtime_start="2013-08-14" realtime_end="2013-08-14" name="U.S. Department of Housing and Urban Development" link="http://www.hud.gov/"/>
<source id="22" realtime_start="2013-08-14" realtime_end="2013-08-14" name="U.S. Department of Labor: Bureau of Labor Statistics" link="http://www.bls.gov/"/>
<source id="23" realtime_start="2013-08-14" realtime_end="2013-08-14" name="U.S. Department of the Treasury: Financial Management Service" link="http://www.fms.treas.gov/"/>
<source id="26" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Haver Analytics" link="http://www.haver.com/"/>
<source id="31" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Reserve Bank of Australia" link="http://www.rba.gov.au/"/>
<source id="32" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Deutsche Bundesbank" link="http://www.bundesbank.de/index.en.php"/>
<source id="33" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Banca d'Italia" link="http://www.bancaditalia.it/;internal&action=_setlanguage.action?LANGUAGE=en"/>
<source id="34" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Swiss National Bank" link="http://www.snb.ch/"/>
<source id="35" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Central Bank of the Republic of Turkey" link="http://www.tcmb.gov.tr/yeni/eng/"/>
<source id="36" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Federal Housing Finance Agency" link="http://www.fhfa.gov/"/>
<source id="37" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Bank of Japan"/>
<source id="38" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Banco de Mexico" link="http://www.banxico.org.mx/"/>
<source id="41" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Freddie Mac" link="http://www.freddiemac.com/index.html"/>
<source id="42" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Automatic Data Processing, Inc." link="http://www.adp.com/"/>
<source id="44" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Wilshire Associates Incorporated" link="http://www.wilshire.com/"/>
<source id="46" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Federal Reserve Bank of Kansas City" link="http://www.kansascityfed.org/"/>
<source id="47" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Chicago Board Options Exchange" link="http://www.cboe.com/"/>
<source id="48" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Organisation for Economic Co-operation and Development" link="http://www.oecd.org/"/>
<source id="50" realtime_start="2013-08-14" realtime_end="2013-08-14" name="U.S. Department of Labor: Employment and Training Administration" link="http://www.doleta.gov"/>
<source id="52" realtime_start="2013-08-14" realtime_end="2013-08-14" name="BofA Merrill Lynch" link="http://www.ml.com"/>
<source id="53" realtime_start="2013-08-14" realtime_end="2013-08-14" name="U.S. Department of Energy: Energy Information Administration" link="http://www.eia.gov/"/>
<source id="54" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Federal Reserve Bank of Chicago" link="http://www.chicagofed.org"/>
<source id="55" realtime_start="2013-08-14" realtime_end="2013-08-14" name="National Bureau of Economic Research" link="http://www.nber.org/"/>
<source id="57" realtime_start="2013-08-14" realtime_end="2013-08-14" name="World Bank" link="http://www.worldbank.org/"/>
<source id="59" realtime_start="2013-08-14" realtime_end="2013-08-14" name="National Association of Realtors" link="http://www.realtor.org"/>
<source id="60" realtime_start="2013-08-14" realtime_end="2013-08-14" name="International Monetary Fund" link="http://www.imf.org/external/index.htm" notes="The International Monetary Fund (IMF) is an organization of 187 countries, working to foster global monetary cooperation, secure financial stability, facilitate international trade, promote high employment and sustainable economic growth, and reduce poverty around the world."/>
<source id="61" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Eurostat" link="http://epp.eurostat.ec.europa.eu/portal/page/portal/eurostat/home/"/>
<source id="62" realtime_start="2013-08-14" realtime_end="2013-08-14" name="British Bankers' Association" link="http://www.bbalibor.com"/>
<source id="63" realtime_start="2013-08-14" realtime_end="2013-08-14" name="U.S. Department of Transportation: Federal Highway Administration" link="http://www.fhwa.dot.gov/"/>
<source id="64" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Bankrate, Inc." link="http://www.bankrate.com/"/>
<source id="65" realtime_start="2013-08-14" realtime_end="2013-08-14" name="London Bullion Market Association" link="http://www.lbma.org.uk/pages/index.cfm?page_id=1"/>
<source id="66" realtime_start="2013-08-14" realtime_end="2013-08-14" name="University of Pennsylvania" link="http://www.upenn.edu/"/>
<source id="67" realtime_start="2013-08-14" realtime_end="2013-08-14" name="CredAbility Nonprofit Credit Counseling & Education" link="http://www.credability.org/en/homepage.aspx"/>
<source id="68" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Marcelle Chauvet and Jeremy Piger" link="http://pages.uoregon.edu/jpiger/us_recession_probs.htm"/>
<source id="69" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Federal Deposit Insurance Corporation" link="http://www.fdic.gov/"/>
<source id="70" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Gerald P. Dwyer, Jr., R.W. Hafer, and Warren E. Weber"/>
<source id="74" realtime_start="2013-08-14" realtime_end="2013-08-14" name="U.K. Office for National Statistics" link="http://www.ons.gov.uk/ons/index.html"/>
<source id="75" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Cabinet Office of Japan" link="http://www.cao.go.jp/index-e.html"/>
<source id="76" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Bank of England" link="http://www.bankofengland.co.uk/Pages/home.aspx"/>
<source id="77" realtime_start="2013-08-14" realtime_end="2013-08-14" name="European Central Bank"/>
<source id="78" realtime_start="2013-08-14" realtime_end="2013-08-14" name="University of Louisville: Logistics and Distribution Institute" link="http://louisville.edu/lodi"/>
<source id="80" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Scott Baker, Nicholas Bloom and Steven J. Davis" link="http://www.policyuncertainty.com/"/>
<source id="81" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Cass Information Systems, Inc." link="http://www.cassinfo.com/"/>
<source id="82" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Richard Anderson and Barry Jones" link="http://research.stlouisfed.org/msi/index.html"/>
<source id="85" realtime_start="2013-08-14" realtime_end="2013-08-14" name="S&P Dow Jones Indices LLC" link="http://www.djindexes.com/"/>
<source id="86" realtime_start="2013-08-14" realtime_end="2013-08-14" name="Nikkei Inc." link="http://nikkei.com"/>
</sources>

The source tag's link and notes attributes are optional.

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/sources?api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"order_by": "source_id",
"sort_order": "asc",
"count": 58,
"offset": 0,
"limit": 1000,
"sources": [
{
"id": 1,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Board of Governors of the Federal Reserve System",
"link": "http://www.federalreserve.gov/"
},
{
"id": 3,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Federal Reserve Bank of Philadelphia",
"link": "http://www.philadelphiafed.org/"
},
{
"id": 4,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Federal Reserve Bank of St. Louis",
"link": "http://www.stlouisfed.org/"
},
{
"id": 6,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Federal Financial Institutions Examination Council",
"link": "http://www.ffiec.gov/"
},
{
"id": 11,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Dow Jones & Company",
"link": "http://www.dowjones.com"
},
{
"id": 13,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Institute for Supply Management",
"link": "http://www.ism.ws/"
},
{
"id": 14,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Thomson Reuters/University of Michigan",
"link": "https://customers.reuters.com/community/university/default.aspx"
},
{
"id": 15,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "The White House: Council of Economic Advisors",
"link": "http://www.whitehouse.gov/cea/"
},
{
"id": 16,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "The White House: Office of Management and Budget",
"link": "http://www.whitehouse.gov/omb/"
},
{
"id": 17,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "U.S. Congress: Congressional Budget Office",
"link": "http://www.cbo.gov/"
},
{
"id": 18,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "U.S. Department of Commerce: Bureau of Economic Analysis",
"link": "http://www.bea.gov/"
},
{
"id": 19,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "U.S. Department of Commerce: Census Bureau",
"link": "http://www.census.gov/"
},
{
"id": 21,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "U.S. Department of Housing and Urban Development",
"link": "http://www.hud.gov/"
},
{
"id": 22,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "U.S. Department of Labor: Bureau of Labor Statistics",
"link": "http://www.bls.gov/"
},
{
"id": 23,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "U.S. Department of the Treasury: Financial Management Service",
"link": "http://www.fms.treas.gov/"
},
{
"id": 26,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Haver Analytics",
"link": "http://www.haver.com/"
},
{
"id": 31,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Reserve Bank of Australia",
"link": "http://www.rba.gov.au/"
},
{
"id": 32,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Deutsche Bundesbank",
"link": "http://www.bundesbank.de/index.en.php"
},
{
"id": 33,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Banca d'Italia",
"link": "http://www.bancaditalia.it/;internal&action=_setlanguage.action?LANGUAGE=en"
},
{
"id": 34,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Swiss National Bank",
"link": "http://www.snb.ch/"
},
{
"id": 35,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Central Bank of the Republic of Turkey",
"link": "http://www.tcmb.gov.tr/yeni/eng/"
},
{
"id": 36,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Federal Housing Finance Agency",
"link": "http://www.fhfa.gov/"
},
{
"id": 37,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Bank of Japan"
},
{
"id": 38,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Banco de Mexico",
"link": "http://www.banxico.org.mx/"
},
{
"id": 41,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Freddie Mac",
"link": "http://www.freddiemac.com/index.html"
},
{
"id": 42,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Automatic Data Processing, Inc.",
"link": "http://www.adp.com/"
},
{
"id": 44,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Wilshire Associates Incorporated",
"link": "http://www.wilshire.com/"
},
{
"id": 46,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Federal Reserve Bank of Kansas City",
"link": "http://www.kansascityfed.org/"
},
{
"id": 47,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Chicago Board Options Exchange",
"link": "http://www.cboe.com/"
},
{
"id": 48,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Organisation for Economic Co-operation and Development",
"link": "http://www.oecd.org/"
},
{
"id": 50,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "U.S. Department of Labor: Employment and Training Administration",
"link": "http://www.doleta.gov"
},
{
"id": 52,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "BofA Merrill Lynch",
"link": "http://www.ml.com"
},
{
"id": 53,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "U.S. Department of Energy: Energy Information Administration",
"link": "http://www.eia.gov/"
},
{
"id": 54,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Federal Reserve Bank of Chicago",
"link": "http://www.chicagofed.org"
},
{
"id": 55,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "National Bureau of Economic Research",
"link": "http://www.nber.org/"
},
{
"id": 57,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "World Bank",
"link": "http://www.worldbank.org/"
},
{
"id": 59,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "National Association of Realtors",
"link": "http://www.realtor.org"
},
{
"id": 60,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "International Monetary Fund",
"link": "http://www.imf.org/external/index.htm",
"notes": "The International Monetary Fund (IMF) is an organization of 187 countries, working to foster global monetary cooperation, secure financial stability, facilitate international trade, promote high employment and sustainable economic growth, and reduce poverty around the world."
},
{
"id": 61,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Eurostat",
"link": "http://epp.eurostat.ec.europa.eu/portal/page/portal/eurostat/home/"
},
{
"id": 62,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "British Bankers' Association",
"link": "http://www.bbalibor.com"
},
{
"id": 63,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "U.S. Department of Transportation: Federal Highway Administration",
"link": "http://www.fhwa.dot.gov/"
},
{
"id": 64,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Bankrate, Inc.",
"link": "http://www.bankrate.com/"
},
{
"id": 65,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "London Bullion Market Association",
"link": "http://www.lbma.org.uk/pages/index.cfm?page_id=1"
},
{
"id": 66,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "University of Pennsylvania",
"link": "http://www.upenn.edu/"
},
{
"id": 67,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "CredAbility Nonprofit Credit Counseling & Education",
"link": "http://www.credability.org/en/homepage.aspx"
},
{
"id": 68,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Marcelle Chauvet and Jeremy Piger",
"link": "http://pages.uoregon.edu/jpiger/us_recession_probs.htm"
},
{
"id": 69,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Federal Deposit Insurance Corporation",
"link": "http://www.fdic.gov/"
},
{
"id": 70,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Gerald P. Dwyer, Jr., R.W. Hafer, and Warren E. Weber"
},
{
"id": 74,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "U.K. Office for National Statistics",
"link": "http://www.ons.gov.uk/ons/index.html"
},
{
"id": 75,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Cabinet Office of Japan",
"link": "http://www.cao.go.jp/index-e.html"
},
{
"id": 76,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Bank of England",
"link": "http://www.bankofengland.co.uk/Pages/home.aspx"
},
{
"id": 77,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "European Central Bank"
},
{
"id": 78,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "University of Louisville: Logistics and Distribution Institute",
"link": "http://louisville.edu/lodi"
},
{
"id": 80,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Scott Baker, Nicholas Bloom and Steven J. Davis",
"link": "http://www.policyuncertainty.com/"
},
{
"id": 81,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Cass Information Systems, Inc.",
"link": "http://www.cassinfo.com/"
},
{
"id": 82,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Richard Anderson and Barry Jones",
"link": "http://research.stlouisfed.org/msi/index.html"
},
{
"id": 85,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "S&P Dow Jones Indices LLC",
"link": "http://www.djindexes.com/"
},
{
"id": 86,
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"name": "Nikkei Inc.",
"link": "http://nikkei.com"
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

- One of the following strings: 'source_id', 'name', 'realtime_start', 'realtime_end'.

- optional, default: source_id

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
