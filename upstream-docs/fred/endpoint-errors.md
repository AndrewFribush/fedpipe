# endpoint errors

Source: https://fred.stlouisfed.org/docs/api/fred/errors.html

---

St. Louis Fed Web Services: FRED® API Errors

Skip to main content

Terms of Use

# Errors

If an error occurs, the web service will return an HTTP response with the error status code and an XML or JSON body containing the error. For example:

## XML

### Request

https://api.stlouisfed.org/fred/series/updates

### Response

HTTP/1.x 400 Bad Request
Content-Type: text/xml;charset=utf-8
...

<error code="400" message="Bad Request. Variable api_key has not been set."/>

The message attribute of the error tag contains a description of the error.
All errors use standard HTTP status codes. Our API has rate limiting which returns a status code if exceeded.
If you have a reason that you need to exceed our limit, please contact us.
The following HTTP status code may be returned:

- 400 Bad Request

- 404 Not Found

- 423 Locked

- 429 Too Many Requests

- 500 Internal Server Error

## JSON

### Request

https://api.stlouisfed.org/fred/series/updates?file_type=json

### Response

HTTP/1.x 400 Bad Request
Content-Type: text/xml;charset=utf-8
...

{
"error_code": 400,
"error_message": "Bad Request. The value for variable api_key is not registered. Read https://fred.stlouisfed.org/docs/api/api_key.html for more information."
}

Back to Top

Filter
0

### Subscribe to the FRED newsletter

Subscribe

### Follow us

Saint Louis Fed linkedin page

Saint Louis Fed facebook page

Saint Louis Fed X page

Saint Louis Fed YouTube page

### Need Help?

Questions or Comments

FRED Help

Legal

Privacy Notice & Policy
