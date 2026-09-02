# endpoint tags series

Source: https://fred.stlouisfed.org/docs/api/fred/tags_series.html

---

St. Louis Fed Web Services: fred/tags/series

Skip to main content

Terms of Use

# fred/tags/series

- Description

- Examples

- XML

- JSON

Parameters

- api_key

- file_type

- tag_names

- exclude_tag_names

- realtime_start

- realtime_end

- limit

- offset

- order_by

- sort_order

## Description

Get the series matching all tags in the tag_names parameter and no tags in the exclude_tag_names parameter.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/tags/series?tag_names=slovenia;food;oecd&api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

This XML file does not appear to have any style information associated with it. The document tree is shown below.
<seriess realtime_start="2017-08-01" realtime_end="2017-08-01" order_by="series_id" sort_order="asc" count="18" offset="0" limit="1000">
<series id="CPGDFD02SIA657N" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Consumer Price Index: Total Food Excluding Restaurants for Slovenia©" observation_start="1996-01-01" observation_end="2016-01-01" frequency="Annual" frequency_short="A" units="Growth Rate Previous Period" units_short="Growth Rate Previous Period" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-04-20 00:48:35-05" popularity="0" group_popularity="0" notes="OECD descriptor ID: CPGDFD02 OECD unit ID: GP OECD country ID: SVN All OECD data should be cited as follows: OECD, "Main Economic Indicators - complete database", Main Economic Indicators (database),http://dx.doi.org/10.1787/data-00052-en (Accessed on date) Copyright, 2016, OECD. Reprinted with permission."/>
<series id="CPGDFD02SIA659N" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Consumer Price Index: Total Food Excluding Restaurants for Slovenia©" observation_start="1996-01-01" observation_end="2016-01-01" frequency="Annual" frequency_short="A" units="Growth Rate Same Period Previous Year" units_short="Growth Rate Same Period Previous Yr." seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-04-20 00:48:35-05" popularity="0" group_popularity="0" notes="OECD descriptor ID: CPGDFD02 OECD unit ID: GY OECD country ID: SVN All OECD data should be cited as follows: OECD, "Main Economic Indicators - complete database", Main Economic Indicators (database),http://dx.doi.org/10.1787/data-00052-en (Accessed on date) Copyright, 2016, OECD. Reprinted with permission."/>
<series id="CPGDFD02SIM657N" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Consumer Price Index: Total Food Excluding Restaurants for Slovenia©" observation_start="1996-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Growth Rate Previous Period" units_short="Growth Rate Previous Period" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-20 13:15:50-05" popularity="0" group_popularity="0" notes="OECD descriptor ID: CPGDFD02 OECD unit ID: GP OECD country ID: SVN All OECD data should be cited as follows: OECD, "Main Economic Indicators - complete database", Main Economic Indicators (database),http://dx.doi.org/10.1787/data-00052-en (Accessed on date) Copyright, 2016, OECD. Reprinted with permission."/>
<series id="CPGDFD02SIM659N" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Consumer Price Index: Total Food Excluding Restaurants for Slovenia©" observation_start="1996-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Growth Rate Same Period Previous Year" units_short="Growth Rate Same Period Previous Yr." seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-20 13:15:50-05" popularity="0" group_popularity="0" notes="OECD descriptor ID: CPGDFD02 OECD unit ID: GY OECD country ID: SVN All OECD data should be cited as follows: OECD, "Main Economic Indicators - complete database", Main Economic Indicators (database),http://dx.doi.org/10.1787/data-00052-en (Accessed on date) Copyright, 2016, OECD. Reprinted with permission."/>
<series id="CPGDFD02SIQ657N" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Consumer Price Index: Total Food Excluding Restaurants for Slovenia©" observation_start="1996-01-01" observation_end="2017-01-01" frequency="Quarterly" frequency_short="Q" units="Growth Rate Previous Period" units_short="Growth Rate Previous Period" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-05-25 11:09:30-05" popularity="0" group_popularity="0" notes="OECD descriptor ID: CPGDFD02 OECD unit ID: GP OECD country ID: SVN All OECD data should be cited as follows: OECD, "Main Economic Indicators - complete database", Main Economic Indicators (database),http://dx.doi.org/10.1787/data-00052-en (Accessed on date) Copyright, 2016, OECD. Reprinted with permission."/>
<series id="CPGDFD02SIQ659N" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Consumer Price Index: Total Food Excluding Restaurants for Slovenia©" observation_start="1996-01-01" observation_end="2017-01-01" frequency="Quarterly" frequency_short="Q" units="Growth Rate Same Period Previous Year" units_short="Growth Rate Same Period Previous Yr." seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-05-25 11:09:30-05" popularity="0" group_popularity="0" notes="OECD descriptor ID: CPGDFD02 OECD unit ID: GY OECD country ID: SVN All OECD data should be cited as follows: OECD, "Main Economic Indicators - complete database", Main Economic Indicators (database),http://dx.doi.org/10.1787/data-00052-en (Accessed on date) Copyright, 2016, OECD. Reprinted with permission."/>
<series id="PIEAFD01SIA661N" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Producer Prices Index: Economic Activities: Total Manufacture of Food Products for Slovenia©" observation_start="1998-01-01" observation_end="2016-01-01" frequency="Annual" frequency_short="A" units="Index 2010=1" units_short="Index 2010=1.00" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-04-18 00:02:44-05" popularity="0" group_popularity="0" notes="OECD descriptor ID: PIEAFD01 OECD unit ID: IXOB OECD country ID: SVN All OECD data should be cited as follows: OECD, "Main Economic Indicators - complete database", Main Economic Indicators (database),http://dx.doi.org/10.1787/data-00052-en (Accessed on date) Copyright, 2016, OECD. Reprinted with permission."/>
<series id="PIEAFD01SIM661N" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Producer Prices Index: Economic Activities: Total Manufacture of Food Products for Slovenia©" observation_start="1998-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Index 2010=1" units_short="Index 2010=1.00" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-20 11:18:15-05" popularity="0" group_popularity="0" notes="OECD descriptor ID: PIEAFD01 OECD unit ID: IXOB OECD country ID: SVN All OECD data should be cited as follows: OECD, "Main Economic Indicators - complete database", Main Economic Indicators (database),http://dx.doi.org/10.1787/data-00052-en (Accessed on date) Copyright, 2016, OECD. Reprinted with permission."/>
<series id="PIEAFD01SIQ661N" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Producer Prices Index: Economic Activities: Total Manufacture of Food Products for Slovenia©" observation_start="1998-01-01" observation_end="2017-01-01" frequency="Quarterly" frequency_short="Q" units="Index 2010=1" units_short="Index 2010=1.00" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-05-25 11:00:50-05" popularity="0" group_popularity="0" notes="OECD descriptor ID: PIEAFD01 OECD unit ID: IXOB OECD country ID: SVN All OECD data should be cited as follows: OECD, "Main Economic Indicators - complete database", Main Economic Indicators (database),http://dx.doi.org/10.1787/data-00052-en (Accessed on date) Copyright, 2016, OECD. Reprinted with permission."/>
<series id="PIEAFD02SIA661N" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Producer Prices Index: Economic Activities: Domestic Manufacture of Food Products for Slovenia©" observation_start="1998-01-01" observation_end="2016-01-01" frequency="Annual" frequency_short="A" units="Index 2010=1" units_short="Index 2010=1.00" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-04-17 23:58:55-05" popularity="0" group_popularity="0" notes="OECD descriptor ID: PIEAFD02 OECD unit ID: IXOB OECD country ID: SVN All OECD data should be cited as follows: OECD, "Main Economic Indicators - complete database", Main Economic Indicators (database),http://dx.doi.org/10.1787/data-00052-en (Accessed on date) Copyright, 2016, OECD. Reprinted with permission."/>
<series id="PIEAFD02SIM661N" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Producer Prices Index: Economic Activities: Domestic Manufacture of Food Products for Slovenia©" observation_start="1998-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Index 2010=1" units_short="Index 2010=1.00" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-20 13:19:27-05" popularity="0" group_popularity="0" notes="OECD descriptor ID: PIEAFD02 OECD unit ID: IXOB OECD country ID: SVN All OECD data should be cited as follows: OECD, "Main Economic Indicators - complete database", Main Economic Indicators (database),http://dx.doi.org/10.1787/data-00052-en (Accessed on date) Copyright, 2016, OECD. Reprinted with permission."/>
<series id="PIEAFD02SIQ661N" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Producer Prices Index: Economic Activities: Domestic Manufacture of Food Products for Slovenia©" observation_start="1998-01-01" observation_end="2017-01-01" frequency="Quarterly" frequency_short="Q" units="Index 2010=1" units_short="Index 2010=1.00" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-05-25 11:00:49-05" popularity="0" group_popularity="0" notes="OECD descriptor ID: PIEAFD02 OECD unit ID: IXOB OECD country ID: SVN All OECD data should be cited as follows: OECD, "Main Economic Indicators - complete database", Main Economic Indicators (database),http://dx.doi.org/10.1787/data-00052-en (Accessed on date) Copyright, 2016, OECD. Reprinted with permission."/>
<series id="SVNCPICORAINMEI" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Consumer Price Index: All Items Excluding Food and Energy for Slovenia©" observation_start="2000-01-01" observation_end="2016-01-01" frequency="Annual" frequency_short="A" units="Index 2010=100" units_short="Index 2010=100" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-04-19 23:33:20-05" popularity="0" group_popularity="0" notes="Copyright, 2016, OECD. Reprinted with permission. All OECD data should be cited as follows: OECD (2010), "Main Economic Indicators - complete database", Main Economic Indicators (database),http://dx.doi.org/10.1787/data-00052-en (Accessed on date)"/>
<series id="SVNCPICORMINMEI" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Consumer Price Index: All Items Excluding Food and Energy for Slovenia©" observation_start="2000-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Index 2010=100" units_short="Index 2010=100" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-20 13:17:34-05" popularity="0" group_popularity="0" notes="Copyright, 2016, OECD. Reprinted with permission. All OECD data should be cited as follows: OECD (2010), "Main Economic Indicators - complete database", Main Economic Indicators (database),http://dx.doi.org/10.1787/data-00052-en (Accessed on date)"/>
<series id="SVNCPICORQINMEI" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Consumer Price Index: All Items Excluding Food and Energy for Slovenia©" observation_start="2000-01-01" observation_end="2017-01-01" frequency="Quarterly" frequency_short="Q" units="Index 2010=100" units_short="Index 2010=100" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-05-25 10:59:44-05" popularity="0" group_popularity="0" notes="Copyright, 2016, OECD. Reprinted with permission. All OECD data should be cited as follows: OECD (2010), "Main Economic Indicators - complete database", Main Economic Indicators (database),http://dx.doi.org/10.1787/data-00052-en (Accessed on date)"/>
<series id="SVNCPIFODAINMEI" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Consumer Price Index: Food for Slovenia©" observation_start="1996-01-01" observation_end="2016-01-01" frequency="Annual" frequency_short="A" units="Index 2010=100" units_short="Index 2010=100" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-04-19 23:33:20-05" popularity="0" group_popularity="0" notes="Copyright, 2016, OECD. Reprinted with permission. All OECD data should be cited as follows: OECD (2010), "Main Economic Indicators - complete database", Main Economic Indicators (database),http://dx.doi.org/10.1787/data-00052-en (Accessed on date)"/>
<series id="SVNCPIFODMINMEI" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Consumer Price Index: Food for Slovenia©" observation_start="1996-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Index 2010=100" units_short="Index 2010=100" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-20 13:17:34-05" popularity="0" group_popularity="0" notes="Copyright, 2016, OECD. Reprinted with permission. All OECD data should be cited as follows: OECD (2010), "Main Economic Indicators - complete database", Main Economic Indicators (database),http://dx.doi.org/10.1787/data-00052-en (Accessed on date)"/>
<series id="SVNCPIFODQINMEI" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Consumer Price Index: Food for Slovenia©" observation_start="1996-01-01" observation_end="2017-01-01" frequency="Quarterly" frequency_short="Q" units="Index 2010=100" units_short="Index 2010=100" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-05-25 10:59:44-05" popularity="0" group_popularity="0" notes="Copyright, 2016, OECD. Reprinted with permission. All OECD data should be cited as follows: OECD (2010), "Main Economic Indicators - complete database", Main Economic Indicators (database),http://dx.doi.org/10.1787/data-00052-en (Accessed on date)"/>
</seriess>

