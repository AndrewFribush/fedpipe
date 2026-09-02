# Dataset Schemas (live)

Source: https://data.cdc.gov/api/views/

---

Column schemas for every dataset this module wraps, as reported by data.cdc.gov's metadata API (`/api/views/{id}.json`).

## leading_death — NCHS - Leading Causes of Death: United States (`bi63-dtpu`)

This dataset presents the age-adjusted death rates for the 10 leading causes of death in the United States beginning in 1999.

| field | type | description |
|---|---|---|
| `year` | number |  |
| `_113_cause_name` | text |  |
| `cause_name` | text |  |
| `state` | text |  |
| `deaths` | number |  |
| `aadr` | number |  |

## life_expectancy — NCHS - Death rates and life expectancy at birth (`w9j2-ggv5`)

This dataset of U.S. mortality trends since 1900 highlights the differences in age-adjusted death rates and life expectancy at birth by race and sex.

| field | type | description |
|---|---|---|
| `year` | number |  |
| `race` | text |  |
| `sex` | text |  |
| `average_life_expectancy` | number |  |
| `mortality` | number |  |

## mortality_rates — NCHS - VSRR Quarterly provisional estimates for selected indicators of mortality (`489q-934x`)

Provisional estimates of death rates. Estimates are presented for each of the 15 leading causes of death plus estimates for deaths attributed to drug overdose, falls (for persons aged 65 and over), human immunodeficiency virus (HIV) disease, homicide, and firearms-related deaths.

| field | type | description |
|---|---|---|
| `year_and_quarter` | text |  |
| `time_period` | text |  |
| `cause_of_death` | text |  |
| `rate_type` | text |  |
| `unit` | text |  |
| `rate_overall` | number |  |
| `rate_sex_female` | number |  |
| `rate_sex_male` | number |  |
| `rate_age_1_4` | number |  |
| `rate_age_5_14` | number |  |
| `rate_age_15_24` | number |  |
| `rate_age_25_34` | number |  |
| `rate_age_35_44` | number |  |
| `rate_age_45_54` | number |  |
| `rate_age_55_64` | number |  |
| `rate_65_74` | number |  |
| `rate_age_75_84` | number |  |
| `rate_age_85_plus` | number |  |
| `rate_alaska` | number |  |
| `rate_alabama` | number |  |
| `rate_arkansas` | number |  |
| `rate_arizona` | number |  |
| `rate_california` | number |  |
| `rate_colorado` | number |  |
| `rate_connecticut` | number |  |
| `rate_district_of_columbia` | number |  |
| `rate_delaware` | number |  |
| `rate_florida` | number |  |
| `rate_georgia` | number |  |
| `rate_hawaii` | number |  |
| `rate_iowa` | number |  |
| `rate_idaho` | number |  |
| `rate_illinois` | number |  |
| `rate_indiana` | number |  |
| `rate_kansas` | number |  |
| `rate_kentucky` | number |  |
| `rate_louisiana` | number |  |
| `rate_massachusetts` | number |  |
| `rate_maryland` | number |  |
| `rate_maine` | number |  |
| `rate_michigan` | number |  |
| `rate_minnesota` | number |  |
| `rate_missouri` | number |  |
| `rate_mississippi` | number |  |
| `rate_montana` | number |  |
| `rate_north_carolina` | number |  |
| `rate_north_dakota` | number |  |
| `rate_nebraska` | number |  |
| `rate_new_hampshire` | number |  |
| `rate_new_jersey` | number |  |
| `rate_new_mexico` | number |  |
| `rate_nevada` | number |  |
| `rate_new_york` | number |  |
| `rate_ohio` | number |  |
| `rate_oklahoma` | number |  |
| `rate_oregon` | number |  |
| `rate_pennsylvania` | number |  |
| `rate_rhode_island` | number |  |
| `rate_south_carolina` | number |  |
| `rate_south_dakota` | number |  |
| `rate_tennessee` | number |  |
| `rate_texas` | number |  |
| `rate_utah` | number |  |
| `rate_virginia` | number |  |
| `rate_vermont` | number |  |
| `rate_washington` | number |  |
| `rate_wisconsin` | number |  |
| `rate_west_virginia` | number |  |
| `rate_wyoming` | number |  |

## places_county — PLACES: Local Data for Better Health, County Data, 2025 release (`swc5-untb`)

