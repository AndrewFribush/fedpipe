# endpoint category series

Source: https://fred.stlouisfed.org/docs/api/fred/category_series.html

---

St. Louis Fed Web Services: fred/category/series

Skip to main content

Terms of Use

# fred/category/series

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

- limit

- offset

- order_by

- sort_order

- filter_variable

- filter_value

- tag_names

- exclude_tag_names

## Description

Get the series in a category.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/category/series?category_id=125&api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<seriess realtime_start="2017-08-01" realtime_end="2017-08-01" order_by="series_id" sort_order="asc" count="45" offset="0" limit="1000">
<series id="BOPBCA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on Current Account (DISCONTINUED)" observation_start="1960-01-01" observation_end="2014-01-01" frequency="Quarterly" frequency_short="Q" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-06-18 08:41:28-05" popularity="32" group_popularity="34" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPBCAA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on Current Account (DISCONTINUED)" observation_start="1960-01-01" observation_end="2013-01-01" frequency="Annual" frequency_short="A" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-06-18 08:41:28-05" popularity="14" group_popularity="34" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPBCAN" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on Current Account (DISCONTINUED)" observation_start="1960-01-01" observation_end="2014-01-01" frequency="Quarterly" frequency_short="Q" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-06-18 08:41:28-05" popularity="0" group_popularity="34" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPBGS" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on Goods and Services (DISCONTINUED)" observation_start="1960-01-01" observation_end="2014-01-01" frequency="Quarterly" frequency_short="Q" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-06-18 08:41:28-05" popularity="14" group_popularity="20" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPBGSA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on Goods and Services (DISCONTINUED)" observation_start="1960-01-01" observation_end="2013-01-01" frequency="Annual" frequency_short="A" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-06-18 08:41:28-05" popularity="7" group_popularity="20" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPBGSN" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on Goods and Services (DISCONTINUED)" observation_start="1960-01-01" observation_end="2014-01-01" frequency="Quarterly" frequency_short="Q" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-06-18 08:41:28-05" popularity="0" group_popularity="20" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPBII" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on Investment Income (DISCONTINUED)" observation_start="1960-01-01" observation_end="2014-01-01" frequency="Quarterly" frequency_short="Q" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-06-18 08:41:27-05" popularity="0" group_popularity="0" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPBIIA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on Investment Income (DISCONTINUED)" observation_start="1960-01-01" observation_end="2013-01-01" frequency="Annual" frequency_short="A" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-06-18 08:41:27-05" popularity="0" group_popularity="0" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPBIIN" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on Investment Income (DISCONTINUED)" observation_start="1960-01-01" observation_end="2014-01-01" frequency="Quarterly" frequency_short="Q" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-06-18 08:41:27-05" popularity="0" group_popularity="0" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPBM" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on Merchandise Trade (DISCONTINUED)" observation_start="1960-01-01" observation_end="2014-01-01" frequency="Quarterly" frequency_short="Q" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-06-18 08:41:27-05" popularity="0" group_popularity="0" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPBMA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on Merchandise Trade (DISCONTINUED)" observation_start="1960-01-01" observation_end="2013-01-01" frequency="Annual" frequency_short="A" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-06-18 08:41:27-05" popularity="0" group_popularity="0" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPBMN" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on Merchandise Trade (DISCONTINUED)" observation_start="1960-01-01" observation_end="2014-01-01" frequency="Quarterly" frequency_short="Q" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-06-18 08:41:27-05" popularity="0" group_popularity="0" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPBSV" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on Services (DISCONTINUED)" observation_start="1960-01-01" observation_end="2014-01-01" frequency="Quarterly" frequency_short="Q" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-06-18 08:41:27-05" popularity="0" group_popularity="0" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPBSVA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on Services (DISCONTINUED)" observation_start="1960-01-01" observation_end="2013-01-01" frequency="Annual" frequency_short="A" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-06-18 08:41:27-05" popularity="0" group_popularity="0" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPBSVN" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on Services (DISCONTINUED)" observation_start="1960-01-01" observation_end="2014-01-01" frequency="Quarterly" frequency_short="Q" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-06-18 08:41:27-05" popularity="0" group_popularity="0" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPCAT" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Capital Account Transactions, Net (DISCONTINUED)" observation_start="1989-10-01" observation_end="2014-01-01" frequency="Quarterly" frequency_short="Q" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-06-18 08:41:26-05" popularity="0" group_popularity="0" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPCATA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Capital Account Transactions, Net (DISCONTINUED)" observation_start="1989-01-01" observation_end="2013-01-01" frequency="Annual" frequency_short="A" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-06-18 08:41:26-05" popularity="0" group_popularity="0" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPCATN" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Capital Account Transactions, Net (DISCONTINUED)" observation_start="1989-10-01" observation_end="2014-01-01" frequency="Quarterly" frequency_short="Q" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-06-18 08:41:26-05" popularity="0" group_popularity="0" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPG" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Unilateral Transfers, Net (DISCONTINUED)" observation_start="1960-01-01" observation_end="2014-01-01" frequency="Quarterly" frequency_short="Q" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-06-18 08:41:26-05" popularity="0" group_popularity="7" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPGA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Unilateral Transfers, Net (DISCONTINUED)" observation_start="1960-01-01" observation_end="2013-01-01" frequency="Annual" frequency_short="A" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-06-18 08:41:25-05" popularity="0" group_popularity="7" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPGN" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Unilateral Transfers, Net (DISCONTINUED)" observation_start="1960-01-01" observation_end="2014-01-01" frequency="Quarterly" frequency_short="Q" units="Billions of Dollars" units_short="Bil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2014-06-18 08:41:25-05" popularity="0" group_popularity="7" notes="This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http://www.bea.gov/international/modern.htm). For a crosswalk of the old and new series in FRED see: http://research.stlouisfed.org/CompRevisionReleaseID49.xlsx."/>
<series id="BOPGSTB" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Trade Balance: Goods and Services, Balance of Payments Basis" observation_start="1992-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:32:14-05" popularity="62" group_popularity="62"/>
<series id="BOPGTB" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Trade Balance: Goods, Balance of Payments Basis" observation_start="1992-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:33:50-05" popularity="40" group_popularity="39"/>
<series id="BOPSTB" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Trade Balance: Services, Balance of Payments Basis" observation_start="1992-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:33:57-05" popularity="29" group_popularity="29"/>
<series id="IEABC" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on current account" observation_start="1999-01-01" observation_end="2017-01-01" frequency="Quarterly" frequency_short="Q" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-06-20 08:41:05-05" popularity="41" group_popularity="52" notes="Calculated by subtracting the imports of goods and services and income payments (debits) from the exports of goods and services and income receipts (credits)"/>
<series id="IEABCA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on current account" observation_start="1999-01-01" observation_end="2016-01-01" frequency="Annual" frequency_short="A" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-06-20 08:41:03-05" popularity="47" group_popularity="52" notes="Calculated by subtracting the imports of goods and services and income payments (debits) from the exports of goods and services and income receipts (credits)"/>
<series id="IEABCG" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on goods" observation_start="1999-01-01" observation_end="2017-01-01" frequency="Quarterly" frequency_short="Q" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-06-20 08:41:09-05" popularity="11" group_popularity="20" notes="Calculated by subtracting the imports of goods from the exports of goods"/>
<series id="IEABCGA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on goods" observation_start="1999-01-01" observation_end="2016-01-01" frequency="Annual" frequency_short="A" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-06-20 08:41:14-05" popularity="11" group_popularity="20" notes="Calculated by subtracting the imports of goods from the exports of goods"/>
<series id="IEABCGN" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on goods" observation_start="1999-01-01" observation_end="2017-01-01" frequency="Quarterly" frequency_short="Q" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-06-20 08:41:23-05" popularity="0" group_popularity="20" notes="Calculated by subtracting the imports of goods from the exports of goods"/>
<series id="IEABCGS" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on goods and services" observation_start="1999-01-01" observation_end="2017-01-01" frequency="Quarterly" frequency_short="Q" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-06-20 08:41:23-05" popularity="23" group_popularity="26" notes="Calculated by subtracting the imports of goods and services from the exports of goods and services"/>
<series id="IEABCGSA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on goods and services" observation_start="1999-01-01" observation_end="2016-01-01" frequency="Annual" frequency_short="A" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-06-20 08:41:08-05" popularity="7" group_popularity="26" notes="Calculated by subtracting the imports of goods and services from the exports of goods and services"/>
<series id="IEABCGSN" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on goods and services" observation_start="1999-01-01" observation_end="2017-01-01" frequency="Quarterly" frequency_short="Q" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-06-20 08:41:14-05" popularity="0" group_popularity="26" notes="Calculated by subtracting the imports of goods and services from the exports of goods and services"/>
<series id="IEABCN" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on current account" observation_start="1999-01-01" observation_end="2017-01-01" frequency="Quarterly" frequency_short="Q" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-06-20 08:41:07-05" popularity="25" group_popularity="52" notes="Calculated by subtracting the imports of goods and services and income payments (debits) from the exports of goods and services and income receipts (credits)"/>
<series id="IEABCP" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on capital account" observation_start="1999-01-01" observation_end="2017-01-01" frequency="Quarterly" frequency_short="Q" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-06-20 08:41:03-05" popularity="41" group_popularity="44" notes="Calculated by subtracting the capital transfer payments and other debits from the capital transfer receipts and other credits"/>
<series id="IEABCPA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on capital account" observation_start="1999-01-01" observation_end="2016-01-01" frequency="Annual" frequency_short="A" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-03-21 07:41:21-05" popularity="29" group_popularity="44" notes="Calculated by subtracting the capital transfer payments and other debits from the capital transfer receipts and other credits"/>
<series id="IEABCPI" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on primary income" observation_start="1999-01-01" observation_end="2017-01-01" frequency="Quarterly" frequency_short="Q" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-06-20 08:31:03-05" popularity="18" group_popularity="20" notes="Calculated by subtracting the primary income payments from the primary income receipts"/>
<series id="IEABCPIA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on primary income" observation_start="1999-01-01" observation_end="2016-01-01" frequency="Annual" frequency_short="A" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-06-20 08:31:06-05" popularity="0" group_popularity="20" notes="Calculated by subtracting the primary income payments from the primary income receipts"/>
<series id="IEABCPIN" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on primary income" observation_start="1999-01-01" observation_end="2017-01-01" frequency="Quarterly" frequency_short="Q" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-06-20 08:41:24-05" popularity="0" group_popularity="20" notes="Calculated by subtracting the primary income payments from the primary income receipts"/>
<series id="IEABCPN" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on capital account" observation_start="1999-01-01" observation_end="2017-01-01" frequency="Quarterly" frequency_short="Q" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-06-20 08:41:09-05" popularity="24" group_popularity="44" notes="Calculated by subtracting the capital transfer payments and other debits from the capital transfer receipts and other credits"/>
<series id="IEABCS" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on services" observation_start="1999-01-01" observation_end="2017-01-01" frequency="Quarterly" frequency_short="Q" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-06-20 08:31:14-05" popularity="7" group_popularity="11" notes="Calculated by subtracting the imports of services from the exports of services"/>
<series id="IEABCSA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on services" observation_start="1999-01-01" observation_end="2016-01-01" frequency="Annual" frequency_short="A" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-06-20 08:31:14-05" popularity="0" group_popularity="11" notes="Calculated by subtracting the imports of services from the exports of services"/>
<series id="IEABCSI" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on secondary income" observation_start="1999-01-01" observation_end="2017-01-01" frequency="Quarterly" frequency_short="Q" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-06-20 08:41:15-05" popularity="0" group_popularity="7" notes="Calculated by subtracting the secondary income (current transfer) payments from the secondary income (current transfer) receipts"/>
<series id="IEABCSIA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on secondary income" observation_start="1999-01-01" observation_end="2016-01-01" frequency="Annual" frequency_short="A" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-06-20 08:41:15-05" popularity="0" group_popularity="7" notes="Calculated by subtracting the secondary income (current transfer) payments from the secondary income (current transfer) receipts"/>
<series id="IEABCSIN" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on secondary income" observation_start="1999-01-01" observation_end="2017-01-01" frequency="Quarterly" frequency_short="Q" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-06-20 08:41:25-05" popularity="0" group_popularity="7" notes="Calculated by subtracting the secondary income (current transfer) payments from the secondary income (current transfer) receipts"/>
<series id="IEABCSN" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Balance on services" observation_start="1999-01-01" observation_end="2017-01-01" frequency="Quarterly" frequency_short="Q" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-06-20 08:31:15-05" popularity="0" group_popularity="11" notes="Calculated by subtracting the imports of services from the exports of services"/>
</seriess>

