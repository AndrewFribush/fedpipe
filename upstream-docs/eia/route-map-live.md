# Route Map (live)

Source: https://api.eia.gov/v2/

---

The EIA APIv2 route tree, as reported by the API itself (`GET /v2/` and `GET /v2/{route}`).

## coal — Coal

EIA coal energy data
- `coal/shipments` — Coal Shipments
- `coal/consumption-and-quality` — Consumption and Quality
- `coal/aggregate-production` — Aggregate Production
- `coal/exports-imports-quantity-price` — Exports\Imports Quantity\Price
- `coal/market-sales-price` — Market Sales Price
- `coal/mine-production` — Mine Production
- `coal/price-by-rank` — Price by Rank
- `coal/reserves-capacity` — Reserves Capacity

## crude-oil-imports — Crude Oil Imports

Crude oil imports by country to destination, 
        includes type, grade, quantity.  Source: EIA-814  Interactive data 
        product:  www.eia.gov/petroleum/imports/companylevel/
- data columns: `quantity`
- frequencies: monthly, annual

## electricity — Electricity

EIA electricity survey data
- `electricity/retail-sales` — Electricity Sales to Ultimate Customers
- `electricity/electric-power-operational-data` — Electric Power Operations (Annual and Monthly)
- `electricity/rto` — Electric Power Operations (Daily and Hourly)
- `electricity/state-electricity-profiles` — State Specific Data
- `electricity/operating-generator-capacity` — Inventory of Operable Generators
- `electricity/facility-fuel` — Electric Power Operations for Individual Power Plants (Annual and Monthly)

## international — International

Country level production, consumption, imports, exports by energy source (petroleum, natural gas, electricity, renewable, etc.)  
        Interactive product:  https://www.eia.gov/international/data/world
- data columns: `value`
- frequencies: monthly, quarterly, annual

## natural-gas — Natural Gas

EIA natural gas survey data
- `natural-gas/sum` — Summary
- `natural-gas/pri` — Prices
- `natural-gas/enr` — Exploration and Reserves
- `natural-gas/prod` — Production
- `natural-gas/move` — Imports and Exports/Pipelines
- `natural-gas/stor` — Storage
- `natural-gas/cons` — Consumption / End Use

## nuclear-outages — Nuclear Outages

EIA nuclear outages survey data
- `nuclear-outages/us-nuclear-outages` — U.S. Nuclear Outages
- `nuclear-outages/generator-nuclear-outages` — Generator Level Nuclear Outages
- `nuclear-outages/facility-nuclear-outages` — Facility Level Nuclear Outages

## petroleum — Petroleum

EIA petroleum gas survey data
- `petroleum/sum` — Summary
- `petroleum/pri` — Prices
- `petroleum/crd` — Crude Reserves and Production
- `petroleum/pnp` — Refining and Processing
- `petroleum/move` — Imports/Exports and Movements
- `petroleum/stoc` — Stocks
- `petroleum/cons` — Consumption/Sales

## seds — State Energy Data System (SEDS)

Estimated production, consumption, price, and expenditure data for all energy sources by state and sector.  
        Source:  https://www.eia.gov/state/seds/seds-technical-notes-complete.php  
        Product:  SEDS (https://www.eia.gov/state/seds/)
- data columns: `value`
- frequencies: annual

## steo — Short Term Energy Outlook

Monthly short term (18 month) projections using STEO model.  
        Report and interactive projection data browser:  STEO (www.eia.gov/steo/)
- data columns: `value`
- frequencies: annual, quarterly, monthly

## densified-biomass — Densified Biomass

EIA densified biomass data
- `densified-biomass/capacity-by-region` — Capacity by Region
- `densified-biomass/sales-and-price-by-region` — Sales and Price by Region
- `densified-biomass/export-sales-and-price` — Export Sales and Price
- `densified-biomass/feedstocks-and-cost` — Feedstocks and Costs
- `densified-biomass/production-by-region` — Production by Region
- `densified-biomass/characteristics-by-region` — Characteristics by Region
- `densified-biomass/inventories-by-region` — Inventories by Region
- `densified-biomass/wood-pellet-plants` — Wood Pellet Plant Capacity

## total-energy — Total Energy

These data represent the most recent comprehensive energy statistics integrated across all energy sources.  The data includes total energy production, consumption, stocks, and trade; energy prices; overviews of petroleum, natural gas, coal, electricity, nuclear energy, renewable energy, and carbon dioxide emissions; and data unit conversions values.  Source: https://www.eia.gov/totalenergy/data/monthly/pdf/mer_a_doc.pdf  Report:  MER (https://www.eia.gov/totalenergy/data/monthly/)
- data columns: `value`
- frequencies: annual, monthly

## aeo — Annual Energy Outlook

Annual U.S. projections using National Energy Modelling System (NEMS) for release year.  Report, documentation, and interactive projection data browser:  AEO (www.eia.gov/aeo/)
- `aeo/2026` — 2026
- `aeo/2025` — 2025
- `aeo/2023` — 2023
- `aeo/2022` — 2022
- `aeo/2021` — 2021
- `aeo/2020` — 2020
- `aeo/2019` — 2019
- `aeo/2018` — 2018
- `aeo/2017` — 2017
- `aeo/2016` — 2016
- `aeo/2015` — 2015
- `aeo/2014` — 2014
- `aeo/2014-er` — 2014-er

## ieo — International Energy Outlook

Annual international projections using the World Energy Projection System (WEPS) model for release year.  Report and interactive projection data browser:  IEO (www.eia.gov/ieo/)
- (children unavailable: HTTP 429 for https://api.eia.gov/v2/ieo?api_key=85BYhVcILLDkVtR288Q7fQOfYXNGJLSZCiBxjovJ)

## co2-emissions — State CO2 Emissions- deprecated: see SEDS

EIA CO2 Emissions data. "This route is deprecated and no longer receiving fresh data. 
    For state-level CO2 emissions data, please use the /v2/seds/ API route.
- `co2-emissions/co2-emissions-aggregates` — Total CO2 Emissions by Sector and Fuel - deprecated: see SEDS
- `co2-emissions/co2-emissions-and-carbon-coefficients` — CO2 Emissions and Carbon Coefficients by Product - deprecated: see SEDS