This dataset contains model-based county estimates. PLACES covers the entire United States—50 states and the District of Columbia—at county, place, census tract, and ZIP Code Tabulation Area levels. It provides information uniformly on this large scale for local areas at four geographic levels. Estimates were provided by the Centers for Disease Control and Prevention (CDC), Division of Population Health, Epidemiology and Surveillance Branch. PLACES was funded by the Robert Wood Johnson Foundation in conjunction with the CDC Foundation. This dataset includes estimates for 40 measures: 12 for health outcomes, 7 for preventive services use, 4 for chronic disease-related health risk behaviors, 7 for disabilities, 3 for health status, and 7 for health-related social needs. These estimates can be used to identify emerging health problems and to help develop and carry out effective, targeted public health prevention activities. Because the small area model cannot detect effects due to local interventions, users are cautioned against using these estimates for program or policy evaluations. Data sources used to generate these model-based estimates are Behavioral Risk Factor Surveillance System (BRFSS) 2023 or 2022 data, Census Bureau 2023 county population estimate data, and American Community Survey 2019-2023 or 2018–2022 estimates. The 2025 release uses 2023 BRFSS data for 35 measures and 2022 BRFSS data for 5 measures (all teeth lost, dental visits, mammograms, colorectal cancer screening,  and short sleep duration) that the survey collects data on every other year. More information about the methodology can be found at www.cdc.gov/places.

