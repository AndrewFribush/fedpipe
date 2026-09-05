# Disaster Declarations Summaries

Source: https://www.fema.gov/openfema-data-page/disaster-declarations-summaries-v2

---

Disaster Declarations Summaries - v2 | FEMA.gov

Skip to main content

Official websites use .gov

A .gov website belongs to an official government organization in the United States.

Secure .gov websites use HTTPS

A lock (

) or https:// means you’ve safely connected to the .gov website. Share sensitive information only on official, secure websites.
.

About

- Reports & Data

Reports & Data

OpenFEMA

Data Sets

Frequently Asked Questions

Changelog

API Documentation

Working with Large Datasets

Developer Resources

Open Government

Other FEMA Data Sources

Terms and Conditions

Annual Reports

Data Visualizations

Disaster Relief Fund Reports

FEMA Guidance Documents

Glossary

About Us

Newsroom

FEMA in Action

# OpenFEMA Dataset:
Disaster Declarations Summaries - v2

Version: 2

Last Data Refresh: 09-05-2026

Key
Value

Entity Name
DisasterDeclarationsSummaries

API Endpoint

https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries

Update Frequency
R/PT20M

Program URL

https://www.fema.gov/disasters/how-declared

Category
Disaster Information

Keywords

disaster

## Description

Disaster Declarations Summaries is a summarized dataset describing all federally declared disasters. This dataset lists all official FEMA Disaster Declarations, beginning with the first disaster declaration in 1953 and features all three disaster declaration types: major disaster, emergency, and fire management assistance. The dataset includes declared recovery programs and geographic areas (county not available before 1964; Fire Management records are considered partial due to historical nature of the dataset).
Please note the unique structure of the disaster sequencing (due to a numbering system that originated in the 1950's-1970's):
0001-1999 Major Disaster Declaration
2000-2999 Fire Management
3000-3999 Emergency Declaration (Special Emergency)
4000-4999 Major Disaster Declaration
5000-5999 Fire Management
For more information on the disaster declaration process, see https://www.fema.gov/disasters and https://www.fema.gov/disasters/how-declared
This is raw, unedited data from FEMA's National Emergency Management Information System (NEMIS) and as such is subject to a small percentage of human error. The dataset is primarily composed of historical data that was manually entered into NEMIS after it launched in 1998.
Additionally, NEMIS utilizes census data from the United States Census Bureau in which Tribal Nations are listed as localities within a State. As such, disaster declarations for Tribal Nations are currently included in State data.
Citation: FEMA's citation requirements for datasets (API usage or file downloads) can be found on the OpenFEMA Terms and Conditions page, Citing Data section: https://www.fema.gov/about/openfema/terms-conditions.
For answers to Frequently Asked Questions (FAQs) about the OpenFEMA program, API, and publicly available datasets, please visit: https://www.fema.gov/about/openfema/faq.
If you have media inquiries about this dataset, please email the FEMA Press Office at FEMA-Press-Office@fema.dhs.gov. For inquiries about FEMA's data and Open Government program, please email the OpenFEMA team at OpenFEMA@fema.dhs.gov.

## Full Data

Format
Address
Record Count
Approximate File Size

csv

Link to csv

70401

small (10MB - 50MB)

json

Link to json

70401

small (10MB - 50MB)

jsona

Link to jsona

70401

small (10MB - 50MB)

jsonl

Link to jsonl

70401

small (10MB - 50MB)

parquet

Link to parquet

70401

tiny (< 10MB)

## Data Fields

Name
Title
Type
Description
Is Searchable

femaDeclarationString
FEMA Declaration String

text

Agency standard method for uniquely identifying Stafford Act declarations - Concatenation of declaration type, disaster number and state code. Ex: DR-4393-NC
yes

disasterNumber
Disaster Number

smallint

Sequentially assigned number used to designate an event or incident declared as a disaster. For more information on the disaster process, please visit https://www.fema.gov/disasters/how-declared
yes

state
State

text

The name or phrase describing the U.S. state, district, or territory
yes

declarationType
Declaration Type

text

Two character code that defines if this is a major disaster, fire management, or emergency declaration. For more information on the disaster process, please visit https://www.fema.gov/disasters/how-declared
yes

declarationDate
Declaration Date

date

Date the disaster was declared
yes

fyDeclared
FY Declared

smallint

Fiscal year in which the disaster was declared
yes

incidentType
Incident Type

text

The primary or official type of incident such as fire or flood. Secondary incident types may have been designated. See the designatedIncidentTypes field. For more information on incident types, please visit https://www.fema.gov/disasters/how-declared.
yes

declarationTitle
Declaration Title

text

