# API Documentation

Source: https://www.nationsreportcard.gov/api_documentation.aspx

---

NAEP Data Service API

MENU
CLOSE

SEARCH

# ​​​​​​​​​​​​NAEP Data Service API

Are you interested in obtaining NAEP results in a machine-readable format? Do you create your own data visualizations or use tools for data analytics?

The ins​​truction​​​​s below will help you to directly query the NAEP Data Service API to acquire JSON of the same results available in the
NAEP Data​ Explorer.

Data service timeouts may occur when calls require too much time to complete. To avoid this, break up your calls into small manageable parts instead of large individual calls that span across multiple years. Data service results are not intended to be stored in spreadsheets or databases because these results may change over time​ and consequently may reflect inaccurate data.
If you ​​would like to report an issue or provide a suggestion for improving this API, please
contact us.

##
Tab​le of Contents

The Basics

Request Types and Their Returns

Examples of Request Types and Their Returns

Parameter Values

Special and Optional Parameter Values​

Assessment Year and Subject Combinations

Error Codes

###
The Basics

###
Lo cation/Path

https://www.nationsreportcard.gov/DataService/GetAdhocData.aspx

### Response Format

{"status":200,"result":[1st result>, , …]}

- If the request returns a successful response, status is 200.

- A successful response will have a result that is an array.

- Depending on the request, the result array may have more than 1 element.

Gaps

- Gaps in the return are the score or percentage differences in NAEP results between different student groups, jurisdictions, or assessment years.
- Gaps in the return can also mean differences in other previously calculated differences as mentioned above.

Back to Top

##
Request Types and Their Returns

### Overview

- Main URL – nationsreportcard.gov
- Query String Parameters ​

- Type – what kind of data to return
- Subject – e.g., mathematics or reading
- Grade – e.g., grades 4, 8, and 12
- Subscale – For example, in addition to the composite mathematics scale (MRPCM), NAEP mathematics has five subscales, which are MRPS1: Numbers and Operations, MRPS2: Mathematics Measurement, MRPS3: Mathematics Geometry, MRPS4: Mathematics Data Analysis, Statistics, and Probability, MRPS: Mathematics Algebra and Functions.
- Variable – student demographic groups (e.g., GENDER) or survey question variable or index.
- ComparisonValues – allow you to choose specific variable categories (e.g., for GENDER, 1 is male and 2 is female)
- Jurisdiction – national, state, and district
- Stattype – different type of statistical estimates (e.g. mean or percentages)
- Year

- StackType

- Values

- ColThenRow (default)
- RowThenCol

