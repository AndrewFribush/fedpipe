# ACS 5-Year

Source: https://www.census.gov/data/developers/data-sets/acs-5year.html

---

American Community Survey 5-Year Data (2009-2024)

# American Community Survey 5-Year Data (2009-2024)

Skip Navigation

Within Developers

####

# American Community Survey 5-Year Data (2009-2024)

January 29, 2026

Share

Facebook

X (Twitter)

LinkedIn

The American Community Survey (ACS) is an ongoing survey that provides data every year—giving communities the current information they need to make important decisions. The ACS covers a broad range of topics about social, economic, housing, and demographic characteristics of the U.S. population.

The ACS 5-year estimates are available for the nation, all states, the District of Columbia, Puerto Rico, all congressional districts and metropolitan statistical areas, counties, places (i.e., towns or cities), ZIP Code Tabulation Areas, census tracts, and block groups.

- Detailed Tables contain the most detailed estimates on all topics for all geographies. The data are presented as estimates. Detailed Tables are available down to the block group level.

- Subject Tables provide a span of information on a particular ACS subject presented in the format of both estimates and percentages. Subject Tables are available down to the census tract level.

- Data Profiles contain broad social, economic, housing, and demographic information. The data are presented as estimates and percentages. Data Profiles are available down to the census tract level.

- Comparison Profiles are similar to Data Profiles but also include comparisons with past-year data. The current 5-year data are compared with the preceding non-overlapping 5-year data (e.g. 2020-2024 ACS 5-year estimates compared to 2015-2019 ACS 5-year estimates) and include statistical significance testing. Comparison Profiles are available down to the places/county subdivisions level.

To create an API call, you must enter a specific URL into the address bar of a web browser. The call will vary depending on the following factors:

- Year of data release

- Dataset (ACS 1-year or 5-year)

- Table ID

- Geography level

Please review the example API calls for each of the table types listed below and use those examples to build your API calls. Visit the API Resources page for tutorial videos, workshops and other tools.

The API is one of several ways to access ACS data. Visit the ACS Data page to find all the ways to access ACS data.

All data queries to the Census Data API now require an API key. Please cut and paste the Example Calls below into your web browser and replace YOUR_KEY_GOES_HERE with your personal API Key.

If you do not have an API Key, request one here. For more information: Watch Video.

2024

2023

2022

2021

2020

More

2019

2018

2017

2016

2015

2014

2013

2012

2011

2010

2009

2024

2024

2023

2022

2021

2020

2019

2018

2017

2016

2015

2014

2013

2012

2011

2010

2009

## 2024

### Comparing American Community Survey Data

ACS has non-overlapping datasets that allow comparisons of current ACS data to past ACS data. The 2020-2024 ACS 5-Year estimates can be compared with 2015-2019 ACS 5-Year estimates. For information on comparability of the 2020-2024 ACS 5-Year estimates to the 2015-2019 estimates by topic, please visit the Comparing 2024 American Community Survey Data page.

### Variable Changes

Variables, and the values they represent, may change over time. Use this 2024 5YR API Changes document as a guide for which variables have changed from the prior year for 2024 ACS 5-Year Detailed Tables, Data Profiles and Subject Tables. See below for a description of each change type.

- No Change - The variable has not changed from the prior year (most variables).

- Updated - That variable has changed from the prior year and a matching variable for the current year has been found.

- No Match - The variable has changed from the prior year and no matching or comparable variable has been found.

For table changes, check the ACS product changes webpage for source table changes.

2024 Table & Geography Changes

Learn more about changes to tables and geography for each American Community Survey data release.

### Geography Note

The 2020-2024 ACS 5-year data products that report data related to Congressional Districts are based on the 119th Congress. The Census Bureau does not collect congressional district boundaries from the states during the congressional session that aligns with the decennial census. Additional explanation can be found in our geographic user note.

### Annotation Variables

In September 2016, ACS released annotation variables that return character representations of each estimate. Many annotations return as null. However, if an annotation variable returns a value, it provides important information about the estimate or margin of error. For example, if an estimate variable (variable ending in “E”) returns “-888888888”, the annotation variable will return “(X)”. Looking at the Notes on ACS Estimates and Annotation Values, this means the estimate is not applicable or not available. For a complete list of return values and their annotations, see Notes on ACS Estimates and Annotation Values.

### Detailed Tables

- Example Call: api.census.gov/data/2024/acs/acs5?get=NAME,group(B01001)&for=us:1&key=YOUR_KEY_GOES_HERE

- 2024 ACS Detailed Tables Variables [ html | xml | json ]

- ACS Technical Documentation

- Examples

- Supported Geography

### Subject Tables

- Example Call: api.census.gov/data/2024/acs/acs5/subject?get=NAME,group(S0101)&for=us:1&key=YOUR_KEY_GOES_HERE

- 2024 ACS Subject Tables Variables [ html | xml | json ]

- ACS Technical Documentation

- Examples

- Supported Geography

### Data Profiles

- Example Call: api.census.gov/data/2024/acs/acs5/profile?get=group(DP02)&for=us:1&key=YOUR_KEY_GOES_HERE

- 2024 ACS Data Profiles Variables [ html | xml | json ]

- ACS Technical Documentation

- Examples

- Supported Geography

### Comparison Profiles

- Example Call: api.census.gov/data/2024/acs/acs5/cprofile?get=group(CP05)&for=us:1&key=YOUR_KEY_GOES_HERE

- 2024 ACS Comparison Profiles Variables [ html | xml | json ]

- ACS Technical Documentation

- Examples

- Supported Geography

### Related Information

Notes on ACS API Variable Formats

Notes on ACS API Variable Types

Notes on ACS Estimate and Annotation Values

American Community Survey (ACS)

The American Community Survey is the premier source for information about America's changing population, housing and workforce.

Developers' Forum

Need help? Check out our Developer Forum to submit questions, share your apps, and provide feedback.

FTP Server

To download full datasets, visit our FTP Server.

Page Last Revised - May 20, 2026
