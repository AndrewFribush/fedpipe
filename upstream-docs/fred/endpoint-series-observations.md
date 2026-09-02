# endpoint series observations

Source: https://fred.stlouisfed.org/docs/api/fred/series_observations.html

---

St. Louis Fed Web Services: fred/series/observations

Skip to main content

Terms of Use

# fred/series/observations

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

- observation_start

- observation_end

- units

- frequency

- aggregation_method

- output_type

- vintage_dates

## Description

Get the observations or data values for an economic data series.

## Examples

This request can return either XML, JSON, Excel Spreadsheet, or a zipped CSV by setting the file_type parameter to xml, json, xlsx, or csv.
Note that the default value of file_type is xml.
The API key 'abcdefghijklmnopqrstuvwxyz123456' is for demonstration purposes only.
Use a registered API key instead.

### XML

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/series/observations?series_id=GNPCA&api_key=abcdefghijklmnopqrstuvwxyz123456

#### Response

<observations realtime_start="2013-08-14" realtime_end="2013-08-14" observation_start="1776-07-04" observation_end="9999-12-31" units="lin" output_type="1" file_type="xml" order_by="observation_date" sort_order="asc" count="84" offset="0" limit="100000">
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1929-01-01" value="1065.9"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1930-01-01" value="975.5"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1931-01-01" value="912.1"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1932-01-01" value="794.1"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1933-01-01" value="783.3"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1934-01-01" value="866.7"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1935-01-01" value="944.3"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1936-01-01" value="1065.0"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1937-01-01" value="1120.6"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1938-01-01" value="1083.9"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1939-01-01" value="1170.2"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1940-01-01" value="1271.7"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1941-01-01" value="1497.6"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1942-01-01" value="1779.4"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1943-01-01" value="2081.2"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1944-01-01" value="2247.3"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1945-01-01" value="2224.7"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1946-01-01" value="1969.3"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1947-01-01" value="1950.6"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1948-01-01" value="2033.2"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1949-01-01" value="2021.1"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1950-01-01" value="2197.5"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1951-01-01" value="2376.4"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1952-01-01" value="2473.1"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1953-01-01" value="2587.7"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1954-01-01" value="2574.2"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1955-01-01" value="2758.4"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1956-01-01" value="2818.6"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1957-01-01" value="2878.5"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1958-01-01" value="2854.6"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1959-01-01" value="3050.8"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1960-01-01" value="3130.4"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1961-01-01" value="3211.9"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1962-01-01" value="3409.8"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1963-01-01" value="3559.0"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1964-01-01" value="3764.8"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1965-01-01" value="4008.8"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1966-01-01" value="4269.4"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1967-01-01" value="4386.7"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1968-01-01" value="4602.8"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1969-01-01" value="4745.2"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1970-01-01" value="4754.6"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1971-01-01" value="4913.6"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1972-01-01" value="5172.2"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1973-01-01" value="5475.1"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1974-01-01" value="5454.1"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1975-01-01" value="5430.4"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1976-01-01" value="5729.1"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1977-01-01" value="5997.3"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1978-01-01" value="6326.9"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1979-01-01" value="6547.0"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1980-01-01" value="6530.3"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1981-01-01" value="6688.0"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1982-01-01" value="6564.6"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1983-01-01" value="6863.2"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1984-01-01" value="7352.5"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1985-01-01" value="7640.2"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1986-01-01" value="7890.9"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1987-01-01" value="8161.0"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1988-01-01" value="8509.9"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1989-01-01" value="8822.6"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1990-01-01" value="9003.0"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1991-01-01" value="8988.6"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1992-01-01" value="9305.0"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1993-01-01" value="9559.8"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1994-01-01" value="9932.2"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1995-01-01" value="10206.2"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1996-01-01" value="10595.1"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1997-01-01" value="11058.1"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1998-01-01" value="11540.7"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="1999-01-01" value="12108.9"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="2000-01-01" value="12614.3"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="2001-01-01" value="12750.2"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="2002-01-01" value="12970.8"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="2003-01-01" value="13352.2"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="2004-01-01" value="13879.0"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="2005-01-01" value="14340.8"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="2006-01-01" value="14690.9"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="2007-01-01" value="15009.7"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="2008-01-01" value="15009.0"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="2009-01-01" value="14565.1"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="2010-01-01" value="14966.5"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="2011-01-01" value="15286.7"/>
<observation realtime_start="2013-08-14" realtime_end="2013-08-14" date="2012-01-01" value="15693.1"/>
</observations>