- Determines the order of returns
- ColThenRow will group the returns based on the first variable (e.g. for SDRACE+GENDER, the return will be group by white+male, white+female, black+male, black+male …
- RowThenCol will group the returns based on the second variable (e.g. for SDRACE+GENDER, the return will be group by white+male, black+male, hispanic+male, asian+male …

- There are many data points. Each data point also contains the query information. For example, if you select 2 years, 1 jurisdiction, TOTAL (all students) and a composite scale, you will get 2 data points. Each data point contains information indicating the year that the data point represents.

- Please see the section Parameter Values below for more details for all parameters.
- Significance indicates if the focal value is significantly higher or lower, or not significantly different than the target value.

##
Examples of Request Types and Their Returns

### Basic data requests

https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=data&subject=writing&grade=8&subscale=WRIRP&variable=GENDER&jurisdiction=NP&stattype=MN:MN&Year=2011

- type – data​

- Important return: value – the statistic you are looking for.

### Crosstabluation data requests

https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=data&subject=mathematics&grade=8&subscale=MRPCM&variable=SDRACE%2BGENDER&categoryindex=2%2B1,2%2B2,3%2B1,3%2B2&jurisdiction=NP,CA&stattype=MN%3AMN&Year=2013,2015&StackType=RowThenCol

- type – data

- StackType

- ColThenRow (default)

- RowThenCol

- Must have 2 variables (here is SDRACE and GENDER)

- Important return : varValue – the category value within each student group (e.g., for GENDER, male is 1, female is 2)

### Significance gap across years

https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=sigacrossyear&subject=mathematics&grade=8&subscale=MRPCM&variable=TOTAL&jurisdiction=NP&stattype=MN%3AMN&Year=2015,2013

- type – sigacrossyear
- Used to return whether there is a significant difference in values between two or more years. The example shown here will return the comparison results between assessment years 2013 and 2015 in the average mathematics scores for public school students in the nation (NP).
- Must have more than one year, separated by commas
- Important returns

- focalValue – value for focal year
- targetValue – value for target year
- gap – difference between focalValue and targetValue

### Significance gap across jurisdictions

https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=sigacrossjuris&subject=mathematics&grade=8&subscale=MRPCM&variable=GENDER&jurisdiction=NP,CA&stattype=MN%3AMN&Year=2015,2013

- Type – sigacrossjuris

- Must have more than 1 jurisdiction, separated by commas
- Important returns

- focalValue – value for a focal jurisdiction
- targetValue – value for a target jurisdiction
- gap – difference between focalValue and targetValue

### Significance gap across variable

https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=sigacrossvalue&subject=mathematics&grade=8&subscale=MRPCM&variable=GENDER&jurisdiction=NP,CA&stattype=MN%3AMN&Year=2015

- Type – sigacrossvalue
- Variable must be a non “TOTAL” value (e.g., GENDER in the example here)
- Important returns

- focalValue – value for variable focal category value (e.g. Male)
- targetValue – value for variable target category value (e.g. Female)
- gap – difference between focalValue and targetValue

### Significance gap across variable (with crosstab)

https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=sigacrossvalue&subject=mathematics&grade=8&subscale=MRPCM&variable=SDRACE%2BGENDER&jurisdiction=NP,CA&stattype=MN%3AMN&Year=2015

- Type – sigacrossvalue
- A crosstab will allow you to compare the relationship between two variables. You can examine the significance gap between specific demographic groups (e.g., (e.g., White/Male versus White/Female, White/Male versus Black/Male, etc.)
- If the ComparisonValues parameter is not set, all variable categories from each variable will be compared to each other.
- If the ComparisonValues parameter is set, you can return just the specific demographic groups you are interested in.
- You may even choose up to three variables when performing crosstabs.

### Gap between year and jurisdiction

https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=gaponyearacrossjuris&subject=mathematics&grade=8&subscale=MRPCM&variable=TOTAL&jurisdiction=NP,CA&stattype=MN%3AMN&Year=2015,2013

- Type – gaponyearacrossjuris
- Must have 2 years
- Important returns

- Innerdiff1 – difference between stattype values between 2 years for focal jurisdiction
- Innerdiff2 – difference between stattype values between 2 years for target jurisdiction
- Gap – difference between innerdiff1 and innerdiff2

### Significance of gap of two variable category values across years

https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=gaponvaracrossyear&subject=mathematics&grade=8&subscale=MRPCM&variable=GENDER&jurisdiction=NP,CA&stattype=MN%3AMN&Year=2015,2013

- Type – gaponvaracrossyear
- Must have 2 or more years
- Must have a non “TOTAL” variable with 2 or more category values (e.g. GENDER, SDRACE)
- Important returns

- Innerdiff1 – difference of stattype values between variable values (e.g., between male and female students) for focal year
- Innerdiff2 – difference of stattype values between variable values for target year
- Gap – difference between innerdiff1 and innerdiff2

### Significance of gap of two variable category values across jurisdictions

https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=gaponvaracrossjuris&subject=mathematics&grade=8&subscale=MRPCM&variable=GENDER&jurisdiction=NP,CA&stattype=MN%3AMN&Year=2015,2013

- Type – gaponvaracrossjuris
- Must have 2 or more jurisdictions
- Must have a non “TOTAL” variable with 2 or more category values
- Important returns

- Innerdiff1 – difference of stattype values between variable category values (e.g., between male and female students) for focal jurisdiction
- Innerdiff2 – difference of stattype values between variable category values for target jurisdiction
- Gap – difference between innerdiff1 and innerdiff2

### Significance of gap of two variable category values and two years across jurisdictions

https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=gaponvarandyearacrossjuris&subject=mathematics&grade=8&subscale=MRPCM&variable=GENDER&jurisdiction=NP,CA&stattype=MN%3AMN&Year=2015,2013

- Type – gaponvarandyearacrossjuris
- Must have 2 or more jurisdictions
- Must have 2 or more years
- Must have a non “TOTAL” variable with 2 or more category values
- Important returns

- innerdiff1 – difference of stattype values between variable category values (e.g., between male and female students) in focal jurisdiction for focal year.
- innerdiff2 – difference of stattype values between variable category values (e.g., between male and female students) in focal jurisdiction for target year.

- innerdiff3 – difference of stattype values between variable category values (e.g., between male and female students) in target jurisdiction for focal year.
- innerdiff4 – difference of stattype values between variable category values (e.g., between male and female students) in target jurisdiction for target year.
- yeardiff1 – difference between innerdiff1 and innerdiff2
- yeardiff2 – difference between innerdiff3 and innerdiff4
- Gap – difference between yeardif1 and yeardiff2

Back to Top

##
Parameter Values

###

### Subject and Subscale

- Civics

- CIVRP – Civics scale

- Economics

- ERPCM – Composite scale

- ERPS1 – Market scale

- ERPS2 – National scale

- ERPS3 – International scale

- Geography

- GRPCM – Composite scale

- GRPS1 – Space and place scale

- GRPS2 – Environment and society scale

- GRPS3 – Spatial dynamics scale

- Mathematics 1990R2

- MRPCM – Composite scale

- MRPS1 – Number properties and operations scale

- MRPS2 – Measurement scale

- MRPS3 – Geometry scale

- MRPS4 – Data analysis, statistics, and probability scale

- MRPS5 – Algebra scale

- Mathematics 2005R3

- MWPCM – Composite Scale

- MWPS1 – Number properties and operations scale

- MWPS2 – Measurement and geometry scale

- MWPS3 – Data analysis, statistics, and probability scale

- MWPS4 – Algebra scale

- Music

- MUSRP – Music scale

- Reading

- RRPCM – Composite scale

- RRPS1 – Literary experience

- RRPS2 – Gain information scale

- RRPS3 – Perform a task scale

- RRPS4 – Gain and use information scale

- Science 1990R2

- SRPCM – Composite scale

- SRPS1 – Physical science scale

- SRPS2 – Earth science scale

- SRPS3 – Life science scale

- Science 2005R3

- SRPUV – Overall science scale

- TEL

- TRPUN – Overall scale

- TRPP1 – Communicating and collaborating practice scale

- TRPP2 – Developing solutions and Achieving goals practice scale

- TRPP3 – Understanding Technological Principles practice scale

- History

- HRPCM – Composite scale

- HRPS1 – Democracy Scale

- HRPS2 – Cultures scale

- HRPS3 – Technology scale

- HRPS4 – World role scale

- Visual Arts

- VISRP – Visual arts scale

- Vocabulary

- VOCRP – Meaning vocabulary scale

- Writing

- WRIRP – Writing scale

### Jurisdiction

- NT – National

- NP – National public

- NR – National private

- NL – Large city

- AL – Alabama

- AK – Alaska

- AZ – Arizona

- AR – Arkansas

- CA – California

- CO – Colorado

- CT – Connecticut

- DE – Delaware

- DC – District of Columbia

- DS – DoDEA

- FL – Florida

- GA – Georgia

- HI – Hawaii

- ID – Idaho

- IL – Illinois

- IN – Indiana

- IA – Iowa

- KS – Kansas

- KY – Kentucky

- LA – Louisiana

- ME – Maine

- MD – Maryland

- MA – Massachusetts

- MI – Michigan

- MN – Minnesota

- MS – Mississippi

- MO – Missouri

- MT – Montana

- NE – Nebraska

- NV – Nevada

- NH – New Hampshire

- NJ – New Jersey

- NM – New Mexico

- NY – New York

- NC – North Carolina

- ND – North Dakota

- OH – Ohio

- OK – Oklahoma

- OR – Oregon

- PA – Pennsylvania

- RI – Rhode Island

- SC – South Carolina

- SD – South Dakota

- TN – Tennessee

- TX – Texas

- UT – Utah

- VT – Vermont

- VA – Virginia

- WA – Washington

- WV – West Virginia

- WI – Wisconsin

- WY – Wyoming

- DD – DoDEA/DDESS

- DO – DoDEA/DoDDS

- XQ – Albuquerque

- XA – Atlanta

- XU – Austin

- XM – Baltimore City

- XB – Boston

- XT – Charlotte

- XC – Chicago

- XX – Clark County (NV)

- XV – Cleveland

- XS – Dallas

- XY – Denver

- XR – Detroit

- XW – District of Columbia (DCPS)

- XE – Duval County (FL)

- XZ – Fort Worth (TX)

- XF – Fresno

- XG – Guilford County (NC)

- XO – Hillsborough County (FL)

- XH – Houston

- XJ – Jefferson County (KY)

- XL – Los Angeles​

- XI – Miami-Dade

- XK – Milwaukee

- XN – New York City

- XP – Philadelphia

- XD – San Diego

- YA – Shelby County (TN)

- YB - Orange County (FL)
- ​XFCA – California without Fresno

- XLCA – California without Los Angeles
- XDCA – California without San Diego
- ​QQCA – California without any TUDAs
- XYCO – Colorado without Denver
- XWDC – District of Columbia without DCPS
- XEFL – Florida without Duval County
- XOFL – Florida without Hillsborough County
- XIFL – Florida without Miami-Dade
- YBFL – Florida without Orange County
- QQFL – Florida without any TUDAs
- XAGA – Georgia without Atlanta
- XCIL – Illinois without Chicago
- XJKY – Kentucky without Jefferson County
- XMMD – Maryland without Baltimore
- XBMA – Massachusetts without Boston
- XRMI – Michigan without Detroit
- XXNV – Nevada without Clark County
- XQNM – New Mexico without Albuquerque
- XNNY – New York without New York City
- XTNC – North Carolina without Charlotte
- XGNC – North Carolina without Guilford County
- QQNC – North Carolina without any TUDAs
- XVOH – Ohio without Cleveland
- XPPA – Pennsylvania without Philadelphia
- YATN – Tennessee without Shelby County
- XUTX – Texas without Austin
- XSTX – Texas without Dallas
- XZTX – Texas without Forth Worth
- XHTX – Texas without Houston
- QQTX – Texas without any TUDAs
- XKWI – Wisconsin without Milwaukee
- AS – American Samoa

- GU – Guam

- PR – Puerto Rico

- VI – Virgin Islands

### Grade/Cohort

- Use either grade or cohort, newer calls only take cohort

- Grade

- 4
- 8
- 12

- Cohort

- 1 = Grade 4 or Age 9

- 2 = Grade 8 or Age 13

- 3 = Grade 12 or Age 17

​

### Year

- R2 e.g., 1990R2 (R2 stands for accommodations not permitted sample)

- R3 e.g., 2016R3 (R3 stands for accommodations permitted sample)

- If R2 or R3 is not indicated, default is R3

- Base, Current, and Prior are keywords

- Base – first assessment year

- Current – most recent assessment year

- Prior – second most recent assessment year

### StatType

- MN:MN – Mean

- RP:RP – Row percent

- ALD:BA – Discrete achievement level – At Basic

- ALD:PR – Discrete achievement level – At Proficient

- ALD:AD – Discrete achievement level – At Advanced

- ALC:BB – Cumulative achievement level - Below Basic

- ALC:AB – Cumulative achievement level – At or above Basic

- ALC:AP – Cumulative achievement level – At or above Proficient

- ALC:AD – Cumulative achievement level – At Advanced

- SD:SD – Standard deviations

- PC:P1 – 10th percentile

- PC:P2 – 25th percentile

- PC:P5 – 50th percentile

- PC:P7 – 75th percentile

- PC:P9 – 90th percentile
- DP:DP – Distribution percentages in 10-point scale score intervals

### Categoryindex

- Categories are also known as variable values.

- For example, for SDRACE, White = 1, Black = 2, Hispanic = 3

- For example, for GENDER+SDRACE, 1+3 returns male Hispanic, 2+2 returns female Black, encode as 1%2B3,2%2B2
- CategoryIndex is not required in requests, If omitted all the values are returned

- NAEP Variable Values List API

- Returns variables values for the set of variables requested.

- Returns list of Varnames and its values.

- Use Value as categoryindex parameters for the main NAEP Data Service API.

- Parameters

- type = VariableValues

- NAEPIDs = Variable ID's

- Example Call
https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=VariableValues&NAEPIDs=Gender,SDRACE

​​

### Variable

- Student demographic groups or survey question variable or index.

- Commonly used variables

- TOTAL – All students

- SDRACE – Race/ethnicity used to report trends

- SRACE10 – Race/ethnicity using 2011 guidelines

- GENDER – Gender

- SLUNCH3 – National School Lunch Program eligibility

- PARED – Parental education level

- SCHTYPE – Public or nonpublic school

- CHRTRPT – School identified as charter

- UTOL4 – School location

- CENSREG – Region of the country

- IEP – Disability status of student, including those with 504 plan

- LEP – Status as English language learner

- NAEP Variable List API

- Returns a set of independent variables for each year and sample for the specified subject and cohort

- Returns Varname, short label and long label

- Use Varname as parameters for the main NAEP Data Service API

- ​Parameters

- type = independentvariables

- 1
subject

- 1
cohort, this call does not take the grade parameter

- List of valid
years separated by commas

- Example Call
https://www.nationsreportcard.gov/dataservice/getadhocdata.aspx?type=independentvariables&subject=RED&cohort=2&Year=1998,2019

- In addition to learning about the available variables using the API, details about the variable code used in the query string can be found in the
NAEP Data Explorer. In the “Select Variables” section, a pull- down menu containing the variable code appears when you click details, circled below by .

​

### Program parameter

The API supports multiple programs. When querying non-default datasets, the 'Program' parameter must be explicitly provided.

Supported programs include:

- NDE (default if omitted)
- LTT
- NIES
- STQ​
- HSTS

​​Note: If 'Program' is not specified, the API will default to NDE.

#### LTT Query Specifications

The subscale uses LTT-specific values (e.g., MRPSCT, RRPSCT).

- Year values must include sample designation:

- 1971–2004: use 'R1' (e.g., 1984R1)
- 2004–present: defaults to 'R3' if not specified

Example:

https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=data&Program=LTT&subject=MAT&cohort=1&subscale=MRPSCT&variable=TOTAL&jurisdiction=NT&stattype=MN%3aMN&Year=2022R3

#### NIES Query Specifications

- Subjects and Subscales:

- ​MAT and RED subjects use the same subscales as NDE

- For survey response results, use NIE as the subject and CONSTANT as the subscale

- Variables can be found in the Data Explorer.
- Jurisdiction codes differ from standard NAEP codes.

​

NIES Jurisdiction p​arameters
​​Parameter | Jurisdiction
NI | National AI/AN
NB | National AI/AN public and BIE
QK | Alaska AI/AN public (no BIE)
QZ | Arizona AI/AN public and BIE
QN | Minnesota AI/AN public and BIE
QT | Montana AI/AN public and BIE
QB | Nebraska AI/AN public and BIE
QM | New Mexico AI/AN public and BIE
QC | North Carolina public (no BIE)
QD | North Dakota AI/AN public and BIE
QO | Oklahoma AI/AN public and BIE
QR | Oregon public (no BIE)
QS | South Dakota AI/AN public and BIE
QU | Utah AI/AN public and BIE
QA | Washington AI/AN public and BIE
QW | Wisconsin AI/AN public and BIE
QY | Wyoming AI/AN public and BIE
I1 | Atlantic AI/AN
B1 | Atlantic AI/AN public and BIE
I2 | North central AI/AN
B2 | North central AI/AN public and BIE
I3 | South central AI/AN
B3 | South central AI/AN public and BIE
I4 | Mountain AI/AN
B4 | Mountain AI/AN public and BIE
I5 | Pacific AI/AN
B5 | Pacific AI/AN public and BIE

Example (NIES math average score):

https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=data&Program=NIES&subject=MAT&cohort=1&subscale=MRPCM&variable=TOTAL&jurisdiction=NI,NB&stattype=MN%3aMN&Year=2019R3

Example (NIES survey percentage​):

https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=data&Program=NIES&subject=NIE&cohort=1&subscale=CONSTANT&variable=IB19901&jurisdiction=NI,NB&stattype=RP%3aRP&Year=2019R3​

#### STQ Query Specifications

- Uses standard NAEP jurisdiction codes
- Only one dependent variable is available: CONSTANT

Example:

https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=data&Program=STQ&subject=TCH&cohort=1&subscale=CONSTANT&variable=CVS0302&jurisdiction=AL,AK&stattype=RP%3aRP&Year=2021R3​

#### HSTS Query Specificatons

- Jurisdiction: National-only jurisdiction (NT)
- Subjects:- MAT, SCI, TRN​
- Subscales:

- Mathematics (MWPCM, MWPS1–MWPS4)
- Science (SRPCM, SRPS1–SRPS3, SRPUV)
- Transcript (extensive TRN variables)

Example

https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=data&subject=MAT&grade=12&subscale=MWPCM&variable=TOTAL&jurisdiction=NT&stattype=MN:MN&Year=2019&program=HSTS

Note:

- Users must reference valid dependent variable codes from the
Data Explorer​
- Subject-specific dependents are required. See a
list of parameters for each subject-specific dependent variable.​

​​

Back to Top

##
Special and Optional Parameter Values

### RevealDa​taKeys

- Special parameter that exposes data keys in all the data points in the return

- Set value to true to see the data keys
- Example Call:
https://www.nationsreportcard.gov/nrcdataservice/GetAdhocData.aspx?type=gaponvaracrossjuris&subject=mathematics&grade=8&subscale=MRPCM&variable=GENDER&jurisdiction=NP,CA,CO,NJ,PA,NV&stattype=MN%3AMN&Year=2015,2013&RevealDataKeys=true

### ShowDetails (Show Standard Errors)

The API can return additional statistical details for data queries when the optional parameter 'QCData=true' is included.

When enabled, the response includes:
- Standard errors
- Coefficient of variation (CV)

Example:

https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=data&subject=mathematics&grade=8&subscale=MRPCM&variable=SDRACE%2BGENDER&categoryindex=2%2B1,2%2B2,3%2B1,3%2B2&jurisdiction=NP,CA&stattype=MN%3AMN&Year=2013,2015&StackType=RowThenCol&ShowDetails=true

### CollapseJ (Combine Jurisdictions)

- Special parameter that allows collapsed Jurisdictions

- CollapseJ - [code]:[jurisdictions]-[label]

- code - custom code or id to refer to the jurisdiction group
- jurisdicitons - list of jurisdictions separated by hyphen
- label - custom label to describe jurisdiction group

- Example Call:
https://nationsreportcard.gov/GetAdhocData.aspx?type=data&subject=mathematics&grade=8&subscale=MRPCM&variable=SDRACE&jurisdiction=NP,CA,CO,NJ,PA,NY,NV&stattype=MN%3AMN&Year=2013,2015&CollapseJ=THEC:CA-CO-The%20C%20States,ATL:NJ-PA-NY-CT-DE-Atlantic%20States
- Example Breakdown: THEC:CA-CO-The%20C%20States,ATL:NJ-PA-NY-CT-DE-Atlantic%20States

- There are 2 jurisdiction groups
- Jurisdiction Group 1

- Code - THEC

- Jurisdictions - California and Colorado
- Label - The C States (%20 is the code for a space)

- Jurisdiction Group 2

- Code - ATL
- Jurisdictions - NJ, PA, NY, CT, DE
- Label - Atlantic States​

​

Back to Top

##
Assessment Year and Subject Combinations

- Not all year, subject combinations have data.

- For information about year and subject combinations at the national, state, and district levels, see the full schedule of NAEP assessments or the
NAEP Data Explorer.

- See further information about
state and district participation.

Back to Top

##
Error Codes

​

The error code is a numeric value that is the sum of multiple error flags. Each number is the sum of a unique set of error codes. For example, an error code of 33 would signify error flags with numeric values of 1 and 32 and indicate the error flags, "Reporting Standard Not Met" and "Non-qualified independent variable". Priority means if multiple error flags are present, an error flag with priority 1 takes precedence over an error flag with priority 2.

​​​Numeric Value | Actual Bit Number | Description | Symbol Shown Stat | Symbol Shown SE | Priority
1 | 1
| Reporting Standard Not Met (NDE) | ‡ | † | No Priority
​2
| 2
| Extreme P | ‡ | †
| No Priority
​4
| 3
| High CV | Stat is shown​​
| †
| No Priority
8
| 4
| Non-accommodated Sample
| Stat is shown
| SE is shown
| No Priority
16 | 5
| Exclusion List | ‡ | †
| 1
32 | 6 | Non-qualified independent Variable | ‡ | † | 1
64 | 7 | No Data | —
| † | 1
128 | 8
| Rounds to Zero | #
| † | 2
256 | 9 | SE Not Applicable | No Symbol
| †
| No Priority

512 | 10
| Race Note Type 1 | NOTE - Stat is shown | NOTE
No Priority
2048 | 12 | Response Rate Below 85% | Statistic is shown with ! | SE is shown
| No Priority
4096 | 13
| Response Rate Below 50% But > 0% | ‡ | † | 1
16384 | 15 | Significance | Statistics shown with star in charts | SE is shown | No Priority
32768 | 16 | Zero Percent Response Rate | —
| † | 1
131072 | 18 | Jurisdiction Note | NOTE - Stat is shown | NOTE - Stat is shown | No Priority
4194304 | 23 | Race Note Type 2 | NOTE - Stat is shown | No Symbol
| No Priority
8388608
| 24 | Race Note Type 3 | NOTE - Stat is shown | No Symbol | No Priority
16777216
| 25 | IEP Note | NOTE - Stat is shown | No Symbol | No Priority
33554432 | 26 | IEP2009 Note | NOTE - Stat is shown | No Symbol | No Priority

67108864 | 27 | DoDEA Note
| NOTE - Stat is shown | No Symbol | No Priority
134217728 | 28 | Dallas Note | NOTE - Stat is shown | No Symbol | No Priority
268435456 | 29 | Skipped Variables Note | NOTE - Stat is shown | No Symbol | No Priority

An error flag indicated as producing NOTE text means that in the NAEP Data Explorer tool, a note would appear below the tabular result for the selected variable. EXAMPLE: A report produced in the NAEP Data Explorer using the SDRACE variable would produce an API Result with the numeric error value 512 indicated (error bit 10) triggered for each statistic returned. The error code table says "NOTE – Stat is shown". This means that the statistic is displayed in the results table as requested, but that a note applies to the result relating to the variable SDRACE. When more than one note text applies, the various statements will be stitched together as sentences in a paragraph following the word NOTE. This logic is defined as part of the NAEP statistical reporting standards set forth by NCES. The easiest way to see how notes work together is to perform some queries in the NAEP Data Explorer that trigger note conditions, such as SDRACE for Washington DC (combines the race note number 512 with the jurisdiction note 131072).

Numeric Value | Actual Bit Number | Note Text
512 | 10 | Black includes African American, Hispanic includes Latino, and Pacific Islander includes Native Hawaiian. Race categories exclude Hispanic origin. Prior to 2011, students in the "Two or More Races" category were categorized as "unclassified."
131072 | 18 | DCPS = District of Columbia Public Schools.
4194304 | 23 | Black includes African American, and Hispanic includes Latino. Race categories exclude Hispanic origin.
8388608 | 24 | Black includes African American, Hispanic includes Latino, and Pacific Islander includes Native Hawaiian. Race categories exclude Hispanic origin.
16777216 | 25 | IEP NOTE: The category "students with disabilities" includes students identified as having either an Individualized Education Program (IEP) or protection under Section 504 of the Rehabilitation Act of 1973.
33554432 | 26 | IEP2009 NOTE: The category "students with disabilities" includes students identified as having an Individualized Education Program (IEP) but excludes those identified under Section 504 of the Rehabilitation Act of 1973.
67108864 | 27 | DoDEA NOTE: DoDEA = Department of Defense Education Activity. Some apparent differences between estimates may not be statistically significant.
134217728 | 28 | Dallas NOTE: The 2017 assessed sample for Dallas in grade 4 reading was not representative of the target population for two major reporting groups: Hispanic and English language learner students. Assessed samples in Dallas for other grades and subjects in 2017 were unaffected.

268435456 | 29 | Some respondents did not receive this question based on their response to a previous question in the survey, and those respondents are included in the "missing" category.

Back to Top

​

- Download Data Tables

- Customize Data Tables

Download data summarizing:

- participation rates

- inclusion rates and other information about students with disabilities (SD) and English learners (EL)

Subject

Arts
Civics
Geography
Long-Term Trend Reading & Mathematics at Age 9
Long-Term Trend Reading & Mathematics at Age 13
Mathematics (National)
Mathematics {State/District} -->
Mathematics (Grade 12)
Reading (National)
Reading (State/District) -->
Reading (Grade 12)
Science
Technology & Engineering Literacy
U.S. History
Vocabulary

excel filepdf file

Generate custom tables by selecting criteria below:

Jurisdiction

Select a Jurisdiction
National
States
Districts

Grade

Select a Grade
Grade 4
Grade 8
Grade 12

Subject

Select a Subject
Civics
Economics
Geography
Mathematics
Music
Reading
Science
Technology & Engineering Literacy
U.S. History
Visual Arts
Vocabulary
Writing

Statistic

Average Score
Percentages
Achievement Level
Percentiles

Variable
Overall

Overall
Gender
Race/Ethnicity
Region
Type of School
Charter Schools
NSLP Eligibility
Parental Education
School Location
Students with Disabilities
English Learners

create table

Related Links

- About The Nation's Report Card

- About National Assessment of Educational Progress (NAEP)

- Contacts

- FAQs

- Glossary

FOLLOW US