The series tag's notes attribute is optional.

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/category/series?category_id=125&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"order_by": "series_id",
"sort_order": "asc",
"count": 45,
"offset": 0,
"limit": 1000,
"seriess": [
{
"id": "BOPBCA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on Current Account (DISCONTINUED)",
"observation_start": "1960-01-01",
"observation_end": "2014-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-06-18 08:41:28-05",
"popularity": 32,
"group_popularity": 34,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPBCAA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on Current Account (DISCONTINUED)",
"observation_start": "1960-01-01",
"observation_end": "2013-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-06-18 08:41:28-05",
"popularity": 14,
"group_popularity": 34,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPBCAN",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on Current Account (DISCONTINUED)",
"observation_start": "1960-01-01",
"observation_end": "2014-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-06-18 08:41:28-05",
"popularity": 0,
"group_popularity": 34,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPBGS",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on Goods and Services (DISCONTINUED)",
"observation_start": "1960-01-01",
"observation_end": "2014-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-06-18 08:41:28-05",
"popularity": 14,
"group_popularity": 20,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPBGSA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on Goods and Services (DISCONTINUED)",
"observation_start": "1960-01-01",
"observation_end": "2013-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-06-18 08:41:28-05",
"popularity": 7,
"group_popularity": 20,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPBGSN",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on Goods and Services (DISCONTINUED)",
"observation_start": "1960-01-01",
"observation_end": "2014-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-06-18 08:41:28-05",
"popularity": 0,
"group_popularity": 20,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPBII",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on Investment Income (DISCONTINUED)",
"observation_start": "1960-01-01",
"observation_end": "2014-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-06-18 08:41:27-05",
"popularity": 0,
"group_popularity": 0,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPBIIA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on Investment Income (DISCONTINUED)",
"observation_start": "1960-01-01",
"observation_end": "2013-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-06-18 08:41:27-05",
"popularity": 0,
"group_popularity": 0,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPBIIN",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on Investment Income (DISCONTINUED)",
"observation_start": "1960-01-01",
"observation_end": "2014-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-06-18 08:41:27-05",
"popularity": 0,
"group_popularity": 0,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPBM",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on Merchandise Trade (DISCONTINUED)",
"observation_start": "1960-01-01",
"observation_end": "2014-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-06-18 08:41:27-05",
"popularity": 0,
"group_popularity": 0,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPBMA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on Merchandise Trade (DISCONTINUED)",
"observation_start": "1960-01-01",
"observation_end": "2013-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-06-18 08:41:27-05",
"popularity": 0,
"group_popularity": 0,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPBMN",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on Merchandise Trade (DISCONTINUED)",
"observation_start": "1960-01-01",
"observation_end": "2014-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-06-18 08:41:27-05",
"popularity": 0,
"group_popularity": 0,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPBSV",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on Services (DISCONTINUED)",
"observation_start": "1960-01-01",
"observation_end": "2014-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-06-18 08:41:27-05",
"popularity": 0,
"group_popularity": 0,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPBSVA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on Services (DISCONTINUED)",
"observation_start": "1960-01-01",
"observation_end": "2013-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-06-18 08:41:27-05",
"popularity": 0,
"group_popularity": 0,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPBSVN",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on Services (DISCONTINUED)",
"observation_start": "1960-01-01",
"observation_end": "2014-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-06-18 08:41:27-05",
"popularity": 0,
"group_popularity": 0,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPCAT",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Capital Account Transactions, Net (DISCONTINUED)",
"observation_start": "1989-10-01",
"observation_end": "2014-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-06-18 08:41:26-05",
"popularity": 0,
"group_popularity": 0,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPCATA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Capital Account Transactions, Net (DISCONTINUED)",
"observation_start": "1989-01-01",
"observation_end": "2013-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-06-18 08:41:26-05",
"popularity": 0,
"group_popularity": 0,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPCATN",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Capital Account Transactions, Net (DISCONTINUED)",
"observation_start": "1989-10-01",
"observation_end": "2014-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-06-18 08:41:26-05",
"popularity": 0,
"group_popularity": 0,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPG",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Unilateral Transfers, Net (DISCONTINUED)",
"observation_start": "1960-01-01",
"observation_end": "2014-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-06-18 08:41:26-05",
"popularity": 0,
"group_popularity": 7,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPGA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Unilateral Transfers, Net (DISCONTINUED)",
"observation_start": "1960-01-01",
"observation_end": "2013-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-06-18 08:41:25-05",
"popularity": 0,
"group_popularity": 7,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPGN",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Unilateral Transfers, Net (DISCONTINUED)",
"observation_start": "1960-01-01",
"observation_end": "2014-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Billions of Dollars",
"units_short": "Bil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2014-06-18 08:41:25-05",
"popularity": 0,
"group_popularity": 7,
"notes": "This series has been discontinued as a result of the comprehensive restructuring of the international economic accounts (http:\/\/www.bea.gov\/international\/modern.htm). For a crosswalk of the old and new series in FRED see: http:\/\/research.stlouisfed.org\/CompRevisionReleaseID49.xlsx."
},
{
"id": "BOPGSTB",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Trade Balance: Goods and Services, Balance of Payments Basis",
"observation_start": "1992-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:32:14-05",
"popularity": 62,
"group_popularity": 62
},
{
"id": "BOPGTB",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Trade Balance: Goods, Balance of Payments Basis",
"observation_start": "1992-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:33:50-05",
"popularity": 40,
"group_popularity": 39
},
{
"id": "BOPSTB",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Trade Balance: Services, Balance of Payments Basis",
"observation_start": "1992-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:33:57-05",
"popularity": 29,
"group_popularity": 29
},
{
"id": "IEABC",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on current account",
"observation_start": "1999-01-01",
"observation_end": "2017-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-06-20 08:41:05-05",
"popularity": 41,
"group_popularity": 52,
"notes": "Calculated by subtracting the imports of goods and services and income payments (debits) from the exports of goods and services and income receipts (credits)"
},
{
"id": "IEABCA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on current account",
"observation_start": "1999-01-01",
"observation_end": "2016-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-06-20 08:41:03-05",
"popularity": 47,
"group_popularity": 52,
"notes": "Calculated by subtracting the imports of goods and services and income payments (debits) from the exports of goods and services and income receipts (credits)"
},
{
"id": "IEABCG",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on goods",
"observation_start": "1999-01-01",
"observation_end": "2017-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-06-20 08:41:09-05",
"popularity": 11,
"group_popularity": 20,
"notes": "Calculated by subtracting the imports of goods from the exports of goods"
},
{
"id": "IEABCGA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on goods",
"observation_start": "1999-01-01",
"observation_end": "2016-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-06-20 08:41:14-05",
"popularity": 11,
"group_popularity": 20,
"notes": "Calculated by subtracting the imports of goods from the exports of goods"
},
{
"id": "IEABCGN",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on goods",
"observation_start": "1999-01-01",
"observation_end": "2017-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-06-20 08:41:23-05",
"popularity": 0,
"group_popularity": 20,
"notes": "Calculated by subtracting the imports of goods from the exports of goods"
},
{
"id": "IEABCGS",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on goods and services",
"observation_start": "1999-01-01",
"observation_end": "2017-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-06-20 08:41:23-05",
"popularity": 23,
"group_popularity": 26,
"notes": "Calculated by subtracting the imports of goods and services from the exports of goods and services"
},
{
"id": "IEABCGSA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on goods and services",
"observation_start": "1999-01-01",
"observation_end": "2016-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-06-20 08:41:08-05",
"popularity": 7,
"group_popularity": 26,
"notes": "Calculated by subtracting the imports of goods and services from the exports of goods and services"
},
{
"id": "IEABCGSN",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on goods and services",
"observation_start": "1999-01-01",
"observation_end": "2017-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-06-20 08:41:14-05",
"popularity": 0,
"group_popularity": 26,
"notes": "Calculated by subtracting the imports of goods and services from the exports of goods and services"
},
{
"id": "IEABCN",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on current account",
"observation_start": "1999-01-01",
"observation_end": "2017-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-06-20 08:41:07-05",
"popularity": 25,
"group_popularity": 52,
"notes": "Calculated by subtracting the imports of goods and services and income payments (debits) from the exports of goods and services and income receipts (credits)"
},
{
"id": "IEABCP",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on capital account",
"observation_start": "1999-01-01",
"observation_end": "2017-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-06-20 08:41:03-05",
"popularity": 41,
"group_popularity": 44,
"notes": "Calculated by subtracting the capital transfer payments and other debits from the capital transfer receipts and other credits"
},
{
"id": "IEABCPA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on capital account",
"observation_start": "1999-01-01",
"observation_end": "2016-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-03-21 07:41:21-05",
"popularity": 29,
"group_popularity": 44,
"notes": "Calculated by subtracting the capital transfer payments and other debits from the capital transfer receipts and other credits"
},
{
"id": "IEABCPI",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on primary income",
"observation_start": "1999-01-01",
"observation_end": "2017-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-06-20 08:31:03-05",
"popularity": 18,
"group_popularity": 20,
"notes": "Calculated by subtracting the primary income payments from the primary income receipts"
},
{
"id": "IEABCPIA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on primary income",
"observation_start": "1999-01-01",
"observation_end": "2016-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-06-20 08:31:06-05",
"popularity": 0,
"group_popularity": 20,
"notes": "Calculated by subtracting the primary income payments from the primary income receipts"
},
{
"id": "IEABCPIN",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on primary income",
"observation_start": "1999-01-01",
"observation_end": "2017-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-06-20 08:41:24-05",
"popularity": 0,
"group_popularity": 20,
"notes": "Calculated by subtracting the primary income payments from the primary income receipts"
},
{
"id": "IEABCPN",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on capital account",
"observation_start": "1999-01-01",
"observation_end": "2017-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-06-20 08:41:09-05",
"popularity": 24,
"group_popularity": 44,
"notes": "Calculated by subtracting the capital transfer payments and other debits from the capital transfer receipts and other credits"
},
{
"id": "IEABCS",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on services",
"observation_start": "1999-01-01",
"observation_end": "2017-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-06-20 08:31:14-05",
"popularity": 7,
"group_popularity": 11,
"notes": "Calculated by subtracting the imports of services from the exports of services"
},
{
"id": "IEABCSA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on services",
"observation_start": "1999-01-01",
"observation_end": "2016-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-06-20 08:31:14-05",
"popularity": 0,
"group_popularity": 11,
"notes": "Calculated by subtracting the imports of services from the exports of services"
},
{
"id": "IEABCSI",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on secondary income",
"observation_start": "1999-01-01",
"observation_end": "2017-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-06-20 08:41:15-05",
"popularity": 0,
"group_popularity": 7,
"notes": "Calculated by subtracting the secondary income (current transfer) payments from the secondary income (current transfer) receipts"
},
{
"id": "IEABCSIA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on secondary income",
"observation_start": "1999-01-01",
"observation_end": "2016-01-01",
"frequency": "Annual",
"frequency_short": "A",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-06-20 08:41:15-05",
"popularity": 0,
"group_popularity": 7,
"notes": "Calculated by subtracting the secondary income (current transfer) payments from the secondary income (current transfer) receipts"
},
{
"id": "IEABCSIN",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on secondary income",
"observation_start": "1999-01-01",
"observation_end": "2017-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-06-20 08:41:25-05",
"popularity": 0,
"group_popularity": 7,
"notes": "Calculated by subtracting the secondary income (current transfer) payments from the secondary income (current transfer) receipts"
},
{
"id": "IEABCSN",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Balance on services",
"observation_start": "1999-01-01",
"observation_end": "2017-01-01",
"frequency": "Quarterly",
"frequency_short": "Q",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-06-20 08:31:15-05",
"popularity": 0,
"group_popularity": 11,
"notes": "Calculated by subtracting the imports of services from the exports of services"
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

### filter_variable

The attribute to filter results by.

- On of the following strings: 'frequency', 'units', 'seasonal_adjustment'.

- optional, no filter by default

### filter_value

The value of the filter_variable attribute to filter results by.

- String, optional, no filter by default

### tag_names

A semicolon delimited list of tag names that series match all of.

- String, optional, no filtering by tags by default

- Example value: 'income;bea'. Filter results to series having both tags 'income' and 'bea'.

- See the related request fred/tags.

### exclude_tag_names

A semicolon delimited list of tag names that series match none of.

- String, optional, no filtering by tags by default.

- Example value: 'discontinued;annual'.
Filter results to series having neither tag 'discontinued' nor tag 'annual'.

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