| field | type | description |
|---|---|---|
| `year` | text | Year |
| `stateabbr` | text | State abbreviation |
| `statedesc` | text | State Name |
| `locationname` | text | County name |
| `datasource` | text | Data source |
| `category` | text | Topic |
| `measure` | text | Measure full name |
| `data_value_unit` | text | The data value unit, such as "%" for percentage |
| `data_value_type` | text | The data type, such as age-adjusted prevalence or crude prevalence |
| `data_value` | number | Data Value, such as 14.7 |
| `data_value_footnote_symbol` | text | Footnote symbol |
| `data_value_footnote` | text | Footnote text |
| `low_confidence_limit` | number | Low confidence limit |
| `high_confidence_limit` | number | High confidence limit |
| `totalpopulation` | number | Total population of census 2023 estimates |
| `totalpop18plus` | number | Total population 18 and plus of census 2023 estimates |
| `locationid` | text | County FIPS |
| `categoryid` | text | Identifier for Topic/Category |
| `measureid` | text | Measure identifier |
| `datavaluetypeid` | text | Identifier for the data value type |
| `short_question_text` | text | Measure short name |
| `geolocation` | point | Latitude, Longitude of county centroid (Format: Point(Longitude Latitude)) |
| `:@computed_region_hjsp_umg2` | number | This column was automatically created in order to record in what polygon from the dataset 'States' (hjsp-umg2) the point in column 'geolocation' is located. This enables the creation of region maps (c |
| `:@computed_region_skr5_azej` | number | This column was automatically created in order to record in what polygon from the dataset 'Counties' (skr5-azej) the point in column 'geolocation' is located. This enables the creation of region maps  |

## places_city — 500 Cities: City-level Data (GIS Friendly Format), 2019 release (`dxpw-cm5u`)

2017, 2016. Data were provided by the Centers for Disease Control and Prevention (CDC), Division of Population Health, Epidemiology and Surveillance Branch. The project was funded by the Robert Wood Johnson Foundation (RWJF) in conjunction with the CDC Foundation. 500 cities project city-level data in GIS-friendly format can be joined with city spatial data (https://chronicdata.cdc.gov/500-Cities/500-Cities-City-Boundaries/n44h-hy2j) in a geographic information system (GIS) to produce maps of 27 measures at the city-level. There are 7 measures (all teeth lost, dental visits, mammograms, Pap tests, colorectal cancer screening, core preventive services among older adults, and sleep less than 7 hours) in this 2019 release from the 2016 BRFSS that were the same as the 2018 release.

| field | type | description |
|---|---|---|
| `stateabbr` | text | State abbreviation |
| `placename` | text | City name |
| `placefips` | text | City FIPS code |
| `population2010` | number | Population Count 2010 |
| `access2_crudeprev` | number | Model-based estimate for crude prevalence of current lack of health insurance among adults aged 18-64 years, 2017 |
| `access2_crude95ci` | text | Estimated confidence interval for crude prevalence of current lack of health insurance among adults aged 18 - 64 years  |
| `access2_adjprev` | number | Age-adjusted prevalence estimate of current lack of health insurance among adults aged 18-64 years, 2017 |
| `access2_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of current lack of health insurance among adults aged 18 - 64 years  |
| `arthritis_crudeprev` | number | Model-based estimate for crude prevalence of arthritis among adults aged >=18 years, 2017 |
| `arthritis_crude95ci` | text | Estimated confidence interval for crude prevalence of arthritis among adults aged ≥18 years  |
| `arthritis_adjprev` | number | Model-based estimate for age-adjusted prevalence of arthritis among adults aged >=18 years, 2017 |
| `arthritis_adj95ci` | text | Confidence interval for age-adjusted prevalence estimate of arthritis among adults aged ≥18 years  |
| `binge_crudeprev` | number | Model-based estimate for crude prevalence of binge drinking among adults aged >=18 years, 2017 |
| `binge_crude95ci` | text | Estimated confidence interval for crude prevalence of binge drinking among adults aged >=18 years  |
| `binge_adjprev` | number | Model-based estimate for age-adjusted prevalence of binge drinking among adults aged >=18 years, 2017 |
| `binge_adj95ci` | text | Confidence interval for age-adjusted prevalence estimate of binge drinking among adults aged ≥18 years  |
| `bphigh_crudeprev` | number | Model-based estimate for crude prevalence of high blood pressure among adults aged >=18 years, 2017 |
| `bphigh_crude95ci` | text | Estimated confidence interval for crude prevalence of high blood pressure among adults aged >=18 years  |
| `bphigh_adjprev` | number | Model-based estimate for age-adjusted prevalence of high blood pressure among adults aged >=18 years, 2017 |
| `bphigh_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of high blood pressure among adults aged >=18 years  |
| `bpmed_crudeprev` | number | Model-based estimate for crude prevalence of taking medicine for high blood pressure control among adults aged >=18 years with high blood pressure, 2017 |
| `bpmed_crude95ci` | text | Estimated confidence interval for crude prevalence of taking medicine for high blood pressure control among adults aged >=18 years with high blood pressure |
| `bpmed_adjprev` | number | Model-based estimate for age-adjusted prevalence of taking medicine for high blood pressure control among adults aged >=18 years with high blood pressure, 2017 |
| `bpmed_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of taking medicine for high blood pressure control among adults aged >=18 years with high blood pressure |
| `cancer_crudeprev` | number | Model-based estimate for crude prevalence of cancer (excluding skin cancer) among adults aged >=18 years, 2017 |
| `cancer_crude95ci` | text | Estimated confidence interval for crude prevalence of cancer (excluding skin cancer) among adults aged >=18 years |
| `cancer_adjprev` | number | Model-based estimate for age-adjusted prevalence of cancer (excluding skin cancer) among adults aged >=18 years, 2017 |
| `cancer_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of cancer (excluding skin cancer) among adults aged >=18 years |
| `casthma_crudeprev` | number | Model-based estimate for crude prevalence of current asthma among adults aged >=18 years, 2017 |
| `casthma_crude95ci` | text | Estimated confidence interval for crude prevalence of current asthma among adults aged >=18 years |
| `casthma_adjprev` | number | Model-based estimate for age-adjusted prevalence of current asthma among adults aged >=18 years, 2017 |
| `casthma_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of current asthma among adults aged >=18 years |
| `chd_crudeprev` | number | Model-based estimate for crude prevalence of coronary heart disease among adults aged >=18 years, 2017 |
| `chd_crude95ci` | text | Estimated confidence interval for crude prevalence of coronary heart disease among adults aged >=18 years |
| `chd_adjprev` | number | Model-based estimate for age-adjusted prevalence of coronary heart disease among adults aged >=18 years, 2017 |
| `chd_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of coronary heart disease among adults aged >=18 years |
| `checkup_crudeprev` | number | Model-based estimate for crude prevalence of visits to doctor for routine checkup within the past year among adults aged >=18 years, 2017 |
| `checkup_crude95ci` | text | Estimated confidence interval for crude prevalence of visits to doctor for routine checkup within the past year among adults aged >=18 years |
| `checkup_adjprev` | number | Model-based estimate for age-adjusted prevalence of visits to doctor for routine checkup within the past year among adults aged >=18 years, 2017 |
| `checkup_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of visits to doctor for routine checkup within the past year among adults aged >=18 years  |
| `cholscreen_crudeprev` | number | Model-based estimate for crude prevalence of cholesterol screening among adults aged >=18 years, 2017 |
| `cholscreen_crude95ci` | text | Estimated confidence interval for crude prevalence of cholesterol screening among adults aged >=18 years  |
| `cholscreen_adjprev` | number | Model-based estimate for age-adjusted prevalence of cholesterol screening among adults aged >=18 years, 2017 |
| `cholscreen_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of cholesterol screening among adults aged >=18 years  |
| `colon_screen_crudeprev` | number | Model-based estimate for crude prevalence of fecal occult blood test, sigmoidoscopy, or colonoscopy among adults aged 50–75 years, 2016 |
| `colon_screen_crude95ci` | text | Estimated confidence interval for crude prevalence of fecal occult blood test, sigmoidoscopy, or colonoscopy among adults aged 50–75 years |
| `colon_screen_adjprev` | number | Model-based estimate for age-adjusted prevalence of fecal occult blood test, sigmoidoscopy, or colonoscopy among adults aged 50–75 years, 2016 |
| `colon_screen_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of fecal occult blood test, sigmoidoscopy, or colonoscopy among adults aged 50–75 years  |
| `copd_crudeprev` | number | Model-based estimate for crude prevalence of chronic obstructive pulmonary disease among adults aged >=18 years, 2017 |
| `copd_crude95ci` | text | Estimated confidence interval for crude prevalence of chronic obstructive pulmonary disease among adults aged >=18 years  |
| `copd_adjprev` | number | Model-based estimate for age-adjusted prevalence of chronic obstructive pulmonary disease among adults aged >=18 years, 2017 |
| `copd_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of chronic obstructive pulmonary disease among adults aged >=18 years  |
| `corem_crudeprev` | number | Model-based estimate for crude prevalence of older adult men aged >=65 years who are up to date on a core set of clinical preventive services: Flu shot past year, PPV shot ever, Colorectal cancer scre |
| `corem_crude95ci` | text | Estimated confidence interval for crude prevalence of older adult men aged >=65 years who are up to date on a core set of clinical preventive services: Flu shot past year, PPV shot ever, Colorectal ca |
| `corem_adjprev` | number | Model-based estimate for age-adjusted prevalence of older adult men aged >=65 years who are up to date on a core set of clinical preventive services: Flu shot past year, PPV shot ever, Colorectal canc |
| `corem_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of older adult men aged >=65 years who are up to date on a core set of clinical preventive services: Flu shot past year, PPV shot ever, Colore |
| `corew_crudeprev` | number | Model-based estimate for crude prevalence of older adult women aged >=65 years who are up to date on a core set of clinical preventive services: Flu shot past year, PPV shot ever, Colorectal cancer sc |
| `corew_crude95ci` | text | Estimated confidence interval for crude prevalence of older adult women aged >=65 years who are up to date on a core set of clinical preventive services: Flu shot past year, PPV shot ever, Colorectal  |
| `corew_adjprev` | number | Model-based estimate for age-adjusted prevalence of older adult women aged >=65 years who are up to date on a core set of clinical preventive services: Flu shot past year, PPV shot ever, Colorectal ca |
| `corew_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of older adult women aged >=65 years who are up to date on a core set of clinical preventive services: Flu shot past year, PPV shot ever, Colo |
| `csmoking_crudeprev` | number | Model-based estimate for crude prevalence of current smoking among adults aged >=18 years, 2017 |
| `csmoking_crude95ci` | text | Estimated confidence interval for crude prevalence of current smoking among adults aged >=18 years |
| `csmoking_adjprev` | number | Model-based estimate for age-adjusted prevalence of current smoking among adults aged >=18 years, 2017 |
| `csmoking_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of current smoking among adults aged >=18 years |
| `dental_crudeprev` | number | Model-based estimate for crude prevalence of visits to dentist or dental clinic among adults aged >=18 years, 2016 |
| `dental_crude95ci` | text | Estimated confidence interval for crude prevalence of visits to dentist or dental clinic among adults aged >=18 years |
| `dental_adjprev` | number | Model-based estimate for age-adjusted prevalence of visits to dentist or dental clinic among adults aged >=18 years, 2016 |
| `dental_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of visits to dentist or dental clinic among adults aged >=18 years |
| `diabetes_crudeprev` | number | Model-based estimate for crude prevalence of diagnosed diabetes among adults aged >=18 years, 2017 |
| `diabetes_crude95ci` | text | Estimated confidence interval for crude prevalence of diagnosed diabetes among adults aged >=18 years |
| `diabetes_adjprev` | number | Model-based estimate for age-adjusted prevalence of diagnosed diabetes among adults aged >=18 years, 2017 |
| `diabetes_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of diagnosed diabetes among adults aged >=18 years |
| `highchol_crudeprev` | number | Model-based estimate for crude prevalence of high cholesterol among adults aged >=18 years who have been screened in the past 5 years, 2017 |
| `highchol_crude95ci` | text | Estimated confidence interval for crude prevalence of high cholesterol among adults aged >=18 years who have been screened in the past 5 years |
| `highchol_adjprev` | number | Model-based estimate for age-adjusted prevalence of high cholesterol among adults aged >=18 years who have been screened in the past 5 years, 2017 |
| `highchol_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of high cholesterol among adults aged >=18 years who have been screened in the past 5 years |
| `kidney_crudeprev` | number | Model-based estimate for crude prevalence of chronic kidney disease among adults aged >=18 years, 2017 |
| `kidney_crude95ci` | text | Estimated confidence interval for crude prevalence of chronic kidney disease among adults aged >=18 years |
| `kidney_adjprev` | number | Model-based estimate for age-adjusted prevalence of chronic kidney disease among adults aged >=18 years, 2017 |
| `kidney_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of chronic kidney disease among adults aged >=18 years |
| `lpa_crudeprev` | number | Model-based estimate for crude prevalence of no leisure-time physical activity among adults aged >=18 years, 2017 |
| `lpa_crude95ci` | text | Estimated confidence interval for crude prevalence of no leisure-time physical activity among adults aged >=18 years  |
| `lpa_adjprev` | number | Model-based estimate for age-adjusted prevalence of no leisure-time physical activity among adults aged >=18 years, 2017 |
| `lpa_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of no leisure-time physical activity among adults aged >=18 years  |
| `mammouse_crudeprev` | number | Model-based estimate for crude prevalence of mammography use among women aged 50–74 years, 2016 |
| `mammouse_crude95ci` | text | Estimated confidence interval for crude prevalence of mammography use among women aged 50–74 years  |
| `mammouse_adjprev` | number | Model-based estimate for age-adjusted prevalence of mammography use among women aged 50–74 years, 2016 |
| `mammouse_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of mammography use among women aged 50–74 years  |
| `mhlth_crudeprev` | number | Model-based estimate for crude prevalence of mental health not good for >=14 days among adults aged >=18 years, 2017 |
| `mhlth_crude95ci` | text | Estimated confidence interval for crude prevalence of mental health not good for >=14 days among adults aged >=18 years  |
| `mhlth_adjprev` | number | Model-based estimate for age-adjusted prevalence of mental health not good for >=14 days among adults aged >=18 years, 2017 |
| `mhlth_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of mental health not good for >=14 days among adults aged >=18 years  |
| `obesity_crudeprev` | number | Model-based estimate for crude prevalence of obesity among adults aged >=18 years, 2017 |
| `obesity_crude95ci` | text | Estimated confidence interval for crude prevalence of obesity among adults aged >=18 years  |
| `obesity_adjprev` | number | Model-based estimate for age-adjusted prevalence of obesity among adults aged >=18 years, 2017 |
| `obesity_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of obesity among adults aged >=18 years  |
| `paptest_crudeprev` | number | Model-based estimate for crude prevalence of papanicolaou smear use among adult women aged 21–65 years, 2016 |
| `paptest_crude95ci` | text | Estimated confidence interval for crude prevalence of papanicolaou smear use among adult women aged 21–65 years  |
| `paptest_adjprev` | number | Model-based estimate for age-adjusted prevalence of papanicolaou smear use among adult women aged 21–65 years, 2016 |
| `paptest_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of papanicolaou smear use among adult women aged 21–65 years  |
| `phlth_crudeprev` | number | Model-based estimate for crude prevalence of physical health not good for >=14 days among adults aged >=18 years, 2017 |
| `phlth_crude95ci` | text | Estimated confidence interval for crude prevalence of physical health not good for >=14 days among adults aged >=18 years  |
| `phlth_adjprev` | number | Model-based estimate for age-adjusted prevalence of physical health not good for >=14 days among adults aged >=18 years, 2017 |
| `phlth_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of physical health not good for >=14 days among adults aged >=18 years  |
| `sleep_crudeprev` | number | Model-based estimate for crude prevalence of sleeping less than 7 hours among adults aged >=18 years, 2016 |
| `sleep_crude95ci` | text | Estimated confidence interval for crude prevalence of sleeping less than 7 hours among adults aged >=18 years  |
| `sleep_adjprev` | number | Model-based estimate for age-adjusted prevalence of sleeping less than 7 hours among adults aged >=18 years, 2016 |
| `sleep_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of sleeping less than 7 hours among adults aged >=18 years  |
| `stroke_crudeprev` | number | Model-based estimate for crude prevalence of stroke among adults aged >=18 years, 2017 |
| `stroke_crude95ci` | text | Estimated confidence interval for crude prevalence of stroke among adults aged >=18 years  |
| `stroke_adjprev` | number | Model-based estimate for age-adjusted prevalence of stroke among adults aged >=18 years, 2017 |
| `stroke_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of stroke among adults aged >=18 years  |
| `teethlost_crudeprev` | number | Model-based estimate for crude prevalence of all teeth lost among adults aged >=65 years, 2016 |
| `teethlost_crude95ci` | text | Estimated confidence interval for crude prevalence of all teeth lost among adults aged >=65 years  |
| `teethlost_adjprev` | number | Model-based estimate for age-adjusted prevalence of all teeth lost among adults aged >=65 years, 2016 |
| `teethlost_adj95ci` | text | Estimated confidence interval for age-adjusted prevalence of all teeth lost among adults aged >=65 years  |
| `geolocation` | text | Latitude, longitude of city centroid  |

## covid_cases — Weekly United States COVID-19 Cases and Deaths by State - ARCHIVED (`pwn4-m3yp`)

Reporting of new Aggregate Case and Death Count data was discontinued May 11, 2023, with the expiration of the COVID-19 public health emergency declaration. This dataset will receive a final update on June 1, 2023, to reconcile historical data through May 10, 2023, and will remain publicly available.

| field | type | description |
|---|---|---|
| `date_updated` | calendar_date | Date of data release  |
| `state` | text | Jurisdiction |
| `start_date` | calendar_date | First day of 7-day period |
| `end_date` | calendar_date | Final day of 7-day period  |
| `tot_cases` | number | Cumulative total number of cases |
| `new_cases` | number | Number of new cases (7-day sum)  |
| `tot_deaths` | number | Cumulative total number of deaths  |
| `new_deaths` | number | Number of new deaths (7-day sum)  |
| `new_historic_cases` | number | Number of new historic cases (7-day sum)  |
| `new_historic_deaths` | number | Number of new historic deaths (7-day sum)  |

## covid_conditions — Conditions Contributing to COVID-19 Deaths, by State and Age, Provisional 2020-2023 (`hk9y-quqm`)

Effective September 27, 2023, this dataset will no longer be updated. Similar data are accessible from wonder.cdc.gov.

| field | type | description |
|---|---|---|
| `data_as_of` | calendar_date | Date of analysis |
| `start_date` | calendar_date | First week-ending date of data period |
| `end_date` | calendar_date | Last week-ending date of data period |
| `group` | text | Time-period indicator for record: by Month, by Year, Total |
| `year` | number | Year in which death occurred |
| `month` | number | Month in which death occurred. |
| `state` | text | Jurisdiction of occurrence |
| `condition_group` | text | Condition Group |
| `condition` | text | Condition contributing to deaths involving COVID-19 |
| `icd10_codes` | text | ICD-10 code for condition  |
| `age_group` | text | Age group |
| `covid_19_deaths` | number | COVID 19 Deaths |
| `number_of_mentions` | number | Number of mentions |
| `flag` | text | Counts less than 10 supressed. |

## weekly_deaths — Provisional COVID-19 Death Counts by Week Ending Date and State (`r8kw-7aab`)

Effective September 27, 2023, this dataset will be updated weekly on Thursdays.

| field | type | description |
|---|---|---|
| `data_as_of` | calendar_date | Date of analysis |
| `start_date` | calendar_date | First date of data period |
| `end_date` | calendar_date | Last date of data period |
| `group` | text | Time period of reporting |
| `year` | text | Year of reporting |
| `month` | number | Month of reporting |
| `mmwr_week` | number | MMWR week of reporting |
| `week_ending_date` | calendar_date | Week-ending date for the week of reporting |
| `state` | text | Jurisdiction of occurrence |
| `covid_19_deaths` | number | Deaths involving COVID-19 (ICD-10 code U07.1) |
| `total_deaths` | number | Deaths from all causes of death |
| `percent_of_expected_deaths` | number | Percent of expected deaths |
| `pneumonia_deaths` | number | Pneumonia Deaths (ICD-10 codes J12.0-J18.9) |
| `pneumonia_and_covid_19_deaths` | number | Deaths with Pneumonia and COVID-19 (ICD-10 codes J12.0-J18.9 and U07.1) |
| `influenza_deaths` | number | Influenza Deaths (ICD-10 codes J09-J11) |
| `pneumonia_influenza_or_covid_19_deaths` | number | Pneumonia, Influenza, or COVID-19 Deaths (ICD-10 codes J12.0-J18.9, J09-J11, U07.1) |
| `footnote` | text | Suppressed counts (1-9) |

## disability — DHDS - Prevalence of Disability Status and Types (`s2qv-b27b`)

Disability and Health Data System (DHDS) is an online source of state-level data on adults with disabilities. Users can access information on six functional disability types: cognitive (serious difficulty concentrating, remembering or making decisions), hearing (serious difficulty hearing or deaf), mobility (serious difficulty walking or climbing stairs), vision (serious difficulty seeing), self-care (difficulty dressing or bathing) and independent living (difficulty doing errands alone).

| field | type | description |
|---|---|---|
| `year` | number | Year  |
| `locationabbr` | text | Location abbreviation  |
| `locationdesc` | text | Location description  |
| `datasource` | text | Abbreviation of data source name  |
| `category` | text | Category description |
| `indicator` | text | Indicator description  |
| `response` | text | Indicator response  |
| `data_value_unit` | text | The unit for a data value such as %  |
| `data_value_type` | text | The data type such as age-adjusted prevalence and prevalence  |
| `data_value` | number | The data Value such as 14.7  |
| `data_value_alt` | number | Equal to data value, but formatting is numeric  |
| `data_value_footnote_symbol` | text | Footnote Symbol (i.e., - or *)  |
| `data_value_footnote` | text | Footnote Text  |
| `low_confidence_limit` | number | 95% confidence interval lower bound  |
| `high_confidence_limit` | number | 95% confidence interval upper bound  |
| `number` | number | The crude unweighted number of respondents  |
| `weightednumber` | number | An adjusted version of the crude number of respondents that reflects the number of persons with the attribute in the population.  |
| `stratificationcategory1` | text | The category of the stratification, such as disability status, disability type, and overall  |
| `stratification1` | text | Stratifications within the stratification category such as any disability, no disability, cognitive disability, mobility disability, vision disability, hearing disability, self-care disability, indepe |
| `stratificationcategory2` | text | The category of the stratification such as Age, Sex, Race/Ethnicity  |
| `stratification2` | text | Stratification within the statification categories such as 18 -24, 25 - 44, 20 - 44, 21 - 35, 36 - 50, 51 - 65, 50 - 74, 50 - 75,18 - 44, 45-64, 65+, Male, Female, White, Black, Hispanic, Multirace/Ot |
| `categoryid` | text | Category identifier  |
| `indicatorid` | text | Indicator Identifier  |
| `locationid` | text | Location Identifier  |
| `responseid` | text | Response Identifier  |
| `datavaluetypeid` | text | Identifier for the Data Value Type  |
| `stratificationcategoryid1` | text | Stratification Category 1 Identifier |
| `stratificationid1` | text | Stratification 1 Identifier  |
| `stratificationcategoryid2` | text | Stratification Category 2 Identifier |
| `stratificationid2` | text | Stratification 2 Identifier  |

## weekly_deaths_by_cause — Weekly Provisional Counts of Deaths by State and Select Causes, 2020-2023 (`muzy-jte6`)

Effective September 27, 2023, this dataset will no longer be updated. Similar data are accessible from wonder.cdc.gov.

| field | type | description |
|---|---|---|
| `data_as_of` | calendar_date | Date of analysis |
| `jurisdiction_of_occurrence` | text | Jurisdiction of Occurrence |
| `mmwryear` | text | MMWR Year |
| `mmwrweek` | text | MMWR Week |
| `week_ending_date` | text | Week Ending Date |
| `all_cause` | number | All Cause |
| `natural_cause` | number | Natural Cause (A00-R99, U07) |
| `septicemia_a40_a41` | number | Septicemia (A40-A41) |
| `malignant_neoplasms_c00_c97` | number | Malignant neoplasms (C00-C97) |
| `diabetes_mellitus_e10_e14` | number | Diabetes mellitus (E10-E14) |
| `alzheimer_disease_g30` | number | Alzheimer disease (G30) |
| `influenza_and_pneumonia_j09_j18` | number | Influenza and pneumonia (J09-J18) |
| `chronic_lower_respiratory` | number | Chronic lower respiratory diseases (J40-J47) |
| `other_diseases_of_respiratory` | number | Other diseases of respiratory system (J00-J06,J30-J39,J67,J70-J98) |
| `nephritis_nephrotic_syndrome` | number | Nephritis, nephrotic syndrome and nephrosis (N00-N07,N17-N19,N25-N27) |
| `symptoms_signs_and_abnormal` | number | Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified (R00-R99) |
| `diseases_of_heart_i00_i09` | number | Diseases of heart (I00-I09,I11,I13,I20-I51) |
| `cerebrovascular_diseases` | number | Cerebrovascular diseases (I60-I69) |
| `covid_19_u071_multiple_cause_of_death` | number | COVID-19 (U071, Multiple Cause of Death) |
| `covid_19_u071_underlying_cause_of_death` | number | COVID-19 (U071, Underlying Cause of Death) |
| `flag_allcause` | text | Suppressed (counts 1-9) for All causes of death |
| `flag_natcause` | text | Suppressed (counts 1-9) for Natural causes of death |
| `flag_sept` | text | Suppressed (counts 1-9) for Septicemia |
| `flag_neopl` | text | Suppressed (counts 1-9) for Malignant eoplasms |
| `flag_diab` | text | Suppressed (counts 1-9) for Diabetes mellitis |
| `flag_alz` | text | Suppressed (counts 1-9) for Alzheimer disease |
| `flag_inflpn` | text | Suppressed (counts 1-9) for Influenza and pneumonia |
| `flag_clrd` | text | Suppressed (counts 1-9) for Chronic lower respiratory diseases |
| `flag_otherresp` | text | Suppressed (counts 1-9) for Other diseases of respiratory system |
| `flag_nephr` | text | Suppressed (counts 1-9) for Nephritis, nephrotic syndrome and nephrosis |
| `flag_otherunk` | text | Suppressed (counts 1-9) for Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified |
| `flag_hd` | text | Suppressed (counts 1-9) for Diseases of heart |
| `flag_stroke` | text | Suppressed (counts 1-9) for Cerebrovascular diseases |
| `flag_cov19mcod` | text | Suppressed (counts 1-9) for COVID-19 (U071, Multiple Cause of Death) |
| `flag_cov19ucod` | text | Suppressed (counts 1-9) for COVID-19 (U071, Underlying Cause of Death) |

## drug_overdose_state — NCHS - Drug Poisoning Mortality by State: United States (`xbxb-epbu`)

This dataset describes drug poisoning deaths at the U.S. and state level by selected demographic characteristics, and includes age-adjusted death rates for drug poisoning. 

| field | type | description |
|---|---|---|
| `state` | text |  |
| `year` | number |  |
| `sex` | text |  |
| `age_group` | text |  |
| `race_and_hispanic_origin` | text |  |
| `deaths` | number |  |
| `population` | number |  |
| `crude_death_rate` | number |  |
| `standard_error_for_crude_rate` | number |  |
| `lower_confidence_limit_for_crude_rate` | number |  |
| `upper_confidence_limit_for_crude_rate` | number |  |
| `age_adjusted_rate` | number |  |
| `standard_error_for_age_adjusted_rate` | number |  |
| `lower_confidence_limit_for_age_adjusted_rate` | number |  |
| `upper_confidence_limit_for_age_adjusted_rate` | number |  |
| `state_crude_rate_in_range` | text |  |
| `us_crude_rate` | number |  |
| `us_age_adjusted_rate` | number |  |
| `unit` | text |  |

## nutrition_obesity — Nutrition, Physical Activity, and Obesity - Behavioral Risk Factor Surveillance System (`hn4x-zwk7`)

This dataset includes data on adult's diet, physical activity, and weight status from Behavioral Risk Factor Surveillance System. This data is used for DNPAO's Data, Trends, and Maps database, which provides national and state specific data on obesity, nutrition, physical activity, and breastfeeding.

| field | type | description |
|---|---|---|
| `yearstart` | number | Year start |
| `yearend` | number | Year End (for single-year indicator, year end=year start) |
| `locationabbr` | text | Location abbreviation |
| `locationdesc` | text | Location description |
| `datasource` | text | Name or abbreviation of Data Source |
| `class` | text | Class Description |
| `topic` | text | Topic Description |
| `question` | text | Question Description |
| `data_value_unit` | text | Description of unit e.g. %, etc |
| `data_value_type` | text | Description of type of data e.g. Value, Percentage, Number  |
| `data_value` | number | Data value (percentage, text) |
| `data_value_alt` | number | Numeric representation of data value |
| `data_value_footnote_symbol` | text | Symbol that would be used to flag footnotes |
| `data_value_footnote` | text | Footnote text |
| `low_confidence_limit` | number |  Low 95% Confidence Interval value |
| `high_confidence_limit` | number | High 95% Confidence Interval value |
| `sample_size` | number | Sample Size |
| `total` | text | Total/Overall breakout category  |
| `age_years` | text | Age (years) breakout category |
| `education` | text | Education breakout category |
| `sex` | text | Sex breakout category |
| `income` | text | Income breakout category |
| `race_ethnicity` | text | Race/Ethnicity breakout category |
| `geolocation` | location | Latitude & Longitude to be provided for formatting GeoLocation or Geocode in the format (latitude, longitude) |
| `classid` | text | Lookup identifier value for Class |
| `topicid` | text | Lookup identifier value for Topic |
| `questionid` | text | Lookup identifier value for Question |
| `datavaluetypeid` | text | Lookup identifier value for Data_Value_type |
| `locationid` | text | Lookup identifier value for Location |
| `stratificationcategory1` | text | Lookup Identification value, such as Age Group, Sex |
| `stratification1` | text | Data stratified by this value, such as Male, Female, Total |
| `stratificationcategoryid1` | text | Lookup identifier value for Stratification1 |
| `stratificationid1` | text | Lookup identifier value for StratificationCategory1 |

## death_rates_historical — NCHS - Age-adjusted Death Rates for Selected Major Causes of Death (`6rkc-nb2q`)

This dataset of U.S. mortality trends since 1900 highlights trends in age-adjusted death rates for five selected major causes of death.

| field | type | description |
|---|---|---|
| `year` | number |  |
| `leading_causes` | text | Selected Major Cause of Death |
| `age_adjusted_death_rate` | number |  |

## birth_indicators — NCHS - VSRR Quarterly provisional estimates for selected birth indicators (`76vv-a7x8`)

Provisional estimates of selected reproductive indicators. Estimates are presented for: general fertility rates, age-specific birth rates, total and low risk cesarean delivery rates, preterm birth rates and other gestational age categories.

| field | type | description |
|---|---|---|
| `year_and_quarter` | text |  |
| `topic` | text |  |
| `topic_subgroup` | text |  |
| `indicator` | text |  |
| `race_ethnicity` | text |  |
| `rate` | number |  |
| `unit` | text |  |
| `significant` | text | An asterisk (*) indicates that estimates for the most recent quarter are significantly different from the same quarter of the previous year |
