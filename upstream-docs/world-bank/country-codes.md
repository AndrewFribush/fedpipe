# Country Codes

Source: https://datahelpdesk.worldbank.org/knowledgebase/articles/898590

---

Country API Queries – World Bank Data Help Desk

Skip to content

Skip to Main Navigation

## Requesting Country Data

To list all countries: https://api.worldbank.org/v2/country

The following information will appear, when available, in the response when using this country query through the World Bank API:

- 3 letter ISO 3166-1 alpha-3 code

- 2 letter ISO 3166-1 alpha-2 code

- Name

- Region: ID, name and World Bank 2 letter code

- Income Level: ID, name and World Bank 2 letter code

- Lending Type: ID, name and World Bank 2 letter code

- Capital City

- Longitude

- Latitude

### Sample Request Format: Country Query

For XML format: https://api.worldbank.org/v2/country/br

For JSON format: https://api.worldbank.org/v2/country/br?format=json

Note: “br” is the two-letter ISO code for Brazil.

### Sample Response Format: Country Query

- XML:

https://api.worldbank.org/v2/country/br

<wb:countries xmlns:wb="http://www.worldbank.org" page="1" pages="1" per_page="50" total="1">
<wb:country id="BRA">
<wb:iso2Code>BR</wb:iso2Code>
<wb:name>Brazil</wb:name>
<wb:region id="LCN" iso2code="ZJ">Latin America & Caribbean (all income levels)</wb:region>
<wb:adminregion id="LAC" iso2code="XJ">Latin America & Caribbean (developing only)</wb:adminregion>
<wb:incomeLevel id="UMC" iso2code="XT">Upper middle income</wb:incomeLevel>
<wb:lendingType id="IBD" iso2code="XF">IBRD</wb:lendingType>
<wb:capitalCity>Brasilia</wb:capitalCity>
<wb:longitude>-47.9292</wb:longitude>
<wb:latitude>-15.7801</wb:latitude>
</wb:country>
</wb:countries>

- JSON: https://api.worldbank.org/v2/country/br?format=json

[
{
"page": 1,
"pages": 1,
"per_page": "50",
"total": 1
},
[
{
"id": "BRA",
"iso2Code": "BR",
"name": "Brazil",
"region": {
"id": "LCN",
"iso2code": "ZJ",
"value": "Latin America & Caribbean (all income levels)"
},
"adminregion": {
"id": "LAC",
"iso2code": "XJ",
"value": "Latin America & Caribbean (developing only)"
},
"incomeLevel": {
"id": "UMC",
"iso2code": "XT",
"value": "Upper middle income"
},
"lendingType": {
"id": "IBD",
"iso2code": "XF",
"value": "IBRD"
},
"capitalCity": "Brasilia",
"longitude": "-47.9292",
"latitude": "-15.7801"
}
]
]

Note: The API returns ISO 3 and ISO 2 codes wherever present. If ISO codes are not available, it returns WB 3 and WB 2 codes. For example, Channel Islands return WB 3 code CHI and WB2 code JG.

Sign in with

## We're glad you're here

Please sign in to leave feedback

Signed in as
(Sign out)

## We're glad you're here

Please sign in to leave feedback

Signed in as
(Sign out)

Close

Close

Thank you for visiting the World Bank's Data Help Desk. Please review the terms of use for this website. Your continued use of this website constitutes your acceptance of these terms and conditions.

Developer Info

Search

Search

(thinking…)

Reset

##
Searching…

No results.

Clear search results