### JSON

#### Request (HTTPS GET)

https://api.stlouisfed.org/fred/series/observations?series_id=GNPCA&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

#### Response

{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"observation_start": "1776-07-04",
"observation_end": "9999-12-31",
"units": "lin",
"output_type": 1,
"file_type": "json",
"order_by": "observation_date",
"sort_order": "asc",
"count": 84,
"offset": 0,
"limit": 100000,
"observations": [
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1929-01-01",
"value": "1065.9"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1930-01-01",
"value": "975.5"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1931-01-01",
"value": "912.1"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1932-01-01",
"value": "794.1"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1933-01-01",
"value": "783.3"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1934-01-01",
"value": "866.7"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1935-01-01",
"value": "944.3"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1936-01-01",
"value": "1065.0"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1937-01-01",
"value": "1120.6"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1938-01-01",
"value": "1083.9"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1939-01-01",
"value": "1170.2"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1940-01-01",
"value": "1271.7"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1941-01-01",
"value": "1497.6"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1942-01-01",
"value": "1779.4"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1943-01-01",
"value": "2081.2"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1944-01-01",
"value": "2247.3"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1945-01-01",
"value": "2224.7"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1946-01-01",
"value": "1969.3"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1947-01-01",
"value": "1950.6"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1948-01-01",
"value": "2033.2"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1949-01-01",
"value": "2021.1"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1950-01-01",
"value": "2197.5"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1951-01-01",
"value": "2376.4"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1952-01-01",
"value": "2473.1"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1953-01-01",
"value": "2587.7"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1954-01-01",
"value": "2574.2"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1955-01-01",
"value": "2758.4"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1956-01-01",
"value": "2818.6"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1957-01-01",
"value": "2878.5"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1958-01-01",
"value": "2854.6"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1959-01-01",
"value": "3050.8"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1960-01-01",
"value": "3130.4"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1961-01-01",
"value": "3211.9"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1962-01-01",
"value": "3409.8"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1963-01-01",
"value": "3559.0"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1964-01-01",
"value": "3764.8"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1965-01-01",
"value": "4008.8"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1966-01-01",
"value": "4269.4"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1967-01-01",
"value": "4386.7"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1968-01-01",
"value": "4602.8"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1969-01-01",
"value": "4745.2"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1970-01-01",
"value": "4754.6"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1971-01-01",
"value": "4913.6"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1972-01-01",
"value": "5172.2"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1973-01-01",
"value": "5475.1"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1974-01-01",
"value": "5454.1"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1975-01-01",
"value": "5430.4"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1976-01-01",
"value": "5729.1"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1977-01-01",
"value": "5997.3"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1978-01-01",
"value": "6326.9"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1979-01-01",
"value": "6547.0"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1980-01-01",
"value": "6530.3"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1981-01-01",
"value": "6688.0"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1982-01-01",
"value": "6564.6"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1983-01-01",
"value": "6863.2"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1984-01-01",
"value": "7352.5"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1985-01-01",
"value": "7640.2"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1986-01-01",
"value": "7890.9"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1987-01-01",
"value": "8161.0"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1988-01-01",
"value": "8509.9"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1989-01-01",
"value": "8822.6"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1990-01-01",
"value": "9003.0"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1991-01-01",
"value": "8988.6"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1992-01-01",
"value": "9305.0"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1993-01-01",
"value": "9559.8"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1994-01-01",
"value": "9932.2"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1995-01-01",
"value": "10206.2"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1996-01-01",
"value": "10595.1"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1997-01-01",
"value": "11058.1"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1998-01-01",
"value": "11540.7"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "1999-01-01",
"value": "12108.9"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "2000-01-01",
"value": "12614.3"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "2001-01-01",
"value": "12750.2"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "2002-01-01",
"value": "12970.8"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "2003-01-01",
"value": "13352.2"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "2004-01-01",
"value": "13879.0"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "2005-01-01",
"value": "14340.8"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "2006-01-01",
"value": "14690.9"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "2007-01-01",
"value": "15009.7"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "2008-01-01",
"value": "15009.0"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "2009-01-01",
"value": "14565.1"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "2010-01-01",
"value": "14966.5"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "2011-01-01",
"value": "15286.7"
},
{
"realtime_start": "2013-08-14",
"realtime_end": "2013-08-14",
"date": "2012-01-01",
"value": "15693.1"
}
]
}

