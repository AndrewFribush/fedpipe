# API Docs

Source: https://www.ncei.noaa.gov/cdo-web/webservices/v2

---

Web Services API (version 2) Documentation | Climate Data Online (CDO) | National Climatic Data Center (NCDC)

Home > Climate Data Online > NCEI Web Services

- Datasets

- Search Tool

- Mapping Tool

- Data Tools

- Help

# Climate Data Online: Web Services Documentation

- Getting Started
- Datasets
- Data Categories
- Data Types
- Location Categories
- Locations
- Stations
- Data

## Getting Started with Web Services v2

NCDC's Climate Data Online (CDO) offers web services that provide access to current data. This API is for developers looking to create their own scripts or programs that use the CDO database of weather and climate data. An access token is required to use the API, and each token will be limited to five requests per second and 10,000 requests per day.

### Step 1: Request token

In order to access the CDO web services a token must first be obtained from the token request page.

### Step 2: Make a request

To make a request use the base url with one of the endpoint paths appended.

#### Base URL

https://www.ncei.noaa.gov/cdo-web/api/v2/{endpoint}

#### Endpoints

Endpoint
Description

/datasets
A dataset is the primary grouping for data at NCDC.

/datacategories
A data category is a general type of data used to group similar data types.

/datatypes
A data type is a specific type of data that is often unique to a dataset.

/locationcategories
A location category is a grouping of similar locations.

/locations
A location is a geopolitical entity.

/stations
A station is a any weather observing platform where data is recorded.

/data
A datum is an observed value along with any ancillary attributes at a specific place and time.

#### Header

header
usage
Description

token
curl -H "token:<token>" "url"
$.ajax({ url:<url>, data:{<data>}, headers:{ token:<token> } })
The token obtained from the token request page.

#### Pagination

Parameter
Example
Description

limit
50
Limits the amount of results returned to 50.

offset
85
Begin with record number 85.

### Step 3: Get a response

All responses are JSON and will be a single item or a collection of items with metadata.

#### Single item

{
"id": "GSOY",
"name": "Global Summary of the Year",
"datacoverage": 1,
"mindate": "1763-01-01",
"maxdate": "2015-01-01"
}

#### Collection of items with metadata

{
"results": [
{
"id": "GSOY",
"name": "Global Summary of the Year",
"datacoverage": 1,
"mindate": "1763-01-01",
"maxdate": "2015-01-01"
},
...
],
"metadata": {
"resultset": {
"limit": 25,
"count": 11,
"offset": 1
}
}
}

## Datasets

All of the CDO data are in datasets. The containing dataset must be known before attempting to access its data.

## Endpoints

Path
Description

https://www.ncei.noaa.gov/cdo-web/api/v2/datasets/{id}
Used to find information about dataset with id of {id}

https://www.ncei.noaa.gov/cdo-web/api/v2/datasets
When used without optional parameters, fetches list of available datasets. Use with optional parameters below to filter results

## Additional Parameters

Parameter
Example
Description

datatypeid
ACMH
Optional. Accepts a valid data type id or a chain of data type ids separated by ampersands
(e.g. datatypeid=TAVG&datatypeid=TOBS) or a common separated list (e.g. datatypeid=TAVG,TOBS).
Datasets returned will contain all of the data type(s) specified

locationid
FIPS:37
Optional. Accepts a valid location id or a chain of location ids separated by ampersands
(e.g. locationid=FIPS:37&locationid=FIPS:45) or a common separated list (e.g. locationid=FIPS:37,FIPS:45).
Datasets returned will contain data for the location(s) specified

stationid
COOP:010957
Optional. Accepts a valid station id or a chain of station ids separated by ampersands
(e.g. stationid=COOP:310090&stationid=COOP:310184) or a common separated list (e.g. stationid=COOP:310090,COOP:310184).
Datasets returned will contain data for the station(s) specified

startdate
1970-10-03
Optional. Accepts valid ISO formated date (yyyy-mm-dd).
Datasets returned will have data after the specified date.
Paramater can be use independently of enddate

enddate
2012-09-10
Optional. Accepts valid ISO formated date (yyyy-mm-dd).
Datasets returned will have data before the specified date.
Paramater can be use independently of startdate

