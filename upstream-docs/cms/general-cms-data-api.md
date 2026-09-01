# General CMS Data API

Source: https://data.cms.gov/api-docs

---

API Page | CMS Data

Page Not Found | CMS Data

Official websites use .gov
A .gov website belongs to an official government organization in the United States.

Secure .gov websites use HTTPS
A lock () or https:// means you’ve safely connected to the .gov website. Share sensitive information only on official, secure websites.

# Centers for Medicare & Medicaid Services Data API 1.0.0 OAS3

## API documentation

Explore the documentation and examples to integrate with our Public API Open Data Catalog.

Our FAQ contains answers to common questions.

## What's new

Resources, which are supplemental documents to the main dataset, are now available for programmatic download in the API. Through our Public API Open Data Catalog, you can find direct download links for resources such as sub-files, tables, supplementary data, reports, and documentation. The new endpoints can be accessed using the 'resourcesAPI' field. For more details on the data catalog and code examples, download our API FAQ document.

## API integrations

Our API responses are in a JSON format. To integrate your endpoint requests with the data.cms.gov Public API, follow these steps:

- Find your Dataset & its Unique Identifier

- Search for your dataset and visit its 'overview' page. Click on ‘Access API’ and then on the ‘API Docs for the Dataset’ link.

- Integrate your Dataset Endpoint Paths

- Dataset API endpoints have this structure: data.cms.gov/data-api/v1/dataset/{{dataset_id}}/data. Use this URL with your dataset ID obtained from Step 1.

- Example: https://data.cms.gov/data-api/v1/dataset/2457ea29-fc82-48b0-86ec-3b0755de7515/data

- Integrate your API Endpoint Requests

- The system uses the JSONAPI

query syntax.

- The simplest, most common filter is a key-value filter: ?filter[field_name]=value&filter[field_other]=value.

- Examples

- Exact match search on 1 column
To filter ‘‘Medicare Fee-For-Service Public Provider Enrollment’ Dataset, by column ‘PROVIDER_TYPE_DESC’, use the following request: data.cms.gov/data-api/v1/dataset/2457ea29-fc82-48b0-86ec-3b0755de7515/data?filter[PROVIDER_TYPE_DESC]=PRACTITIONER%20-%20GENERAL%20PRACTICE

‘Contains’ search on 1 column

To filter the ‘Medicare Fee-For-Service Public Provider Enrollment’ Dataset and find all rows that contain ‘SUPPLIER’ in the ‘PROVIDER_TYPE_DESC’ column, the request is:

data.cms.gov/data-api/v1/dataset/2457ea29-fc82-48b0-86ec-3b0755de7515/data?filter[example][condition][path]=PROVIDER_TYPE_DESC&filter[example][condition][operator]=CONTAINS&filter[example][condition][value]=SUPPLIER

Combination search on 2 columns To filter the ‘Medicare Fee-For-Service Public Provider Enrollment’ Dataset and find all rows that contain ‘PRACTITIONER’ in the ‘PROVIDER_TYPE_DESC’ column where the 'STATE_CD' is 'MD', the request is: data.cms.gov/data-api/v1/dataset/2457ea29-fc82-48b0-86ec-3b0755de7515/data?filter[filter-1][condition][path]=PROVIDER_TYPE_DESC&filter[filter-1][condition][operator]=CONTAINS&filter[filter-1][condition][value]=PRACTITIONER&filter[filter-2][condition][path]=STATE_CD&filter[filter-2][condition][operator]==&filter[filter-2][condition][value]=MD

Refer to the Drupal documentation

for more information on filtering API requests.

Integrate your API Endpoint Requests to support paging​​​​​​

API Responses are paged and support a max page size of 5000 rows. Use the size & offset query parameters to page through the data, as shown below:

1st example: this request returns the first 50 rows of a dataset: data.cms.gov/data-api/v1/dataset/2457ea29-fc82-48b0-86ec-3b0755de7515/data?size=50&offset=0

2nd example: this request returns the next 50 rows (51 - 100):

data.cms.gov/data-api/v1/dataset/2457ea29-fc82-48b0-86ec-3b0755de7515/data?size=50&offset=50

## Additional information

The Application Programming Interface (API) offers access to the Centers for Medicare & Medicaid Services public data allowing you to interactively analyze our datasets in real-time. Our APIs are organized around REST and have predictable resource-oriented URLs, accept form-encoded requests and returns JSON & JSON:API encoded responses and uses standard HTTP response codes.

# Centers for Medicare & Medicaid Services Data API 1.0.0 OAS 3.0

Servershttps://data.cms.gov/data-api/v1

### Resources

GET/dataset/{uuid}/data

GET/dataset/{uuid}/data-viewer

GET/dataset/{uuid}/data-viewer/stats

#### Schemas

PrimaryDataFileCsvPlainResponse
PrimaryDataFileDataResponse
PrimaryDataFileViewerResponse
PrimaryDataFileViewerStatsResponse
Columns
GroupBy
Keywords
Offset
Limit
Distinct
MetaLimited
LinksSelf
Meta

## Contact us

Didn’t find the answer you were looking for?
Email Support

A federal government website managed and paid for by the U.S. Centers for Medicare & Medicaid Services.

### Our Headquarters

7500 Security Boulevard, Baltimore, MD 21244

### Helpful Links

- Contact
- RSS Feeds
- Get Email Updates
- Site Map

### Information Governance

- Freedom of Information Act
- No Fear Act
- Privacy Policy
- Vulnerability Disclosure Policy
- Privacy Settings

CMS.gov
Medicare.gov
MyMedicare.gov
Medicaid.gov
InsureKidsNow.gov
Healthcare.gov
HHS.gov

v1.188.1
