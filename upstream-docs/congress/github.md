# GitHub

Source: https://github.com/LibraryOfCongress/api.congress.gov/

---

GitHub - LibraryOfCongress/api.congress.gov: congress.gov API · GitHub

Skip to content

You signed in with another tab or window. Reload to refresh your session.
You signed out in another tab or window. Reload to refresh your session.
You switched accounts on another tab or window. Reload to refresh your session.

Dismiss alert

{{ message }}

### Uh oh!

There was an error while loading. Please reload this page.

LibraryOfCongress

/

api.congress.gov

Public

Notifications
You must be signed in to change notification settings

Fork
95

Star
989

main

BranchesTags

Go to file

CodeOpen more actions menu

## Latest commit

## History

829 Commits
829 Commits

## Folders and files

Name | Name | Last commit message
| Last commit date

Documentation

| Documentation

api_client

| api_client

java

| java

python

| python

.gitignore

| .gitignore

ChangeLog.md

| ChangeLog.md

README.md

| README.md

View all files

## Repository files navigation

# Overview

## Introduction

The Congress.gov Application Programming Interface (API) provides a method for Congress and the public to view, retrieve, and re-use machine-readable data from collections available on Congress.gov. This repository contains information on accessing and using the Congress.gov API, as well as documentation on available endpoints.

Within the Congress.gov API, responses are returned in XML or JSON formats. An <api-root> element will be visible for responses returned in XML.

For every request, three elements are returned:

- The Request element contains information about the API request itself. This includes the format and the <contentType>; this is essentially the information you might expect to see in a request header.

- The Pagination element contains a count of how many total data items are contained within the response, a URL containing the next page of results; and, if the offset is greater than 1, a URL containing the previous page of results.

- The Data element, the name of which changes depending on the endpoint utilized (i.e. <bills> for the bill endpoint, <amendments> for the amendment endpoint, etc.). This element contains a list of all data items returned by your API call.

## Keys

An API key is required for access. Sign up for a key here.

Learn more on how you can use your API key to access the Congress.gov API on api.data.gov.

## Versioning

The current version of the API is version 3 (v3). Prior versions were used by the Government Publishing Office (GPO) for its Bulk Data Repository, and other clients.

## Rate Limit

The rate limit is set to 5,000 requests per hour.

## Limit and Offset

By default, the API returns 20 results starting with the first record. The 20 results limit can be adjusted up to 250 results. If the limit is adjusted to be greater than 250 results, only 250 results will be returned. The offset, or the starting record, can also be adjusted to be greater than 0.

## Coverage and Estimated Update Times for Congress.gov Collections

Coverage information for Congress.gov collections data in the API can be found at Coverage Dates for Congress.gov Collections on Congress.gov. This page also provides estimated update times for Congress.gov collections.

## Support

Congress.gov staff will monitor and respond to any issues created in this repository, and will initiate actions, as necessary. Before creating an issue in the repository, please review existing issues and add a comment to any issues relevant to yours.

### Reporting suspected missing, inaccurate, or incomplete data

Congress.gov maintains data exchanges with both chambers of Congress. The data available on the website and via the API are what have been delivered by chambers to Congress.gov. Reports of suspected missing, inaccurate, or incomplete data will be triaged by Congress.gov staff and referred to data partners in the House and Senate as appropriate.

## Change Management

Congress.gov staff will issue change management communication through the ChangeLog so that consumers are able to adjust accordingly. The ChangeLog will contain information on updates to the API, the impacted endpoints, and the expected production release date. Milestones are also used to tag issues with expected production release date information.

## Relevant Privacy Policies

- API keys and user registration follow the data.gov privacy policy. Read more here.

- API content follows the Library of Congress privacy policy. Read more here.

## About

congress.gov API

### Resources

Readme
Activity
Custom properties

### Stars

989 stars

### Watchers

88 watching

### Forks

95 forks
Report repository

## Releases

## Packages

## Used by

## Contributors

## Languages

You can’t perform that action at this time.
