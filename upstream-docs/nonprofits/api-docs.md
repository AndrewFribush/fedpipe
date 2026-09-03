# API docs

Source: https://projects.propublica.org/nonprofits/api

---

Nonprofit Explorer: API v2 - ProPublica

# Nonprofit Explorer API

ProPublica provides an application programming interface (API) to the search engine and database that powers Nonprofit Explorer.

##### Requests

The Nonprofit Explorer API uses a RESTful style. See individual methods below for permitted requests.

##### Constructing a Request

The Nonprofit Explorer API only accepts GET requests. All requests begin with https://projects.propublica.org/nonprofits/api/v2

##### Response Formats

The Nonprofit Explorer API responses are available in the json format. Responses are also available as jsonp by passing in a callback parameter.

The format of the JSON/JSONP response may sometimes be modified with the output parameter. (See the /search.json endpoint parameters, below.)

##### Parameters

Parameters are optional. Parameters vary by method. See individual methods below for valid parameters. Parameters, if provided, must be URL-encoded ("percent encoded").

##### Caveats

The Nonprofit Explorer API is a work in progress and is subject to change. Please consult this documentation page for the latest API developments.

##### Search Method

GET /search.json

Returns a list of organizations matching the given search terms.

Parameters

All parameters are optional

Parameter
Description

q

A keyword search string. Searches using this parameter will search (in order) organization name, organization alternate name, city.

Advanced queries can be crafted using the following rules. Parameters must be URL encoded.

- phrases in quotation marks will search for results containing the exact word order: q=%22Delta%20Dental%22 ("Delta Dental")

- words or phases prepended by a plus sign will be required (only helps in cases where the default "OR" search returns poor results): q=delta%20alpha%20%2Bevanston (delta alpha +evanston)

- words or phases prepended by a minus sign will be excluded from search results: q=delta%20-dental (delta -dental) or q=fraternity%20-%22delta%20tau%22 (fraternity -"delta tau")

- words or phrases not modified by any of the above will be executed as an "OR" search; if you need multiple tokens matched ("AND"), use the "+" modifier as above.

page
The (zero-indexed) page number of the request. Default is 0.

state[id]
If provided, only return results from the given state or US Territory. Must use the two-letter U.S. Postal Service abbreviation. Code "ZZ" is used for entities based outside the United States required to file a Form 990 in the U.S. (Brackets should be URL encoded, i.e. state%5Bid%5D=NY)

ntee[id]
If provided, only return results from the given National Taxonomy of Exempt Entities (NTEE) Major Group. Must be an integer, 1-10 — see codes below. (Brackets should be URL encoded, i.e. ntee%5Bid%5D=7)

Value
NTEE Category

1 | Arts, Culture & Humanities

2 | Education

3 | Environment and Animals

4 | Health

5 | Human Services

6 | International, Foreign Affairs

7 | Public, Societal Benefit

8 | Religion Related

9 | Mutual/Membership Benefit

10 | Unknown, Unclassified

c_code[id]
If provided, return only organizations categorized under the given subsection of section 501(c) of the tax code, with one special case for section 4947(a)(1). Must be an integer — see codes below. (Brackets should be URL encoded, i.e. c_code%5Bid%5D=3 for 501(c)(3) )

Value
Tax Section

2 | 501(c)(2)

3 | 501(c)(3)

4 | 501(c)(4)

5 | 501(c)(5)

6 | 501(c)(6)

7 | 501(c)(7)

8 | 501(c)(8)

9 | 501(c)(9)

10 | 501(c)(10)

11 | 501(c)(11)

12 | 501(c)(12)

13 | 501(c)(13)

14 | 501(c)(14)

15 | 501(c)(15)

16 | 501(c)(16)

17 | 501(c)(17)

18 | 501(c)(18)

19 | 501(c)(19)

21 | 501(c)(21)

22 | 501(c)(22)

23 | 501(c)(23)

25 | 501(c)(25)

26 | 501(c)(26)

27 | 501(c)(27)

28 | 501(c)(28)

92 | 4947(a)(1)

##### /search.json Result

Field
Description
Example values

total_results
Total number organizations which match the search.
615836

num_pages
Number of pages in the result set.
1, 3857

cur_page
Zero-indexed number of the current page.
0

