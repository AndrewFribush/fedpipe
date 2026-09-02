# Dataset Schemas (live)

Source: https://data.cms.gov/provider-data/api/1/

---

Field lists for every provider dataset this module wraps, as reported by data.cms.gov's DKAN datastore (`/provider-data/api/1/datastore/query/{id}/0`).

## hospital_info — Hospital General Information (`xubh-q36u`)

All Medicare-certified hospitals: name, address, phone, type, ownership, star ratings, emergency services

- `facility_id`
- `facility_name`
- `address`
- `citytown`
- `state`
- `zip_code`
- `countyparish`
- `telephone_number`
- `hospital_type`
- `hospital_ownership`
- `emergency_services`
- `meets_criteria_for_birthing_friendly_designation`
- `hospital_overall_rating`
- `hospital_overall_rating_footnote`
- `mort_group_measure_count`
- `count_of_facility_mort_measures`
- `count_of_mort_measures_better`
- `count_of_mort_measures_no_different`
- `count_of_mort_measures_worse`
- `mort_group_footnote`
- `safety_group_measure_count`
- `count_of_facility_safety_measures`
- `count_of_safety_measures_better`
- `count_of_safety_measures_no_different`
- `count_of_safety_measures_worse`
- `safety_group_footnote`
- `readm_group_measure_count`
- `count_of_facility_readm_measures`
- `count_of_readm_measures_better`
- `count_of_readm_measures_no_different`
- `count_of_readm_measures_worse`
- `readm_group_footnote`
- `pt_exp_group_measure_count`
- `count_of_facility_pt_exp_measures`
- `pt_exp_group_footnote`
- `te_group_measure_count`
- `count_of_facility_te_measures`
- `te_group_footnote`

## nursing_home_info — Nursing Home Provider Information (`4pq5-n9py`)

All nursing homes: beds, quality ratings, staffing, penalties, five-star ratings