sortfield
name
Optional. The field to sort results by. Supports id, name,
mindate, maxdate, and datacoverage fields

sortorder
desc
Optional. Which order to sort by, asc or desc.
Defaults to asc

limit
42
Optional. Defaults to 25, limits the number of results in the response. Maximum is 1000

offset
24
Optional. Defaults to 0, used to offset the resultlist.
The example would begin with record 24

## Examples

Click on the links below and a preview will display example results from

each REST query. Copy the URL listed below to use as a reference.

*Note: Assigned token is required to use these queries and must be in the header

Fetch all available datasets

https://www.ncei.noaa.gov/cdo-web/api/v2/datasets

Fetch all information about the GSOY dataset specifically

https://www.ncei.noaa.gov/cdo-web/api/v2/datasets/GSOY

Fetch all available datasets with the Temperature at the time of observation (TOBS) data type

https://www.ncei.noaa.gov/cdo-web/api/v2/datasets?datatypeid=TOBS

Fetch all available datasets with data for a given set of stations

https://www.ncei.noaa.gov/cdo-web/api/v2/datasets?stationid=COOP:310090&stationid=COOP:310184&stationid=COOP:310212

## Data Categories

Data Categories represent groupings of data types.

## Endpoints

Path
Description

https://www.ncei.noaa.gov/cdo-web/api/v2/datacategories/{id}
Used to find information about datacategory with id of {id}

https://www.ncei.noaa.gov/cdo-web/api/v2/datacategories
When used without optional parameters, fetches list of available datacategories. Use with optional parameters below to filter results

## Additional Parameters

Parameter
Example
Description

datasetid
GSOM
Optional. Accepts a valid dataset id or a chain of dataset ids separated by ampersands.
Data categories returned will be supported by dataset(s) specified

locationid
FIPS:37
Optional. Accepts a valid location id or a chain of location ids separated by ampersands.
Data categories returned will contain data for the location(s) specified

stationid
COOP:310301
Optional. Accepts a valid station id or a chain of of station ids separated by ampersands.
Data categories returned will contain data for the station(s) specified

startdate
1970-10-03
Optional. Accepts valid ISO formated date (yyyy-mm-dd).
Data categories returned will have data after the specified date.
Paramater can be use independently of enddate

enddate
2012-09-10
Optional. Accepts valid ISO formated date (yyyy-mm-dd).
Data categories returned will have data before the specified date.
Paramater can be use independently of startdate

sortfield
name
Optional. The field to sort results by. Supports id, name,
mindate, maxdate, and datacoverage fields

sortorder
desc
Optional. Which order to sort by, asc or desc.
Defaults to asc

limit
42
Optional. Defaults to 25, limits the number of results in the response. Maximum is 1000

offset
24
Optional. Defaults to 0, used to offset the resultlist.
The example would begin with record 24

## Examples

Click on the links below and a preview will display example results from

each REST query. Copy the URL listed below to use as a reference.

*Note: Assigned token is required to use these queries and must be in the header

Fetch all available data categories

https://www.ncei.noaa.gov/cdo-web/api/v2/datacategories?limit=41

Fetch all information about the Annual Agricultural dataset specifically

https://www.ncei.noaa.gov/cdo-web/api/v2/datacategories/ANNAGR

Fetch data categories for a given set of locations

https://www.ncei.noaa.gov/cdo-web/api/v2/datacategories?locationid=CITY:US390029&locationid=FIPS:37

## Data Types

Describes the type of data, acts as a label. If it's 64&deg;f out right now, then the data type is Air Temperature and the data is 64.

## Endpoints

Path
Description

https://www.ncei.noaa.gov/cdo-web/api/v2/datatypes/{id}
Used to find information about the data type with id of {id}

https://www.ncei.noaa.gov/cdo-web/api/v2/datatypes
When used without optional parameters, fetches list of available data types. Use with optional parameters below to filter results

## Additional Parameters

Parameter
Example
Description

datasetid
GSOM
Optional. Accepts a valid dataset id or a chain of dataset ids separated by ampersands.
Data types returned will be supported by dataset(s) specified