per_page
Number of results that the API is returning per page.
25

page_offset
Number of results on previous pages, useful as a running counter for listing results.
125

search_query
The search query, if any. (See Parameters, under the /search.json section, above.)
null, "delta -delta"

selected_state
The state filter, if any. (See Parameters, under the /search.json section, above.)
null, "NY"

selected_ntee
The NTEE (category) filter, if any. (See Parameters, under the /search.json section, above.)
null, 1, 10

selected_code
The subsection code (501(c)(___) or 4947(a)(1)) filter, if any. (See Parameters, under the /search.json section, above.)
null, 3, 10, 92

data_source
Plain text citation of data sources.
"ProPublica Nonprofit Explorer API: https://projects.propublica.org/nonprofits/api/\nIRS Exempt Organizations Business Master File Extract (EO BMF): https://www.irs.gov/charities-non-profits/exempt-organizations-business-master-file-extract-eo-bmf\nIRS Annual Extract of Tax-Exempt Organization Financial Data: https://www.irs.gov/uac/soi-tax-stats-annual-extract-of-tax-exempt-organization-financial-data"

api_version
Version of the Nonprofit Explorer API that generated the JSON.
1

organizations
A Javascript array containing Organization objects that match the search. Note that results are paginated.

##### Organization Method

GET /organizations/:ein.json

Returns all available data for a given organization, by the organization's integer EIN.

The Organization endpoint does not accept any query parameters, only the :ein value in the URL.

##### /organizations/:ein.json Result

Field
Description
Example values

organization
Organization object containing profile data for the nonprofit with the given Employment Identification Number (EIN).

data_source
Plain text citation of data sources.
"ProPublica Nonprofit Explorer API: https://projects.propublica.org/nonprofits/api/\nIRS Exempt Organizations Business Master File Extract (EO BMF): https://www.irs.gov/charities-non-profits/exempt-organizations-business-master-file-extract-eo-bmf\nIRS Annual Extract of Tax-Exempt Organization Financial Data: https://www.irs.gov/uac/soi-tax-stats-annual-extract-of-tax-exempt-organization-financial-data"

api_version
Version of the Nonprofit Explorer API that generated the JSON.
1

filings_with_data
A Javascript array containing Filing objects. These represent Form 990 filings by the organization, from various fiscal years.

filings_without_data
As above, but the Filing objects returned only contain the following fields: tax_prd, tax_prd_yr, pdf_url, formtype. These records represent raw filing documents available as PDF files, without the corresponding extracted numerical data.

##### Filing Object

The following fields exist in all Filing objects. An additional 40-120 rows of data are returned depending on which form type (Form 990, Form 990-EZ, Form 990-PF) is associated with the Filing.

An organization EIN may contain records for several years of filings processed by the IRS. Therefore, Filing objects are unique combinations of ein and tax_prd.

Field
Description
Example values

ein
The employer identification number (EIN) for the organization associated with this tax filing. (Note: This value represents an integer value, so EIN values with leading zeroes will have the leading zeroes trimmed.)
142007220

tax_prd
The tax period (month that the organization’s fiscal year ended) for the given Filing data. Integer in YYYYMM format.
201206

tax_prd_yr
As above, but only the year portion.
2012

formtype
Which Form 990 type this filing used.
0 (Form 990), 1 (Form 990_EZ), 2 (Form 990-PF)

pdf_url
If available, a link to the original scanned Form 990 for the filing in question. Note that these download links are rate limited. If you would like to download Form 990 document PDFs in bulk, filings processed since 2017 are available from the IRS.
null, "https://projects.propublica.org/nonprofits​/download-filing?path=2013_08_T%2F14-2007220_990T_201212.pdf"

updated
Date that this filing data was updated in Nonprofit Explorer. Data is extracted from the IRS Annual Extract of Tax-Exempt Organization Financial Data.
"2013-04-11T16:18:36Z"

organization
An Organization object, representing the entity that filed this Form 990 with the IRS. Contains profile data such as name, EIN, address, nonprofit subsection category, etc. (Note: Only returned when using the Search endpoint. May not be returned if using a custom output option, see below.)

If using output=flat, the "organization" field will not be returned. Instead, the keys listed under "Organization Object" (below) will be included as part of the Filing's data.

