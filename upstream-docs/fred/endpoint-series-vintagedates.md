# endpoint series vintagedates

Source: https://fred.stlouisfed.org/docs/api/fred/series_vintagedates.html

---

St. Louis Fed Web Services: fred/series/vintagedates

Skip to main content

Terms of Use

# fred/series/vintagedates

- Description

- Examples

- XML

- JSON

Parameters

- api_key

- file_type

- series_id

- realtime_start

- realtime_end

- limit

- offset

- sort_order

## Description

Get the dates in history when a series' data values were revised or new data values were released.
Vintage dates are the release dates for a series excluding release dates when the data for the series did not change.

## Examples

This request can return either XML or JSON by setting the file_type parameter to xml or json.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/series/vintagedates?series_id=GNPCA&api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<vintage_dates realtime_start="1776-07-04" realtime_end="9999-12-31" order_by="vintage_date" sort_order="asc" count="162" offset="0" limit="10000">
<vintage_date>1958-12-21</vintage_date>
<vintage_date>1959-02-19</vintage_date>
<vintage_date>1959-07-19</vintage_date>
<vintage_date>1960-02-16</vintage_date>
<vintage_date>1960-07-22</vintage_date>
<vintage_date>1961-02-19</vintage_date>
<vintage_date>1961-07-19</vintage_date>
<vintage_date>1962-02-24</vintage_date>
<vintage_date>1962-07-20</vintage_date>
<vintage_date>1963-02-20</vintage_date>
<vintage_date>1963-07-22</vintage_date>
<vintage_date>1964-02-20</vintage_date>
<vintage_date>1964-07-16</vintage_date>
<vintage_date>1965-01-14</vintage_date>
<vintage_date>1965-02-17</vintage_date>
<vintage_date>1965-08-19</vintage_date>
<vintage_date>1966-01-13</vintage_date>
<vintage_date>1966-02-15</vintage_date>
<vintage_date>1966-07-15</vintage_date>
<vintage_date>1967-01-13</vintage_date>
<vintage_date>1967-02-17</vintage_date>
<vintage_date>1967-07-17</vintage_date>
<vintage_date>1968-01-16</vintage_date>
<vintage_date>1968-02-15</vintage_date>
<vintage_date>1968-07-18</vintage_date>
<vintage_date>1969-01-14</vintage_date>
<vintage_date>1969-02-14</vintage_date>
<vintage_date>1969-07-17</vintage_date>
<vintage_date>1970-01-16</vintage_date>
<vintage_date>1970-02-13</vintage_date>
<vintage_date>1970-07-17</vintage_date>
<vintage_date>1971-01-18</vintage_date>
<vintage_date>1971-02-12</vintage_date>
<vintage_date>1971-07-16</vintage_date>
<vintage_date>1972-01-21</vintage_date>
<vintage_date>1972-02-18</vintage_date>
<vintage_date>1972-07-21</vintage_date>
<vintage_date>1973-01-19</vintage_date>
<vintage_date>1973-02-20</vintage_date>
<vintage_date>1973-07-19</vintage_date>
<vintage_date>1974-01-17</vintage_date>
<vintage_date>1974-02-20</vintage_date>
<vintage_date>1974-07-18</vintage_date>
<vintage_date>1975-01-16</vintage_date>
<vintage_date>1975-03-20</vintage_date>
<vintage_date>1976-01-16</vintage_date>
<vintage_date>1976-01-20</vintage_date>
<vintage_date>1976-02-19</vintage_date>
<vintage_date>1976-03-19</vintage_date>
<vintage_date>1976-07-20</vintage_date>
<vintage_date>1977-01-18</vintage_date>
<vintage_date>1977-02-18</vintage_date>
<vintage_date>1977-03-21</vintage_date>
<vintage_date>1977-07-21</vintage_date>
<vintage_date>1978-01-19</vintage_date>
<vintage_date>1978-02-21</vintage_date>
<vintage_date>1978-03-20</vintage_date>
<vintage_date>1978-07-21</vintage_date>
<vintage_date>1979-01-18</vintage_date>
<vintage_date>1979-02-22</vintage_date>
<vintage_date>1979-03-20</vintage_date>
<vintage_date>1979-07-20</vintage_date>
<vintage_date>1980-01-18</vintage_date>
<vintage_date>1980-02-22</vintage_date>
<vintage_date>1980-03-19</vintage_date>
<vintage_date>1980-12-23</vintage_date>
<vintage_date>1981-01-21</vintage_date>
<vintage_date>1981-02-19</vintage_date>
<vintage_date>1981-03-18</vintage_date>
<vintage_date>1982-01-20</vintage_date>
<vintage_date>1982-02-22</vintage_date>
<vintage_date>1982-03-19</vintage_date>
<vintage_date>1982-07-21</vintage_date>
<vintage_date>1983-01-19</vintage_date>
<vintage_date>1983-02-22</vintage_date>
<vintage_date>1983-03-21</vintage_date>
<vintage_date>1983-07-21</vintage_date>
<vintage_date>1984-01-20</vintage_date>
<vintage_date>1984-02-17</vintage_date>
<vintage_date>1984-03-20</vintage_date>
<vintage_date>1984-07-23</vintage_date>
<vintage_date>1985-01-22</vintage_date>
<vintage_date>1985-02-21</vintage_date>
<vintage_date>1985-03-21</vintage_date>
<vintage_date>1985-12-20</vintage_date>
<vintage_date>1986-01-22</vintage_date>
<vintage_date>1986-02-20</vintage_date>
<vintage_date>1986-03-19</vintage_date>
<vintage_date>1986-07-22</vintage_date>
<vintage_date>1987-01-22</vintage_date>
<vintage_date>1987-02-19</vintage_date>
<vintage_date>1987-03-18</vintage_date>
<vintage_date>1987-07-24</vintage_date>
<vintage_date>1988-01-27</vintage_date>
<vintage_date>1988-02-25</vintage_date>
<vintage_date>1988-03-23</vintage_date>
<vintage_date>1988-07-27</vintage_date>
<vintage_date>1989-01-27</vintage_date>
<vintage_date>1989-02-28</vintage_date>
<vintage_date>1989-03-23</vintage_date>
<vintage_date>1989-07-27</vintage_date>
<vintage_date>1990-01-26</vintage_date>
<vintage_date>1990-02-28</vintage_date>
<vintage_date>1990-03-28</vintage_date>
<vintage_date>1990-07-27</vintage_date>
<vintage_date>1991-01-25</vintage_date>
<vintage_date>1991-02-27</vintage_date>
<vintage_date>1991-03-27</vintage_date>
<vintage_date>1991-12-04</vintage_date>
<vintage_date>1992-02-28</vintage_date>
<vintage_date>1992-03-26</vintage_date>
<vintage_date>1992-04-28</vintage_date>
<vintage_date>1992-07-30</vintage_date>
<vintage_date>1992-09-24</vintage_date>
<vintage_date>1992-12-22</vintage_date>
<vintage_date>1993-03-26</vintage_date>
<vintage_date>1993-08-31</vintage_date>
<vintage_date>1994-03-31</vintage_date>
<vintage_date>1994-07-29</vintage_date>
<vintage_date>1995-03-31</vintage_date>
<vintage_date>1996-01-19</vintage_date>
<vintage_date>1996-04-02</vintage_date>
<vintage_date>1996-08-01</vintage_date>
<vintage_date>1997-03-28</vintage_date>
<vintage_date>1997-04-30</vintage_date>
<vintage_date>1997-07-31</vintage_date>
<vintage_date>1998-03-26</vintage_date>
<vintage_date>1998-07-31</vintage_date>
<vintage_date>1999-03-31</vintage_date>
<vintage_date>1999-10-29</vintage_date>
<vintage_date>2000-03-30</vintage_date>
<vintage_date>2000-04-03</vintage_date>
<vintage_date>2000-04-27</vintage_date>
<vintage_date>2000-07-28</vintage_date>
<vintage_date>2001-03-29</vintage_date>
<vintage_date>2001-07-27</vintage_date>
<vintage_date>2002-03-28</vintage_date>
<vintage_date>2002-07-31</vintage_date>
<vintage_date>2003-03-27</vintage_date>
<vintage_date>2003-12-23</vintage_date>
<vintage_date>2004-01-30</vintage_date>
<vintage_date>2004-03-25</vintage_date>
<vintage_date>2004-07-30</vintage_date>
<vintage_date>2005-03-30</vintage_date>
<vintage_date>2005-07-29</vintage_date>
<vintage_date>2006-03-30</vintage_date>
<vintage_date>2006-07-28</vintage_date>
<vintage_date>2007-03-29</vintage_date>
<vintage_date>2007-07-27</vintage_date>
<vintage_date>2008-03-27</vintage_date>
<vintage_date>2008-07-31</vintage_date>
<vintage_date>2009-03-26</vintage_date>
<vintage_date>2009-07-31</vintage_date>
<vintage_date>2009-08-17</vintage_date>
<vintage_date>2010-03-26</vintage_date>
<vintage_date>2010-07-30</vintage_date>
<vintage_date>2011-03-25</vintage_date>
<vintage_date>2011-07-29</vintage_date>
<vintage_date>2012-03-29</vintage_date>
<vintage_date>2012-07-27</vintage_date>
<vintage_date>2013-03-28</vintage_date>
<vintage_date>2013-07-31</vintage_date>
</vintage_dates>

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/series/vintagedates?series_id=GNPCA&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"realtime_start": "1776-07-04",
"realtime_end": "9999-12-31",
"order_by": "vintage_date",
"sort_order": "asc",
"count": 162,
"offset": 0,
"limit": 10000,
"vintage_dates": [
"1958-12-21",
"1959-02-19",
"1959-07-19",
"1960-02-16",
"1960-07-22",
"1961-02-19",
"1961-07-19",
"1962-02-24",
"1962-07-20",
"1963-02-20",
"1963-07-22",
"1964-02-20",
"1964-07-16",
"1965-01-14",
"1965-02-17",
"1965-08-19",
"1966-01-13",
"1966-02-15",
"1966-07-15",
"1967-01-13",
"1967-02-17",
"1967-07-17",
"1968-01-16",
"1968-02-15",
"1968-07-18",
"1969-01-14",
"1969-02-14",
"1969-07-17",
"1970-01-16",
"1970-02-13",
"1970-07-17",
"1971-01-18",
"1971-02-12",
"1971-07-16",
"1972-01-21",
"1972-02-18",
"1972-07-21",
"1973-01-19",
"1973-02-20",
"1973-07-19",
"1974-01-17",
"1974-02-20",
"1974-07-18",
"1975-01-16",
"1975-03-20",
"1976-01-16",
"1976-01-20",
"1976-02-19",
"1976-03-19",
"1976-07-20",
"1977-01-18",
"1977-02-18",
"1977-03-21",
"1977-07-21",
"1978-01-19",
"1978-02-21",
"1978-03-20",
"1978-07-21",
"1979-01-18",
"1979-02-22",
"1979-03-20",
"1979-07-20",
"1980-01-18",
"1980-02-22",
"1980-03-19",
"1980-12-23",
"1981-01-21",
"1981-02-19",
"1981-03-18",
"1982-01-20",
"1982-02-22",
"1982-03-19",
"1982-07-21",
"1983-01-19",
"1983-02-22",
"1983-03-21",
"1983-07-21",
"1984-01-20",
"1984-02-17",
"1984-03-20",
"1984-07-23",
"1985-01-22",
"1985-02-21",
"1985-03-21",
"1985-12-20",
"1986-01-22",
"1986-02-20",
"1986-03-19",
"1986-07-22",
"1987-01-22",
"1987-02-19",
"1987-03-18",
"1987-07-24",
"1988-01-27",
"1988-02-25",
"1988-03-23",
"1988-07-27",
"1989-01-27",
"1989-02-28",
"1989-03-23",
"1989-07-27",
"1990-01-26",
"1990-02-28",
"1990-03-28",
"1990-07-27",
"1991-01-25",
"1991-02-27",
"1991-03-27",
"1991-12-04",
"1992-02-28",
"1992-03-26",
"1992-04-28",
"1992-07-30",
"1992-09-24",
"1992-12-22",
"1993-03-26",
"1993-08-31",
"1994-03-31",
"1994-07-29",
"1995-03-31",
"1996-01-19",
"1996-04-02",
"1996-08-01",
"1997-03-28",
"1997-04-30",
"1997-07-31",
"1998-03-26",
"1998-07-31",
"1999-03-31",
"1999-10-29",
"2000-03-30",
"2000-04-03",
"2000-04-27",
"2000-07-28",
"2001-03-29",
"2001-07-27",
"2002-03-28",
"2002-07-31",
"2003-03-27",
"2003-12-23",
"2004-01-30",
"2004-03-25",
"2004-07-30",
"2005-03-30",
"2005-07-29",
"2006-03-30",
"2006-07-28",
"2007-03-29",
"2007-07-27",
"2008-03-27",
"2008-07-31",
"2009-03-26",
"2009-07-31",
"2009-08-17",
"2010-03-26",
"2010-07-30",
"2011-03-25",
"2011-07-29",
"2012-03-29",
"2012-07-27",
"2013-03-28",
"2013-07-31"
]
}

## Parameters

### api_key

Read API Keys for more information.

- 32 character alpha-numeric lowercase string, required

### file_type

A key or file extension that indicates the type of file to send.

- string, optional, default: xml

- One of the following values: 'xml', 'json'

xml = Extensible Markup Language. The HTTP Content-Type is text/xml.

json = JavaScript Object Notation. The HTTP Content-Type is application/json.

### series_id

The id for a series.

- string, required

### realtime_start

The start of the real-time period. For more information, see Real-Time Periods.

- YYYY-MM-DD formatted string, optional, default: 1776-07-04 (earliest available)

### realtime_end

The end of the real-time period. For more information, see Real-Time Periods.

- YYYY-MM-DD formatted string, optional, default: 9999-12-31 (latest available)

### limit

The maximum number of results to return.

- integer between 1 and 10000, optional, default: 10000

### offset

- non-negative integer, optional, default: 0

### sort_order

Sort results is ascending or descending vintage_date order.

- One of the following strings: 'asc', 'desc'.

- optional, default: asc

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