locationid
FIPS:37
Optional. Accepts a valid location id or a chain of location ids separated by ampersands.
Data types returned will be applicable for the location(s) specified

stationid
COOP:010957
Optional. Accepts a valid station id or a chain of station ids separated by ampersands.
Data types returned will be applicable for the station(s) specified

datacategoryid
TEMP
Optional. Accepts a valid data category id or a chain of data category ids separated by ampersands
(although it is rare to have a data type with more than one data category).
Data types returned will be associated with the data category(ies) specified

startdate
1970-10-03
Optional. Accepts valid ISO formated date (yyyy-mm-dd).
Data types returned will have data after the specified date.
Paramater can be use independently of enddate

enddate
2012-09-10
Optional. Accepts valid ISO formated date (yyyy-mm-dd).
Data types returned will have data before the specified date.
Paramater can be use independently of startdate

sortfield
name
Optional. The field to sort results by. Supports id, name,
mindate, maxdate, and datacoverage fields

sortorder
desc
Optional. Which order to sort by, asc or desc.
Defaults to asc

limit
42
Optional. Defaults to 25, limits the number of results in the response. Maximum is 1000

offset
24
Optional. Defaults to 0, used to offset the resultlist.
The example would begin with record 24

## Examples

Click on the links below and a preview will display example results from

each REST query. Copy the URL listed below to use as a reference.

*Note: Assigned token is required to use these queries and must be in the header

Fetch available data types

https://www.ncei.noaa.gov/cdo-web/api/v2/datatypes

Fetch more information about the ACMH data type id

https://www.ncei.noaa.gov/cdo-web/api/v2/datatypes/ACMH

Fetch data types with the air temperature data category

https://www.ncei.noaa.gov/cdo-web/api/v2/datatypes?datacategoryid=TEMP&limit=56

Fetch data types that support a given set of stations

https://www.ncei.noaa.gov/cdo-web/api/v2/datatypes?stationid=COOP:310090&stationid=COOP:310184&stationid=COOP:310212

## Location Categories

Location categories are groupings of locations under an applicable label.

## Endpoints

Path
Description

https://www.ncei.noaa.gov/cdo-web/api/v2/locationcategories/{id}
Used to find information about the location category with id of {id}

https://www.ncei.noaa.gov/cdo-web/api/v2/locationcategories
When used without optional parameters, fetches list of available location categories. Use with optional parameters below to filter results

## Additional Parameters

Parameter
Example
Description

datasetid
GSOM
Optional. Accepts a valid dataset id or a chain of dataset ids separated by ampersands.
Location categories returned will be supported by dataset(s) specified

startdate
1970-10-03
Optional. Accepts valid ISO formated date (yyyy-mm-dd).
Location categories returned will have data after the specified date.
Paramater can be use independently of enddate

enddate
2012-09-10
Optional. Accepts valid ISO formated date (yyyy-mm-dd).
Location categories returned will have data before the specified date.
Paramater can be use independently of startdate

sortfield
name
Optional. The field to sort results by. Supports id, name,
mindate, maxdate, and datacoverage fields

sortorder
desc
Optional. Which order to sort by, asc or desc.
Defaults to asc

limit
42
Optional. Defaults to 25, limits the number of results in the response. Maximum is 1000

offset
24
Optional. Defaults to 0, used to offset the resultlist.
The example would begin with record 24

## Examples

Click on the links below and a preview will display example results from

each REST query. Copy the URL listed below to use as a reference.

*Note: Assigned token is required to use these queries and must be in the header

Fetch all available location categories

https://www.ncei.noaa.gov/cdo-web/api/v2/locationcategories

Fetch more information about the climate region location category

https://www.ncei.noaa.gov/cdo-web/api/v2/locationcategories/CLIM_REG

Fetch available location categories that have data after 1970

https://www.ncei.noaa.gov/cdo-web/api/v2/locationcategories?startdate=1970-01-01

## Locations

Locations can be a specific latitude/longitude point such as a station, or a label representing a bounding area such as a city.

## Endpoints

Path
Description

https://www.ncei.noaa.gov/cdo-web/api/v2/locations/{id}
Used to find information about the location with id of {id}.

