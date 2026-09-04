# API Docs

Source: https://www.weather.gov/documentation/services-web-api

---

API Web Service

HOME

FORECAST

Local

Graphical

Aviation

Marine

Rivers and Lakes

Hurricanes

Severe Weather

Fire Weather

Sunrise/Sunset

Long Range Forecasts

Climate Prediction

Space Weather

PAST WEATHER

Past Weather

Astronomical Data

Certified Weather Data

SAFETY

INFORMATION

Wireless Emergency Alerts

Brochures

Weather-Ready Nation

Cooperative Observers

Daily Briefing

Damage/Fatality/Injury Statistics

Forecast Models

GIS Data Portal

NOAA Weather Radio

Publications

SKYWARN Storm Spotters

StormReady

TsunamiReady

Service Change Notices

EDUCATION

NEWS

SEARCH

Search For

NWS

All NOAA

ABOUT

About NWS

Organization

For NWS Employees

National Centers

Careers

Contact Us

Glossary

Social Media

NWS Transformation

Local forecast by
"City, St" or ZIP code

Sorry, the location you searched for was not found. Please try another search.

Multiple locations were found. Please select one of the following:

Location Help

# Severe Weather and Heavy Rain from the Great Lakes to the Mid-Atlantic; Heat Persists in the East

Widespread strong thunderstorms with damaging winds and locally heavy rain are expected from the Upper Ohio Valley into the southern Mid-Atlantic today and portions of the central Appalachians and Carolinas on Saturday. Monsoonal moisture will bring a flash flooding threat to the Desert Southwest. Sweltering heat persists from the Plains to the southern Mid-Atlantic through tonight.
Read More >

Customize Your Weather.gov

Enter Your City, ST or ZIP Code

Remember Me

Privacy Policy

LOADING...

Documentation

National Headquarters

# API Web Service

Weather.gov
> Documentation
> API Web Service

Services

API Web Service

Alerts Web Service

Technical Bulletins

Overview

Examples

Updates

Specification

## Overview

The National Weather Service (NWS) API allows developers access to critical forecasts, alerts, and observations, along with other weather data. The API was designed with a cache-friendly approach that expires content based upon the information life cycle. The API is based upon of JSON-LD to promote machine data discovery.

The API is located at: https://api.weather.gov

Operational issues should be reported to nco.ops@noaa.gov.

General use questions can be asked on the API github site.

### Pricing

All of the information presented via the API is intended to be open data, free to use for any purpose. As a public service of the United States Government, we do not charge any fees for the usage of this service, although there are reasonable rate limits in place to prevent abuse and help ensure that everyone has access. The rate limit is not public information, but allows a generous amount for typical use. If the rate limit is execeed a request will return with an error, and may be retried after the limit clears (typically within 5 seconds). Proxies are more likely to reach the limit, whereas requests directly from clients are not likely.

### Content Negotiation

The new API will use headers to modify the version and format of the response. Every request, either by browser or application, sends header information every time you visit any website. For example, a commonly used header called "UserAgent" tells a website what type of device you are using so it can tailor the best experience for you. No private information is shared in a header, and this is a standard practice for all government and private sites. Developers can override these headers for specific purposes (see the "API Specifications" tab for more information). You can get full details by visiting the header field definitions page at the World Wide Web Consortium site.

- Authentication

- Format the response

- Request new features

### Authentication

A User Agent is required to identify your application. This string can be anything, and the more unique to your application the less likely it will be affected by a security event. If you include contact information (website or email), we can contact you if your string is associated to a security event. This will be replaced with an API key in the future.

User-Agent: (myweatherapp.com, contact@myweatherapp.com)

### Formats

Endpoints typically have a GeoJSON default format, given the inclusion of geometry data. See the Specification tab for details on each endpoint. Below are common formats available by the API.

- GeoJSON: application/geo+json

- JSON-LD: application/ld+json

- DWML: application/vnd.noaa.dwml+xml

- OXML: application/vnd.noaa.obs+xml

- CAP: application/cap+xml

- ATOM: application/atom+xml

Accept: application/cap+xml

### Features

The API will use feature flags to make new features available to consumers. The available feature flags will be noted on the "Updates" and "Specification" tabs on this page. The feature flag will be communicated through a Service Change Notice (SCN) allowing developers a period to adopt the flag if the change impacts their applications. Once the adoption window expires, the feature will be made default. Developers can then remove the flag at their convenience.

Feature-Flags: forecast_temperature_qv

### Outage Information

Information on outages is generally communicated through Administrative messages sent by National Center of Environmental Prediction's (NCEP's) Senior Duty Meteorologist (SDM). These are sent via WMO id NOUS42 KWNO and product identifier ADASDM.

## Questions & Examples

The API uses linked data to allow applications to discover content. Similar to a web site that provides HTML links to help users navigate to each page, linked data helps applications navigate to each endpoint. You may also review the OPEN API specification on the "Specification" tab on this page, or directly using the specification endpoint (that is also used to create the tab presentation): https://api.weather.gov/openapi.json.

### How do I get the forecast?

Forecasts are created at each NWS Weather Forecast Office (WFO) on their own grid definition, at a resolution of about 2.5km x 2.5km. The API endpoint for the 12h forecast periods at a specific grid location is formatted as:

https://api.weather.gov/gridpoints/{office}/{gridX},{gridY}/forecast

For example: https://api.weather.gov/gridpoints/TOP/31,80/forecast

To obtain the grid forecast for a point location, use the /points endpoint to retrieve the current grid forecast endpoint by coordinates:

https://api.weather.gov/points/{latitude},{longitude}

For example: https://api.weather.gov/points/39.7456,-97.0892

This will provide the grid forecast endpoints for three format options in these properties:

- forecast - forecast for 12h periods over the next seven days

- forecastHourly - forecast for hourly periods over the next seven days

- forecastGridData - raw forecast data over the next seven days

Note: at this time coastal marine grid forecasts are only available from the forecastGridData property.

Applications may cache the grid for a location to improve latency and reduce the additional lookup request; however, it is important to note that while it generally does not occur often, the gridX and gridY values (and even the office) for a given coordinate may occasionally change. For this reason, it is necessary to check back to the /points endpoint periodically for the latest office/grid mapping.

The /points endpoint also contains information about the issuing office, observation stations, and zones for a given point location.

### How do I get the forecast as DWML?

The forecast can be formatted as DWML for the /forecast and /forecast/hourly endpoints. There is no DWML specification for point lookups, so you first need to use the JSON-only /point endpoint described in the previous question to convert the location to a grid. Once you know the full gridpoint url for the forecast or hourly forecast, you can set the Accept header described in the overview to request the DWML format.

- application/vnd.noaa.dwml+xml

For example: https://api.weather.gov/gridpoints/TOP/31,80/forecast

### How do I get alerts?

The API has a robust selection of filters for alerts. A common request is all active alerts for a state:

https://api.weather.gov/alerts/active?area={state}

For example: https://api.weather.gov/alerts/active?area=KS

The /alerts/active endpoint redirects internally to the root /alerts endpoint with the "active=true" parameter. Please review the "Specification" tab above for all the filter options. For important details about filtered alerts requests according to county or zone UGC, please review our Alerts Geolocation Guide.

For additional details on the format of an alert's content, please see the CAP documentation.

The /alerts endpoint contains alerts issued over the past seven days. For an official archive of NWS CAP alerts, please reach out to the National Centers for Environmental Information (NCEI).

Note: The /alerts and /alerts/active endpoints do NOT contain SPC's SEL product language for Tornado Watches. Tornado Watch alerts are derived directly from the local WFO's WCN product.

### Can I retrieve radar display data?

No. The radar endpoints in api.weather.gov are used for radar status data and do not contain the radar data used for display. For radar display data, consider these options:

- RIDGE2 NWS Radar Display

- RIDGE2 NWS Radar Data as OGC Web Services

- Other NWS OGC Web Services

- MRMS Data

- NODD MRMS Archive Data

## Updates

The information on this page is updated regularly. All official NWS Service Change Notices, including an email subscription option, can be found at weather.gov/notification.

### Feature Flags

Feature flags are endpoint specific. See Specification tab for details.

#### /gridpoints/{wfo}/{x},{y}/forecast and /gridpoints/{wfo}/{x},{y}/forecast/hourly

- forecast_temperature_qv: Represent temperature as QuantitativeValue

- forecast_wind_speed_qv: Represent wind speed as QuantitativeValue

#### /stations, /stations/{stationId}, and /gridpoints/{wfo}/{x},{y}/stations

- obs_station_provider: Show provider and subProvider MADIS details

### Known Issues

Before contacting us, please review the following list of issues that have been identified for a future update.

- No significant known issues.

Updated 3/24/2026

### Upstream Issues/Changes

The following issues are related to upstream sources of the API, and are not an API bug.

- Station observations endpoints always show missing (null) 24h max/min temperatures for stations outside the central time zone due to MADIS ingest bug.

- Delayed observations
Observations may be delayed up to 20 minutes from MADIS, the upstream source, due to QC processing.

### Resolutions

The following issues have been recently resolved:

- 17 Mar 2026: The /radar/queues/rds and /radar/queues/tds endpoints are limited by default so that they no longer return a 503 error from too many results.

- 7 Jan 2026: The /forecast and /forecast/hourly endpoints no longer contain data that has past (ex. previous hours in an hourly forecast or the words "Overnight" during the early part of the day).

- 15 Dec 2025: Precipitation values in the observations endpoints are rounded down to the nearest centimeter (less than 0.4" may be improperly rounded down to 0).

- 2 Oct 2025: Upstream MADIS bug resolved so that station observations endpoints no longer always show missing (null) wind gust values.

- 4 Aug 2025:

- Station observations should no longer be routinely delayed more than about the 20 minutes it takes the upstream MADIS source to QC and ingest for API.

- Station observations should no longer have missing (null) values for weather properties (temperature, wind, precipitation, etc.) when the MADIS source has data and passed all QC levels.

- 22 May 2025:

- XML data requests to the stations/<station id>/observations/latest endpoint no longer fail when observation site reports variable (VRB) winds.

- /alerts/types have been updated to correct "Evacuation Immediate" and add/remove types to align with what appears in the Hazards Map.

- PoP values less than 20% in the 12h forecast endpoints (/gridpoints/{office}/{gridX},{gridY}/forecast) no longer display as null values.

- Periods with extra ellipses (...) in the WFO's forecast zone text product (ZFP) are now properly displayed in the /zones/{type}/{zoneId}/forecast endpoint.

- For more details on other changes with this upgrade, please see SCN 25-44.

## Specification

Note: All times generated by the API are in ISO-8601 format.

US Dept of Commerce

National Oceanic and Atmospheric Administration

National Weather Service

Documentation

,

Comments? Questions? Please Contact Us.

Disclaimer

Information Quality

Help

Glossary

Privacy Policy

Freedom of Information Act (FOIA)

About Us

Career Opportunities
