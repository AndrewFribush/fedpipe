# endpoint release series

Source: https://fred.stlouisfed.org/docs/api/fred/release_series.html

---

St. Louis Fed Web Services: fred/release/series

Skip to main content

Terms of Use

# fred/release/series

- Description

- Examples

- XML

- JSON

Parameters

- api_key

- file_type

- release_id

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

Get the series on a release of economic data.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/release/series?release_id=51&api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<seriess realtime_start="2017-08-01" realtime_end="2017-08-01" order_by="series_id" sort_order="asc" count="57" offset="0" limit="1000">
<series id="BOMTVLM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Services - Travel" observation_start="1992-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Million of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:34:00-05" popularity="0" group_popularity="0"/>
<series id="BOMVGMM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Services: U.S. Government Miscellaneous Services (DISCONTINUED)" observation_start="1992-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-10-20 09:27:37-05" popularity="0" group_popularity="0" notes="BEA has introduced new table presentations, including a new presentation of services, as part of a comprehensive restructuring of BEA’s international economic accounts.For more information see http://www.bea.gov/international/revision-2014.htm."/>
<series id="BOMVJMM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Services - Direct Defense Expenditures (DISCONTINUED)" observation_start="1992-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-10-20 09:26:44-05" popularity="0" group_popularity="0" notes="BEA has introduced new table presentations, including a new presentation of services, as part of a comprehensive restructuring of BEA’s international economic accounts.For more information see http://www.bea.gov/international/revision-2014.htm."/>
<series id="BOMVMPM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Services - Passenger Fares" observation_start="1992-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Million of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:34:00-05" popularity="0" group_popularity="0"/>
<series id="BOMVOMM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Services - Other Private Services (DISCONTINUED)" observation_start="1992-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Million of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-10-20 09:25:54-05" popularity="0" group_popularity="0" notes="BEA has introduced new table presentations, including a new presentation of services, as part of a comprehensive restructuring of BEA’s international economic accounts.For more information see http://www.bea.gov/international/revision-2014.htm."/>
<series id="BOMVRMM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Services - Royalties and License Fees (DISCONTINUED)" observation_start="1992-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-10-20 09:25:04-05" popularity="0" group_popularity="0" notes="BEA has introduced new table presentations, including a new presentation of services, as part of a comprehensive restructuring of BEA’s international economic accounts.For more information see http://www.bea.gov/international/revision-2014.htm."/>
<series id="BOMVSMM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Services - Other Transportation (DISCONTINUED)" observation_start="1992-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-10-20 09:24:23-05" popularity="0" group_popularity="0" notes="BEA has introduced new table presentations, including a new presentation of services, as part of a comprehensive restructuring of BEA’s international economic accounts.For more information see http://www.bea.gov/international/revision-2014.htm."/>
<series id="BOPGEXP" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Exports of Goods, Balance of Payments Basis" observation_start="1992-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:33:50-05" popularity="40" group_popularity="39"/>
<series id="BOPGIMP" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Imports of Goods: Balance of Payments Basis" observation_start="1992-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:33:58-05" popularity="31" group_popularity="31"/>
<series id="BOPGSTB" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Trade Balance: Goods and Services, Balance of Payments Basis" observation_start="1992-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:32:14-05" popularity="62" group_popularity="62"/>
<series id="BOPGTB" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Trade Balance: Goods, Balance of Payments Basis" observation_start="1992-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:33:50-05" popularity="40" group_popularity="39"/>
<series id="BOPSEXP" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Exports of Services, Balance of Payments Basis" observation_start="1992-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:33:58-05" popularity="27" group_popularity="27"/>
<series id="BOPSIMP" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Imports of Services, Balance of Payments Basis" observation_start="1992-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:33:58-05" popularity="18" group_popularity="18"/>
<series id="BOPSTB" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Trade Balance: Services, Balance of Payments Basis" observation_start="1992-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:33:57-05" popularity="29" group_popularity="29"/>
<series id="BOPTEXP" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Exports of Goods and Services, Balance of Payments Basis" observation_start="1992-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:33:49-05" popularity="44" group_popularity="44"/>
<series id="BOPTIMP" realtime_start="2017-08-01" realtime_end="2017-08-01" title="Imports of Goods and Services: Balance of Payments Basis" observation_start="1992-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:33:50-05" popularity="38" group_popularity="37"/>
<series id="BOXTVLM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Services - Travel" observation_start="1992-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:33:59-05" popularity="21" group_popularity="21"/>
<series id="BOXVGMM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Services: U.S. Government Miscellaneous Services (DISCONTINUED)" observation_start="1992-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-10-20 09:20:14-05" popularity="0" group_popularity="0" notes="BEA has introduced new table presentations, including a new presentation of services, as part of a comprehensive restructuring of BEA’s international economic accounts.For more information see http://www.bea.gov/international/revision-2014.htm."/>
<series id="BOXVJMM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Services - Transfers Under U.S. Military Sales Contracts (DISCONTINUED)" observation_start="1992-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-10-20 09:19:22-05" popularity="0" group_popularity="0" notes="BEA has introduced new table presentations, including a new presentation of services, as part of a comprehensive restructuring of BEA’s international economic accounts.For more information see http://www.bea.gov/international/revision-2014.htm."/>
<series id="BOXVMPM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Services - Passenger Fares" observation_start="1992-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:34:00-05" popularity="0" group_popularity="0"/>
<series id="BOXVOMM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Services - Other Private Services (DISCONTINUED)" observation_start="1992-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Million of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-10-20 09:18:23-05" popularity="0" group_popularity="0" notes="BEA has introduced new table presentations, including a new presentation of services, as part of a comprehensive restructuring of BEA’s international economic accounts.For more information see http://www.bea.gov/international/revision-2014.htm."/>
<series id="BOXVRMM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Services - Royalties and License Fees (DISCONTINUED)" observation_start="1992-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Million of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-10-20 09:16:46-05" popularity="0" group_popularity="0" notes="BEA has introduced new table presentations, including a new presentation of services, as part of a comprehensive restructuring of BEA’s international economic accounts.For more information see http://www.bea.gov/international/revision-2014.htm."/>
<series id="BOXVSMM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Services - Other Transportation (DISCONTINUED)" observation_start="1992-01-01" observation_end="2013-12-01" frequency="Monthly" frequency_short="M" units="Million of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2014-10-20 09:15:53-05" popularity="0" group_popularity="0" notes="BEA has introduced new table presentations, including a new presentation of services, as part of a comprehensive restructuring of BEA’s international economic accounts.For more information see http://www.bea.gov/international/revision-2014.htm."/>
<series id="EXPCA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Goods to Canada, f.a.s. basis" observation_start="1985-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-06 09:33:58-05" popularity="27" group_popularity="27" notes="Free Alongside Ship Basis (f.a.s.)"/>
<series id="EXPCH" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Goods to China, Mainland, f.a.s. basis" observation_start="1985-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-06 09:33:57-05" popularity="40" group_popularity="40" notes="Free Alongside Ship Basis (f.a.s.)"/>
<series id="EXPFR" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Goods to France, f.a.s. basis" observation_start="1985-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-06 09:33:59-05" popularity="7" group_popularity="7" notes="Free Alongside Ship Basis (f.a.s.)"/>
<series id="EXPGE" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Goods to Germany, f.a.s. basis" observation_start="1985-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-06 09:33:58-05" popularity="23" group_popularity="23" notes="Free Alongside Ship Basis (f.a.s.)"/>
<series id="EXPJP" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Goods to Japan, f.a.s. basis" observation_start="1985-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-06 09:33:20-05" popularity="49" group_popularity="48" notes="Free Alongside Ship Basis (f.a.s.)"/>
<series id="EXPKR" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Goods to South Korea, f.a.s. basis" observation_start="1985-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-06 09:33:59-05" popularity="20" group_popularity="20" notes="Free Alongside Ship Basis (f.a.s.)"/>
<series id="EXPMX" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Goods to Mexico, f.a.s. basis" observation_start="1985-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-06 09:33:58-05" popularity="31" group_popularity="31" notes="Free Alongside Ship Basis (f.a.s.)"/>
<series id="EXPUK" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Goods to the United Kingdom, f.a.s. basis" observation_start="1985-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-06 09:33:59-05" popularity="11" group_popularity="11" notes="Free Alongside Ship Basis (f.a.s.)"/>
<series id="IMPCA" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Goods from Canada, Customs Basis" observation_start="1985-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-06 09:33:59-05" popularity="25" group_popularity="25"/>
<series id="IMPCH" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Goods from China, Mainland, Customs Basis" observation_start="1985-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-06 09:33:42-05" popularity="44" group_popularity="44"/>
<series id="IMPFR" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Goods from France, Customs Basis" observation_start="1985-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-06 09:34:00-05" popularity="11" group_popularity="11"/>
<series id="IMPGE" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Goods from Germany, Customs Basis" observation_start="1985-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-06 09:33:50-05" popularity="29" group_popularity="29"/>
<series id="IMPJP" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Goods from Japan, Customs Basis" observation_start="1985-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-06 09:33:49-05" popularity="46" group_popularity="46"/>
<series id="IMPKR" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Goods from South Korea, Customs Basis" observation_start="1985-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-06 09:34:00-05" popularity="26" group_popularity="26"/>
<series id="IMPMX" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Goods from Mexico, Customs Basis" observation_start="1985-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-06 09:33:58-05" popularity="36" group_popularity="36"/>
<series id="IMPUK" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Goods from the United Kingdom, Customs Basis" observation_start="1985-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Not Seasonally Adjusted" seasonal_adjustment_short="NSA" last_updated="2017-07-06 09:34:00-05" popularity="7" group_popularity="7"/>
<series id="ITMCIPM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Services: Charges for the Use of Intellectual Property, not included elsewhere" observation_start="1999-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:34:01-05" popularity="0" group_popularity="0"/>
<series id="ITMFISM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Services: Financial Services" observation_start="1999-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:34:00-05" popularity="0" group_popularity="0"/>
<series id="ITMGGSM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Services: Government Goods and Services, not included elsewhere" observation_start="1999-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:34:01-05" popularity="0" group_popularity="0"/>
<series id="ITMINSM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Services: Insurance Services" observation_start="1999-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:34:00-05" popularity="0" group_popularity="0"/>
<series id="ITMMARM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Services: Maintenance and Repair Services, not included elsewhere" observation_start="1999-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:34:01-05" popularity="0" group_popularity="0"/>
<series id="ITMOBSM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Services: Other Business Services" observation_start="1999-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:34:01-05" popularity="0" group_popularity="0"/>
<series id="ITMTAEM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Services: Travel (for All Purposes Including Education)" observation_start="1999-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:34:01-05" popularity="0" group_popularity="0"/>
<series id="ITMTCIM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Services: Telecommunications, Computer, and Information Services" observation_start="1999-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:34:00-05" popularity="0" group_popularity="0"/>
<series id="ITMTRAM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Imports of Services: Transport" observation_start="1999-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:34:01-05" popularity="0" group_popularity="0"/>
<series id="ITXCIPM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Services: Charges for the Use of Intellectual Property, not included elsewhere" observation_start="1999-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:34:01-05" popularity="0" group_popularity="0"/>
<series id="ITXFISM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Services: Financial Services" observation_start="1999-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:33:59-05" popularity="34" group_popularity="33"/>
<series id="ITXGGSM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Services: Government Goods and Services, not included elsewhere" observation_start="1999-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:34:01-05" popularity="0" group_popularity="0"/>
<series id="ITXINSM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Services: Insurance Services" observation_start="1999-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:34:01-05" popularity="0" group_popularity="0"/>
<series id="ITXMARM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Services: Maintenance and Repair Services, not included elsewhere" observation_start="1999-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:34:01-05" popularity="0" group_popularity="0"/>
<series id="ITXOBSM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Services: Other Business Services" observation_start="1999-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:34:02-05" popularity="0" group_popularity="0"/>
<series id="ITXTAEM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Services: Travel (for All Purposes Including Education)" observation_start="1999-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:33:59-05" popularity="0" group_popularity="0"/>
<series id="ITXTCIM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Services: Telecommunications, Computer, and Information Services" observation_start="1999-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:33:59-05" popularity="7" group_popularity="7"/>
<series id="ITXTRAM133S" realtime_start="2017-08-01" realtime_end="2017-08-01" title="U.S. Exports of Services: Transport" observation_start="1999-01-01" observation_end="2017-05-01" frequency="Monthly" frequency_short="M" units="Millions of Dollars" units_short="Mil. of $" seasonal_adjustment="Seasonally Adjusted" seasonal_adjustment_short="SA" last_updated="2017-07-06 09:34:02-05" popularity="0" group_popularity="0"/>
</seriess>

