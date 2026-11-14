# OpenFEMA API

Source: https://www.fema.gov/about/openfema/api

---

OpenFEMA API Documentation | FEMA.gov

Skip to main content

Official websites use .gov

A .gov website belongs to an official government organization in the United States.

Secure .gov websites use HTTPS

A lock (

) or https:// means you’ve safely connected to the .gov website. Share sensitive information only on official, secure websites.
.

Reports & Data

- OpenFEMA

OpenFEMA

API Documentation

Getting Started

Working with Large Datasets

Data Sets

Frequently Asked Questions

Changelog

Open Government

Other FEMA Data Sources

Terms and Conditions

Annual Reports

Disaster Relief Fund Reports

FEMA Guidance Documents

Glossary

# OpenFEMA API Documentation

- English

## About

OpenFEMA provides data in machine-readable formats through API’s and downloadable content. The data is exposed using a RESTful interface that uses query string parameters to manage the query. The API can be used to integrate FEMA data into your own applications, build an analytics dashboard, or simply download data for research.

A full list of entities/endpoints supported by the API can be found on the OpenFEMA Data Sets page. Each API endpoint is documented individually.

Each API endpoint is documented individually – each of the links on the points to the documentation.

Major and minor version features (including the addition or deprecation of datasets) can be found on the Changelog page.

## Pricing, Registration, and API Key’s

Use of the API requires no registration, follows the same Privacy Policy as FEMA.gov, and adheres to open industry standards.

OpenFEMA services are offered subject to your acceptance of the Terms and Conditions contained herein. Information and examples on how to cite OpenFEMA datasets can be found in the Terms and Conditions.

## Authentication

As the OpenFEMA API is free for public use, authentication is not necessary.

### User-Agent Recommendation

Although not required, for those who use the API regularly or who have integrated it into their own products, we recommend including a descriptive “user-agent” header (such as a custom application name and contact email). This can help improve blocked IP troubleshooting.

## Rate Limits

Rate limits ensure fair public access, maintain service availability, protect infrastructure, and prevent abuse of the API. The following rate limits apply to the majority of the OpenFEMA endpoints:

- 200 requests/5-minute window per IP address

- No more than 2 concurrent requests per IP address

For the following datasets, rate limits are reduced to 100 requests/5-minute window with the same 2 concurrent requests as stated above. This is necessary to maintain minimum performance standards.

- Individual and Households Program Valid Registrations

- IPAWS Archived Alerts

- NFIP Claims

- NFIP Policies

### Throttling and Enforcement

Requests exceeding an applicable limit will receive an HTTP 429 (Too Many Requests) response. Repeated violations may result in an IP being blocked.

### Exceptions

OpenFEMA may approve temporary or permanent limit adjustments for documented operational needs, accessibility, research, emergency response, or other legitimate public purposes.

### Dataset Updates

For those datasets containing a lastRefresh field, it is possible to query for updates rather than download full datasets. This recommended approach can significantly reduce requests. See the “Getting Dataset Updates” tutorial in the OpenFEMA GitHub repository.

## API Versioning

The OpenFEMA API endpoints are versioned. The base path for each dataset/endpoint contains its version. Not all endpoint changes result in a new version. Changes such as the addition of a field or dataset element, or updated descriptions do not require a new version. Endpoint versions are incremented when a breaking change occurs.

### Breaking Changes

Any change that can potentially break an integration or automation is considered a breaking change. The following are breaking changes that will result in a new version:

- A change to a dataset field name

- A change to a dataset field type

- The removal of a dataset field

- Changing the payload structure for existing fields. For example, adding a nesting level or making an array of values where previously it was a single value.

- Changes that alter the aggregation level of data or significantly change the number of records returned

- Changing the returned field data, not the field name. For example, returning a code instead of a verbose description. While technically not a breaking change, politeness dictates a new version otherwise existing users will get something they did not expect.

## Dataset Deprecation

When a dataset outlives its usefulness, is replaced or, more commonly, when the API specification changes (a “breaking change”), a new API endpoint version must be created. When this occurs, the dataset being replaced is “deprecated”. It will remain active and will return data for a 3-month period to allow users or stakeholders time to transition to the new version.

Details regarding deprecations including the new version, the date when the deprecation will end, and any information regarding the state of the deprecated endpoint data, are communicated in four ways:

- On the dataset page

- Within the metadata object returned as part of an API query

- As described on the Changelog page

- Through a GovDelivery email to those users who have opted-in to notifications

Once the deprecation period has ended, the endpoint will exist, but it will return no data. Only the metadata object containing deprecation information will be returned. One week later, the endpoint will be removed. A 404 HTTP response will result when trying to access the dataset.

## Support

OpenFEMA is meant to be a self-service repository, providing data in machine-readable format. OpenFEMA cannot address requests for disaster assistance, please go to https://www.disasterassistance.gov.

Please contact the OpenFEMA Team at openfema@fema.dhs.gov to suggest additional datasets and additional API features. API technical questions, dataset questions, and IP blocking issues can also be directed to that address. Feature suggestions and success stories are always welcome.

For inquiries not related to OpenFEMA, please see the listing of other FEMA Contacts.

Last updated November 13, 2026

Return to top
