# API User Guide

Source: https://www.census.gov/data/developers/guidance/api-user-guide.html

---

Census Data API User Guide

# Census Data API User Guide

Skip Navigation

Within Developers

####

# Census Data API User Guide

May 12, 2026

Share

Facebook

X (Twitter)

LinkedIn

Census Data API User Guide
[1.1 MB]

The purpose of this user guide is to instruct developers and researchers on how to use the Census Data Application Programming Interface (API) to request data from U.S. Census Bureau datasets.

Overview

What is the API

Query Limits

API Key

Available Data

More

Core Concepts

Example API Queries

Ucgid Predicate

Help & Contact Us

Overview

Overview

What is the API

Query Limits

API Key

Available Data

Core Concepts

Example API Queries

Ucgid Predicate

Help & Contact Us

## Overview

Applications built on Census data typically take advantage of three underlying services: Census Data API, TIGERweb REST Services and the Geocoder REST Services:

### Census Data API

The Census Data Application Programming Interface (API) is an API that gives the public access to raw statistical data from various Census Bureau data programs. In terms of space, we aggregate the data and usually associate them with a certain Census geographic boundary/area defined by a FIPS code. In terms of time, we associate the data with a specific vintage (reference year).

### TIGERweb

TIGERweb GeoServices REST API provides Census area boundaries/shapes referenced by FIPS codes. This service can take two types of parameters to return one or more Census boundaries: a FIPS code or a latitude/longitude pair. FIPS codes are 12-digit codes that are hierarchical in code so that the higher numbers define higher-level geographies and lower numbers define lower-level geographies.

### Geocoder

Our publicly available Geocoding Services API translates addresses and other location formats into latitude/longitude parameters, which are then fed into the TIGERweb REST services to request a Census boundary.

### Focus: Census Data API

The primary purpose of this guide is to cover the Census Data API. To learn more about the geography APIs, please visit the links included above.

## Related Information

How-to Materials for Using the Census API

Do you have questions on how to use the Census API? Check out our step-by-step guidance to learn how to use the Census API to find the data you need.

Data Tool

Explore Census Data

This new platform on data.census.gov is based on overwhelming feedback to streamline the way you get data and digital content from the Census Bureau.

You May Be Interested In

Data

Census Bureau Data and Maps

Access demographic, economic and population data from the U.S. Census Bureau. Explore census data with visualizations and view tutorials.

Data Tools and Applications

Find information using interactive applications to get statistics from multiple surveys.

Emergency Management Hub

The U.S. Census Bureau produces timely local data that are critical to emergency planning, preparedness and recovery efforts.

Page Last Revised - May 14, 2026