## Parameters

### api_key

Read API Keys for more information.

- 32 character alpha-numeric lowercase string, required

### file_type

A key or file extension that indicates the type of file to send.

- string, optional, default: xml

- One of the following values: 'xml', 'json', 'xlsx', 'csv'

xml = Extensible Markup Language

json = JavaScript Object Notation

xlsx = Excel Spreadsheet

csv = Comma-Separated Values Text Format (File is returned as compressed zip file. The zip file contains the specified file format csv and a text README file.)

### series_id

The id for a series.

- string, required

### realtime_start

The start of the real-time period. For more information, see Real-Time Periods, vintage_dates.

- YYYY-MM-DD formatted string, optional, default: today's date

### realtime_end

The end of the real-time period. For more information, see Real-Time Periods, vintage_dates.

- YYYY-MM-DD formatted string, optional, default: today's date

### limit

The maximum number of results to return.

- integer between 1 and 100000, optional, default: 100000

### offset

- non-negative integer, optional, default: 0

### sort_order

Sort results is ascending or descending observation_date order.

- One of the following strings: 'asc', 'desc'.

- optional, default: asc

### observation_start

The start of the observation period.

- YYYY-MM-DD formatted string, optional, default: 1776-07-04 (earliest available)

### observation_end

The end of the observation period.

- YYYY-MM-DD formatted string, optional, default: 9999-12-31 (latest available)

### units

A key that indicates a data value transformation.

- string, optional, default: lin (No transformation)

- One of the following values: 'lin', 'chg', 'ch1', 'pch', 'pc1', 'pca', 'cch', 'cca', 'log'

lin = Levels (No transformation)

chg = Change

ch1 = Change from Year Ago

pch = Percent Change

pc1 = Percent Change from Year Ago

pca = Compounded Annual Rate of Change

cch = Continuously Compounded Rate of Change

cca = Continuously Compounded Annual Rate of Change

log = Natural Log

- For unit transformation formulas, see:

https://alfred.stlouisfed.org/help#growth_formulas

### frequency

An optional parameter that indicates a lower frequency to aggregate values to.
The FRED frequency aggregation feature converts higher frequency data series into lower frequency data series (e.g. converts a monthly data series into an annual data series).
In FRED, the highest frequency data is daily, and the lowest frequency data is annual.
There are 3 aggregation methods available- average, sum, and end of period.
See the aggregation_method parameter.

- string, optional, default: no value for no frequency aggregation

- One of the following values: 'd', 'w', 'bw', 'm', 'q', 'sa', 'a', 'wef', 'weth', 'wew', 'wetu', 'wem', 'wesu', 'wesa', 'bwew', 'bwem'

#### Frequencies without period descriptions:

d = Daily

w = Weekly

bw = Biweekly

m = Monthly

q = Quarterly

sa = Semiannual

a = Annual

#### Frequencies with period descriptions:

wef = Weekly, Ending Friday

weth = Weekly, Ending Thursday

wew = Weekly, Ending Wednesday

