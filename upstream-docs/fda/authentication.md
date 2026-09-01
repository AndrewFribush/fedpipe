# Authentication

Source: https://open.fda.gov/apis/authentication/

---

## Authentication

An API key is required to make calls to the openFDA API. The key is free of charge. Your use of the API may be subject to certain limitations on access, calls, or use. These limitations are designed to manage load on the system, promote equitable access, and prevent abuse. Here are openFDA's standard limits:

- With no API key: 240 requests per minute, per IP address. 1,000 requests per day, per IP address.

- With an API key: 240 requests per minute, per key. 120,000 requests per day, per key.

If you anticipate usage above the limits provided by an API key, please contact us. We’ll work with you to figure out a good solution to your requirements. Signing up for an API key means you agree to our terms of service.
Get your API key

### Using your API key

Your API key should be passed to the API as the value of the api_key parameter. Include it before other parameters, such as the search parameter. For example:
https://api.fda.gov/drug/event.json?api_key=yourAPIKeyHere&search=...

### HTTPS requests only

Alternatively your API key may be provided as a basic auth username. For example:
Authorization: Basic eW91ckFQSUtleUhlcmU6
openFDA requires you to use https://api.fda.gov for all queries to ensure secure communication.
