# Envirofacts Web Services

Source: https://www.epa.gov/enviro/web-services

---

Web Services | US EPA

Skip to main content

Official websites use .gov

A .gov website belongs to an official government organization in the United States.

Secure .gov websites use HTTPS

A lock () or https:// means you’ve safely connected to the .gov website. Share sensitive information only on official, secure websites.

#
Web Services

DMAP | Home | Multisystem Search | Topic Searches | System Data Searches | About the Data | Data Downloads | Widgets | Services | Mobile | Other Datasets

DMAP has developed web services to facilitate the sharing of its functionality and information. All of the services that are available within DMAP are listed below.
A RESTful data service API is available for DMAP-EF UV Index Hourly and Daily forecast data.
The entire DMAP-EF database metadata is available online, with all tables and columns within DMAP-EF documented. Having the table structures available in this manner makes most of DMAP-EF data easily available through the services. Logical data models for use in the DMAP-EF APIs, are available at the DMAP-EF data model page. This page contains links to all of the EPA systems and data models contained within DMAP-EF.

## GraphQL API

The DMAP API is a GraphQL-like API that is available to access data within DMAP. This API provides the ability to create more complex queries than the RESTful API below. Documentation for the API is available at the DMAP GraphQL API Overview.

## DMAP-EF RESTful Data Service API

DMAP has developed a RESTful data service API for all its internal data holdings. This functionality provides users with the ability to query any table via an URL. The default output is in JSON. Additional output options of CSV, Excel, HTML, JSONP, Parquet, PDF, and XML can be requested in the URL.

### Strengths and Limitations of the DMAP-EF RESTful Service

The DMAP REST Service is simple and easy to use to access multiple data sources within EPA. The resulting output formats can be easily used with desktop applications such as Excel or used in other custom applications.
The service currently limits to requests to being completed in under 15 minutes. If more data is needed than this, users can page through the data, requesting the next set of records in the table.

### Constructing a Search

To build a search, users create a URL with a specific set of parameters. This is done by creating a string using the following format:

#### https://data.epa.gov/dmapservice/[table]/[column][operator][value]/[join]/[first]:[last]/[sort]/[format]

**Table
**: Required. At least one table name is required. When inserting multiple tables into the URL, they must share an ID or common column, so that the tables can be joined or linked. To retrieve an accurate output, it is best to use tables that share an ID column. For example, within the RCRAInfo tables, they often share an ID column called handler_id.
The table name must match the format [program].[table]. The program is the schema or acronym to which the table belongs, e.g., SEMS, RCRA, GHG, TRI. The table is the name of the table in the database. As an example, to query the table "ogd_vw_ef_base" in the NGGS program, the table entry would be nggs.ogd_vw_ef_base.

**Filter
**: To filter the records returned in the query, one or more filters can be applied to a query. The filter must be in format: [column][operator][value]. The column attribute is the table column that will be compared in the filter. The operator is a symbol that will be the basis for the comparison, e.g., equals, not equals, greater than, etc. The list of operators with descriptions is: "equals", "notEquals", "lessThan", "lessThanEqual", "greaterThan", "greaterThanEqual", "beginsWith", "endsWith", "contains", "excludes", "like", "notLike", "in", and "notIn". The value attribute is what the column will be compared against. Operators can be combined using the /and/, which requires both filters to be met, and /or/, which requires either one of the filter's criteria to be met.
As an example, to restrict a query of the NEI facilities in the 2017 summary data to those in Houston, TX, this filter would work: state_code/equals/TX/and/city_name/equals/Houston. When filter operations are performed on text fields, the comparison is case-insensitive.

**Join
**: Combine results from two tables using the available join types. The format is like a table and filter combination: [join_type]/[table]/[comparison]. The join value is the appropriate join type. The table is the table that should be joined, matching the structure of the table value above. Finally, the (optional) comparison is structured the same as the filter above, just comparing two table columns.
As an example, to include contaminants in a SEMS query of sites, /sems.envirofacts_site/left/sems.envirofacts_contaminants/site_id/equals/fk_site_id would perform a left join and include data from the envirofacts_contaminants table.

**First
**: The first record to retrieve, starts at 1.

**Last
**: The last record to retrieve.

**Order
**: Sort the fields in the results. The format for applying a sort is /sort/[column]:[direction]/. The column is the field that needs to be sort . The direction is optional and can either be asc or desc. "asc" means the field will be sorted in ascending order. "desc" means the field will be sorted in descending order. If no direction is supplied, "asc" will be used as the default sort direction.

**Format
**: The export format, e.g., JSON, JSONP, CSV, Excel, HTML, Parquet, PDF, and XML. The default format is JSON.

For example:

- https://data.epa.gov/dmapservice/tri.tri_facility/state_abbr/equals/VA/500:505
returns result set records 500 to 505 from the TRI Facility table where state_abbr = 'VA'.
- https://data.epa.gov/dmapservice/icis.icis_comp_monitor/comp_monitor_category_code/equals/ALT/sort/created_date/1:100000
returns the first 100,000 records from ICIS icis_comp_monitor table where the comp_monitor_category_code = “ALT”. The records will be sorted by the created_date field in ascending order.
- https://data.epa.gov/dmapservice/tri.tri_facility/state_abbr/equals/HI/join/tri.tri_reporting_form
returns results from the TRI Facility and TRI Reporting Form tables where the state is HI in the TRI Facility table.
- https://data.epa.gov/dmapservice/tri.tri_reporting_form/join/tri.tri_facility/state_abbr/equals/VA/join/tri.tri_chem_info/excel
returns results from the TRI Facility, TRI Reporting Form and TRI Chem Info tables where the state is VA in the TRI Facility table in Excel format .
- https://data.epa.gov/dmapservice/tri.tri_facility/zip_code/beginsWith/600/JSON
returns results from the TRI Facility table where zip_code "Begins With" 600 in a JSON format.
- https://data.epa.gov/dmapservice/tri.tri_facility/state_abbr/equals/VA/CSV
returns result from the TRI Facility table where state_abbr = 'VA'in a CSV format.

## UV Index

Retrieve UV Index data thru web services: a RESTful data service API. The information is searchable by ZIP Code and city, state, making it useful for any organization, either local or national. Users do not have to leave your site to see the forecast. The UV Index Overview provides additional information on the data. Both approaches are detailed below.

### RESTful Data Service API

This functionality provides a user of UV Index data, within DMAP-EF, the ability to query daily or hourly forecast data through the use of a URL. The four APIs for retrieving UV Index forecast information are:

- Get the Hourly UV Index forecast by ZIP Code
- Get the Hourly UV Index forecast by City and State
- Get the Daily UV Index forecast by ZIP Code
- Get the Daily UV Index forecast by City and State
Get the Hourly UV Index forecast by ZIP Code
Use this API to search for Hourly UV Index forecast results in a given ZIP Code.

### URL

https://data.epa.gov/dmapservice/getEnvirofactsUVHOURLY/ZIP/{ZIP Code}/{Output Format}

### Parameters

Parameter | Description
ZIP Code | A valid United States Postal Service (USPS) ZIP Code or Postal Code.
Output Format | The API can retrieve results as XML, JSON, EXCEL or CSV. Set the Output Format to one of these values (XML, JSON, EXCEL, CSV). By default the API will return results as XML.

### Results

Output Column | Description
Order | Used in sequentially ordering the output, ensuring the data is presented in correct chronological order.
ZIP | The ZIP Code for which the Hourly UV Index forecast results have been retrieved.
DATE_TIME | The date and time of the UV Index forecast value. The date/time is displayed in the local time of the requested ZIP Code.
UV_VALUE | The UV Index forecast value.

### Example API Requests

Hourly UV Index forecast results for ZIP Code 20050 in XML: https://data.epa.gov/dmapservice/getEnvirofactsUVHOURLY/ZIP/20050
Hourly UV Index forecast results for ZIP Code 20050 in JSON: https://data.epa.gov/dmapservice/getEnvirofactsUVHOURLY/ZIP/20050/JSON
Hourly UV Index forecast results for ZIP Code 20050 in EXCEL: https://data.epa.gov/dmapservice/getEnvirofactsUVHOURLY/ZIP/20050/EXCEL
Hourly UV Index forecast results for ZIP Code 20050 in CSV: https://data.epa.gov/dmapservice/getEnvirofactsUVHOURLY/ZIP/20050/CSV

Get the Hourly UV Index forecast by City and State
Use this API to search for Hourly UV Index forecast results in a given City, State.

### URL

https://data.epa.gov/dmapservice/getEnvirofactsUVHOURLY/CITY/{City Name}/STATE/{State Abbreviation}/{Output Format}

### Parameters

Parameter | Description
City Name | A valid City Name in the United States.
State Abbreviation | The abbreviation of the state that the city resides in.
Output Format | The API can retrieve results as XML, JSON, EXCEL or CSV. Set the Output Format to one of these values (XML, JSON, EXCEL, CSV). By default the API will return results as XML.

### Results

Output Column | Description
Order | Used in sequentially ordering the output, ensuring the data is presented in correct chronological order.
City | The city for which the Hourly UV Index forecast results have been retrieved.
State | The state in which the city resides in.
DATE_TIME | The date and time of the UV Index forecast value. The date/time is displayed in the local time of the requested City, State.
UV_VALUE | The UV Index forecast value.

### Example API Requests