The series tag's notes attribute is optional.

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/tags/series?tag_names=slovenia;food;oecd&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"order_by": "series_id",
"sort_order": "asc",
"count": 18,
"offset": 0,
"limit": 1000,
"seriess": [
{
"id": "CPGDFD02SIA657N",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Consumer Price Index: Total Food Excluding Restaurants for Slovenia\u00a9",
"observation_start": "1996-01-01",
"observation_end": "2016-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Growth Rate Previous Period",
"units_short": "Growth Rate Previous Period",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-04-20 00:48:35-05",
"popularity": 0,
"group_popularity": 0,
"notes": "OECD descriptor ID: CPGDFD02\nOECD unit ID: GP\nOECD country ID: SVN\n\nAll OECD data should be cited as follows: OECD, \"Main Economic Indicators - complete database\", Main Economic Indicators (database),http:\/\/dx.doi.org\/10.1787\/data-00052-en (Accessed on date)\nCopyright, 2016, OECD. Reprinted with permission."
},
{
"id": "CPGDFD02SIA659N",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Consumer Price Index: Total Food Excluding Restaurants for Slovenia\u00a9",
"observation_start": "1996-01-01",
"observation_end": "2016-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Growth Rate Same Period Previous Year",
"units_short": "Growth Rate Same Period Previous Yr.",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-04-20 00:48:35-05",
"popularity": 0,
"group_popularity": 0,
"notes": "OECD descriptor ID: CPGDFD02\nOECD unit ID: GY\nOECD country ID: SVN\n\nAll OECD data should be cited as follows: OECD, \"Main Economic Indicators - complete database\", Main Economic Indicators (database),http:\/\/dx.doi.org\/10.1787\/data-00052-en (Accessed on date)\nCopyright, 2016, OECD. Reprinted with permission."
},
{
"id": "CPGDFD02SIM657N",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Consumer Price Index: Total Food Excluding Restaurants for Slovenia\u00a9",
"observation_start": "1996-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Growth Rate Previous Period",
"units_short": "Growth Rate Previous Period",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-20 13:15:50-05",
"popularity": 0,
"group_popularity": 0,
"notes": "OECD descriptor ID: CPGDFD02\nOECD unit ID: GP\nOECD country ID: SVN\n\nAll OECD data should be cited as follows: OECD, \"Main Economic Indicators - complete database\", Main Economic Indicators (database),http:\/\/dx.doi.org\/10.1787\/data-00052-en (Accessed on date)\nCopyright, 2016, OECD. Reprinted with permission."
},
{
"id": "CPGDFD02SIM659N",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Consumer Price Index: Total Food Excluding Restaurants for Slovenia\u00a9",
"observation_start": "1996-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Growth Rate Same Period Previous Year",
"units_short": "Growth Rate Same Period Previous Yr.",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-20 13:15:50-05",
"popularity": 0,
"group_popularity": 0,
"notes": "OECD descriptor ID: CPGDFD02\nOECD unit ID: GY\nOECD country ID: SVN\n\nAll OECD data should be cited as follows: OECD, \"Main Economic Indicators - complete database\", Main Economic Indicators (database),http:\/\/dx.doi.org\/10.1787\/data-00052-en (Accessed on date)\nCopyright, 2016, OECD. Reprinted with permission."
},
{
"id": "CPGDFD02SIQ657N",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Consumer Price Index: Total Food Excluding Restaurants for Slovenia\u00a9",
"observation_start": "1996-01-01",
"observation_end": "2017-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Growth Rate Previous Period",
"units_short": "Growth Rate Previous Period",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-05-25 11:09:30-05",
"popularity": 0,
"group_popularity": 0,
"notes": "OECD descriptor ID: CPGDFD02\nOECD unit ID: GP\nOECD country ID: SVN\n\nAll OECD data should be cited as follows: OECD, \"Main Economic Indicators - complete database\", Main Economic Indicators (database),http:\/\/dx.doi.org\/10.1787\/data-00052-en (Accessed on date)\nCopyright, 2016, OECD. Reprinted with permission."
},
{
"id": "CPGDFD02SIQ659N",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Consumer Price Index: Total Food Excluding Restaurants for Slovenia\u00a9",
"observation_start": "1996-01-01",
"observation_end": "2017-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Growth Rate Same Period Previous Year",
"units_short": "Growth Rate Same Period Previous Yr.",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-05-25 11:09:30-05",
"popularity": 0,
"group_popularity": 0,
"notes": "OECD descriptor ID: CPGDFD02\nOECD unit ID: GY\nOECD country ID: SVN\n\nAll OECD data should be cited as follows: OECD, \"Main Economic Indicators - complete database\", Main Economic Indicators (database),http:\/\/dx.doi.org\/10.1787\/data-00052-en (Accessed on date)\nCopyright, 2016, OECD. Reprinted with permission."
},
{
"id": "PIEAFD01SIA661N",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Producer Prices Index: Economic Activities: Total Manufacture of Food Products for Slovenia\u00a9",
"observation_start": "1998-01-01",
"observation_end": "2016-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Index 2010=1",
"units_short": "Index 2010=1.00",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-04-18 00:02:44-05",
"popularity": 0,
"group_popularity": 0,
"notes": "OECD descriptor ID: PIEAFD01\nOECD unit ID: IXOB\nOECD country ID: SVN\n\nAll OECD data should be cited as follows: OECD, \"Main Economic Indicators - complete database\", Main Economic Indicators (database),http:\/\/dx.doi.org\/10.1787\/data-00052-en (Accessed on date)\nCopyright, 2016, OECD. Reprinted with permission."
},
{
"id": "PIEAFD01SIM661N",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Producer Prices Index: Economic Activities: Total Manufacture of Food Products for Slovenia\u00a9",
"observation_start": "1998-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 2010=1",
"units_short": "Index 2010=1.00",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-20 11:18:15-05",
"popularity": 0,
"group_popularity": 0,
"notes": "OECD descriptor ID: PIEAFD01\nOECD unit ID: IXOB\nOECD country ID: SVN\n\nAll OECD data should be cited as follows: OECD, \"Main Economic Indicators - complete database\", Main Economic Indicators (database),http:\/\/dx.doi.org\/10.1787\/data-00052-en (Accessed on date)\nCopyright, 2016, OECD. Reprinted with permission."
},
{
"id": "PIEAFD01SIQ661N",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Producer Prices Index: Economic Activities: Total Manufacture of Food Products for Slovenia\u00a9",
"observation_start": "1998-01-01",
"observation_end": "2017-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Index 2010=1",
"units_short": "Index 2010=1.00",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-05-25 11:00:50-05",
"popularity": 0,
"group_popularity": 0,
"notes": "OECD descriptor ID: PIEAFD01\nOECD unit ID: IXOB\nOECD country ID: SVN\n\nAll OECD data should be cited as follows: OECD, \"Main Economic Indicators - complete database\", Main Economic Indicators (database),http:\/\/dx.doi.org\/10.1787\/data-00052-en (Accessed on date)\nCopyright, 2016, OECD. Reprinted with permission."
},
{
"id": "PIEAFD02SIA661N",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Producer Prices Index: Economic Activities: Domestic Manufacture of Food Products for Slovenia\u00a9",
"observation_start": "1998-01-01",
"observation_end": "2016-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Index 2010=1",
"units_short": "Index 2010=1.00",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-04-17 23:58:55-05",
"popularity": 0,
"group_popularity": 0,
"notes": "OECD descriptor ID: PIEAFD02\nOECD unit ID: IXOB\nOECD country ID: SVN\n\nAll OECD data should be cited as follows: OECD, \"Main Economic Indicators - complete database\", Main Economic Indicators (database),http:\/\/dx.doi.org\/10.1787\/data-00052-en (Accessed on date)\nCopyright, 2016, OECD. Reprinted with permission."
},
{
"id": "PIEAFD02SIM661N",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Producer Prices Index: Economic Activities: Domestic Manufacture of Food Products for Slovenia\u00a9",
"observation_start": "1998-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 2010=1",
"units_short": "Index 2010=1.00",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-20 13:19:27-05",
"popularity": 0,
"group_popularity": 0,
"notes": "OECD descriptor ID: PIEAFD02\nOECD unit ID: IXOB\nOECD country ID: SVN\n\nAll OECD data should be cited as follows: OECD, \"Main Economic Indicators - complete database\", Main Economic Indicators (database),http:\/\/dx.doi.org\/10.1787\/data-00052-en (Accessed on date)\nCopyright, 2016, OECD. Reprinted with permission."
},
{
"id": "PIEAFD02SIQ661N",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Producer Prices Index: Economic Activities: Domestic Manufacture of Food Products for Slovenia\u00a9",
"observation_start": "1998-01-01",
"observation_end": "2017-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Index 2010=1",
"units_short": "Index 2010=1.00",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-05-25 11:00:49-05",
"popularity": 0,
"group_popularity": 0,
"notes": "OECD descriptor ID: PIEAFD02\nOECD unit ID: IXOB\nOECD country ID: SVN\n\nAll OECD data should be cited as follows: OECD, \"Main Economic Indicators - complete database\", Main Economic Indicators (database),http:\/\/dx.doi.org\/10.1787\/data-00052-en (Accessed on date)\nCopyright, 2016, OECD. Reprinted with permission."
},
{
"id": "SVNCPICORAINMEI",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Consumer Price Index: All Items Excluding Food and Energy for Slovenia\u00a9",
"observation_start": "2000-01-01",
"observation_end": "2016-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Index 2010=100",
"units_short": "Index 2010=100",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-04-19 23:33:20-05",
"popularity": 0,
"group_popularity": 0,
"notes": "Copyright, 2016, OECD. Reprinted with permission.\n\nAll OECD data should be cited as follows: OECD (2010), \"Main Economic Indicators - complete database\", Main Economic Indicators (database),http:\/\/dx.doi.org\/10.1787\/data-00052-en (Accessed on date)"
},
{
"id": "SVNCPICORMINMEI",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Consumer Price Index: All Items Excluding Food and Energy for Slovenia\u00a9",
"observation_start": "2000-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 2010=100",
"units_short": "Index 2010=100",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-20 13:17:34-05",
"popularity": 0,
"group_popularity": 0,
"notes": "Copyright, 2016, OECD. Reprinted with permission.\n\nAll OECD data should be cited as follows: OECD (2010), \"Main Economic Indicators - complete database\", Main Economic Indicators (database),http:\/\/dx.doi.org\/10.1787\/data-00052-en (Accessed on date)"
},
{
"id": "SVNCPICORQINMEI",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Consumer Price Index: All Items Excluding Food and Energy for Slovenia\u00a9",
"observation_start": "2000-01-01",
"observation_end": "2017-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Index 2010=100",
"units_short": "Index 2010=100",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-05-25 10:59:44-05",
"popularity": 0,
"group_popularity": 0,
"notes": "Copyright, 2016, OECD. Reprinted with permission.\n\nAll OECD data should be cited as follows: OECD (2010), \"Main Economic Indicators - complete database\", Main Economic Indicators (database),http:\/\/dx.doi.org\/10.1787\/data-00052-en (Accessed on date)"
},
{
"id": "SVNCPIFODAINMEI",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Consumer Price Index: Food for Slovenia\u00a9",
"observation_start": "1996-01-01",
"observation_end": "2016-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Index 2010=100",
"units_short": "Index 2010=100",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-04-19 23:33:20-05",
"popularity": 0,
"group_popularity": 0,
"notes": "Copyright, 2016, OECD. Reprinted with permission.\n\nAll OECD data should be cited as follows: OECD (2010), \"Main Economic Indicators - complete database\", Main Economic Indicators (database),http:\/\/dx.doi.org\/10.1787\/data-00052-en (Accessed on date)"
},
{
"id": "SVNCPIFODMINMEI",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Consumer Price Index: Food for Slovenia\u00a9",
"observation_start": "1996-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Index 2010=100",
"units_short": "Index 2010=100",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-20 13:17:34-05",
"popularity": 0,
"group_popularity": 0,
"notes": "Copyright, 2016, OECD. Reprinted with permission.\n\nAll OECD data should be cited as follows: OECD (2010), \"Main Economic Indicators - complete database\", Main Economic Indicators (database),http:\/\/dx.doi.org\/10.1787\/data-00052-en (Accessed on date)"
},
{
"id": "SVNCPIFODQINMEI",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Consumer Price Index: Food for Slovenia\u00a9",
"observation_start": "1996-01-01",
"observation_end": "2017-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Index 2010=100",
"units_short": "Index 2010=100",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-05-25 10:59:44-05",
"popularity": 0,
"group_popularity": 0,
"notes": "Copyright, 2016, OECD. Reprinted with permission.\n\nAll OECD data should be cited as follows: OECD (2010), \"Main Economic Indicators - complete database\", Main Economic Indicators (database),http:\/\/dx.doi.org\/10.1787\/data-00052-en (Accessed on date)"
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

### tag_names

A semicolon delimited list of tag names that series match all of.

- String, required, no default value.

- Example value: 'slovenia;food'. Filter results to series having both tags 'slovenia' and 'food'.

- See the related request fred/tags.

### exclude_tag_names

A semicolon delimited list of tag names that series match none of.

- String, optional, no default value.

- Example value: 'alchohol;quarterly'.
Filter results to series having neither tag 'alchohol' nor tag 'quarterly'.

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

- One of the following strings: 'series_id', 'title', 'units', 'frequency', 'seasonal_adjustment', 'realtime_start', 'realtime_end', 'last_updated', 'observation_start', 'observation_end', 'popularity', 'group_popularity'.

- optional, default: series_id

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