If using output=noorg, the "organization" field will not be returned. This metadata can be retrieved by using the Organization endpoint (see above).

Example uses of the various output options can be viewed here.

Filing Object: Basic financial data

The following fields are convenience aliases to common data points. (For example, total revenue (book value) is listed under one of "totrevnue", "totrevenue", or "totrcptperbks", depending on which form type is in question.)

Field
Description
Example values

totrevenue
Total revenue
-129347, 0, 1035696

totfuncexpns
Total expenses ("Total functional expenses" for Form 990)
-40281, 0, 983566

totassetsend
Total assets, end of year
743704

totliabend
Total liabilities, end of year
168361

pct_compnsatncurrofcr
Percent of expenses marked as "Compensation of current officers, directors, etc"
0.023585

Filing Object: More financial data (formtype dependent)

An additional 40-120 rows are included on the Filing object. The exact fields depend on the form type (Form 990, Form 990EZ, Form 990PF), of the Filing object being returned. These rows contain all available data for the Filing in being returned.

Please consult the IRS' description of available fields if you need to work with these values; our API uses the "element name" described in that document.

Please remember that a search that doesn’t include a formtype will return Filings of all form types, so fields from Filing to Filing will be a mixed bag.

Example: You can look at the API result for q=propublica for a small (one result) example of what this looks like in practice.

##### Organization Object

Field
Description
Example values

ein
The employer identification number (EIN) for the organization associated with this tax filing. (Note: This value represents an integer value, so EIN values with leading zeroes will have the leading zeroes trimmed.)
142007220

strein
Version of the EIN in the "XX-XXXXXXX" format, containing leading zeroes if applicable.
14-2007220, 01-0191203

name
Organization name, as provided by the IRS
"PRO PUBLICA"

sub_name
Secondary name, as provided by the IRS. This is generally used to provide an alias or a "subtitle" to an organization name. For sub-entities of national organizations, this may also be used to provide an identifier for the chapter.
"", "LOCAL 342"

address

"", "55 BROADWAY"

city

"", "NEW YORK"

state

"", "NY"

zipcode

"", "10006-3008"

subseccd
The subsection code (501(c)(___) or 4947(a)(1)) for this organization. For code values, see Parameters, under the /search.json section, above.
3, 92

ntee_code
National Taxonomy of Exempt Entities (NTEE) category for this organization. See IRS documentation for possible values.
"A20"

guidestar_url
A link to the GuideStar profile for this organization.
"https://www.guidestar.org​/organizations​/14-2007220/.aspx"

nccs_url
A link to the National Center for Charitable Statistics profile for this organization.
"http://nccsweb.urban.org​/communityplatform​/nccs/organization/profile​/id/142007220/"

updated
Date that the Organization profile (name fields, address data, subsection code) was updated in Nonprofit Explorer. Data comes from the IRS Business Master File.
"2013-04-11T15:41:23Z"

An additional 20 rows are included on the Organization object. These are further categorization and status codes within the IRS Exempt Organizations Business Master File Extract (EO BMF) that Nonprofit Explorer utilizes. A list of fields and possible values is available in the EO-BMF documentation.

##### Legal

Usage constitues agreement to our Data Terms of Use.

##### Questions? Comments?

Contact us at [email protected]

##### Changelog

- September 12, 2023. Reduced the number of results per page on the search endpoint from 100 to 25.

- July 13, 2023. The deprecated v1 API has been removed.

- July 13, 2017. Database update. Raw filing data has been updated to latest IRS release (May 25, 2017), including filings processed in 2016. (This does not include filings for private foundations processed in 2016, which are not yet available.) Organization data has been updated to latest IRS release (June 14, 2017).

- February 7, 2017. Database update. More pdf_file links are now available, including documents processed by the IRS through December 2016.

- January 9, 2017. Database update. More pdf_file links are now available, including documents processed by the IRS through October 2016.

- December 21, 2016. Important: Backwards-incompatible changes. The API has been updated to "version 2"; the previous API is now deprecated. The search endpoint now only returns Organization objects; it does not return Filings or any financial data. Raw filing data has been updated to latest IRS release (April 27, 2016), including filings processed in 2015. Organization data has been updated to latest IRS release (December 5, 2016). More pdf_file links are now available, including documents processed by the IRS through June 2016.