- `cms_certification_number_ccn`
- `provider_name`
- `provider_address`
- `citytown`
- `state`
- `zip_code`
- `telephone_number`
- `provider_ssa_county_code`
- `countyparish`
- `urban`
- `ownership_type`
- `number_of_certified_beds`
- `average_number_of_residents_per_day`
- `average_number_of_residents_per_day_footnote`
- `provider_type`
- `provider_resides_in_hospital`
- `legal_business_name`
- `date_first_approved_to_provide_medicare_and_medicaid_services`
- `chain_name`
- `chain_id`
- `number_of_facilities_in_chain`
- `chain_average_overall_5star_rating`
- `chain_average_health_inspection_rating`
- `chain_average_staffing_rating`
- `chain_average_qm_rating`
- `continuing_care_retirement_community`
- `special_focus_status`
- `abuse_icon`
- `most_recent_health_inspection_more_than_2_years_ago`
- `provider_changed_ownership_in_last_12_months`
- `with_a_resident_and_family_council`
- `automatic_sprinkler_systems_in_all_required_areas`
- `overall_rating`
- `overall_rating_footnote`
- `health_inspection_rating`
- `health_inspection_rating_footnote`
- `qm_rating`
- `qm_rating_footnote`
- `longstay_qm_rating`
- `longstay_qm_rating_footnote`
- `shortstay_qm_rating`
- `shortstay_qm_rating_footnote`
- `staffing_rating`
- `staffing_rating_footnote`
- `reported_staffing_footnote`
- `physical_therapist_staffing_footnote`
- `reported_nurse_aide_staffing_hours_per_resident_per_day`
- `reported_lpn_staffing_hours_per_resident_per_day`
- `reported_rn_staffing_hours_per_resident_per_day`
- `reported_licensed_staffing_hours_per_resident_per_day`
- `reported_total_nurse_staffing_hours_per_resident_per_day`
- `total_number_of_nurse_staff_hours_per_resident_per_day_on_t_4a14`
- `registered_nurse_hours_per_resident_per_day_on_the_weekend`
- `reported_physical_therapist_staffing_hours_per_resident_per_day`
- `total_nursing_staff_turnover`
- `total_nursing_staff_turnover_footnote`
- `registered_nurse_turnover`
- `registered_nurse_turnover_footnote`
- `number_of_administrators_who_have_left_the_nursing_home`
- `administrator_turnover_footnote`
- `nursing_casemix_index`
- `nursing_casemix_index_ratio`
- `casemix_nurse_aide_staffing_hours_per_resident_per_day`
- `casemix_lpn_staffing_hours_per_resident_per_day`
- `casemix_rn_staffing_hours_per_resident_per_day`
- `casemix_total_nurse_staffing_hours_per_resident_per_day`
- `casemix_weekend_total_nurse_staffing_hours_per_resident_per_day`
- `adjusted_nurse_aide_staffing_hours_per_resident_per_day`
- `adjusted_lpn_staffing_hours_per_resident_per_day`
- `adjusted_rn_staffing_hours_per_resident_per_day`
- `adjusted_total_nurse_staffing_hours_per_resident_per_day`
- `adjusted_weekend_total_nurse_staffing_hours_per_resident_per_day`
- `rating_cycle_1_standard_survey_health_date`
- `rating_cycle_1_total_number_of_health_deficiencies`
- `rating_cycle_1_number_of_standard_health_deficiencies`
- `rating_cycle_1_number_of_complaint_health_deficiencies`
- `rating_cycle_1_health_deficiency_score`
- `rating_cycle_1_number_of_health_revisits`
- `rating_cycle_1_health_revisit_score`
- `rating_cycle_1_total_health_score`
- `rating_cycle_2_standard_health_survey_date`
- `rating_cycle_23_total_number_of_health_deficiencies`
- `rating_cycle_2_number_of_standard_health_deficiencies`
- `rating_cycle_23_number_of_complaint_health_deficiencies`
- `rating_cycle_23_health_deficiency_score`
- `rating_cycle_23_number_of_health_revisits`
- `rating_cycle_23_health_revisit_score`
- `rating_cycle_23_total_health_score`
- `total_weighted_health_survey_score`
- `number_of_citations_from_infection_control_inspections`
- `number_of_fines`
- `total_amount_of_fines_in_dollars`
- `number_of_payment_denials`
- `total_number_of_penalties`
- `location`
- `latitude`
- `longitude`
- `geocoding_footnote`
- `processing_date`

## home_health_info — Home Health Agency Information (`6jpm-sxkc`)

Medicare-registered home health agencies: addresses, quality ratings

