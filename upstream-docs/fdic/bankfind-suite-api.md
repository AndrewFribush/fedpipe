# BankFind Suite API

Source: https://banks.data.fdic.gov/docs/

---

FDIC: BankFind Suite - API Documentation

Home >
Resources
>
Data Tools>
BankFind Suite>

Bulk Data and API

> API Documentation

Help

####

####

BankFind Suite Home

Back to API Home

#
BankFind Suite:
API Documentation

Provide
feedback or submit a question

about this page.

## Overview

FDIC’s application programming interface (API) lets developers access
FDIC’s publicly available bank data. This portal provides a complete
API solution for building applications using this data. Everything you
need to integrate with this API is available below. More data will be
added to the portal on an ongoing basis.

## API Keys

Many public APIs use keys as a way to secure and monitor API usage, and BankFind Suite follows this best practice. Users are currently not required to register and obtain a unique “key” to use with every query submitted to our API. The safekeeping of your key is your responsibility, and it is recommended that you save the original email that contains your key, as it also contains the email address and account ID associated with your key. Lost API keys are not retrievable. If you lose your API key, you will have to re-register to obtain a new one.

Obtain your API key here

You are about to leave FDIC.gov

The Primary Internet Web Addresses listed have been reported to the
FDIC by each institution. The hyperlinks to institution Internet
sites are provided solely as a convenience to users of the FDIC
Internet site. The FDIC has made a limited effort to determine that
these links function properly. However, linked sites are not under
the control of FDIC, and FDIC is not responsible for the contents of
any linked site, or any link contained in a linked site. Even if you
access an institution's site by means of the link provided by FDIC,
you are responsible for confirming the identity and authenticity of
any institution you visit and transact business with online. The
inclusion of a link does not imply or constitute an endorsement by
FDIC of the institution, its ownership or management, the products
or services it offers, or any advertisers or sponsors appearing on
the institution's web site.

Go Back

Continue

## API Definition Files

The following definition files document the structure of the datasets:

Institution API Definitions (YAML format)
- for financial institutions.

Location API Definitions (YAML format)
- for financial institutions locations/branches.

History API Definitions (YAML format)
- for details on structure change events.

Summary API Definitions (YAML format)
- for historic aggregate financial and structure data, subtotaled by year, regarding financial institutions.

Failure API Definitions (YAML format)
- for details on failed financial institutions.

SOD API Definitions (YAML format)
- for details on Summary of Deposits.

Financial API Definitions (YAML format)
- for financial information for financial institutions.

Demographics Definitions (YAML format)
- for details on demographics.

## Queries for Standard Financial Reports

The attached spreadsheet contains API queries for all of our standard financial reports. Use it as a starting point to help you craft your own:

Common Financial Reports (.xlsx spreadsheet)

## API Documentation

See interactive documentation available
below to provide an overview of the API.

Full OpenAPI specification (formerly known as Swagger) for the
API

### Filter Syntax

The API uses the Elastic Search
query string syntax
for filtering. Some notes on the filter syntax include:

To match a phrase, use double quotes:
NAME:"First Bank"

To exclude a phrase or value:
!(STNAME:"Virginia")

The "AND" and "OR" operators can be used to combine filters:
NAME:"First Bank" AND STALP:IA

NAME:"First Bank" OR NAME:"Unibank"

!(BKCLASS:NM OR BKCLASS:N)

Dates must be entered in "yyyy-mm-dd" format:
DATEUPDT:2010-01-25

Ranges can be expressed with "[]" (inclusive) or "{}" (exclusive),
using "*" for an open ended range

Date range that includes 2010-01-01 and 2010-12-31:
DATEUPDT:[2010-01-01 TO 2010-12-31]

Date range that includes only dates between 2010-01-01 and
2010-12-31:
DATEUPDT:{2010-01-01 TO 2010-12-31}

Number range including institutions with domestic deposits under
10,000 ($thousands)
DEPDOM:[* TO 10000]

Open ended ranges can be expressed using a "*"
DATEUPDT:[2010-01-01 TO *]

### Output Formats

Data output is available as JSON or CSV. The format is controlled by
the
Accept header. See the Responses section in the
interactive documentation below for examples.

###
API Endpoints
