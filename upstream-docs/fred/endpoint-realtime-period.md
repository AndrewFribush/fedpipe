# endpoint realtime period

Source: https://fred.stlouisfed.org/docs/api/fred/realtime_period.html

---

St. Louis Fed Web Services: FRED® API Real-Time Periods

Skip to main content

Terms of Use

# Real-Time Periods

- Introduction

Examples

- Complete Real-time Period: First to Last Available

- Real-time Period for the 1980s Decade

## Introduction

The real-time period marks when facts were true or when information was known until it changed.
Economic data sources, releases, series, and observations are all assigned a real-time period.
Sources, releases, and series can change their names, and observation data values can be revised.

On almost all URLs, the default real-time period is today.
This can be thought of as FRED® mode- what information about the past is available today.
ALFRED® users can change the real-time period to retrieve information that was known as of a past period of history.

The real-time period can be specified by setting the realtime_start and realtime_end variables.
Variables realtime_start and realtime_end are optional YYYY-MM-DD formatted dates that default to today's date.
The real-time period set by realtime_start and realtime_end is a (closed, closed) period.
This means that the real-time period includes the dates or boundaries set by realtime_start and realtime_end.

## Examples

Below are some examples for the fred/series/observations endpoint.

### Complete Real-time Period: First to Last Available

The following 3 examples specified the same real-time period- the complete real-time period for which information is available:

https://api.stlouisfed.org/fred/series/observations?series_id=GNPCA&realtime_start=1776-07-04&realtime_end=9999-12-31&api_key=abcdefghijklmnopqrstuvwxyz123456
https://api.stlouisfed.org/fred/series/observations?series_id=GNPCA&realtime_start=1776-07-04&api_key=abcdefghijklmnopqrstuvwxyz123456
https://api.stlouisfed.org/fred/series/observations?series_id=GNPCA&realtime_end=9999-12-31&api_key=abcdefghijklmnopqrstuvwxyz123456

Note that API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only. Use a registered API key instead.

The first example requests all known information from the first available (1776-07-04) to the last available (9999-12-31). The second example requests all known information after the first available (1776-07-04). The third example requests all known information before the last available (9999-12-31).

### Real-time Period for the 1980s Decade

To set the real-time period for the decade of the 1980s, set realtime_start = '1980-01-01' and realtime_end = '1989-12-31'.

https://api.stlouisfed.org/fred/series/observations?series_id=GNPCA&realtime_start=1980-01-01&realtime_end=1989-12-31&api_key=abcdefghijklmnopqrstuvwxyz123456

To set the real-time period to 1980-01-01 and later, set realtime_start to '1980-01-01' and leave realtime_end unset or set realtime_end to '9999-12-31'.

https://api.stlouisfed.org/fred/series/observations?series_id=GNPCA&realtime_start=1980-01-01&api_key=abcdefghijklmnopqrstuvwxyz123456
https://api.stlouisfed.org/fred/series/observations?series_id=GNPCA&realtime_start=1980-01-01&realtime_end=9999-12-31&api_key=abcdefghijklmnopqrstuvwxyz123456

To set the real-time period to 1980-01-01 and earlier, set realtime_end to '1980-01-01' and leave realtime_start unset or set realtime_start to '1776-07-04'.

https://api.stlouisfed.org/fred/series/observations?series_id=GNPCA&realtime_end=1980-01-01&api_key=abcdefghijklmnopqrstuvwxyz123456
https://api.stlouisfed.org/fred/series/observations?series_id=GNPCA&realtime_start=1776-07-04&realtime_end=1980-01-01&api_key=abcdefghijklmnopqrstuvwxyz123456

## Related:

ALFRED®, FRED® versus ALFRED®

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