The series tag's notes attribute is optional.

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/release/series?release_id=51&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"order_by": "series_id",
"sort_order": "asc",
"count": 57,
"offset": 0,
"limit": 1000,
"seriess": [
{
"id": "BOMTVLM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Services - Travel",
"observation_start": "1992-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Million of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:34:00-05",
"popularity": 0,
"group_popularity": 0
},
{
"id": "BOMVGMM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Services: U.S. Government Miscellaneous Services (DISCONTINUED)",
"observation_start": "1992-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-10-20 09:27:37-05",
"popularity": 0,
"group_popularity": 0,
"notes": "BEA has introduced new table presentations, including a new presentation of services, as part of a comprehensive restructuring of BEA\u2019s international economic accounts.For more information see http:\/\/www.bea.gov\/international\/revision-2014.htm."
},
{
"id": "BOMVJMM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Services - Direct Defense Expenditures (DISCONTINUED)",
"observation_start": "1992-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-10-20 09:26:44-05",
"popularity": 0,
"group_popularity": 0,
"notes": "BEA has introduced new table presentations, including a new presentation of services, as part of a comprehensive restructuring of BEA\u2019s international economic accounts.For more information see http:\/\/www.bea.gov\/international\/revision-2014.htm."
},
{
"id": "BOMVMPM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Services - Passenger Fares",
"observation_start": "1992-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Million of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:34:00-05",
"popularity": 0,
"group_popularity": 0
},
{
"id": "BOMVOMM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Services - Other Private Services (DISCONTINUED)",
"observation_start": "1992-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Million of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-10-20 09:25:54-05",
"popularity": 0,
"group_popularity": 0,
"notes": "BEA has introduced new table presentations, including a new presentation of services, as part of a comprehensive restructuring of BEA\u2019s international economic accounts.For more information see http:\/\/www.bea.gov\/international\/revision-2014.htm."
},
{
"id": "BOMVRMM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Services - Royalties and License Fees (DISCONTINUED)",
"observation_start": "1992-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-10-20 09:25:04-05",
"popularity": 0,
"group_popularity": 0,
"notes": "BEA has introduced new table presentations, including a new presentation of services, as part of a comprehensive restructuring of BEA\u2019s international economic accounts.For more information see http:\/\/www.bea.gov\/international\/revision-2014.htm."
},
{
"id": "BOMVSMM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Services - Other Transportation (DISCONTINUED)",
"observation_start": "1992-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-10-20 09:24:23-05",
"popularity": 0,
"group_popularity": 0,
"notes": "BEA has introduced new table presentations, including a new presentation of services, as part of a comprehensive restructuring of BEA\u2019s international economic accounts.For more information see http:\/\/www.bea.gov\/international\/revision-2014.htm."
},
{
"id": "BOPGEXP",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Exports of Goods, Balance of Payments Basis",
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
"id": "BOPGIMP",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Imports of Goods: Balance of Payments Basis",
"observation_start": "1992-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:33:58-05",
"popularity": 31,
"group_popularity": 31
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
"id": "BOPSEXP",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Exports of Services, Balance of Payments Basis",
"observation_start": "1992-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:33:58-05",
"popularity": 27,
"group_popularity": 27
},
{
"id": "BOPSIMP",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Imports of Services, Balance of Payments Basis",
"observation_start": "1992-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:33:58-05",
"popularity": 18,
"group_popularity": 18
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
"id": "BOPTEXP",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Exports of Goods and Services, Balance of Payments Basis",
"observation_start": "1992-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:33:49-05",
"popularity": 44,
"group_popularity": 44
},
{
"id": "BOPTIMP",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "Imports of Goods and Services: Balance of Payments Basis",
"observation_start": "1992-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:33:50-05",
"popularity": 38,
"group_popularity": 37
},
{
"id": "BOXTVLM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Services - Travel",
"observation_start": "1992-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:33:59-05",
"popularity": 21,
"group_popularity": 21
},
{
"id": "BOXVGMM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Services: U.S. Government Miscellaneous Services (DISCONTINUED)",
"observation_start": "1992-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-10-20 09:20:14-05",
"popularity": 0,
"group_popularity": 0,
"notes": "BEA has introduced new table presentations, including a new presentation of services, as part of a comprehensive restructuring of BEA\u2019s international economic accounts.For more information see http:\/\/www.bea.gov\/international\/revision-2014.htm."
},
{
"id": "BOXVJMM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Services - Transfers Under U.S. Military Sales Contracts (DISCONTINUED)",
"observation_start": "1992-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-10-20 09:19:22-05",
"popularity": 0,
"group_popularity": 0,
"notes": "BEA has introduced new table presentations, including a new presentation of services, as part of a comprehensive restructuring of BEA\u2019s international economic accounts.For more information see http:\/\/www.bea.gov\/international\/revision-2014.htm."
},
{
"id": "BOXVMPM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Services - Passenger Fares",
"observation_start": "1992-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:34:00-05",
"popularity": 0,
"group_popularity": 0
},
{
"id": "BOXVOMM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Services - Other Private Services (DISCONTINUED)",
"observation_start": "1992-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Million of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-10-20 09:18:23-05",
"popularity": 0,
"group_popularity": 0,
"notes": "BEA has introduced new table presentations, including a new presentation of services, as part of a comprehensive restructuring of BEA\u2019s international economic accounts.For more information see http:\/\/www.bea.gov\/international\/revision-2014.htm."
},
{
"id": "BOXVRMM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Services - Royalties and License Fees (DISCONTINUED)",
"observation_start": "1992-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Million of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-10-20 09:16:46-05",
"popularity": 0,
"group_popularity": 0,
"notes": "BEA has introduced new table presentations, including a new presentation of services, as part of a comprehensive restructuring of BEA\u2019s international economic accounts.For more information see http:\/\/www.bea.gov\/international\/revision-2014.htm."
},
{
"id": "BOXVSMM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Services - Other Transportation (DISCONTINUED)",
"observation_start": "1992-01-01",
"observation_end": "2013-12-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Million of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2014-10-20 09:15:53-05",
"popularity": 0,
"group_popularity": 0,
"notes": "BEA has introduced new table presentations, including a new presentation of services, as part of a comprehensive restructuring of BEA\u2019s international economic accounts.For more information see http:\/\/www.bea.gov\/international\/revision-2014.htm."
},
{
"id": "EXPCA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Goods to Canada, f.a.s. basis",
"observation_start": "1985-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-06 09:33:58-05",
"popularity": 27,
"group_popularity": 27,
"notes": "Free Alongside Ship Basis (f.a.s.)"
},
{
"id": "EXPCH",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Goods to China, Mainland, f.a.s. basis",
"observation_start": "1985-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-06 09:33:57-05",
"popularity": 40,
"group_popularity": 40,
"notes": "Free Alongside Ship Basis (f.a.s.)"
},
{
"id": "EXPFR",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Goods to France, f.a.s. basis",
"observation_start": "1985-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-06 09:33:59-05",
"popularity": 7,
"group_popularity": 7,
"notes": "Free Alongside Ship Basis (f.a.s.)"
},
{
"id": "EXPGE",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Goods to Germany, f.a.s. basis",
"observation_start": "1985-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-06 09:33:58-05",
"popularity": 23,
"group_popularity": 23,
"notes": "Free Alongside Ship Basis (f.a.s.)"
},
{
"id": "EXPJP",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Goods to Japan, f.a.s. basis",
"observation_start": "1985-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-06 09:33:20-05",
"popularity": 49,
"group_popularity": 48,
"notes": "Free Alongside Ship Basis (f.a.s.)"
},
{
"id": "EXPKR",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Goods to South Korea, f.a.s. basis",
"observation_start": "1985-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-06 09:33:59-05",
"popularity": 20,
"group_popularity": 20,
"notes": "Free Alongside Ship Basis (f.a.s.)"
},
{
"id": "EXPMX",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Goods to Mexico, f.a.s. basis",
"observation_start": "1985-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-06 09:33:58-05",
"popularity": 31,
"group_popularity": 31,
"notes": "Free Alongside Ship Basis (f.a.s.)"
},
{
"id": "EXPUK",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Goods to the United Kingdom, f.a.s. basis",
"observation_start": "1985-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-06 09:33:59-05",
"popularity": 11,
"group_popularity": 11,
"notes": "Free Alongside Ship Basis (f.a.s.)"
},
{
"id": "IMPCA",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Goods from Canada, Customs Basis",
"observation_start": "1985-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-06 09:33:59-05",
"popularity": 25,
"group_popularity": 25
},
{
"id": "IMPCH",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Goods from China, Mainland, Customs Basis",
"observation_start": "1985-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-06 09:33:42-05",
"popularity": 44,
"group_popularity": 44
},
{
"id": "IMPFR",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Goods from France, Customs Basis",
"observation_start": "1985-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-06 09:34:00-05",
"popularity": 11,
"group_popularity": 11
},
{
"id": "IMPGE",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Goods from Germany, Customs Basis",
"observation_start": "1985-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-06 09:33:50-05",
"popularity": 29,
"group_popularity": 29
},
{
"id": "IMPJP",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Goods from Japan, Customs Basis",
"observation_start": "1985-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-06 09:33:49-05",
"popularity": 46,
"group_popularity": 46
},
{
"id": "IMPKR",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Goods from South Korea, Customs Basis",
"observation_start": "1985-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-06 09:34:00-05",
"popularity": 26,
"group_popularity": 26
},
{
"id": "IMPMX",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Goods from Mexico, Customs Basis",
"observation_start": "1985-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-06 09:33:58-05",
"popularity": 36,
"group_popularity": 36
},
{
"id": "IMPUK",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Goods from the United Kingdom, Customs Basis",
"observation_start": "1985-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Not Seasonally Adjusted",
"seasonal_adjustment_short": "NSA",
"last_updated": "2017-07-06 09:34:00-05",
"popularity": 7,
"group_popularity": 7
},
{
"id": "ITMCIPM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Services: Charges for the Use of Intellectual Property, not included elsewhere",
"observation_start": "1999-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:34:01-05",
"popularity": 0,
"group_popularity": 0
},
{
"id": "ITMFISM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Services: Financial Services",
"observation_start": "1999-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:34:00-05",
"popularity": 0,
"group_popularity": 0
},
{
"id": "ITMGGSM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Services: Government Goods and Services, not included elsewhere",
"observation_start": "1999-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:34:01-05",
"popularity": 0,
"group_popularity": 0
},
{
"id": "ITMINSM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Services: Insurance Services",
"observation_start": "1999-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:34:00-05",
"popularity": 0,
"group_popularity": 0
},
{
"id": "ITMMARM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Services: Maintenance and Repair Services, not included elsewhere",
"observation_start": "1999-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:34:01-05",
"popularity": 0,
"group_popularity": 0
},
{
"id": "ITMOBSM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Services: Other Business Services",
"observation_start": "1999-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:34:01-05",
"popularity": 0,
"group_popularity": 0
},
{
"id": "ITMTAEM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Services: Travel (for All Purposes Including Education)",
"observation_start": "1999-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:34:01-05",
"popularity": 0,
"group_popularity": 0
},
{
"id": "ITMTCIM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Services: Telecommunications, Computer, and Information Services",
"observation_start": "1999-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:34:00-05",
"popularity": 0,
"group_popularity": 0
},
{
"id": "ITMTRAM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Imports of Services: Transport",
"observation_start": "1999-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:34:01-05",
"popularity": 0,
"group_popularity": 0
},
{
"id": "ITXCIPM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Services: Charges for the Use of Intellectual Property, not included elsewhere",
"observation_start": "1999-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:34:01-05",
"popularity": 0,
"group_popularity": 0
},
{
"id": "ITXFISM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Services: Financial Services",
"observation_start": "1999-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:33:59-05",
"popularity": 34,
"group_popularity": 33
},
{
"id": "ITXGGSM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Services: Government Goods and Services, not included elsewhere",
"observation_start": "1999-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:34:01-05",
"popularity": 0,
"group_popularity": 0
},
{
"id": "ITXINSM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Services: Insurance Services",
"observation_start": "1999-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:34:01-05",
"popularity": 0,
"group_popularity": 0
},
{
"id": "ITXMARM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Services: Maintenance and Repair Services, not included elsewhere",
"observation_start": "1999-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:34:01-05",
"popularity": 0,
"group_popularity": 0
},
{
"id": "ITXOBSM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Services: Other Business Services",
"observation_start": "1999-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:34:02-05",
"popularity": 0,
"group_popularity": 0
},
{
"id": "ITXTAEM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Services: Travel (for All Purposes Including Education)",
"observation_start": "1999-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:33:59-05",
"popularity": 0,
"group_popularity": 0
},
{
"id": "ITXTCIM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Services: Telecommunications, Computer, and Information Services",
"observation_start": "1999-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:33:59-05",
"popularity": 7,
"group_popularity": 7
},
{
"id": "ITXTRAM133S",
"realtime_start": "2017-08-01",
"realtime_end": "2017-08-01",
"title": "U.S. Exports of Services: Transport",
"observation_start": "1999-01-01",
"observation_end": "2017-05-01",
"frequency": "Monthly",
"frequency_short": "M",
"units": "Millions of Dollars",
"units_short": "Mil. of $",
"seasonal_adjustment": "Seasonally Adjusted",
"seasonal_adjustment_short": "SA",
"last_updated": "2017-07-06 09:34:02-05",
"popularity": 0,
"group_popularity": 0
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

### release_id

The id for a release.

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

- One of the following strings: 'series_id', 'title', 'units', 'frequency', 'seasonal_adjustment', 'realtime_start', 'realtime_end', 'last_updated', 'observation_start', 'observation_end', 'popularity','group_popularity'.

- optional, default: series_id

### sort_order

Sort results is ascending or descending order for attribute values specified by order_by.

- One of the following strings: 'asc', 'desc'.

- optional, default: asc

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

- Example value: 'japan;imports'. Filter results to series having both tags 'japan' and 'imports'.

- See the related request fred/tags.

### exclude_tag_names

A semicolon delimited list of tag names that series match none of.

- String, optional, no filtering by tags by default.

- Example value: 'imports;services'.
Filter results to series having neither tag 'imports' nor tag 'services'.

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