https://www.ncei.noaa.gov/cdo-web/api/v2/locations
When used without optional parameters, fetches list of available locations. Use with optional parameters below to filter results.

## Additional Parameters

Parameter
Example
Description

datasetid
GSOM
Optional. Accepts a valid dataset id or a chain of dataset ids separated by ampersands.
Locations returned will be supported by dataset(s) specified.

locationcategoryid
CITY
Optional. Accepts a valid location id or a chain of location category ids separated by ampersands.
Locations returned will be in the location category(ies) specified.

datacategoryid
TEMP
Optional. Accepts a valid data category id or an array of data category IDs.
Locations returned will be associated with the data category(ies) specified.

startdate
1970-10-03
Optional. Accepts valid ISO formated date (yyyy-mm-dd).
Locations returned will have data after the specified date.
Paramater can be use independently of enddate.

enddate
2012-09-10
Optional. Accepts valid ISO formated date (yyyy-mm-dd).
Locations returned will have data before the specified date.
Paramater can be use independently of startdate.

sortfield
name
Optional. The field to sort results by. Supports id, name, mindate, maxdate, and datacoverage fields.

sortorder
desc
Optional. Which order to sort by, asc or desc. Defaults to asc.

limit
42
Optional. Defaults to 25, limits the number of results in the response. Maximum is 1000.

offset
24
Optional. Defaults to 0, used to offset the resultlist. The example would begin with record 24.

## Examples

Click on the links below and a preview will display example results from

each REST query. Copy the URL listed below to use as a reference.

*Note: Assigned token is required to use these queries and must be in the header

Fetch available locations

https://www.ncei.noaa.gov/cdo-web/api/v2/locations

Fetch more information about location id FIPS:37

https://www.ncei.noaa.gov/cdo-web/api/v2/locations/FIPS:37

Fetch available locations for the GHCND (Daily Summaries) dataset

https://www.ncei.noaa.gov/cdo-web/api/v2/locations?datasetid=GHCND

Fetch all U.S. States

https://www.ncei.noaa.gov/cdo-web/api/v2/locations?locationcategoryid=ST&limit=52

Fetch list of city locations in descending order

https://www.ncei.noaa.gov/cdo-web/api/v2/locations?locationcategoryid=CITY&sortfield=name&sortorder=desc

Fetch list of zip code locations in descending order

https://www.ncei.noaa.gov/cdo-web/api/v2/locations?locationcategoryid=ZIP&sortfield=name&sortorder=desc

## Stations

Stations are where the data comes from (for most datasets) and can be considered the smallest granual of location data.
If the desired station is known, all of its data can quickly be viewed

## Endpoints

Path
Description

https://www.ncei.noaa.gov/cdo-web/api/v2/stations/{id}
Used to find information about station with id of {id}

https://www.ncei.noaa.gov/cdo-web/api/v2/stations
When used without optional parameters, fetches list of available stations. Use with optional parameters below to filter results

## Additional Parameters

Parameter
Example
Description

datasetid
GSOM
Optional. Accepts a valid dataset id or a chain of dataset ids separated by ampersands.
Stations returned will be supported by dataset(s) specified

locationid
FIPS:37
Optional. Accepts a valid location id or a chain of location ids separated by ampersands.
Stations returned will contain data for the location(s) specified

datacategoryid
TEMP
Optional. Accepts a valid data category id or an array of data category ids.
Stations returned will be associated with the data category(ies) specified

datatypeid
ACMH
Optional. Accepts a valid data type id or a chain of data type ids separated by ampersands.
Stations returned will contain all of the data type(s) specified

extent
47.5204,-122.2047,47.6139,-122.1065
Optional. The desired geographical extent for search.
Designed to take a parameter generated by Google Maps API V3 LatLngBounds.toUrlValue.
Stations returned must be located within the extent specified.

startdate
1970-10-03
Optional. Accepts valid ISO formated date (yyyy-mm-dd).
Stations returned will have data after the specified date.
Paramater can be use independently of enddate

enddate
2012-09-10
Optional. Accepts valid ISO formated date (yyyy-mm-dd).
Stations returned will have data before the specified date.
Paramater can be use independently of startdate