Title for the disaster
yes

ihProgramDeclared
IH Program Declared

boolean

Denotes whether the Individuals and Households program was declared for this disaster. For more information on the program, please visit https://www.fema.gov/assistance/individual/program. To determine which FEMA events have been authorized to receive Individual Assistance, use both ihProgramDeclared and iaProgramDeclared. For more information see https://www.fema.gov/about/openfema/faq
yes

iaProgramDeclared
IA Program Declared

boolean

Denotes whether the Individual Assistance program was declared for this disaster. For more information on the program, please visit https://www.fema.gov/assistance/individual/program. To determine which FEMA events have been authorized to receive Individual Assistance, use both ihProgramDeclared and iaProgramDeclared. For more information see https://www.fema.gov/about/openfema/faq
yes

paProgramDeclared
PA Program Declared

boolean

Denotes whether the Public Assistance program was declared for this disaster. For more information on the program, please visit https://www.fema.gov/assistance/public/program-overview
yes

hmProgramDeclared
HM Program Declared

boolean

Denotes whether the Hazard Mitigation program was declared for this disaster. For more information on the program, please visit https://www.fema.gov/grants/mitigation/hazard-mitigation
yes

incidentBeginDate
Incident Begin Date

date

Date the incident itself began
yes

incidentEndDate
Incident End Date

date

Date the incident itself ended
yes

disasterCloseoutDate
Disaster Closeout Date

date

Date all financial transactions for all programs are completed
yes

tribalRequest
Tribal Request

boolean

Denotes that a declaration request was submitted directly to the President, independently of a state, by a Tribal Nation.
yes

fipsStateCode
FIPS State Code

text

FIPS two-digit numeric code used to identify the United States, the District of Columbia, US territories, outlying areas of the US and freely associated states
yes

fipsCountyCode
FIPS County Code

text

FIPS three-digit numeric code used to identify counties and county equivalents in the United States, the District of Columbia, US territories, outlying areas of the US and freely associated states. Please note that Indian Reservations are not counties and thus will not have a FIPS county code, please utilize the placeCode field instead. If the designation is made for the entire state, this value will be 000 as multiple (all) counties cannot be entered.
yes

placeCode
Place Code

text

A unique code system FEMA uses internally to recognize locations that takes the numbers '99' + the 3-digit county FIPS code. There are some declared locations that dont have recognized FIPS county codes in which case we assigned a unique identifier
yes

designatedArea
Designated Area

text

The name or phrase describing the geographic area that was included in the declaration
yes

declarationRequestNumber
Declaration Request Number

text

Number assigned to the declaration request
yes

declarationRequestDate
Declaration Request Date

date

The date when the declaration request was made
yes

lastIAFilingDate
Last IA Filing Date

date

Last date when IA requests can be filed. Data available after 1998 only. The date only applies if IA has been approved for the disaster.
yes

incidentId
Incident Identifier

text

Unique identifier for an incident. Incidents are events that may or may not become declared disasters.
yes

region
Region

smallint

Number (1-10) used to represent the FEMA region where the disaster occurred.
yes

designatedIncidentTypes
Declared Incident types

text

A comma-separated list of incident types designated for the disaster. The primary incident type is described in the incidentType field. Codes are: 0: Not applicable; 1: Explosion; 2: Straight-Line Winds; 3: Tidal Wave; 4: Tropical Storm; 5: Winter Storm; 8: Tropical Depression; A: Tsunami; B: Biological; C: Coastal Storm; D: Drought; E: Earthquake; F: Flood; G: Freezing; H: Hurricane; I: Terrorist; J: Typhoon; K: Dam/Levee Break; L: Chemical; M: Mud/Landslide; N: Nuclear; O: Severe Ice Storm; P: Fishing Losses; Q: Crop Losses; R: Fire; S: Snowstorm; T: Tornado; U: Civil Unrest; V: Volcanic Eruption; W: Severe Storm; X: Toxic Substances; Y: Human Cause; Z: Other
yes

lastRefresh
Last Refresh

datetimez

Date the record was last updated in the API data store
yes

hash
Hash

text

MD5 Hash of the fields and values of the record
no

id
ID

uuid

Unique ID assigned to the record
yes

## See Also

Access the metadata API calls for additional information:

https://www.fema.gov/api/open/v1/OpenFemaDataSets?$filter=name%20eq%20%27DisasterDeclarationsSummaries%27

https://www.fema.gov/api/open/v1/OpenFemaDataSetFields?$filter=openFemaDataSet%20eq%20%27DisasterDeclarationsSummaries%27%20and%20datasetVersion%20eq%202

Last updated September 5, 2026

Return to top