- `state`
- `cms_certification_number_ccn`
- `provider_name`
- `address`
- `citytown`
- `zip_code`
- `telephone_number`
- `type_of_ownership`
- `offers_nursing_care_services`
- `offers_physical_therapy_services`
- `offers_occupational_therapy_services`
- `offers_speech_pathology_services`
- `offers_medical_social_services`
- `offers_home_health_aide_services`
- `certification_date`
- `quality_of_patient_care_star_rating`
- `footnote_for_quality_of_patient_care_star_rating`
- `numerator_for_how_often_the_home_health_team_began_their_pa_ada1`
- `denominator_for_how_often_the_home_health_team_began_their__9354`
- `how_often_the_home_health_team_began_their_patients_care_in_d440`
- `footnote_for_how_often_the_home_health_team_began_their_pat_6aee`
- `numerator_for_how_often_the_home_health_team_determined_whe_72da`
- `denominator_for_how_often_the_home_health_team_determined_w_81bc`
- `how_often_the_home_health_team_determined_whether_patients__4505`
- `footnote_for_how_often_the_home_health_team_determined_whet_5002`
- `numerator_for_how_often_patients_got_better_at_walking_or_m_3b64`
- `denominator_for_how_often_patients_got_better_at_walking_or_b3eb`
- `how_often_patients_got_better_at_walking_or_moving_around`
- `footnote_for_how_often_patients_got_better_at_walking_or_mo_e2ff`
- `numerator_for_how_often_patients_got_better_at_getting_in_a_e863`
- `denominator_for_how_often_patients_got_better_at_getting_in_4b7a`
- `how_often_patients_got_better_at_getting_in_and_out_of_bed`
- `footnote_for_how_often_patients_got_better_at_getting_in_an_7940`
- `numerator_for_how_often_patients_got_better_at_bathing`
- `denominator_for_how_often_patients_got_better_at_bathing`
- `how_often_patients_got_better_at_bathing`
- `footnote_for_how_often_patients_got_better_at_bathing`
- `numerator_for_how_often_patients_breathing_improved`
- `denominator_for_how_often_patients_breathing_improved`
- `how_often_patients_breathing_improved`
- `footnote_for_how_often_patients_breathing_improved`
- `numerator_for_how_often_patients_got_better_at_taking_their_2828`
- `denominator_for_how_often_patients_got_better_at_taking_the_0424`
- `how_often_patients_got_better_at_taking_their_drugs_correct_bd88`
- `footnote_for_how_often_patients_got_better_at_taking_their__dd00`
- `numerator_for_changes_in_skin_integrity_postacute_care_pres_bea9`
- `denominator_for_changes_in_skin_integrity_postacute_care_pr_7aaf`
- `changes_in_skin_integrity_postacute_care_pressure_ulcerinjury`
- `footnote_changes_in_skin_integrity_postacute_care_pressure__d758`
- `numerator_for_how_often_physicianrecommended_actions_to_add_ab2a`
- `denominator_for_how_often_physicianrecommended_actions_to_a_67ae`
- `how_often_physicianrecommended_actions_to_address_medicatio_cc88`
- `footnote_for_how_often_physicianrecommended_actions_to_addr_0c32`
- `numerator_for_percent_of_residents_experiencing_one_or_more_cca9`
- `denominator_for_percent_of_residents_experiencing_one_or_mo_e12a`
- `percent_of_residents_experiencing_one_or_more_falls_with_ma_34b8`
- `footnote_for_percent_of_residents_experiencing_one_or_more__4fe2`
- `numerator_for_discharge_function_score`
- `denominator_for_discharge_function_score`
- `discharge_function_score`
- `footnote_for_discharge_function_score`
- `numerator_for_transfer_of_health_information_to_the_provider`
- `denominator_for_transfer_of_health_information_to_the_provider`
- `transfer_of_health_information_to_the_provider`
- `footnote_for_transfer_of_health_information_to_the_provider`
- `numerator_for_transfer_of_health_information_to_the_patient`
- `denominator_for_transfer_of_health_information_to_the_patient`
- `transfer_of_health_information_to_the_patient`
- `footnote_for_transfer_of_health_information_to_the_patient`
- `dtc_numerator`
- `dtc_denominator`
- `dtc_observed_rate`
- `dtc_riskstandardized_rate`
- `dtc_riskstandardized_rate_lower_limit`
- `dtc_riskstandardized_rate_upper_limit`
- `dtc_performance_categorization`
- `footnote_for_dtc_riskstandardized_rate`
- `ppr_numerator`
- `ppr_denominator`
- `ppr_observed_rate`
- `ppr_riskstandardized_rate`
- `ppr_riskstandardized_rate_lower_limit`
- `ppr_riskstandardized_rate_upper_limit`
- `ppr_performance_categorization`
- `footnote_for_ppr_riskstandardized_rate`
- `pph_numerator`
- `pph_denominator`
- `pph_observed_rate`
- `pph_riskstandardized_rate`
- `pph_riskstandardized_rate_lower_limit`
- `pph_riskstandardized_rate_upper_limit`
- `pph_performance_categorization`
- `footnote_for_pph_riskstandardized_rate`
- `how_much_medicare_spends_on_an_episode_of_care_at_this_agen_56e6`
- `footnote_for_how_much_medicare_spends_on_an_episode_of_care_5dfd`
- `no_of_episodes_to_calc_how_much_medicare_spends_per_episode_4f4e`

