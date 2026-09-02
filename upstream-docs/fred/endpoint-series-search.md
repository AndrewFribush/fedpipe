# endpoint series search

Source: https://fred.stlouisfed.org/docs/api/fred/series_search.html

---

St. Louis Fed Web Services: fred/series/search

Skip to main content

Terms of Use

# fred/series/search

- Description

- Examples

- XML

- JSON

Parameters

- api_key

- file_type

- search_text

- search_type

- realtime_start

- realtime_end

- limit

- offset

- order_by

- sort_order

- filter_variable

- filter_value

- tag_names

- exclude_tag_names

## Description

Get economic data series that match search text.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/series/search?search_text=monetary+service+index&api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

This XML file does not appear to have any style information associated with it. The document tree is shown below.
<seriess realtime_start="2017-08-01" realtime_end="2017-08-01" order_by="search_rank" sort_order="desc" count="32" offset="0" limit="1000">
<series id="MSIM2" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Monetary Services Index: M2 (preferred)" observation_start="1967-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-01-17 07:16:44-06" popularity="34" group_popularity="33" notes="The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates). Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield. More information about the new MSI can be found at http://research.stlouisfed.org/msi/index.html."/>
<series id="MSIM1P" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Monetary Services Index: M1 (preferred)" observation_start="1967-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-01-17 07:16:45-06" popularity="26" group_popularity="26" notes="The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates)."/>
<series id="OCM1P" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Real User Cost Index of MSI-M1 (preferred)" observation_start="1967-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Percent" units_short="%" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-01-17 07:16:42-06" popularity="26" group_popularity="26" notes="Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="MSIALLP" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Monetary Services Index: ALL Assets (preferred)" observation_start="1967-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-01-17 07:16:45-06" popularity="21" group_popularity="21" notes="The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates). Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="MSIMZMP" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Monetary Services Index: MZM (preferred)" observation_start="1967-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-01-17 07:16:42-06" popularity="20" group_popularity="20" notes="The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates). Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="MSIM1A" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Monetary Services Index: M1 (alternative)" observation_start="1967-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-01-17 07:16:45-06" popularity="18" group_popularity="18" notes="The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates). Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="OCALLP" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Real User Cost Index of MSI-ALL Assets (preferred)" observation_start="1967-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Percent" units_short="%" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-01-17 07:16:42-06" popularity="16" group_popularity="16" notes="Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="OCALLA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Real User Cost Index of MSI-ALL Assets (alternative)" observation_start="1967-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Percent" units_short="%" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-01-17 07:16:42-06" popularity="14" group_popularity="14" notes="Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="MSIALLA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Monetary Services Index: ALL Assets (alternative)" observation_start="1967-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-01-17 07:16:46-06" popularity="11" group_popularity="11" notes="The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates). Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="MSIM3A" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Monetary Services Index: M3 (alternative) (DISCONTINUED)" observation_start="1967-01-01" observation_end="2006-02-01" frequency="Monthly" frequency_short="M" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2013-06-20 16:46:04-05" popularity="11" group_popularity="11" notes="The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates). Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="DMIHHPNFCUKQ" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Divisia Money Index: Household Sector and Private Non-Financial Corporations in the United Kingdom©" observation_start="1977-01-01" observation_end="2016-10-01" frequency="Quarterly" frequency_short="Q" units="Index 1977:Q1=100" units_short="Index 1977:Q1=100" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-06-09 08:53:54-05" popularity="11" group_popularity="11" notes="This series was constructed by the Bank of England as part of the Three Centuries of Macroeconomic Data project by combining data from a number of academic and official sources. For more information, please refer to the Three Centuries spreadsheet at http://www.bankofengland.co.uk/research/Pages/onebank/threecenturies.aspx. Users are advised to check the underlying assumptions behind this series in the relevant worksheets of the spreadsheet. In many cases alternative assumptions might be appropriate. Users are permitted to reproduce this series in their own work as it represents Bank calculations and manipulations of underlying series that are the copyright of the Bank of England provided that underlying sources are cited appropriately. For appropriate citation please see the Three Centuries spreadsheet for guidance and a list of the underlying sources."/>
<series id="MSIM2MP" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Monetary Services Index: M2M (preferred)" observation_start="1967-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-01-17 07:16:43-06" popularity="7" group_popularity="7" notes="The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates). Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="MSIM2A" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Monetary Services Index: M2 (alternative)" observation_start="1967-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-01-17 07:16:44-06" popularity="7" group_popularity="7" notes="The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates). Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="DMIPNCUKQ" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Divisia Money Index: Private Non-financial Corporations in the United Kingdom©" observation_start="1977-01-01" observation_end="2016-10-01" frequency="Quarterly" frequency_short="Q" units="Index 1977:Q1=100" units_short="Index 1977:Q1=100" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-06-09 08:54:15-05" popularity="7" group_popularity="7" notes="This series was constructed by the Bank of England as part of the Three Centuries of Macroeconomic Data project by combining data from a number of academic and official sources. For more information, please refer to the Three Centuries spreadsheet at http://www.bankofengland.co.uk/research/Pages/onebank/threecenturies.aspx. Users are advised to check the underlying assumptions behind this series in the relevant worksheets of the spreadsheet. In many cases alternative assumptions might be appropriate. Users are permitted to reproduce this series in their own work as it represents Bank calculations and manipulations of underlying series that are the copyright of the Bank of England provided that underlying sources are cited appropriately. For appropriate citation please see the Three Centuries spreadsheet for guidance and a list of the underlying sources."/>
<series id="MSIM2MA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Monetary Services Index: M2M (alternative)" observation_start="1967-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-01-17 07:16:43-06" popularity="0" group_popularity="0" notes="The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates). Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="OCM2A" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Real User Cost Index of MSI-M2 (alternative)" observation_start="1967-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Percent" units_short="%" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-01-17 07:16:41-06" popularity="0" group_popularity="0" notes="Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="OCMZMA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Real User Cost Index of MSI-MZM (alternative)" observation_start="1967-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Percent" units_short="%" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-01-17 07:16:41-06" popularity="0" group_popularity="0" notes="Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="MSIM3P" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Monetary Services Index: M3 (preferred) (DISCONTINUED)" observation_start="1967-01-01" observation_end="2006-02-01" frequency="Monthly" frequency_short="M" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2013-05-17 09:01:12-05" popularity="0" group_popularity="0" notes="The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates). Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="OCM3P" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Real User Cost Index of MSI-M3 (preferred) (DISCONTINUED)" observation_start="1967-01-01" observation_end="2006-02-01" frequency="Monthly" frequency_short="M" units="Percent" units_short="%" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2012-09-18 12:01:06-05" popularity="0" group_popularity="0" notes="Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="DMIHSUKQ" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Divisia Money Index: Household Sector in the United Kingdom©" observation_start="1977-01-01" observation_end="2016-10-01" frequency="Quarterly" frequency_short="Q" units="Index 1977:Q1=100" units_short="Index 1977:Q1=100" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-06-09 08:54:14-05" popularity="0" group_popularity="0" notes="This series was constructed by the Bank of England as part of the Three Centuries of Macroeconomic Data project by combining data from a number of academic and official sources. For more information, please refer to the Three Centuries spreadsheet at http://www.bankofengland.co.uk/research/Pages/onebank/threecenturies.aspx. Users are advised to check the underlying assumptions behind this series in the relevant worksheets of the spreadsheet. In many cases alternative assumptions might be appropriate. Users are permitted to reproduce this series in their own work as it represents Bank calculations and manipulations of underlying series that are the copyright of the Bank of England provided that underlying sources are cited appropriately. For appropriate citation please see the Three Centuries spreadsheet for guidance and a list of the underlying sources."/>
<series id="EXPPAPEF521ALLEST" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Purchased Advertising and Promotional Services for Monetary Authorities-Central Bank, All Establishments, Employer Firms" observation_start="2009-01-01" observation_end="2014-01-01" frequency="Annual" frequency_short="A" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2016-03-25 15:53:05-05" popularity="0" group_popularity="0" notes="For further information, please refer to the US Census Bureau's Annual Services release, online at http://www.census.gov/services/."/>
<series id="MSIM2DS" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Monetary Services Index: M2 (DISCONTINUED)" observation_start="1959-01-01" observation_end="2004-04-01" frequency="Monthly" frequency_short="M" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2004-09-20 09:21:53-05" popularity="0" group_popularity="0" notes="Further information and definitions are available at: http://research.stlouisfed.org/publications/mt and http://research.stlouisfed.org/msi. This series was last updated 5/14/2004. Please refer to the series MSIM2 for the revised series."/>
<series id="MSIMZMA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Monetary Services Index: MZM (alternative)" observation_start="1967-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-01-17 07:16:43-06" popularity="0" group_popularity="0" notes="The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates). Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="OCM2P" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Real User Cost Index of MSI-M2 (preferred)" observation_start="1967-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Percent" units_short="%" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-01-17 07:16:41-06" popularity="0" group_popularity="0" notes="Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="OCM2MP" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Real User Cost Index of MSI-M2M (preferred)" observation_start="1967-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Percent" units_short="%" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-01-17 07:16:41-06" popularity="0" group_popularity="0" notes="Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="OCMZMP" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Real User Cost Index of MSI-MZM (preferred)" observation_start="1967-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Percent" units_short="%" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-01-17 07:16:40-06" popularity="0" group_popularity="0" notes="Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="OCM1A" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Real User Cost Index of MSI-M1 (alternative)" observation_start="1967-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Percent" units_short="%" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-01-17 07:16:42-06" popularity="0" group_popularity="0" notes="Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="OCM2MA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Real User Cost Index of MSI-M2M (alternative)" observation_start="1967-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Percent" units_short="%" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-01-17 07:16:41-06" popularity="0" group_popularity="0" notes="Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="OCM3A" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Real User Cost Index of MSI-M3 (alternative) (DISCONTINUED)" observation_start="1967-01-01" observation_end="2006-02-01" frequency="Monthly" frequency_short="M" units="Percent" units_short="%" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2013-06-20 16:46:03-05" popularity="0" group_popularity="0" notes="Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates. Alternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."/>
<series id="EXPPCSEF521ALLEST" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Purchased Communication Services for Monetary Authorities-Central Bank, All Establishments, Employer Firms" observation_start="2012-01-01" observation_end="2014-01-01" frequency="Annual" frequency_short="A" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2016-03-25 15:53:00-05" popularity="0" group_popularity="0" notes="For further information, please refer to the US Census Bureau's Annual Services release, online at http://www.census.gov/services/."/>
<series id="EXPPTSEF521ALLEST" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Purchased Professional and Technical Services for Monetary Authorities-Central Bank, All Establishments, Employer Firms" observation_start="2012-01-01" observation_end="2014-01-01" frequency="Annual" frequency_short="A" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2016-03-25 15:51:27-05" popularity="0" group_popularity="0" notes="For further information, please refer to the US Census Bureau's Annual Services release, online at http://www.census.gov/services/."/>
<series id="EXPDPSEF521ALLEST" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Data Processing and Other Purchased Computer Services for Monetary Authorities-Central Bank, All Establishments, Employer Firms" observation_start="2012-01-01" observation_end="2014-01-01" frequency="Annual" frequency_short="A" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2016-03-25 15:52:48-05" popularity="0" group_popularity="0" notes="For further information, please refer to the US Census Bureau's Annual Services release, online at http://www.census.gov/services/."/>
</seriess>