- August 18, 2015. Database update. Raw filing data updated to latest IRS release (May 8, 2015), including filings processed in 2014. Organization data updated to latest IRS release (August 10, 2015). More pdf_file links are now available, including documents processed by the IRS through June 2015.

- February 18, 2015. Database update. More pdf_file links are now available, including documents processed by the IRS through December 2014.

- February 3, 2015. Database update. Organization data updated to latest IRS release (08-Dec-2014). Access to pdf_url restored. Read more about this update.

- July 9, 2014. Added output=flat and output=noorg output formats. Documented page pagination option (now zero-indexed), and added "num_pages" to output. pdf_url removed - public.resource.org has removed public access to these files because of a dispute involving unredacted social security numbers.

- June 11, 2014. Database update. More pdf_file links are now available.

- April 30, 2014. Database update. New filing records based on newly-released raw filing data from the IRS ("Exempt Organization Returns Filed in Calendar Year 2013").

- December 13, 2013. Database update. More pdf_file links now available.

- September 26, 2013. Initial API release.

## About This Data

### What Is This Data?

Nonprofit Explorer includes summary data for nonprofit tax returns and
full Form 990 documents, in both PDF and digital formats.

The summary data contains information processed by the IRS during the
2012-2019 calendar years; this generally consists of filings for the
2011-2018 fiscal years, but may include older records. This data release
includes only a subset of what can be found in the full Form 990s.

In addition to the raw summary data, we link to PDFs and digital copies
of full Form 990 documents wherever possible. This consists of separate
releases by the IRS of Form 990 documents processed by the agency, which
we update regularly.

We also link to copies of audits nonprofit organizations that spent
$750,000 or more in Federal grant money in a single fiscal year since
2016. These audits are copied from the Federal Audit Clearinghouse.

### Which Organizations Are Here?

Every organization that has been recognized as tax exempt by the IRS
has to file Form 990 every year, unless they make less than $200,000
in revenue and have less than $500,000 in assets, in which case they
have to file form 990-EZ. Organizations making less than $50,000
don’t have to file either form but do have to let the IRS they’re
still in business via a
Form 990N "e-Postcard."

Nonprofit Explorer has organizations claiming tax exemption in each
of the 27 subsections of the 501(c) section of the tax code, and
which have filed a Form 990, Form 990EZ or Form 990PF. Taxable
trusts and private foundations that are required to file a form
990PF are also included. Small organizations filing a Form 990N
"e-Postcard" are not included in this data.

### Types of Nonprofits

There are 27 nonprofit designations based on the numbered
subsections of section 501(c) of the tax code.
See the list »

### Get the Data

For those interested in acquiring the original data from the source,
here’s where our data comes from:

Raw filing data. Includes EINs and summary financials as structured data.

Exempt Organization profiles. Includes organization names, addresses, etc. You can merge
this with the raw filing data using EIN numbers.

Form 990 documents. Prior to 2017, these documents were obtained and processed by
Public.Resource.org
and ProPublica. Bulk PDF downloads since 2017 are available from
the IRS.

Form 990 documents as XML files. Includes complete filing data (financial details, names of
officers, tax schedules, etc.) in machine-readable format. Only
available for electronically filed documents. Electronic data
released prior to October 2021 is also available
through Amazon Web Services.

Audits. PDFs of single or program-specific audits for nonprofit
organizations that spent $750,000 or more in Federal grant money
in a single fiscal year. Available for fiscal year 2015 and
later.

### API

The data powering this website is available programmatically, via an
API. Read the API documentation »

See an issue with the data?

Contact Us

## About Nonprofit Explorer

Nonprofit Explorer

Browse millions of annual returns filed by tax-exempt organizations with
ProPublica’s Nonprofit Explorer. See details like executive compensation,
revenue, expenses and more. Search for an organization or a person, or search
the full text of filings.

By
Andrea Suozzo,
Alec Glassford,
Ash Ngu and
Brandon Roberts.

Design by Jeff Frankl. Additional development by Ken Schwencke, Mike Tigas, and Sisi Wei.

E-file viewer adapted from
IRS e-File Viewer by Ben Getson. Code for scraping audit documents adapated from
Govwiki.

Updated August 20, 2026