## hospice_info — Hospice General Information (`yc9t-dgbk`)

Medicare-certified hospice providers: addresses, phone numbers

- `cms_certification_number_ccn`
- `facility_name`
- `address_line_1`
- `address_line_2`
- `citytown`
- `state`
- `zip_code`
- `countyparish`
- `telephone_number`
- `cms_region`
- `ownership_type`
- `certification_date`

## dialysis_info — Dialysis Facility Information (`23ew-n7w9`)

Dialysis facilities: addresses, services, quality of care measures

- `cms_certification_number_ccn`
- `network`
- `facility_name`
- `five_star_date`
- `five_star`
- `five_star_data_availability_code`
- `address_line_1`
- `address_line_2`
- `citytown`
- `state`
- `zip_code`
- `countyparish`
- `telephone_number`
- `profit_or_nonprofit`
- `chain_owned`
- `chain_organization`
- `late_shift`
- `of_dialysis_stations`
- `offers_incenter_hemodialysis`
- `offers_peritoneal_dialysis`
- `offers_home_hemodialysis_training`
- `certification_date`
- `claims_date`
- `eqrs_date`
- `smr_date`
- `patient_survival_category_text`
- `patient_survival_data_availability_code`
- `number_of_patients_included_in_survival_summary`
- `mortality_rate_facility`
- `mortality_rate_upper_confidence_limit_975`
- `mortality_rate_lower_confidence_limit_25`
- `shr_date`
- `patient_hospitalization_category_text`
- `patient_hospitalization_data_availability_code`
- `number_of_patients_included_in_hospitalization_summary`
- `hospitalization_rate_facility`
- `hospitalization_rate_upper_confidence_limit_975`
- `hospitalization_rate_lower_confidence_limit_25`
- `srr_date`
- `patient_hospital_readmission_category`
- `patient_hospital_readmission_data_availability_code`
- `number_of_hospitalizations_included_in_hospital_readmission_fc2b`
- `readmission_rate_facility`
- `readmission_rate_upper_confidence_limit_975`
- `readmission_rate_lower_confidence_limit_25`
- `strr_date`
- `patient_transfusion_category_text`
- `patient_transfusion_data_availability_code`
- `number_of_patients_included_in_the_transfusion_summary`
- `transfusion_rate_facility`
- `transfusion_rate_upper_confidence_limit_975`
- `transfusion_rate_lower_confidence_limit_25`
- `fyswr_date`
- `fyswr_category_text`
- `patient_transplant_waitlist_data_availability_code`
- `number_of_patients_in_this_facility_for_fyswr`
- `first_year_standardized_kidney_transplant_waitlist_ratio`
- `95_ci_upper_limit_for_fyswr`
- `95_ci_lower_limit_for_fyswr`
- `pppw_category_text`
- `patient_prevalent_transplant_waitlist_data_availability_code`
- `number_of_patients_for_pppw`
- `percentage_of_prevalent_patients_waitlisted_for_kidney_tran_ecca`
- `95_ci_upper_limit_for_pppw`
- `95_ci_lower_limit_for_pppw`
- `sedr_date`
- `sedr_category_text`
- `emergency_department_encounter_data_availability_code`
- `number_of_patients_included_in_sedr_summary`
- `standardized_ed_visits_ratio_facility`
- `sedr_upper_confidence_limit_975`
- `sedr_lower_confidence_limit_25`
- `ed30_date`
- `ed30_category_text`
- `emergency_department_encounter_ratio_occurring_within_30_da_f8e3`
- `number_of_hospitalizations_included_in_ed30_summary`
- `standardized_ed_visits_within_30_days_of_hospital_discharge_6307`
- `ed30_upper_confidence_limit_975`
- `ed30_lower_confidence_limit_25`
- `years_modality_switch_based_upon`
- `smosr_classification_category_facility`
- `modality_switch_data_availability_code`
- `smosr_number_of_eligible_patients_facility`
- `smosr_standardized_modality_switch_ratio_facility`
- `smosr_upper_confidence_limit_facility`
- `smosr_lower_confidence_limit_facility`
- `sir_date`
- `patient_infection_category_text`
- `patient_infection_data_availability_code`
- `standard_infection_ratio`
- `sir_upper_confidence_limit_975`
- `sir_lower_confidence_limit_25`
- `fistula_category_text`
- `fistula_data_availability_code`
- `number_of_patients_included_in_fistula_summary`
- `fistula_rate_facility`
- `fistula_rate_upper_confidence_limit_975`
- `fistula_rate_lower_confidence_limit_25`
- `hcp_vaccination_data_collection_dates`
- `hcp_vaccination_data_availability_code`
- `healthcare_worker_covid19_vaccination_adherence_percentage`
- `adult_hd_ktv_data_availability_code`
- `number_of_adult_hd_patients_with_ktv_data`
- `number_of_adult_hd_patientmonths_with_ktv_data`
- `percent_of_adult_hd_patients_with_ktv__12`
- `adult_pd_ktv_data_availability_code`
- `number_of_adult_pd_patients_with_ktv_data`
- `number_of_adult_pd_patientmonths_with_ktv_data`
- `percentage_of_adult_pd_pts_with_ktv__17`
- `pediatric_hd_ktv_data_availability_code`
- `number_of_pediatric_hd_patients_with_ktv_data`
- `number_of_pediatric_hd_patientmonths_with_ktv_data`
- `percentage_of_pediatric_hd_patients_with_ktv__12`
- `pediatric_pd_ktv_data_availability_code`
- `number_of_pediatric_pd_patients_with_ktv_data`
- `number_of_pediatric_pd_patientmonths_with_ktv_data`
- `percentage_of_pediatric_pd_patients_with_ktv18`
- `percentage_of_medicare_patients_with_hgb10_gdl`
- `hgb10_data_availability_code`
- `percentage_of_medicare_patients_with_hgb12_gdl`
- `hgb__12_data_availability_code`
- `number_of_dialysis_patients_with_hgb_data`
- `hypercalcemia_data_availability_code`
- `number_of_patients_in_hypercalcemia_summary`
- `number_of_patientmonths_in_hypercalcemia_summary`
- `percentage_of_adult_patients_with_hypercalcemia_serum_calci_044d`
- `serum_phosphorus_data_availability_code`
- `number_of_patients_in_serum_phosphorus_summary`
- `number_of_patientmonths_in_serum_phosphorus_summary`
- `percentage_of_adult_patients_with_serum_phosphorus_less_tha_c222`
- `percentage_of_adult_patients_with_serum_phosphorus_between__85e8`
- `percentage_of_adult_patients_with_serum_phosphorus_between__fad7`
- `percentage_of_adult_patients_with_serum_phosphorus_between__ff32`
- `percentage_of_adult_patients_with_serum_phosphorus_greater__d8e3`
- `long_term_catheter_data_availability_code`
- `number_of_patients_in_long_term_catheter_summary`
- `number_of_patient_months_in_long_term_catheter_summary`
- `percentage_of_adult_patients_with_long_term_catheter_in_use`
- `npcr_data_availability_code`
- `number_of_patients_in_npcr_summary`
- `number_of_patientmonths_in_npcr_summary`
- `percentage_of_pediatric_hd_patients_with_npcr`