The series tag's notes attribute is optional.

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/series/search?search_text=monetary+service+index&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"order_by": "search_rank",
"sort_order": "desc",
"count": 32,
"offset": 0,
"limit": 1000,
"seriess": [
{
"id": "MSIM2",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Monetary Services Index: M2 (preferred)",
"observation_start": "1967-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-01-17 07:16:44-06",
"popularity": 34,
"group_popularity": 33,
"notes": "The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates).\nPreferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield.\nMore information about the new MSI can be found at\nhttp:\/\/research.stlouisfed.org\/msi\/index.html."
},
{
"id": "MSIM1P",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Monetary Services Index: M1 (preferred)",
"observation_start": "1967-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-01-17 07:16:45-06",
"popularity": 26,
"group_popularity": 26,
"notes": "The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates)."
},
{
"id": "OCM1P",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Real User Cost Index of MSI-M1 (preferred)",
"observation_start": "1967-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Percent",
"units_short": "%",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-01-17 07:16:42-06",
"popularity": 26,
"group_popularity": 26,
"notes": "Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "MSIALLP",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Monetary Services Index: ALL Assets (preferred)",
"observation_start": "1967-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-01-17 07:16:45-06",
"popularity": 21,
"group_popularity": 21,
"notes": "The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates).\nPreferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "MSIMZMP",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Monetary Services Index: MZM (preferred)",
"observation_start": "1967-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-01-17 07:16:42-06",
"popularity": 20,
"group_popularity": 20,
"notes": "The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates).\nPreferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "MSIM1A",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Monetary Services Index: M1 (alternative)",
"observation_start": "1967-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-01-17 07:16:45-06",
"popularity": 18,
"group_popularity": 18,
"notes": "The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates).\nPreferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "OCALLP",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Real User Cost Index of MSI-ALL Assets (preferred)",
"observation_start": "1967-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Percent",
"units_short": "%",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-01-17 07:16:42-06",
"popularity": 16,
"group_popularity": 16,
"notes": "Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "OCALLA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Real User Cost Index of MSI-ALL Assets (alternative)",
"observation_start": "1967-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Percent",
"units_short": "%",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-01-17 07:16:42-06",
"popularity": 14,
"group_popularity": 14,
"notes": "Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "MSIALLA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Monetary Services Index: ALL Assets (alternative)",
"observation_start": "1967-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-01-17 07:16:46-06",
"popularity": 11,
"group_popularity": 11,
"notes": "The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates).\nPreferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "MSIM3A",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Monetary Services Index: M3 (alternative) (DISCONTINUED)",
"observation_start": "1967-01-01",
"observation_end": "2006-02-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2013-06-20 16:46:04-05",
"popularity": 11,
"group_popularity": 11,
"notes": "The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates).\nPreferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "DMIHHPNFCUKQ",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Divisia Money Index: Household Sector and Private Non-Financial Corporations in the United Kingdom\u00a9",
"observation_start": "1977-01-01",
"observation_end": "2016-10-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Index 1977:Q1=100",
"units_short": "Index 1977:Q1=100",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-06-09 08:53:54-05",
"popularity": 11,
"group_popularity": 11,
"notes": "This series was constructed by the Bank of England as part of the Three Centuries of Macroeconomic Data project by combining data from a number of academic and official sources. For more information, please refer to the Three Centuries spreadsheet at http:\/\/www.bankofengland.co.uk\/research\/Pages\/onebank\/threecenturies.aspx. Users are advised to check the underlying assumptions behind this series in the relevant worksheets of the spreadsheet. In many cases alternative assumptions might be appropriate. Users are permitted to reproduce this series in their own work as it represents Bank calculations and manipulations of underlying series that are the copyright of the Bank of England provided that underlying sources are cited appropriately. For appropriate citation please see the Three Centuries spreadsheet for guidance and a list of the underlying sources."
},
{
"id": "MSIM2MP",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Monetary Services Index: M2M (preferred)",
"observation_start": "1967-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-01-17 07:16:43-06",
"popularity": 7,
"group_popularity": 7,
"notes": "The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates).\nPreferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "MSIM2A",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Monetary Services Index: M2 (alternative)",
"observation_start": "1967-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-01-17 07:16:44-06",
"popularity": 7,
"group_popularity": 7,
"notes": "The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates).\nPreferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "DMIPNCUKQ",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Divisia Money Index: Private Non-financial Corporations in the United Kingdom\u00a9",
"observation_start": "1977-01-01",
"observation_end": "2016-10-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Index 1977:Q1=100",
"units_short": "Index 1977:Q1=100",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-06-09 08:54:15-05",
"popularity": 7,
"group_popularity": 7,
"notes": "This series was constructed by the Bank of England as part of the Three Centuries of Macroeconomic Data project by combining data from a number of academic and official sources. For more information, please refer to the Three Centuries spreadsheet at http:\/\/www.bankofengland.co.uk\/research\/Pages\/onebank\/threecenturies.aspx. Users are advised to check the underlying assumptions behind this series in the relevant worksheets of the spreadsheet. In many cases alternative assumptions might be appropriate. Users are permitted to reproduce this series in their own work as it represents Bank calculations and manipulations of underlying series that are the copyright of the Bank of England provided that underlying sources are cited appropriately. For appropriate citation please see the Three Centuries spreadsheet for guidance and a list of the underlying sources."
},
{
"id": "MSIM2MA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Monetary Services Index: M2M (alternative)",
"observation_start": "1967-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-01-17 07:16:43-06",
"popularity": 0,
"group_popularity": 0,
"notes": "The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates).\nPreferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "OCM2A",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Real User Cost Index of MSI-M2 (alternative)",
"observation_start": "1967-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Percent",
"units_short": "%",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-01-17 07:16:41-06",
"popularity": 0,
"group_popularity": 0,
"notes": "Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "OCMZMA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Real User Cost Index of MSI-MZM (alternative)",
"observation_start": "1967-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Percent",
"units_short": "%",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-01-17 07:16:41-06",
"popularity": 0,
"group_popularity": 0,
"notes": "Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "MSIM3P",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Monetary Services Index: M3 (preferred) (DISCONTINUED)",
"observation_start": "1967-01-01",
"observation_end": "2006-02-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2013-05-17 09:01:12-05",
"popularity": 0,
"group_popularity": 0,
"notes": "The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates).\nPreferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "OCM3P",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Real User Cost Index of MSI-M3 (preferred) (DISCONTINUED)",
"observation_start": "1967-01-01",
"observation_end": "2006-02-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Percent",
"units_short": "%",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2012-09-18 12:01:06-05",
"popularity": 0,
"group_popularity": 0,
"notes": "Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "DMIHSUKQ",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Divisia Money Index: Household Sector in the United Kingdom\u00a9",
"observation_start": "1977-01-01",
"observation_end": "2016-10-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Index 1977:Q1=100",
"units_short": "Index 1977:Q1=100",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-06-09 08:54:14-05",
"popularity": 0,
"group_popularity": 0,
"notes": "This series was constructed by the Bank of England as part of the Three Centuries of Macroeconomic Data project by combining data from a number of academic and official sources. For more information, please refer to the Three Centuries spreadsheet at http:\/\/www.bankofengland.co.uk\/research\/Pages\/onebank\/threecenturies.aspx. Users are advised to check the underlying assumptions behind this series in the relevant worksheets of the spreadsheet. In many cases alternative assumptions might be appropriate. Users are permitted to reproduce this series in their own work as it represents Bank calculations and manipulations of underlying series that are the copyright of the Bank of England provided that underlying sources are cited appropriately. For appropriate citation please see the Three Centuries spreadsheet for guidance and a list of the underlying sources."
},
{
"id": "EXPPAPEF521ALLEST",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Purchased Advertising and Promotional Services for Monetary Authorities-Central Bank, All Establishments, Employer Firms",
"observation_start": "2009-01-01",
"observation_end": "2014-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2016-03-25 15:53:05-05",
"popularity": 0,
"group_popularity": 0,
"notes": "For further information, please refer to the US Census Bureau's Annual Services release, online at http:\/\/www.census.gov\/services\/."
},
{
"id": "MSIM2DS",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Monetary Services Index: M2 (DISCONTINUED)",
"observation_start": "1959-01-01",
"observation_end": "2004-04-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2004-09-20 09:21:53-05",
"popularity": 0,
"group_popularity": 0,
"notes": "Further information and definitions are available at: http:\/\/research.stlouisfed.org\/publications\/mt and http:\/\/research.stlouisfed.org\/msi. This series was last updated 5\/14\/2004. Please refer to the series MSIM2 for the revised series."
},
{
"id": "MSIMZMA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Monetary Services Index: MZM (alternative)",
"observation_start": "1967-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-01-17 07:16:43-06",
"popularity": 0,
"group_popularity": 0,
"notes": "The MSI measure the flow of monetary services received each period by households and firms from their holdings of monetary assets (levels of the indexes are sometimes referred to as Divisia monetary aggregates).\nPreferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "OCM2P",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Real User Cost Index of MSI-M2 (preferred)",
"observation_start": "1967-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Percent",
"units_short": "%",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-01-17 07:16:41-06",
"popularity": 0,
"group_popularity": 0,
"notes": "Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "OCM2MP",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Real User Cost Index of MSI-M2M (preferred)",
"observation_start": "1967-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Percent",
"units_short": "%",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-01-17 07:16:41-06",
"popularity": 0,
"group_popularity": 0,
"notes": "Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "OCMZMP",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Real User Cost Index of MSI-MZM (preferred)",
"observation_start": "1967-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Percent",
"units_short": "%",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-01-17 07:16:40-06",
"popularity": 0,
"group_popularity": 0,
"notes": "Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "OCM1A",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Real User Cost Index of MSI-M1 (alternative)",
"observation_start": "1967-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Percent",
"units_short": "%",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-01-17 07:16:42-06",
"popularity": 0,
"group_popularity": 0,
"notes": "Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "OCM2MA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Real User Cost Index of MSI-M2M (alternative)",
"observation_start": "1967-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Percent",
"units_short": "%",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-01-17 07:16:41-06",
"popularity": 0,
"group_popularity": 0,
"notes": "Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "OCM3A",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Real User Cost Index of MSI-M3 (alternative) (DISCONTINUED)",
"observation_start": "1967-01-01",
"observation_end": "2006-02-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Percent",
"units_short": "%",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2013-06-20 16:46:03-05",
"popularity": 0,
"group_popularity": 0,
"notes": "Preferred benchmark rate equals 100 basis points plus the largest rate in the set of rates.\nAlternative benchmark rate equals the larger of the preferred benchmark rate and the Baa corporate bond yield."
},
{
"id": "EXPPCSEF521ALLEST",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Purchased Communication Services for Monetary Authorities-Central Bank, All Establishments, Employer Firms",
"observation_start": "2012-01-01",
"observation_end": "2014-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2016-03-25 15:53:00-05",
"popularity": 0,
"group_popularity": 0,
"notes": "For further information, please refer to the US Census Bureau's Annual Services release, online at http:\/\/www.census.gov\/services\/."
},
{
"id": "EXPPTSEF521ALLEST",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Purchased Professional and Technical Services for Monetary Authorities-Central Bank, All Establishments, Employer Firms",
"observation_start": "2012-01-01",
"observation_end": "2014-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2016-03-25 15:51:27-05",
"popularity": 0,
"group_popularity": 0,
"notes": "For further information, please refer to the US Census Bureau's Annual Services release, online at http:\/\/www.census.gov\/services\/."
},
{
"id": "EXPDPSEF521ALLEST",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Data Processing and Other Purchased Computer Services for Monetary Authorities-Central Bank, All Establishments, Employer Firms",
"observation_start": "2012-01-01",
"observation_end": "2014-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2016-03-25 15:52:48-05",
"popularity": 0,
"group_popularity": 0,
"notes": "For further information, please refer to the US Census Bureau's Annual Services release, online at http:\/\/www.census.gov\/services\/."
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

### search_text

The words to match against economic data series.

### search_type

Determines the type of search to perform.

- One of the following strings: 'full_text', 'series_id'.

'full_text' searches series attributes title, units, frequency, and tags by parsing words into stems.
This makes it possible for searches like 'Industry' to match series containing related words such as 'Industries'.
Of course, you can search for multiple words like 'money' and 'stock'.
Remember to url encode spaces (e.g. 'money%20stock').

'series_id' performs a substring search on series IDs.
Searching for 'ex' will find series containing 'ex' anywhere in a series ID.
'*' can be used to anchor searches and match 0 or more of any character.
Searching for 'ex*' will find series containing 'ex' at the beginning of a series ID.
Searching for '*ex' will find series containing 'ex' at the end of a series ID.
It's also possible to put an '*' in the middle of a string.
'm*sl' finds any series starting with 'm' and ending with 'sl'.

- optional, default: full_text.

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

One of the following strings: 'search_rank', 'series_id', 'title', 'units', 'frequency', 'seasonal_adjustment', 'realtime_start', 'realtime_end', 'last_updated', 'observation_start', 'observation_end', 'popularity', 'group_popularity'.

optional, default: If the value of search_type is 'full_text' then the default value of order_by is 'search_rank'.
If the value of search_type is 'series_id' then the default value of order_by is 'series_id'.

### sort_order

Sort results is ascending or descending order for attribute values specified by order_by.

- One of the following strings: 'asc', 'desc'.

- optional, default: If order_by is equal to 'search_rank' or 'popularity', then the default value of sort_order is 'desc'. Otherwise, the default sort order is 'asc'.

### filter_variable

The attribute to filter results by.

- One of the following strings: 'frequency', 'units', 'seasonal_adjustment'.

- optional, no filter by default

### filter_value

The value of the filter_variable attribute to filter results by.

- String, optional, no filter by default

### tag_names

A semicolon delimited list of tag names that series match all of.

- String, optional, no filtering by tags by default

- Example value: 'usa;m2'. Filter results to series having both tags 'usa' and 'm2'.

- See the related request fred/tags.

### exclude_tag_names

A semicolon delimited list of tag names that series match none of.

- String, optional, no filtering by tags by default.

- Example value: 'discontinued;m1'.
Filter results to series having neither tag 'discontinued' nor tag 'm1'.

Parameter exclude_tag_names requires that parameter tag_names also be set to limit the number of matching series.

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