sortfield
name
Optional. The field to sort results by. Supports id, name,
mindate, maxdate, and datacoverage fields

sortorder
desc
Optional. Which order to sort by, asc or desc.
Defaults to asc

limit
42
Optional. Defaults to 25, limits the number of results in the response. Maximum is 1000

offset
24
Optional. Defaults to 0, used to offset the resultlist.
The example would begin with record 24

## Examples

Click on the links below and a preview will display example results from

each REST query. Copy the URL listed below to use as a reference.

*Note: Assigned token is required to use these queries and must be in the header

Fetch all available stations

https://www.ncei.noaa.gov/cdo-web/api/v2/stations

Fetch all information about the Abbeville AL station specifically

https://www.ncei.noaa.gov/cdo-web/api/v2/stations/COOP:010008

Fetch all the stations in North Carolina, US (FIPS:37)

https://www.ncei.noaa.gov/cdo-web/api/v2/stations?locationid=FIPS:37

Fetch a list of stations that support a given set of data types

https://www.ncei.noaa.gov/cdo-web/api/v2/stations?datatypeid=EMNT&datatypeid=EMXT&datatypeid=HTMN

## Data

The data endpoint is used for actually fetching the data.

## Endpoints

Path
Description

https://www.ncei.noaa.gov/cdo-web/api/v2/data?datasetid=YOUR_DATASETID
Requires exactly one dataset id. Used to fetch data.

## Additional Parameters

Parameter
Example
Description

datasetid
GSOM
Required. Accepts a single valid dataset id.
Data returned will be from the dataset specified.

datatypeid
ACMH
Optional. Accepts a valid data type id or a chain of data type ids separated by ampersands.
Data returned will contain all of the data type(s) specified.

locationid
FIPS:37
Optional. Accepts a valid location id or a chain of location ids separated by ampersands.
Data returned will contain data for the location(s) specified.

stationid
GHCND:US1NCBC0005
Optional. Accepts a valid station id or a chain of of station ids separated by ampersands.
Data returned will contain data for the station(s) specified.

startdate
1970-10-03
Required. Accepts valid ISO formated date (YYYY-MM-DD) or date time (YYYY-MM-DDThh:mm:ss). Data returned will be after the specified date. Annual and Monthly data will be limited to a ten year range while all other data will be limted to a one year range.

enddate
2012-09-10
Required. Accepts valid ISO formated date (YYYY-MM-DD) or date time (YYYY-MM-DDThh:mm:ss). Data returned will be before the specified date. Annual and Monthly data will be limited to a ten year range while all other data will be limted to a one year range.

units
metric
Optional. Accepts the literal strings 'standard' or 'metric'. Data will be scaled and converted to the specified units. If a unit is not provided then no scaling nor conversion will take place.

sortfield
name
Optional. The field to sort results by. Supports id, name,
mindate, maxdate, and datacoverage fields.

sortorder
desc
Optional. Which order to sort by, asc or desc. Defaults to asc.

limit
42
Optional. Defaults to 25, limits the number of results in the response. Maximum is 1000.

offset
24
Optional. Defaults to 0, used to offset the resultlist. The example would begin with record 24.

includemetadata
false
Optional. Defaults to true, used to improve response time by preventing the calculation of result metadata.

## Examples

Click on the links below and a preview will display example results from

each REST query. Copy the URL listed below to use as a reference.

*Note: Assigned token is required to use these queries and must be in the header

Fetch data from the GHCND dataset (Daily Summaries) for zip code 28801, May 1st of 2010

https://www.ncei.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP:28801&startdate=2010-05-01&enddate=2010-05-01

Fetch data from the PRECIP_15 dataset (Precipitation 15 Minute) for COOP station 010008, for May of 2010 with metric units

https://www.ncei.noaa.gov/cdo-web/api/v2/data?datasetid=PRECIP_15&stationid=COOP:010008&units=metric&startdate=2010-05-01&enddate=2010-05-31

Fetch data from the GSOM dataset (Global Summary of the Month) for GHCND station USC00010008, for May of 2010 with standard units

https://www.ncei.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&stationid=GHCND:USC00010008&units=standard&startdate=2010-05-01&enddate=2010-05-31