## hospital_mortality — Complications and Deaths - Hospital (`ynj2-r877`)

Hospital-level mortality rates, hip/knee complications, patient safety indicators

- `facility_id`
- `facility_name`
- `address`
- `citytown`
- `state`
- `zip_code`
- `countyparish`
- `telephone_number`
- `measure_id`
- `measure_name`
- `compared_to_national`
- `denominator`
- `score`
- `lower_estimate`
- `higher_estimate`
- `footnote`
- `start_date`
- `end_date`

## hospital_readmissions — Hospital Readmissions Reduction Program (`9n3s-kdb3`)

Excess readmission ratios and payment reductions for hospitals

- `facility_name`
- `facility_id`
- `state`
- `measure_name`
- `number_of_discharges`
- `footnote`
- `excess_readmission_ratio`
- `predicted_readmission_rate`
- `expected_readmission_rate`
- `number_of_readmissions`
- `start_date`
- `end_date`

## hospital_infections — Healthcare Associated Infections - Hospital (`77hc-ibv8`)

HAI measures: CLABSI, CAUTI, SSI, MRSA, C.difficile rates by hospital

- `facility_id`
- `facility_name`
- `address`
- `citytown`
- `state`
- `zip_code`
- `countyparish`
- `telephone_number`
- `measure_id`
- `measure_name`
- `compared_to_national`
- `score`
- `footnote`
- `start_date`
- `end_date`