Hourly UV Index forecast results for Washington, DC in XML: https://data.epa.gov/dmapservice/getEnvirofactsUVHOURLY/CITY/washington/STATE/DC
Hourly UV Index forecast results for Washington, DC in JSON: https://data.epa.gov/dmapservice/getEnvirofactsUVHOURLY/CITY/washington/STATE/dc/JSON
Hourly UV Index forecast results for Washington, DC in EXCEL: https://data.epa.gov/dmapservice/getEnvirofactsUVHOURLY/CITY/washington/STATE/dc/EXCEL
Hourly UV Index forecast results for Washington, DC in CSV: https://data.epa.gov/dmapservice/getEnvirofactsUVHOURLY/CITY/washington/STATE/dc/CSV

Get the Daily UV Index and Alert forecast by Zip Code
Use this API to search for Daily UV Index forecast and alert results in a given ZIP Code.

### URL

https://data.epa.gov/dmapservice/getEnvirofactsUVDAILY/ZIP/{ZIP Code}/{Output Format}

### Parameters

Parameter | Description
ZIP Code | A valid United States Postal Service (USPS) ZIP Code or Postal Code.
Output Format | The API can retrieve results as XML, JSON, EXCEL or CSV. Set the Output Format to one of these values (XML, JSON, EXCEL, CSV). By default the API will return results as XML.

### Results

Output Column | Description
ZIP | The ZIP Code for which the Daily UV Index forecast results have been retrieved.
UV_VALUE | The UV Index forecast value.
UV_ALERT | A character indicating if there is a UV Index alert issued for this area on the forecast day.

### Example API Requests

Daily UV Index forecast and alert results for ZIP Code 20050 in XML:
https://data.epa.gov/dmapservice/getEnvirofactsUVDAILY/ZIP/20050
Daily UV Index forecast and alert results for ZIP Code 20050 in JSON: https://data.epa.gov/dmapservice/getEnvirofactsUVDAILY/ZIP/20050/JSON
Daily UV Index forecast and alert results for ZIP Code 20050 in EXCEL: https://data.epa.gov/dmapservice/getEnvirofactsUVDAILY/ZIP/20050/EXCEL
Daily UV Index forecast and alert results for ZIP Code 20050 in CSV:
https://data.epa.gov/dmapservice/getEnvirofactsUVDAILY/ZIP/20050/CSV

Get the Daily UV Index and Alert forecast by City and State
Use this API to search for Daily UV Index forecast and alert results in a given City, State.

### URL

https://data.epa.gov/dmapservice/getEnvirofactsUVDAILY/CITY/{City Name}/STATE/{State Abbreviation}/{Output Format}

### Parameters

Parameter | Description
City Name | A valid City Name in the United States.
State Abbreviation | The abbreviation of the state that the city resides in.
Output Format | The API can retrieve results as XML, JSON, EXCEL or CSV. Set the Output Format to one of these values (XML, JSON, EXCEL, CSV). By default the API will return results as XML.

### Results

Output Column | Description
City | The city for which the Daily UV Index forecast results have been retrieved.
State | The state in which the city resides in.
UV_VALUE | The UV Index forecast value.
UV_ALERT | A character indicating if there is a UV Index alert issued for this area on the forecast day.

### Example API Requests

Daily UV Index forecast and alert results for Washington, DC in XML: https://data.epa.gov/dmapservice/getEnvirofactsUVDAILY/CITY/washington/STATE/dc
Daily UV Index forecast and alert results for Washington, DC in JSON: https://data.epa.gov/dmapservice/getEnvirofactsUVDAILY/CITY/washington/STATE/dc/JSON
Daily UV Index forecast and alert results for Washington, DC in EXCEL: https://data.epa.gov/dmapservice/getEnvirofactsUVDAILY/CITY/washington/STATE/dc/EXCEL
Daily UV Index forecast and alert results for Washington, DCin CSV: https://data.epa.gov/dmapservice/getEnvirofactsUVDAILY/CITY/washington/STATE/dc/CSV

## Envirofacts Links

- Data Model
- Data Service API
- Data Updates
- Contact Us

## System Data Searches

Envirofacts

- Multisystem Search
- BR Search
- GHG Search
- ICIS Search
- ICIS Air Pollution Search
- RADNET Radiation Search
- RCRAInfo Search
- NEI Search
- NGGS Search
- SDWIS Search
- SEMS Search
- UV Index Search
Toxic Release Inventory (TRI)

- TRI Explorer
- TRI Search
- Form R Search
- Form R & A Download
- EZ Search
- Customized Search
- Pollution Prevention
Facility Registry Service (FRS) Query

- FRS Query
- FRS Organization Query Form
Map of Cleanups in My Community
ECHO
SRS Search

## Other Sites of Interest

- Geospatial Download

- EnviroMapper

- MyEnvironment

## Envirofacts

Contact Us About Envirofacts

Contact Us About Envirofacts to ask a question, provide feedback, or report a problem.

Last updated on April 26, 2026
