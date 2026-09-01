# Alt Fuel Stations API

Source: https://developer.nlr.gov/docs/transportation/alt-fuel-stations-v1/

---

Alternative Fuel Stations
API

NLR: Developer Network

Skip to main content

- APIs & Documentation

- Transportation

- Alternative Fuel Stations

Existing API Users: Update any developer.nrel.gov references in your code to developer.nlr.gov. The previous developer.nrel.gov domain was retired on May 29, 2026.
Learn more about the domain transition.

# Alternative Fuel Stations

Query our database of alternative fuel stations. This dataset powers the Alternative Fueling Station Locator on the Alternative Fuels Data Center.

This includes biodiesel (B20 and above), compressed natural gas (CNG), electric vehicle (EV) charging, ethanol (E85), hydrogen, liquefied natural gas (LNG), propane (LPG), and renewable diesel (R20 and above) station locations.

###

All Stations

(GET /api/alt-fuel-stations/v1)

Return a full list of alternative fuel stations that match your query.

###

Get Station by ID

(GET /api/alt-fuel-stations/v1/:id)

Fetch the details of a specific alternative fuel station given the station's ID.

###

Nearest Stations

(GET /api/alt-fuel-stations/v1/nearest)

Return the nearest alternative fuel stations within a distance of a given location.

###

Stations Nearby Route

(GET|POST /api/alt-fuel-stations/v1/nearby-route)

Find alternative fuel stations within a distance of a driving route.

###

Electric Vehicle Charging Networks

(GET /api/alt-fuel-stations/v1/electric-networks)

Return a full list of electric vehicle (EV) charging networks.

###

Electric Vehicle Charging Ports

(GET /api/alt-fuel-stations/v1/ev-charging-units)

Return a CSV file of EV charging ports for stations that match your query. For JSON or other file formats, this information is available via the All Stations API.

###

Last Updated Date

(GET /api/alt-fuel-stations/v1/last-updated)

Retrieve the date when the alternative fuel stations data were last updated.

Help improve this content