## hospital_timely_care — Timely and Effective Care - Hospital (`yv7e-xc69`)

ED wait times, heart attack/stroke care, preventive care, immunization measures

- `facility_id`
- `facility_name`
- `address`
- `citytown`
- `state`
- `zip_code`
- `countyparish`
- `telephone_number`
- `_condition`
- `measure_id`
- `measure_name`
- `score`
- `sample`
- `footnote`
- `start_date`
- `end_date`

## hospital_spending — Medicare Spending Per Beneficiary - Hospital (`rrqw-56er`)

Medicare spending per episode of care compared to national average

- `facility_id`
- `facility_name`
- `address`
- `citytown`
- `state`
- `zip_code`
- `countyparish`
- `telephone_number`
- `measure_id`
- `measure_name`
- `score`
- `footnote`
- `start_date`
- `end_date`

## hospital_patient_survey — Patient Survey (HCAHPS) - Hospital (`dgck-syfz`)

HCAHPS patient experience scores: communication, responsiveness, cleanliness, recommendations

- `facility_id`
- `facility_name`
- `address`
- `citytown`
- `state`
- `zip_code`
- `countyparish`
- `telephone_number`
- `hcahps_measure_id`
- `hcahps_question`
- `hcahps_answer_description`
- `patient_survey_star_rating`
- `patient_survey_star_rating_footnote`
- `hcahps_answer_percent`
- `hcahps_answer_percent_footnote`
- `hcahps_linear_mean_value`
- `number_of_completed_surveys`
- `number_of_completed_surveys_footnote`
- `survey_response_rate_percent`
- `survey_response_rate_percent_footnote`
- `start_date`
- `end_date`

## nursing_home_health_citations — Nursing Home Health Deficiencies (`r5ix-sfxw`)

Health inspection citations in the last 3 years: tag codes, scope/severity, correction dates

- `cms_certification_number_ccn`
- `provider_name`
- `provider_address`
- `citytown`
- `state`
- `zip_code`
- `survey_date`
- `survey_type`
- `deficiency_prefix`
- `deficiency_category`
- `deficiency_tag_number`
- `deficiency_description`
- `scope_severity_code`
- `deficiency_corrected`
- `correction_date`
- `inspection_cycle`
- `standard_deficiency`
- `complaint_deficiency`
- `infection_control_inspection_deficiency`
- `citation_under_idr`
- `citation_under_iidr`
- `location`
- `processing_date`

## nursing_home_quality — Nursing Home Quality Measures (MDS) (`djen-97ju`)

Quality measures from the Minimum Data Set: falls, pressure ulcers, pain, UTIs, restraints

- `cms_certification_number_ccn`
- `provider_name`
- `provider_address`
- `citytown`
- `state`
- `zip_code`
- `measure_code`
- `measure_description`
- `resident_type`
- `q1_measure_score`
- `footnote_for_q1_measure_score`
- `q2_measure_score`
- `footnote_for_q2_measure_score`
- `q3_measure_score`
- `footnote_for_q3_measure_score`
- `q4_measure_score`
- `footnote_for_q4_measure_score`
- `four_quarter_average_score`
- `footnote_for_four_quarter_average_score`
- `used_in_quality_measure_five_star_rating`
- `measure_period`
- `location`
- `processing_date`