wetu = Weekly, Ending Tuesday

wem = Weekly, Ending Monday

wesu = Weekly, Ending Sunday

wesa = Weekly, Ending Saturday

bwew = Biweekly, Ending Wednesday

bwem = Biweekly, Ending Monday

Note that an error will be returned if a frequency is specified that is higher than the native frequency of the series.
For instance if a series has the native frequency 'Monthly' (as returned by the fred/series request),
it is not possible to aggregate the series to the higher 'Daily' frequency using the frequency parameter value 'd'.

No frequency aggregation will occur if the frequency specified by the frequency parameter matches the native frequency of the series.
For instance if the value of the frequency parameter is 'm' and the native frequency of the series is 'Monthly' (as returned by the fred/series request),
observations will be returned, but they will not be aggregated to a lower frequency.

For most cases, it will be sufficient to specify a lower frequency without a period description (e.g. 'd', 'w', 'bw', 'm', 'q', 'sa', 'a') as opposed to frequencies with period descriptions
(e.g. 'wef', 'weth', 'wew', 'wetu', 'wem', 'wesu', 'wesa', 'bwew', 'bwem') which only exist for the weekly and biweekly frequencies.

The weekly and biweekly frequencies with periods exist to offer more options and override the default periods implied by values 'w' and 'bw'.

The value 'w' defaults to frequency and period 'Weekly, Ending Friday' when aggregating daily series.

The value 'bw' defaults to frequency and period 'Biweekly, Ending Wednesday' when aggregating daily and weekly series.

Consider the difference between values 'w' for 'Weekly' and 'wef' for 'Weekly, Ending Friday'.
When aggregating observations from daily to weekly, the value 'w' defaults to frequency and period 'Weekly, Ending Friday' which is the same as 'wef'.
Here, the difference is that the period 'Ending Friday' is implicit for value 'w' but explicit for value 'wef'.
However, if a series has native frequency 'Weekly, Ending Monday', an error will be returned for value 'wef' but not value 'w'.

Note that frequency aggregation is currently only available for file_type equal to xml or json due to time constraints.

Read the 'Frequency Aggregation' section of the FRED FAQs
for implementation details.

### aggregation_method

A key that indicates the aggregation method used for frequency aggregation.
This parameter has no affect if the frequency parameter is not set.

- string, optional, default: avg

- One of the following values: 'avg', 'sum', 'eop'

avg = Average

sum = Sum

eop = End of Period

### output_type

An integer that indicates an output type.

- integer, optional, default: 1

- One of the following values: '1', '2', '3', '4'

1 = Observations by Real-Time Period

2 = Observations by Vintage Date, All Observations

3 = Observations by Vintage Date, New and Revised Observations Only

4 = Observations, Initial Release Only

For output types '2' and '3', some XML attribute names start with the series ID which may have a first character that is a number (i.e. 0 through 9).
In this case only, the XML attribute name starts with an underscore then the series ID in order to avoid invalid XML.
If the series ID starts with a letter (i.e. A through Z) then an underscore is not prepended.

- For more information, read:

https://alfred.stlouisfed.org/help/downloaddata#outputformats

### vintage_dates

A comma separated string of YYYY-MM-DD formatted dates in history (e.g. 2000-01-01,2005-02-24).
Vintage dates are used to download data as it existed on these specified dates in history.
Vintage dates can be specified instead of a real-time period using realtime_start and realtime_end.

Sometimes it may be useful to enter a vintage date that is not a date when the data values were revised.
For instance you may want to know the latest available revisions on a particular date.
Entering a vintage date is also useful to compare series on different releases with different release dates.

- string, optional, no vintage dates are set by default.

Your query will be limited to a specific number of vintage dates depending on the series_id, file_type and output_type specified.

- output_type=2, series_id=USRECD: 110 csv, 55 xlsx

- output_type=2, any daily series: 450 csv, 225 xlsx

- any output_type or other series: 1000 csv, 1000 xlsx, 2000 json, 2000 xml

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
