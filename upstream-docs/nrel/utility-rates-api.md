# Utility Rates API

Source: https://developer.nlr.gov/docs/electricity/utility-rates-v3/

---

Utility Rates
API

NLR: Developer Network

Skip to main content

- APIs & Documentation

- Electricity

- Utility Rates

Existing API Users: Update any developer.nrel.gov references in your code to developer.nlr.gov. The previous developer.nrel.gov domain was retired on May 29, 2026.
Learn more about the domain transition.

# Utility Rates (GET /api/utility_rates/v3)

This service returns annual average utility rates ($/kWH) for residential, commercial and industrial sectors as well as the local utility name for a specific location. This service does not return complex rate information.

The data source is Ventyx Research Inc. and the Energy Information Agency (EIA).

NOTE: the data returned by this API is from 2012 and there are currently no plans to update the data in the future.

## Request URL

GET /api/utility_rates/v3.format?parameters

## Request Parameters

Parameter
Required
Value
Description

format
Yes

Type: string

Default: None

Options: json, xml

The output response format.

api_key
Yes

Type: string

Default: None

Your developer API key. See API keys for more information.

lat
Yes

Type: decimal

Default: None

Range: -90 to 90

The latitude for the location to use.

lon
Yes

Type: decimal

Default: None

Range: -180 to 180

The longitude for the location to use.

radius
No

Type: decimal

Default: 0

Range: 0.0 to 200.0

The radius (in miles) around the search location to search for utility rates with intersecting boundaries.

With the default radius of 0, only utility rates whose boundaries contain the search location point will be returned.

limit
No

Type: integer

Default: None

The maximum number of results to return. If no limit is specified then all matching results will be returned.

## Response Fields

The response is composed of service-related informational fields and the results of the data query.

Field
Value
Description

inputs
Type: collection
The input parameters received in the request.

version
Type: string
The current version of the web service.

errors
Type: array of strings
Any error messages resulting from the request.

warnings
Type: array of strings
Any warning messages resulting from the request.

metadata
Type: collection
Any metadata associated with the request (sources, etc)

outputs
Type: collection

The data outputs from the request. (see output fields for more detail)

### Output Fields

Field
Value
Description

utility_name
Type: string
The name of the utility company. If there are multiple utility companies serving the location, the names will be returned as a pipe-delimited string.

company_id
Type: integer
The ID of the utility company. If there are multiple utility companies serving the location, the IDs will be returned as a pipe-delimited string.

utility_info
Type: collection
An array of hashes containing the name(s) and ID(s) of the utility company or companies serving the location.

residential
Type: decimal
The residential electricity rate ($/kWh).

commercial
Type: decimal
The commercial electricity rate ($/kWh).

industrial
Type: decimal
The industrial electricity rate ($/kWh).

## Examples

### JSON Output Format

GET /api/utility_rates/v3.json?api_key=DEMO_KEY&lat=35.45&lon=-82.98

{
"inputs" : {
"lat" : "35.45",
"lon" : "-82.98"
},
"errors" : [ ],
"warnings" : [ ],
"version" : "3.1.0",
"metadata" : {
"sources" : [ "Ventyx Research (2012)" ]
},
"outputs" : {
"company_id" : "8333|18642",
"utility_name" : "Haywood Electric Member Corp|Tennessee Valley Authority",
"utility_info" : [ {
"company_id" : "8333",
"utility_name" : "Haywood Electric Member Corp"
}, {
"company_id" : "18642",
"utility_name" : "Tennessee Valley Authority"
} ],
"commercial" : 0.0977,
"industrial" : 0.0862,
"residential" : 0.123
}
}

### XML Output Format

GET /api/utility_rates/v3.xml?api_key=DEMO_KEY&lat=35.45&lon=-82.98

<?xml version="1.0" encoding="UTF-8"?>
<response>
<inputs>
<lat>35.45</lat>
<lon>-82.98</lon>
</inputs>
<errors type="array"/>
<warnings type="array"/>
<version>3.1.0</version>
<metadata>
<sources type="array">
<source>Ventyx Research (2012)</source>
</sources>
</metadata>
<outputs>
<company-id>8333|18642</company-id>
<utility-name>Haywood Electric Member Corp|Tennessee Valley Authority</utility-name>
<utility-info type="array">
<utility-info>
<company-id>8333</company-id>
<utility-name>Haywood Electric Member Corp</utility-name>
</utility-info>
<utility-info>
<company-id>18642</company-id>
<utility-name>Tennessee Valley Authority</utility-name>
</utility-info>
</utility-info>
<commercial type="float">0.0977</commercial>
<industrial type="float">0.0862</industrial>
<residential type="float">0.123</residential>
</outputs>
</response>

## Rate Limits

Standard rate limits apply. No more than 1,000 requests may be made in any hour

## Errors

Standard errors may be returned. In addition, the following service-specific errors may be returned:

HTTP Status Code
Description

422
Unprocessable Entity - One or more parameters did not pass validation, or a parameter may be missing. Check the errors section of the response to see how the request should be modified to address the error.

Help improve this content
