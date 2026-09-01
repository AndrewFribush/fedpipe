# COVID-19 Serology

Source: https://open.fda.gov/apis/device/covid19serology/

---

## Independent Evaluations of COVID-19 Serological Tests

Serology tests detect the presence of antibodies in the blood when the body is responding to a specific infection, like COVID-19. In other words, the tests detect the body’s immune response to the infection caused by the virus rather than detecting the virus itself. In the early days of an infection when the body’s immune response is still building, antibodies may not be detected. This limits the test’s effectiveness for diagnosing COVID-19, and this is one reason serology tests should not be used as the sole basis to diagnose COVID-19. Serology tests could play a role in the fight against COVID-19 by helping healthcare professionals identify individuals who may have developed an immune response to SARS-CoV-2. In addition, these test results can aid in determining who may donate a part of their blood called convalescent plasma, which may serve as a possible treatment for those who are seriously ill from COVID-19. However, to use serology tests properly, it is important to understand their performance characteristics and limitations. Moreover, studies are underway to address questions that will better inform the appropriate use of these tests, such as whether the presence of antibodies conveys a level of immunity that would prevent or reduce the severity of re-infection as well as the duration for which immunity lasts.

### Key Facts

- Source of the data:
Independent testing by US Government Laboratories

- Changes to the source data:
openFDA may change some field names and converts the data into JSON, which is a widely used machine readable format.

- Time period covered in this API:
2020 to null

- Frequency of API updates:
Monthly

### Responsible use of the data

Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API in line with our Terms of Service

## About this testing program

### Introduction

The serology tests were tested at the Frederick National Laboratory for Cancer Research (FNLCR), a Federally Funded Research and Development Center (FFRDC) sponsored by the National Cancer Institute (NCI) or by the Hemostasis Laboratory Branch, Division of Blood Disorders, National Center on Birth Defects and Developmental Disabilities, Centers for Disease Control and Prevention (CDC).

### Panel Composition

Each test was evaluated against “Panel 1”, “Panel 2”, “Panel 3”, or “Panel 4”, each of which include frozen SARS-CoV-2 antibody-positive serum samples (\(n=30\)) and frozen antibody-negative serum and Anticoagulant Citrate Dextrose Solution Formula A (ACD-A) plasma samples (\(n=80\)). While ACD-A plasma may not be commonly used in clinical practice for serological testing, ACD-A plasma samples were used here because these pre-pandemic samples were most easily acquired from blood banks. The panel size and composition were chosen to enable a laboratory-based evaluation and to provide reasonable estimates and confidence intervals for test performance in the context of limited sample availability. The sample size is comparable to that of a typical sample size used to support Emergency Use Authorization (EUA) by FDA for tests of this type.

##### Positive samples

Positive samples used were from patients previously confirmed to have SARS-CoV-2 infection with a nucleic acid amplification test (NAAT). Time between symptom onset, NAAT testing, and sample collection is not known for all samples. Both SARS-CoV-2 IgM and IgG antibodies are present in all positive samples used. The Centers for Disease Control and Prevention (CDC) detected the presence of IgG and IgM antibodies at their laboratory using their SARS-CoV-2 spike enzyme-linked immunosorbent assay (ELISA) tests. (See Serology Testing for COVID-19, which notes “CDC’s serologic test has been designed and validated for surveillance and research purposes. It is designed to estimate the percentage of the U.S. population previously infected with the virus – information needed to guide the response to the pandemic and protect the public’s health. The CDC test is not currently designed to test individuals who want to know if they have been previously infected with SARS-CoV-2. Commercial tests are available to provide test results to individuals.”) The presence of antibodies was confirmed at FNLCR using CDC’s developed ELISAs (Pan-Ig, IgG, and IgM) as well as an IgG Receptor Binding Domain (RBD) ELISA developed by the Krammer Laboratory at the Icahn School of Medicine at Mount Sinai. (An implementation of this test, the COVID-19 ELISA IgG Antibody Test, has been granted an EUA authorization by FDA for use at the Mount Sinai Laboratory (MSL), Center for Clinical Laboratories, a division of the Department of Pathology, Molecular, and Cell-Based Medicine, New York, NY. See this EUA Summary.) The positive samples selected may not reflect the distribution of antibody levels in patient populations that would be evaluated by such a test. Because all samples are positive for both IgM and IgG, this evaluation cannot verify that tests intended to detect IgM and IgG antibodies separately detect these antibodies independently.
Positive samples were assessed at dilutions of 1:100, 1:400, 1:1600, and 1:6400 by CDC on their Pan-Ig assay, their IgM assay, and their IgG assay. Some samples were run at additional dilutions. Any samples that were positive at a dilution greater than 1:6400 were assigned a titer of 6400 because 1:6400 was the highest dilution at which all positive samples were assessed. Two of these samples, C0107 and C0176, were positive for IgG antibodies at a dilution of 1:25600.

##### Negative Samples

All negative samples used were collected prior to 2020, before the SARS-CoV-2 virus is known to have circulated in the United States. Negative sample groups include:

- “Negatives” (n=70): selected without regard for clinical status. This group includes a sample, C0063, that showed reactivity in the Pan-Ig CDC spike ELISA at FNLCR. It includes another sample, C0087, that showed reactivity in the IgG RBD ELISA at FNLCR.

- “HIV+” (n=10): selected from banked plasma from HIV+ patients. (HIV+ samples were deemed appropriate for inclusion in the panel: (1) to increase the sample size and reduce the confidence interval; and (2) to identify any possibility of cross-reactivity with HIV+ samples. It is anticipated that other types of samples, as they become available, may also be evaluated in any future analyses.) This group includes 3 samples, C0018, C0155, and C0182, that showed reactivity in the IgG RBD ELISA at FNLCR.

All negative samples were assessed at dilutions of 1:100 and 1:400 by CDC on their Pan-Ig assay. A subset of samples was assessed in parallel at additional dilutions and on the CDC IgM and IgG assays. All negative samples were negative at a dilution of 1:100 on the CDC Pan-Ig assay. These samples were assigned an undetectable titer (represented as zero (0) in the line data) for the Pan-Ig assay, the IgM assay, and the IgG assay.

### Analysis

Samples used in this evaluation were not randomly selected, and sensitivity (PPA) and specificity (NPA) estimates shown may not be indicative of the real-world performance of these tests. Sensitivity and specificity were calculated for each antibody (e.g., IgM, IgG, IgA, and Pan Ig, as applicable) separately. In addition, for tests that measure multiple antibodies separately, sensitivity and specificity were estimated in a combined manner, where a positive result for any antibody a test is intended to detect was considered as a positive test result and a negative result meant that a sample tested negative for all antibodies a test is intended to detect. Positive and negative predictive values were calculated for combined sensitivity and specificity for tests that measure multiple antibodies separately and assuming a prevalence of 5%. Cross-reactivity with HIV+ was evaluated, and results are presented separately in the individual test reports. If cross-reactivity was detected, the samples with HIV+ were not included in calculations of specificity.
In this report, device outputs indicating equivocal results, including outputs such as “borderline” or similar, are referred to as “equivocal.” For ELISA tests that provide equivocal results, for sensitivity and specificity calculations, equivocal results on positive samples were counted as false negative results, and equivocal results on negative samples were counted as false positive results.
Confidence intervals for sensitivity and specificity were calculated per a score method described in CLSI EP12-A2 (2008). (CLSI. User Protocol for Evaluation of Qualitative Test Performance; Approved Guideline—Second Edition. CLSI document EP12-A2. Wayne, PA: Clinical and Laboratory Standards Institute; 2008. See Recognized Consensus Standards.) Confidence intervals for PPV and NPV were calculated using the values from the 95% confidence intervals for sensitivity and specificity. For evaluation of cross-reactivity with HIV+, it was evaluated whether an increased false positive rate among antibody negative samples with HIV was statistically higher than the false positive rate among antibody negative samples without HIV (for this, a confidence interval for the difference in false positive rates was calculated per a score method described by Altman. (Statistics with Confidence: Confidence Intervals and Statistical Guidelines. (2013). Wiley.))

### Important caveats

Sensitivity and specificity estimates shown may not be indicative of the real world performance of the tests.
These results are based on serum and plasma samples only and may not be indicative of performance with other sample types, such as whole blood, including finger stick blood.
The number of samples in the panel is a minimally viable sample size that still provides reasonable estimates and confidence intervals for test performance, and the samples used may not be representative of the antibody profile observed in patient populations.

### Notes about the evaluation procedure

- The tests were used per the manufacturers’ package inserts.
- Devices were tested within any expiration dates provided.
- Devices were not obviously defective / compromised.
- Devices were stored at FNLCR within their labeled conditions.
- For lateral flow tests, a single operator conducted and read the test.
- For ELISA tests, a single operator conducted the test.
- For lateral flow tests, the operator trained on the test with positive and negative controls prior to testing.
- For ELISA tests, each test was run with positive and negative controls.
- The personnel who performed the testing were blinded to the identity / code of the sample and the expected results.
- The testing was performed in a non-clinical laboratory environment.
- Negative and positive samples were ordered randomly and then tested serially.
See the individual test reports for more specific information on the evaluation of each test.

## Summary test results

Where the Marketing Status below is shown as “EUA Authorized,” FDA has reviewed data generated by the developer and the independent evaluation and determined, among other things, that based on the totality of the evidence available, that the test may be effective in identifying the presence of antibodies to SARS-CoV-2 as described in the Letters of Authorization for each test, and that the known and potential benefits of the test when so used outweigh the known and potential risks. Such tests are authorized by FDA under Emergency Use Authorizations (EUA) and may be distributed and used as set forth in the EUA. Where the Marketing Status below is shown as “Should not be distributed - Voluntarily withdrawn,” the manufacturers have voluntarily stopped distribution and requested FDA to remove their test from the list of commercial manufacturers distributing serology test kits under the policy outlined in Section IV.D of the Policy for Coronavirus Disease-2019 Tests. Where the Marketing Status below is shown as “Should not be distributed - Removed,” either an EUA request has not been submitted within a reasonable period of time as outlined in the Policy for Coronavirus Disease-2019 Tests or FDA has determined not to issue an EUA for the test. Where the Marketing Status below is shown as “Should not be distributed –- No notification or EUA authorization”, the test was evaluated prior to any planned distribution in the United States and is not known to have been marketed here.

### EUA Authorized

#### Abbott Architect i1000 SARS-CoV-2 IgG

Manufacturer: Abbott
Device: Architect i1000 SARS-CoV-2 IgG
Date Performed: 2020-05-20
Lot Number: 15016M800
Panel: Panel 1
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgG | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | PPV at prevalence = 5% | 100% | (46.1%; 100%)
IgG | NPV at prevalence = 5% | 99.5% | (98.6%; 99.8%)

CDC’s Independent Evaluation Report
Data File

#### Access Bio Inc. CareStart COVID-19 IgM/IgG Rapid Diagnostic Test for the Detection of SARS-CoV-2 IgM/IgG Ab

Manufacturer: Access Bio Inc.
Device: CareStart COVID-19 IgM/IgG Rapid Diagnostic Test for the Detection of SARS-CoV-2 IgM/IgG Ab
Date Performed: 2020-06-02
Lot Number: C120E68
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
IgM | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
IgG | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgG | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
Combined | PPV at prevalence = 5% | 67.8% | (35.0%; 88.4%)
Combined | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Access Bio, Inc. CareStart EZ COVID-19 IgM/IgG

Manufacturer: Access Bio, Inc.
Device: CareStart EZ COVID-19 IgM/IgG
Date Performed: 2021-05-04
Lot Number: 20G05
Panel: Panel 3
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | PPV at prevalence = 5% | 100% | (50.5%; 100%)
Combined | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Acon Biotech (Hangzhou) Co., LTD Acon SARS-CoV2 IgG/IgM Rapid Test

Manufacturer: Acon Biotech (Hangzhou) Co., LTD
Device: Acon SARS-CoV2 IgG/IgM Rapid Test
Date Performed: 2020-11-02
Lot Number: COV0109007
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgM | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
IgG | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgG | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 96.2% (77/80) | (89.5%; 98.7%)
Combined | PPV at prevalence = 5% | 58.4% | (30.9%; 80.4%)
Combined | NPV at prevalence = 5% | 100% | (99.3%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Advaite Inc. Advaite RapCov Rapid COVID-19 Test

Manufacturer: Advaite Inc.
Device: Advaite RapCov Rapid COVID-19 Test
Date Performed: 2020-11-02
Lot Number: P0904
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgG | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgG | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
IgG | PPV at prevalence = 5% | 79.7% | (38.0%; 95.9%)
IgG | NPV at prevalence = 5% | 99.6% | (98.8%; 99.9%)

NCI’s Independent Evaluation Report
Data File

#### Advaite Inc. ADVAITE RapCOV Rapid COVID-19 Test

Manufacturer: Advaite Inc.
Device: ADVAITE RapCOV Rapid COVID-19 Test
Date Performed: 2020-10-06
Lot Number: P0904
Panel: Panel 3
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgG | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
IgG | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
IgG | PPV at prevalence = 5% | 78.5% | (35.4%; 95.8%)
IgG | NPV at prevalence = 5% | 99.3% | (98.4%; 99.7%)

NCI’s Independent Evaluation Report
Data File

#### Advaite Inc. Advaite RapCov Rapid COVID-19 Test (combined evaluations)

Manufacturer: Advaite Inc.
Device: Advaite RapCov Rapid COVID-19 Test (combined evaluations)
Date Performed: 2020-10-06, 2020-11-02
Lot Number: P0904
Panel: Panel 3, Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgG | Sensitivity | 89.7% (52/58) | (79.2%; 95.2%)
IgG | Specificity | 97.9% (95/97) | (92.8%; 99.4%)
IgG | PPV at prevalence = 5% | 69.6% | (36.6%; 89.8%)
IgG | NPV at prevalence = 5% | 99.4% | (98.8%; 99.7%)

NCI’s Independent Evaluation Report
Data File

#### Assure Tech. (Hangzhou) Co., Ltd. FaStep Rapid Diagnostic Test Coronavirus Disease 2019/ (COVID-2019) IgG/IgM Rapid Test

Manufacturer: Assure Tech. (Hangzhou) Co., Ltd.
Device: FaStep Rapid Diagnostic Test Coronavirus Disease 2019/ (COVID-2019) IgG/IgM Rapid Test
Date Performed: 2020-06-10
Lot Number: I2003183
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgM | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
IgG | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | PPV at prevalence = 5% | 80.8% | (40.9%; 96.0%)
Combined | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Beijing Wantai Biological Pharmacy Enterprise Co., Ltd. WANTAI SARS-CoV-2 Ab ELISA

Manufacturer: Beijing Wantai Biological Pharmacy Enterprise Co., Ltd.
Device: WANTAI SARS-CoV-2 Ab ELISA
Date Performed: 2020-07-02
Lot Number: NCOA20200401
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
Pan Ig | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
Pan Ig | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
Pan Ig | PPV at prevalence = 5% | 67.1% | (33.6%; 88.4%)
Pan Ig | NPV at prevalence = 5% | 99.8% | (99.0%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Beijing Wantai Biological Pharmacy Enterprise Co., Ltd. WANTAI SARS-CoV-2 Ab Rapid Test

Manufacturer: Beijing Wantai Biological Pharmacy Enterprise Co., Ltd.
Device: WANTAI SARS-CoV-2 Ab Rapid Test
Date Performed: 2020-06-16
Lot Number: JNB20200406
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
Pan Ig | Sensitivity | 100% (30/30) | (88.7%; 100%)
Pan Ig | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Pan Ig | PPV at prevalence = 5% | 80.8% | (40.9%; 96.0%)
Pan Ig | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Bio-Rad Platelia SARS-CoV-2 Total Ab

Manufacturer: Bio-Rad
Device: Platelia SARS-CoV-2 Total Ab
Date Performed: 2021-05-04
Lot Number: 0F0015
Panel: Panel 3
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
Pan Ig | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
Pan Ig | Specificity | 100% (80/80) | (95.4%; 100%)
Pan Ig | PPV at prevalence = 5% | 100% | (44.7%; 100%)
Pan Ig | NPV at prevalence = 5% | 99.3% | (98.4%; 99.7%)

NCI’s Independent Evaluation Report
Data File

#### Bio-Rad Platelia SARS-CoV-2 Total Ab

Manufacturer: Bio-Rad
Device: Platelia SARS-CoV-2 Total Ab
Date Performed: 2021-06-07
Lot Number: 0F0015
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
Pan Ig | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
Pan Ig | Specificity | 100% (80/80) | (95.4%; 100%)
Pan Ig | PPV at prevalence = 5% | 100% | (47.5%; 100%)
Pan Ig | NPV at prevalence = 5% | 99.7% | (98.8%; 99.9%)

NCI’s Independent Evaluation Report
Data File

#### Bio-Rad Platelia SARS-CoV-2 Total Ab (combined evaluations)

Manufacturer: Bio-Rad
Device: Platelia SARS-CoV-2 Total Ab (combined evaluations)
Date Performed: 2021-05-04, 2021-06-07
Lot Number: 0F0015
Panel: Panel 3, Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
Pan Ig | Sensitivity | 89.7% (52/58) | (79.2%; 95.2%)
Pan Ig | Specificity | 100% (97/97) | (96.2%; 100%)
Pan Ig | PPV at prevalence = 5% | 100% | (52.3%; 100%)
Pan Ig | NPV at prevalence = 5% | 99.5% | (98.9%; 99.7%)

NCI’s Independent Evaluation Report
Data File

#### Biocan Diagnostics Inc biocan Tell Me Fast Novel Coronavirus (COVID-19) IgG/IgM Antibody Test

Manufacturer: Biocan Diagnostics Inc
Device: biocan Tell Me Fast Novel Coronavirus (COVID-19) IgG/IgM Antibody Test
Date Performed: 2020-06-03
Lot Number: B251CB170320
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
IgM | Specificity | 98.7% (78/79) | (93.2%; 99.8%)
IgG | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgG | Specificity | 96.2% (76/79) | (89.4%; 98.7%)
Combined | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
Combined | Specificity | 96.2% (76/79) | (89.4%; 98.7%)
Combined | PPV at prevalence = 5% | 56.4% | (28.1%; 79.9%)
Combined | NPV at prevalence = 5% | 99.6% | (98.8%; 99.9%)

NCI’s Independent Evaluation Report
Data File

#### Biohit Healthcare (Hefei) Co., Ltd. SARS-CoV-2 IgM/IgG Antibody Test Kit

Manufacturer: Biohit Healthcare (Hefei) Co., Ltd.
Device: SARS-CoV-2 IgM/IgG Antibody Test Kit
Date Performed: 2020-05-28
Lot Number: SA200301
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgM | Specificity | 95.0% (76/80) | (87.8%; 98.0%)
IgG | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgG | Specificity | 95.0% (76/80) | (87.8%; 98.0%)
Combined | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
Combined | Specificity | 95.0% (76/80) | (87.8%; 98.0%)
Combined | PPV at prevalence = 5% | 50.4% | (26.5%; 72.7%)
Combined | NPV at prevalence = 5% | 99.8% | (99.0%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Euroimmun Medizinische Labordiagnostika AG EUROIMMUN Anti-SARS-CoV-2 S1 Curve ELISA (IgG)

Manufacturer: Euroimmun Medizinische Labordiagnostika AG
Device: EUROIMMUN Anti-SARS-CoV-2 S1 Curve ELISA (IgG)
Date Performed: 2021-07-09
Lot Number: E210316AK
Panel: Panel 4
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgG | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | PPV at prevalence = 5% | 100% | (44.7%; 100%)
IgG | NPV at prevalence = 5% | 99.3% | (98.4%; 99.7%)

NCI’s Independent Evaluation Report
Data File

#### Euroimmun Medizinische Labordiagnostika AG EUROIMMUN Anti-SARS-CoV-2 S1 Curve ELISA (IgG)

Manufacturer: Euroimmun Medizinische Labordiagnostika AG
Device: EUROIMMUN Anti-SARS-CoV-2 S1 Curve ELISA (IgG)
Date Performed: 2021-08-13
Lot Number: E210316AK
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgG | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | PPV at prevalence = 5% | 100% | (47.5%; 100%)
IgG | NPV at prevalence = 5% | 99.7% | (98.8%; 99.9%)

NCI’s Independent Evaluation Report
Data File

#### Euroimmun Medizinische Labordiagnostika AG EUROIMMUN Anti-SARS-CoV-2 S1 Curve ELISA (IgG) (combined evaluations)

Manufacturer: Euroimmun Medizinische Labordiagnostika AG
Device: EUROIMMUN Anti-SARS-CoV-2 S1 Curve ELISA (IgG) (combined evaluations)
Date Performed: 2021-07-09, 2021-08-13
Lot Number: E210316AK
Panel: Panel 4, Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgG | Sensitivity | 91.1% (51/56) | (80.7%; 96.1%)
IgG | Specificity | 100% (107/107) | (96.5%; 100%)
IgG | PPV at prevalence = 5% | 100% | (55.1%; 100%)
IgG | NPV at prevalence = 5% | 99.5% | (99.0%; 99.8%)

NCI’s Independent Evaluation Report
Data File

#### Euroimmun SARS-COV-2 ELISA (IgG)

Manufacturer: Euroimmun
Device: SARS-COV-2 ELISA (IgG)
Date Performed: 2020-04-21
Lot Number: E200330DT
Panel: Panel 1
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgG | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | PPV at prevalence = 5% | 100% | (46.1%; 100%)
IgG | NPV at prevalence = 5% | 99.5% | (98.6%; 99.8%)

NCI’s Independent Evaluation Report
Data File

#### Fisher Diagnostics OmniPATH COVID-19 Total Antibody ELISA Test

Manufacturer: Fisher Diagnostics
Device: OmniPATH COVID-19 Total Antibody ELISA Test
Date Performed: 2020-09-01
Lot Number: 20200523
Panel: Panel 3
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
Pan Ig | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
Pan Ig | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
Pan Ig | PPV at prevalence = 5% | 67.1% | (33.6%; 88.4%)
Pan Ig | NPV at prevalence = 5% | 99.8% | (99.0%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Hangzhou Biotest Biotech, Co., Ltd. Covid-19 IgG/IgM Rapid Test Cassette

Manufacturer: Hangzhou Biotest Biotech, Co., Ltd.
Device: Covid-19 IgG/IgM Rapid Test Cassette
Date Performed: 2020-04-27
Lot Number: COV20030071
Panel: Panel 1
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | PPV at prevalence = 5% | 100% | (50.5%; 100%)
Combined | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Hangzhou Laihe Biotech Co., Ltd. Novel Coronavirus (2019-nCoV) IgM/IgG Antibody Combo Test Kit (Colloidal Gold)

Manufacturer: Hangzhou Laihe Biotech Co., Ltd.
Device: Novel Coronavirus (2019-nCoV) IgM/IgG Antibody Combo Test Kit (Colloidal Gold)
Date Performed: 2020-06-10
Lot Number: 2005037
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgG | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | PPV at prevalence = 5% | 80.8% | (40.9%; 96.0%)
Combined | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Healgen COVID-19 IgG/IgM Rapid Test Cassette

Manufacturer: Healgen
Device: COVID-19 IgG/IgM Rapid Test Cassette
Date Performed: 2020-04-21
Lot Number: 2003292
Panel: Panel 1
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgG | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
Combined | PPV at prevalence = 5% | 67.8% | (35.0%; 88.4%)
Combined | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI’s Independent Evaluation Report
Data File

#### InBios International Inc. SCoV-2 Detect™ IgG ELISA

Manufacturer: InBios International Inc.
Device: SCoV-2 Detect™ IgG ELISA
Date Performed: 2020-06-16
Lot Number: DFT1172
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgG | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | PPV at prevalence = 5% | 100% | (50.5%; 100%)
IgG | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI’s Independent Evaluation Report
Data File

#### InBios International Inc. SCoV-2 Detect™ IgM ELISA

Manufacturer: InBios International Inc.
Device: SCoV-2 Detect™ IgM ELISA
Date Performed: 2020-06-16
Lot Number: DFT1170
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgM | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
IgM | PPV at prevalence = 5% | 80.3% | (39.4%; 96.0%)
IgM | NPV at prevalence = 5% | 99.8% | (99.1%; 100%)

NCI’s Independent Evaluation Report
Data File

#### InBios International, Inc. InBios SCoV-2 Detect™ IgG Rapid Test

Manufacturer: InBios International, Inc.
Device: InBios SCoV-2 Detect™ IgG Rapid Test
Date Performed: 2020-10-09 through 2020-10-29
Lot Number: ZH5314
Panel: Panel 3
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgG | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | PPV at prevalence = 5% | 100% | (50.5%; 100%)
IgG | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Innovita (Tangshan) Biological Technology Co., Ltd. One Step Rapid Test 2019-nCoV Ab Test (Colloidal Gold) IgM/IgG Whole Blood/Serum/Plasma Combo

Manufacturer: Innovita (Tangshan) Biological Technology Co., Ltd.
Device: One Step Rapid Test 2019-nCoV Ab Test (Colloidal Gold) IgM/IgG Whole Blood/Serum/Plasma Combo
Date Performed: 2020-06-02
Lot Number: 20200405
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgM | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
IgG | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgG | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
Combined | PPV at prevalence = 5% | 67.8% | (35.0%; 88.4%)
Combined | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI's Independent Evaluation Report
Data File

#### Innovita (Tangshan) Biological Technology Co., Ltd. One Step Rapid Test 2019-nCoV Ab Test (Colloidal Gold) IgM/IgG Whole Blood/Serum/Plasma Combo

Manufacturer: Innovita (Tangshan) Biological Technology Co., Ltd.
Device: One Step Rapid Test 2019-nCoV Ab Test (Colloidal Gold) IgM/IgG Whole Blood/Serum/Plasma Combo
Date Performed: 2020-06-02
Lot Number: 20200405
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgM | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
IgG | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgG | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
Combined | PPV at prevalence = 5% | 67.8% | (35.0%; 88.4%)
Combined | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Jiangsu Well Biotech Co, Ltd. COVID-19 IgM/IgG Rapid Test (Colloidal gold)

Manufacturer: Jiangsu Well Biotech Co, Ltd.
Device: COVID-19 IgM/IgG Rapid Test (Colloidal gold)
Date Performed: 2020-06-23
Lot Number: 2005202
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgM | Specificity | 95.0% (76/80) | (87.8%; 98.0%)
IgG | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgG | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 93.8% (75/80) | (86.2%; 97.3%)
Combined | PPV at prevalence = 5% | 45.7% | (25.3%; 66.1%)
Combined | NPV at prevalence = 5% | 100% | (99.3%; 100%)

NCI's Independent Evaluation Report
Data File

#### Jiangsu Well Biotech Co., Ltd. COVID-19 IgM/IgG Rapid Test

Manufacturer: Jiangsu Well Biotech Co., Ltd.
Device: COVID-19 IgM/IgG Rapid Test
Date Performed: 2020-09-04
Lot Number: 2005202
Panel: Panel 3
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | PPV at prevalence = 5% | 100% | (50.5%; 100%)
Combined | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI's Independent Evaluation Report
Data File

#### Jiangsu Well Biotech Co., Ltd. COVID-19 IgM/IgG Rapid Test (combined evaluations)

Manufacturer: Jiangsu Well Biotech Co., Ltd.
Device: COVID-19 IgM/IgG Rapid Test (combined evaluations)
Date Performed: 2020-06-23, 2020-09-04
Lot Number: 2005202
Panel: Panel 2, Panel 3
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 93.1% (54/58) | (83.6%; 97.3%)
IgM | Specificity | 95.9% (93/97) | (89.9%; 98.4%)
IgG | Sensitivity | 100% (58/58) | (93.8%; 100%)
IgG | Specificity | 99.0% (96/97) | (94.4%; 99.8%)
Combined | Sensitivity | 100% (58/58) | (93.8%; 100%)
Combined | Specificity | 94.8% (92/97) | (88.5%; 97.8%)
Combined | PPV at prevalence = 5% | 50.5% | (30.0%; 70.3%)
Combined | NPV at prevalence = 5% | 100% | (99.6%; 100%)

NCI's Independent Evaluation Report
Data File

#### LumiraDX UK Ltd LumiraDx SARS-CoV-2 Ab Test

Manufacturer: LumiraDX UK Ltd
Device: LumiraDx SARS-CoV-2 Ab Test
Date Performed: 2022-07-27 through 2022-07-28
Lot Number: 5000672
Panel: Panel 3
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
Pan Ig | Sensitivity | 100% (30/30) | (88.7%; 100%)
Pan Ig | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Pan Ig | PPV at prevalence = 5% | 80.8% | (40.9%; 96.0%)
Pan Ig | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Megna Health Inc. Megna Rapid COVID-19 IgM/IgG Combo Test Kit

Manufacturer: Megna Health Inc.
Device: Megna Rapid COVID-19 IgM/IgG Combo Test Kit
Date Performed: 2020-06-24
Lot Number: NA
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 83.3% (25/30) | (66.4%; 92.7%)
IgM | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
IgG | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgG | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 95.0% (76/80) | (87.8%; 98.0%)
Combined | PPV at prevalence = 5% | 51.3% | (27.7%; 72.9%)
Combined | NPV at prevalence = 5% | 100% | (99.3%; 100%)

NCI’s Independent Evaluation Report
Data File

#### NanoEntek Inc FREND™ COVID-19 IgG/IgM Duo test

Manufacturer: NanoEntek Inc
Device: FREND™ COVID-19 IgG/IgM Duo test
Date Performed: 2020-08-19
Lot Number: 730023
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
(IgM / IgG) | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
(IgM / IgG) | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
(IgM / IgG) | PPV at prevalence = 5% | 80.3% | (39.4%; 96.0%)
(IgM / IgG) | NPV at prevalence = 5% | 99.8% | (99.1%; 100%)

NCI's Independent Evaluation Report
Data File

#### Nirmidas Biotech, Inc COVID-19 (SARS-CoV-2) IgM/IgG Antibody Detection Kit

Manufacturer: Nirmidas Biotech, Inc
Device: COVID-19 (SARS-CoV-2) IgM/IgG Antibody Detection Kit
Date Performed: 2020-06-24
Lot Number: 15038
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgM | Specificity | 100% (70/70) | (94.8%; 100%)
IgG | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
IgG | Specificity | 100% (70/70) | (94.8%; 100%)
Combined | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
Combined | Specificity | 100% (70/70) | (94.8%; 100%)
Combined | PPV at prevalence = 5% | 100% | (44.3%; 100%)
Combined | NPV at prevalence = 5% | 99.7% | (98.8%; 99.9%)

NCI's Independent Evaluation Report
Data File

#### Nirmidas Biotech, Inc COVID-19 (SARS-CoV-2) IgM/IgG Antibody Detection Kit

Manufacturer: Nirmidas Biotech, Inc
Device: COVID-19 (SARS-CoV-2) IgM/IgG Antibody Detection Kit
Date Performed: 2020-09-04
Lot Number: 15038
Panel: Panel 3
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
IgM | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
IgG | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
Combined | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
Combined | PPV at prevalence = 5% | 67.1% | (33.6%; 88.4%)
Combined | NPV at prevalence = 5% | 99.8% | (99.0%; 100%)

NCI's Independent Evaluation Report
Data File

#### Nirmidas Biotech, Inc COVID-19 (SARS-CoV-2) IgM/IgG Antibody Detection Kit (combined evaluations)

Manufacturer: Nirmidas Biotech, Inc
Device: COVID-19 (SARS-CoV-2) IgM/IgG Antibody Detection Kit (combined evaluations)
Date Performed: 2020-06-24, 2020-09-04
Lot Number: 15038
Panel: Panel 2, Panel 3
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 93.1% (54/58) | (83.6%; 97.3%)
IgM | Specificity | 97.9% (95/97) | (92.8%; 99.4%)
IgG | Sensitivity | 87.9% (51/58) | (77.1%; 94.0%)
IgG | Specificity | 100% (97/97) | (96.2%; 100%)
Combined | Sensitivity | 96.6% (56/58) | (88.3%; 99.1%)
Combined | Specificity | 97.9% (95/97) | (92.8%; 99.4%)
Combined | PPV at prevalence = 5% | 71.1% | (39.2%; 90.2%)
Combined | NPV at prevalence = 5% | 99.8% | (99.3%; 99.9%)

NCI's Independent Evaluation Report
Data File

#### Nirmidas Biotech, Inc. MidaSpot COVID-19 Antibody Combo Detection Kit (NBPC-0007)

Manufacturer: Nirmidas Biotech, Inc.
Device: MidaSpot COVID-19 Antibody Combo Detection Kit (NBPC-0007)
Date Performed: 2020-12-10
Lot Number: 15916
Panel: Panel 3
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgM | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
IgG | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgG | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 96.2% (77/80) | (89.5%; 98.7%)
Combined | PPV at prevalence = 5% | 58.4% | (30.9%; 80.4%)
Combined | NPV at prevalence = 5% | 100% | (99.3%; 100%)

NCI’s Independent Evaluation Report
Data File

#### NOWDiagnostics, Inc. ADEXUSDx COVID-19 Test

Manufacturer: NOWDiagnostics, Inc.
Device: ADEXUSDx COVID-19 Test
Date Performed: 2021-03-04
Lot Number: 1119-1
Panel: Panel 3
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
Pan Ig | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
Pan Ig | Specificity | 100% (80/80) | (95.4%; 100%)
Pan Ig | PPV at prevalence = 5% | 100% | (47.5%; 100%)
Pan Ig | NPV at prevalence = 5% | 99.7% | (98.8%; 99.9%)

Independent Evaluation Report
Data File

#### Ortho-Clinical Diagnostics, Inc. VITROS Immunodiagnostic Products Anti-SARS-CoV-2 IgG Reagent Pack

Manufacturer: Ortho-Clinical Diagnostics, Inc.
Device: VITROS Immunodiagnostic Products Anti-SARS-CoV-2 IgG Reagent Pack
Date Performed: 2020-09-17
Lot Number: 0130
Panel: Panel 3
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgG | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | PPV at prevalence = 5% | 100% | (50.5%; 100%)
IgG | NPV at prevalence = 5% | 100% | (99.4%; 100%)

Independent Evaluation Report
Data File

#### QIAGEN GmbH QIAreach Anti-SARS-CoV-2 Total Test

Manufacturer: QIAGEN GmbH
Device: QIAreach Anti-SARS-CoV-2 Total Test
Date Performed: 2020-12-10
Lot Number: 86652
Panel: Panel 3
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
Pan Ig | Sensitivity | 100% (30/30) | (88.7%; 100%)
Pan Ig | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
Pan Ig | PPV at prevalence = 5% | 67.8% | (35.0%; 88.4%)
Pan Ig | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Roche Diagnostic Corporation Elecsys Anti-SARS-CoV-2

Manufacturer: Roche Diagnostic Corporation
Device: Elecsys Anti-SARS-CoV-2
Date Performed: 2020-08-26
Lot Number: 50726001
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
Pan Ig | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
Pan Ig | Specificity | 100% (80/80) | (95.4%; 100%)
Pan Ig | PPV at prevalence = 5% | 100% | (48.9%; 100%)
Pan Ig | NPV at prevalence = 5% | 99.8% | (99.1%; 100%)

NIH's Independent Evaluation Report
Data File

#### Salofa Oy Sienna COVID-19 IgG/IgM Rapid Test Cassette (whole blood/serum/plasma)

Manufacturer: Salofa Oy
Device: Sienna COVID-19 IgG/IgM Rapid Test Cassette (whole blood/serum/plasma)
Date Performed: 2020-06-09
Lot Number: 20052003
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgG | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
Combined | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | PPV at prevalence = 5% | 79.7% | (38.0%; 95.9%)
Combined | NPV at prevalence = 5% | 99.6% | (98.8%; 99.9%)

NCI’s Independent Evaluation Report
Data File

#### Sugentech, Inc. SGTi-flex COVID-19 IgG

Manufacturer: Sugentech, Inc.
Device: SGTi-flex COVID-19 IgG
Date Performed: 2020-08-19
Lot Number: COGT20104
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgG | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | PPV at prevalence = 5% | 100% | (48.9%; 100%)
IgG | NPV at prevalence = 5% | 99.8% | (99.1%; 100%)

NCI’s Independent Evaluation Report
Data File

#### TBG Biotechnology Corp SARS-CoV-2 IgG/IgM Rapid Test Kit

Manufacturer: TBG Biotechnology Corp
Device: SARS-CoV-2 IgG/IgM Rapid Test Kit
Date Performed: 2020-06-16
Lot Number: FRS20051K
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgM | Specificity | 95.0% (76/80) | (87.8%; 98.0%)
IgG | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgG | Specificity | 96.2% (77/80) | (89.5%; 98.7%)
Combined | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
Combined | Specificity | 95.0% (76/80) | (87.8%; 98.0%)
Combined | PPV at prevalence = 5% | 49.6% | (25.4%; 72.5%)
Combined | NPV at prevalence = 5% | 99.6% | (98.7%; 99.9%)

NCI’s Independent Evaluation Report
Data File

#### United Biomedical, Inc. SARS-COV-2 ELISA

Manufacturer: United Biomedical, Inc.
Device: SARS-COV-2 ELISA
Date Performed: 2020-06-17
Lot Number: 0153004
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgG | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | PPV at prevalence = 5% | 100% | (44.7%; 100%)
IgG | NPV at prevalence = 5% | 99.3% | (98.4%; 99.7%)

NCI’s Independent Evaluation Report
Data File

#### United Biomedical, Inc. SARS-COV-2 ELISA

Manufacturer: United Biomedical, Inc.
Device: SARS-COV-2 ELISA
Date Performed: 2020-09-01
Lot Number: 0153004
Panel: Panel 3
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgG | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | PPV at prevalence = 5% | 100% | (46.1%; 100%)
IgG | NPV at prevalence = 5% | 99.5% | (98.6%; 99.8%)

NCI’s Independent Evaluation Report
Data File

#### United Biomedical, Inc. SARS-COV-2 ELISA (combined evaluations)

Manufacturer: United Biomedical, Inc.
Device: SARS-COV-2 ELISA (combined evaluations)
Date Performed: 2020-06-17, 2020-09-01
Lot Number: 0153004
Panel: Panel 2, Panel 3
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgG | Sensitivity | 89.7% (52/58) | (79.2%; 95.2%)
IgG | Specificity | 100% (97/97) | (96.2%; 100%)
IgG | PPV at prevalence = 5% | 100% | (52.3%; 100%)
IgG | NPV at prevalence = 5% | 99.5% | (98.9%; 99.7%)

NCI’s Independent Evaluation Report
Data File

#### Xiamen Biotime Biotechnology Co., Ltd. Biotime SARS-CoV-2 IgG/IgM Rapid Qualitative Test

Manufacturer: Xiamen Biotime Biotechnology Co., Ltd.
Device: Biotime SARS-CoV-2 IgG/IgM Rapid Qualitative Test
Date Performed: 2020-05-29
Lot Number: X2003602
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgM | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
IgG | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgG | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 96.2% (77/80) | (89.5%; 98.7%)
Combined | PPV at prevalence = 5% | 58.4% | (30.9%; 80.4%)
Combined | NPV at prevalence = 5% | 100% | (99.3%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Zeus Scientific, Inc. SARS-CoV-2 IgG Test System

Manufacturer: Zeus Scientific, Inc.
Device: SARS-CoV-2 IgG Test System
Date Performed: 2020-07-02
Lot Number: 20060295
Panel: Panel 2
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgG | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgG | Specificity | 100% (70/70) | (94.8%; 100%)
IgG | PPV at prevalence = 5% | 100% | (44.3%; 100%)
IgG | NPV at prevalence = 5% | 99.7% | (98.8%; 99.9%)

NCI’s Independent Evaluation Report
Data File

#### Zeus Scientific, Inc. Zeus ELISA SARS-CoV-2 Total Antibody Test System

Manufacturer: Zeus Scientific, Inc.
Device: Zeus ELISA SARS-CoV-2 Total Antibody Test System
Date Performed: 2021-02-05 through 2021-02-22
Lot Number: 20060312
Panel: Panel 3
Marketing Status: EUA Authorized
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
Pan Ig | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
Pan Ig | Specificity | 100% (70/70) | (94.8%; 100%)
Pan Ig | PPV at prevalence = 5% | 100% | (44.3%; 100%)
Pan Ig | NPV at prevalence = 5% | 99.7% | (98.8%; 99.9%)

NCI’s Independent Evaluation Report
Data File

### Should not be Used

#### Abacus Pharma International SARS-CoV-2 IgM/IgG AB Antibody Rapid Test (Immunochromatography)

Manufacturer: Abacus Pharma International
Device: SARS-CoV-2 IgM/IgG AB Antibody Rapid Test (Immunochromatography)
Date Performed: 2020-05-08
Lot Number: COV1252003C
Panel: Panel 1
Marketing Status: Should not be distributed - Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 53.3% (16/30) | (36.1%; 69.8%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 73.3% (22/30) | (55.6%; 85.8%)
IgG | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | Sensitivity | 76.7% (23/30) | (59.1%; 88.2%)
Combined | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | PPV at prevalence = 5% | 76.3% | (31.6%; 95.5%)
Combined | NPV at prevalence = 5% | 98.8% | (97.7%; 99.4%)

NCI’s Independent Evaluation Report
Data File

#### Abbexa COVID-19 IgG/IgM Rapid Test Kit

Manufacturer: Abbexa
Device: COVID-19 IgG/IgM Rapid Test Kit
Date Performed: 2020-06-04
Lot Number: L20Z4852X
Panel: Panel 2
Marketing Status: Should not be distributed - Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 53.3% (16/30) | (36.1%; 69.8%)
IgM | Specificity | 96.2% (77/80) | (89.5%; 98.7%)
IgG | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgG | Specificity | 96.2% (77/80) | (89.5%; 98.7%)
Combined | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
Combined | Specificity | 92.5% (74/80) | (84.6%; 96.5%)
Combined | PPV at prevalence = 5% | 40.4% | (22.2%; 60.0%)
Combined | NPV at prevalence = 5% | 99.8% | (99.0%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Abbott Rapid Diagnostics Jena GmbH COVID-19 IgG Rapid Test Device

Manufacturer: Abbott Rapid Diagnostics Jena GmbH
Device: COVID-19 IgG Rapid Test Device
Date Performed: 2020-07-20
Lot Number: COV0062057
Panel: Panel 2
Marketing Status: Should not be distributed –– No notification or EUA authorization
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgG | Sensitivity | 83.3% (25/30) | (66.4%; 92.7%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | PPV at prevalence = 5% | 100% | (43.3%; 100%)
IgG | NPV at prevalence = 5% | 99.1% | (98.2%; 99.6%)

NCI’s Independent Evaluation Report
Data File

#### Accel Diagnostics, LLC Rapid C2T Total Antibodies (IgG/IgM) Card

Manufacturer: Accel Diagnostics, LLC
Device: Rapid C2T Total Antibodies (IgG/IgM) Card
Date Performed: 2020-09-25 through 2020-09-28
Lot Number: 07.20.005
Panel: Panel 3
Marketing Status: Should not be distributed – Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
(IgM / IgG) | Sensitivity | 70.0% (21/30) | (52.1%; 83.3%)
(IgM / IgG) | Specificity | 60.0% (48/80) | (49.0%; 70.0%)
(IgM / IgG) | PPV at prevalence = 5% | 8.4% | (5.1%; 12.8%)
(IgM / IgG) | NPV at prevalence = 5% | 97.4% | (95.1%; 98.8%)

NCI’s Independent Evaluation Report
Data File

#### Accudiagnostics Covid-19 IgM/IgG Test Kit

Manufacturer: Accudiagnostics
Device: Covid-19 IgM/IgG Test Kit
Date Performed: 2020-04-27
Lot Number: NA
Panel: Panel 1
Marketing Status: Should not be distributed –- No notification or EUA authorization
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgM | Specificity | 87.5% (70/80) | (78.5%; 93.1%)
IgG | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgG | Specificity | 92.5% (74/80) | (84.6%; 96.5%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 82.5% (66/80) | (72.7%; 89.3%)
Combined | PPV at prevalence = 5% | 23.1% | (14.6%; 32.9%)
Combined | NPV at prevalence = 5% | 100% | (99.2%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Alfa Scientific Designs Inc. Covid-19 IgG/IgM Antibody Test

Manufacturer: Alfa Scientific Designs Inc.
Device: Covid-19 IgG/IgM Antibody Test
Date Performed: 2020-04-30
Lot Number: PD200420A
Panel: Panel 1
Marketing Status: Should not be distributed - Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgM | Specificity | 93.8% (75/80) | (86.2%; 97.3%)
IgG | Sensitivity | 80.0% (24/30) | (62.7%; 90.5%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 93.8% (75/80) | (86.2%; 97.3%)
Combined | PPV at prevalence = 5% | 45.7% | (25.3%; 66.1%)
Combined | NPV at prevalence = 5% | 100% | (99.3%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Arbor Vita Corporation CoVisa™ IgG Test

Manufacturer: Arbor Vita Corporation
Device: CoVisa™ IgG Test
Date Performed: 2020-06-17
Lot Number: RD20060803
Panel: Panel 2
Marketing Status: Should not be distributed -- Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgG | Sensitivity | 76.7% (23/30) | (59.1%; 88.2%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | PPV at prevalence = 5% | 100% | (40.4%; 100%)
IgG | NPV at prevalence = 5% | 98.8% | (97.8%; 99.4%)

NCI’s Independent Evaluation Report
Data File

#### Artron Laboratories, Inc. OTO-Artron COVID-19 IgG/IgM Antibody Test

Manufacturer: Artron Laboratories, Inc.
Device: OTO-Artron COVID-19 IgG/IgM Antibody Test
Date Performed: 2020-10-21
Lot Number: 200606
Panel: Panel 3
Marketing Status: Should not be distributed - Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 76.7% (23/30) | (59.1%; 88.2%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 83.3% (25/30) | (66.4%; 92.7%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
Combined | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | PPV at prevalence = 5% | 100% | (47.5%; 100%)
Combined | NPV at prevalence = 5% | 99.7% | (98.8%; 99.9%)

NCI’s Independent Evaluation Report
Data File

#### Artron Laboratories, Inc. OTO-Artron COVID-19 IgG/IgM Antibody Test

Manufacturer: Artron Laboratories, Inc.
Device: OTO-Artron COVID-19 IgG/IgM Antibody Test
Date Performed: 2020-10-21
Lot Number: 200606
Panel: Panel 3
Marketing Status: Should not be distributed – Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 76.7% (23/30) | (59.1%; 88.2%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 83.3% (25/30) | (66.4%; 92.7%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
Combined | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | PPV at prevalence = 5% | 100% | (47.5%; 100%)
Combined | NPV at prevalence = 5% | 99.7% | (98.8%; 99.9%)

NCI’s Independent Evaluation Report
Data File

#### Atlas-Link (Beijing) Nova COVID-19 IgG/IgM Antibody Rapid Test

Manufacturer: Atlas-Link (Beijing)
Device: Nova COVID-19 IgG/IgM Antibody Rapid Test
Date Performed: 2020-04-27
Lot Number: 20200305
Panel: Panel 1
Marketing Status: Should not be distributed -- Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
IgM | Specificity | 90.0% (72/80) | (81.5%; 94.8%)
IgG | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
IgG | Specificity | 90.0% (72/80) | (81.5%; 94.8%)
Combined | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
Combined | Specificity | 90.0% (72/80) | (81.5%; 94.8%)
Combined | PPV at prevalence = 5% | 32.1% | (17.5%; 49.6%)
Combined | NPV at prevalence = 5% | 99.4% | (98.4%; 99.8%)

NCI’s Independent Evaluation Report
Data File

#### Aurora Biomed Inc COVID-19 IgG/IgM Rapid Test

Manufacturer: Aurora Biomed Inc
Device: COVID-19 IgG/IgM Rapid Test
Date Performed: 2020-05-08
Lot Number: COVID20200424
Panel: Panel 1
Marketing Status: Should not be distributed -- Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 66.7% (20/30) | (48.8%; 80.8%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 76.7% (23/30) | (59.1%; 88.2%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 76.7% (23/30) | (59.1%; 88.2%)
Combined | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | PPV at prevalence = 5% | 100% | (40.4%; 100%)
Combined | NPV at prevalence = 5% | 98.8% | (97.8%; 99.4%)

NCI’s Independent Evaluation Report
Data File

#### AutoBio Diagnostics Co., LTD Anti-SARS-CoV-2 Rapid Test

Manufacturer: AutoBio Diagnostics Co., LTD
Device: Anti-SARS-CoV-2 Rapid Test
Date Performed: 2020-06-24
Lot Number: 20E22-J01
Panel: Panel 2
Marketing Status: Should not be distributed -- Removed – EUA Revoked
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 50.0% (15/30) | (33.2%; 66.8%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgG | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
Combined | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | PPV at prevalence = 5% | 79.7% | (38.0%; 95.9%)
Combined | NPV at prevalence = 5% | 99.6% | (98.8%; 99.9%)

NCI’s Independent Evaluation Report
Data File

#### Beijing Kewei Clinical Diagnostic Reagent Inc. Genonto Rapid Test10 COVID-19 IgG/IgM Rapid Test Kit

Manufacturer: Beijing Kewei Clinical Diagnostic Reagent Inc.
Device: Genonto Rapid Test10 COVID-19 IgG/IgM Rapid Test Kit
Date Performed: 2020-08-06
Lot Number: 202004004
Panel: Panel 2
Marketing Status: Should not be distributed -- Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgM | Specificity | 91.2% (73/80) | (83.0%; 95.7%)
IgG | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgG | Specificity | 96.2% (77/80) | (89.5%; 98.7%)
Combined | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
Combined | Specificity | 91.2% (73/80) | (83.0%; 95.7%)
Combined | PPV at prevalence = 5% | 36.0% | (19.6%; 54.6%)
Combined | NPV at prevalence = 5% | 99.6% | (98.7%; 99.9%)

NCI’s Independent Evaluation Report
Data File

#### Biocan Diagnostics Inc Novel Coronavirus (COVID-19) IgG/IgM Antibody Test

Manufacturer: Biocan Diagnostics Inc
Device: Novel Coronavirus (COVID-19) IgG/IgM Antibody Test
Date Performed: 2021-02-23
Lot Number: B251SB150720
Panel: Panel 2
Marketing Status: Should not be distributed – Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 26.7% (8/30) | (14.2%; 44.4%)
IgM | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
IgG | Sensitivity | 83.3% (25/30) | (66.4%; 92.7%)
IgG | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | Sensitivity | 83.3% (25/30) | (66.4%; 92.7%)
Combined | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
Combined | PPV at prevalence = 5% | 63.7% | (28.8%; 87.6%)
Combined | NPV at prevalence = 5% | 99.1% | (98.1%; 99.6%)

NCI’s Independent Evaluation Report
Data File

#### Biocan Diagnostics Inc Novel Coronavirus (COVID-19) IgG/IgM Antibody Test (combined evaluations)

Manufacturer: Biocan Diagnostics Inc
Device: Novel Coronavirus (COVID-19) IgG/IgM Antibody Test (combined evaluations)
Date Performed: 2020-12-01, 2021-02-23
Lot Number: B251SB150720
Panel: Panel 3, Panel 2
Marketing Status: Should not be distributed – Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 50.0% (29/58) | (37.5%; 62.5%)
IgM | Specificity | 95.9% (93/97) | (89.9%; 98.4%)
IgG | Sensitivity | 84.5% (49/58) | (73.1%; 91.6%)
IgG | Specificity | 99.0% (96/97) | (94.4%; 99.8%)
Combined | Sensitivity | 84.5% (49/58) | (73.1%; 91.6%)
Combined | Specificity | 94.8% (92/97) | (88.5%; 97.8%)
Combined | PPV at prevalence = 5% | 46.3% | (25.1%; 68.5%)
Combined | NPV at prevalence = 5% | 99.1% | (98.4%; 99.6%)

NCI’s Independent Evaluation Report
Data File

#### Biocan Diagnostics Inc Tell Me Fast Novel Coronavirus (COVID-19) IgG/IgM Antibody Test

Manufacturer: Biocan Diagnostics Inc
Device: Tell Me Fast Novel Coronavirus (COVID-19) IgG/IgM Antibody Test
Date Performed: 2020-12-01
Lot Number: B251SB150720
Panel: Panel 3
Marketing Status: Should not be distributed – Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 73.3% (22/30) | (55.6%; 85.8%)
IgM | Specificity | 95.0% (76/80) | (87.8%; 98.0%)
IgG | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
Combined | Specificity | 95.0% (76/80) | (87.8%; 98.0%)
Combined | PPV at prevalence = 5% | 47.7% | (23.3%; 71.8%)
Combined | NPV at prevalence = 5% | 99.3% | (98.3%; 99.7%)

NCI’s Independent Evaluation Report
Data File

#### Biolidics Ltd 2019-nCoV IgG/IgM Detection Kit (Colloidal Gold)

Manufacturer: Biolidics Ltd
Device: 2019-nCoV IgG/IgM Detection Kit (Colloidal Gold)
Date Performed: 2020-05-28
Lot Number: V5020041352A
Panel: Panel 2
Marketing Status: Should not be distributed -- Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 33.3% (10/30) | (19.2%; 51.2%)
IgM | Specificity | 97.5% (77/79) | (91.2%; 99.3%)
IgG | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgG | Specificity | 96.2% (76/79) | (89.4%; 98.7%)
Combined | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
Combined | Specificity | 96.2% (76/79) | (89.4%; 98.7%)
Combined | PPV at prevalence = 5% | 57.3% | (29.3%; 80.1%)
Combined | NPV at prevalence = 5% | 99.8% | (99.0%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Biomedomics COVID-19 IgM-IgG Rapid Test kit

Manufacturer: Biomedomics
Device: COVID-19 IgM-IgG Rapid Test kit
Date Performed: 2020-04-21
Lot Number: 51-200404
Panel: Panel 1
Marketing Status: Should not be distributed -- Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
IgM | Specificity | 97.1% (68/70) | (90.2%; 99.2%)
IgG | Sensitivity | 73.3% (22/30) | (55.6%; 85.8%)
IgG | Specificity | 100% (70/70) | (94.8%; 100%)
Combined | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
Combined | Specificity | 97.1% (68/70) | (90.2%; 99.2%)
Combined | PPV at prevalence = 5% | 64.0% | (30.8%; 86.9%)
Combined | NPV at prevalence = 5% | 99.8% | (99.0%; 100%)

NCI’s Independent Evaluation Report
Data File

#### BioMedomics, Inc. BioMedomics COVID-19 IgM-IgG Rapid Test

Manufacturer: BioMedomics, Inc.
Device: BioMedomics COVID-19 IgM-IgG Rapid Test
Date Performed: 2020-06-02
Lot Number: 51-200511
Panel: Panel 2
Marketing Status: Should not be distributed –– No notification or EUA authorization
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
IgM | Specificity | 95.0% (76/80) | (87.8%; 98.0%)
IgG | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgG | Specificity | 96.2% (77/80) | (89.5%; 98.7%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 92.5% (74/80) | (84.6%; 96.5%)
Combined | PPV at prevalence = 5% | 41.2% | (23.2%; 60.2%)
Combined | NPV at prevalence = 5% | 100% | (99.3%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Boditech Med Incorporated iChroma COVID-19 Ab

Manufacturer: Boditech Med Incorporated
Device: iChroma COVID-19 Ab
Date Performed: 2020-08-21
Lot Number: WHQEA88
Panel: Panel 2
Marketing Status: Should not be distributed –– No notification or EUA authorization
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 13.3% (4/30) | (5.3%; 29.7%)
IgM | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
IgG | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgG | Specificity | 96.2% (77/80) | (89.5%; 98.7%)
Combined | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
Combined | Specificity | 95.0% (76/80) | (87.8%; 98.0%)
Combined | PPV at prevalence = 5% | 50.4% | (26.5%; 72.7%)
Combined | NPV at prevalence = 5% | 99.8% | (99.0%; 100%)

NCI's Independent Evaluation Report
Data File

#### BTNX Inc COVID-19 IgG/IgM Test Cassettes (Whole Blood/Serum/Plasma)

Manufacturer: BTNX Inc
Device: COVID-19 IgG/IgM Test Cassettes (Whole Blood/Serum/Plasma)
Date Performed: 2020-06-12
Lot Number: I2004027
Panel: Panel 2
Marketing Status: Should not be distributed – Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgM | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
IgG | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
Combined | PPV at prevalence = 5% | 67.8% | (35.0%; 88.4%)
Combined | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI’s Independent Evaluation Report
Data File

#### BTNX Inc COVID-19 IgG/IgM Test Cassettes (Whole Blood/Serum/Plasma) (combined evaluations)

Manufacturer: BTNX Inc
Device: COVID-19 IgG/IgM Test Cassettes (Whole Blood/Serum/Plasma) (combined evaluations)
Date Performed: 2020-05-08, 2020-06-12
Lot Number: I2004027
Panel: Panel 1, Panel 2
Marketing Status: Should not be distributed – Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 98.0% (49/50) | (89.5%; 99.6%)
IgM | Specificity | 99.1% (116/117) | (95.3%; 99.8%)
IgG | Sensitivity | 92.0% (46/50) | (81.2%; 96.8%)
IgG | Specificity | 100% (117/117) | (96.8%; 100%)
Combined | Sensitivity | 100% (50/50) | (92.9%; 100%)
Combined | Specificity | 99.1% (116/117) | (95.3%; 99.8%)
Combined | PPV at prevalence = 5% | 86.0% | (51.1%; 97.2%)
Combined | NPV at prevalence = 5% | 100% | (99.6%; 100%)

NCI’s Independent Evaluation Report
Data File

#### BTNX, Inc. COVID-19 IgG/IgM Test Cassettes (Whole Blood/Serum/Plasma)

Manufacturer: BTNX, Inc.
Device: COVID-19 IgG/IgM Test Cassettes (Whole Blood/Serum/Plasma)
Date Performed: 2020-05-08
Lot Number: I2004027
Panel: Panel 1
Marketing Status: Should not be distributed – Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgM | Specificity | 100% (70/70) | (94.8%; 100%)
IgG | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
IgG | Specificity | 100% (70/70) | (94.8%; 100%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 100% (70/70) | (94.8%; 100%)
Combined | PPV at prevalence = 5% | 100% | (47.3%; 100%)
Combined | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Cellex, Inc. Cellex qSARs-CoV-2 IgG/IgM Rapid Test

Manufacturer: Cellex, Inc.
Device: Cellex qSARs-CoV-2 IgG/IgM Rapid Test
Date Performed: 2020-05-08
Lot Number: 20200424WI5515C025
Panel: Panel 1
Marketing Status: Should not be distributed – Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 6.7% (2/30) | (1.8%; 21.3%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 76.7% (23/30) | (59.1%; 88.2%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 76.7% (23/30) | (59.1%; 88.2%)
Combined | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | PPV at prevalence = 5% | 100% | (40.4%; 100%)
Combined | NPV at prevalence = 5% | 98.8% | (97.8%; 99.4%)

NCI’s Independent Evaluation Report
Data File

#### Changzhou Confucius Biotechnology Co Ltd COVID-19 IgG/IgM Rapid Test Cassette (WB/S/P)

Manufacturer: Changzhou Confucius Biotechnology Co Ltd
Device: COVID-19 IgG/IgM Rapid Test Cassette (WB/S/P)
Date Performed: 2020-08-10
Lot Number: 20200313
Panel: Panel 2
Marketing Status: Should not be distributed –– No notification or EUA authorization
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 13.3% (4/30) | (5.3%; 29.7%)
IgM | Specificity | 95.0% (76/80) | (87.8%; 98.0%)
IgG | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgG | Specificity | 96.2% (77/80) | (89.5%; 98.7%)
Combined | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
Combined | Specificity | 92.5% (74/80) | (84.6%; 96.5%)
Combined | PPV at prevalence = 5% | 40.4% | (22.2%; 60.0%)
Combined | NPV at prevalence = 5% | 99.8% | (99.0%; 100%)

NCI’s Independent Evaluation Report
Data File

#### ChemBio DPP COVID-19 IgM/IgG System

Manufacturer: ChemBio
Device: DPP COVID-19 IgM/IgG System
Date Performed: 2020-04-21
Lot Number: 204IG001Z
Panel: Panel 1
Marketing Status: Should not be distributed - Removed – EUA Revoked
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 57.1% (16/28) | (39.1%; 73.5%)
IgM | Specificity | 86.2% (69/80) | (77.0%; 92.1%)
IgG | Sensitivity | 78.6% (22/28) | (60.5%; 89.8%)
IgG | Specificity | 91.2% (73/80) | (83.0%; 95.7%)
Combined | Sensitivity | 82.1% (23/28) | (64.4%; 92.1%)
Combined | Specificity | 81.2% (65/80) | (71.3%; 88.3%)
Combined | PPV at prevalence = 5% | 18.7% | (10.6%; 29.3%)
Combined | NPV at prevalence = 5% | 98.9% | (97.4%; 99.5%)

NCI’s Independent Evaluation Report
Data File

#### Chemtron Biotech, Inc. Rapid COVID-19 IgM/IgG Antibody Screen Test

Manufacturer: Chemtron Biotech, Inc.
Device: Rapid COVID-19 IgM/IgG Antibody Screen Test
Date Performed: 2020-05-08
Lot Number: DA05507401
Panel: Panel 1
Marketing Status: Should not be distributed - Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 20.0% (6/30) | (9.5%; 37.3%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 63.3% (19/30) | (45.5%; 78.1%)
IgG | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | Sensitivity | 66.7% (20/30) | (48.8%; 80.8%)
Combined | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | PPV at prevalence = 5% | 73.7% | (27.6%; 95.1%)
Combined | NPV at prevalence = 5% | 98.3% | (97.2%; 99.0%)

NCI’s Independent Evaluation Report
Data File

#### CTK Biotech, Inc. OnSite COVID-19 IgG/IgM Rapid Test

Manufacturer: CTK Biotech, Inc.
Device: OnSite COVID-19 IgG/IgM Rapid Test
Date Performed: 2020-07-21
Lot Number: F0507R1C00
Panel: Panel 2
Marketing Status: Should not be distributed – Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgM | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
IgG | Sensitivity | 73.3% (22/30) | (55.6%; 85.8%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | PPV at prevalence = 5% | 80.8% | (40.9%; 96.0%)
Combined | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Doctorspot Technologies Inc, COVID-19 SARS-CoV-2 IgM/IgG Antibody Rapid Test Kit (Colloidal Gold)

Manufacturer: Doctorspot Technologies Inc.
Device: COVID-19 SARS-CoV-2 IgM/IgG Antibody Rapid Test Kit (Colloidal Gold)
Date Performed: 2020-10-02
Lot Number: S060012010
Panel: Panel 3
Marketing Status: Should not be distributed –– No notification or EUA authorization
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 16.7% (5/30) | (7.3%; 33.6%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 26.7% (8/30) | (14.2%; 44.4%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 33.3% (10/30) | (19.2%; 51.2%)
Combined | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | PPV at prevalence = 5% | 100% | (18.1%; 100%)
Combined | NPV at prevalence = 5% | 96.6% | (95.7%; 97.5%)

NCI's Independent Evaluation Report
Data File

#### EUROIMMUN Medizinische Labordiagnostika AG Anti-SARS-CoV-2-NCP ELISA (IgM)

Manufacturer: EUROIMMUN Medizinische Labordiagnostika AG
Device: Anti-SARS-CoV-2-NCP ELISA (IgM)
Date Performed: 2020-09-18
Lot Number: E200703AO
Panel: Panel 3
Marketing Status: Should not be distributed –– No notification or EUA authorization
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 30.0% (9/30) | (16.7%; 47.9%)
IgM | Specificity | 100% (70/70) | (94.8%; 100%)
IgM | PPV at prevalence = 5% | 100% | (14.4%; 100%)
IgM | NPV at prevalence = 5% | 96.4% | (95.6%; 97.3%)

NCI’s Independent Evaluation Report
Data File

#### Euroimmun SARS-COV-2 ELISA (IgA)

Manufacturer: Euroimmun
Device: SARS-COV-2 ELISA (IgA)
Date Performed: 2020-04-21
Lot Number: E200330AS
Panel: Panel 1
Marketing Status: Should not be distributed - Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgA | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgA | Specificity | 91.2% (73/80) | (83.0%; 95.7%)
IgA | PPV at prevalence = 5% | 36.0% | (19.6%; 54.6%)
IgA | NPV at prevalence = 5% | 99.6% | (98.7%; 99.9%)

NCI's Independent Evaluation Report
Data File

#### GenBody Inc. GenBody COVID-19 IgM/IgG

Manufacturer: GenBody Inc.
Device: GenBody COVID-19 IgM/IgG
Date Performed: 2020-06-11
Lot Number: FJFB30201
Panel: Panel 2
Marketing Status: Should not be distributed - Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 40.0% (12/30) | (24.6%; 57.7%)
IgM | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
IgG | Sensitivity | 56.7% (17/30) | (39.2%; 72.6%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 60.0% (18/30) | (42.3%; 75.4%)
Combined | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | PPV at prevalence = 5% | 71.6% | (24.8%; 94.7%)
Combined | NPV at prevalence = 5% | 97.9% | (96.8%; 98.7%)

NCI’s Independent Evaluation Report
Data File

#### Genobio Pharmaceutical Co. Ltd Virusee® COVID-19 IgM/IgG Lateral Flow Assay

Manufacturer: Genobio Pharmaceutical Co. Ltd
Device: Virusee® COVID-19 IgM/IgG Lateral Flow Assay
Date Performed: 2020-07-09
Lot Number: VMG200331
Panel: Panel 2
Marketing Status: Should not be distributed - Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 56.7% (17/30) | (39.2%; 72.6%)
IgM | Specificity | 76.2% (61/80) | (65.9%; 84.2%)
IgG | Sensitivity | 63.3% (19/30) | (45.5%; 78.1%)
IgG | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | Sensitivity | 80.0% (24/30) | (62.7%; 90.5%)
Combined | Specificity | 76.2% (61/80) | (65.9%; 84.2%)
Combined | PPV at prevalence = 5% | 15.1% | (8.8%; 23.2%)
Combined | NPV at prevalence = 5% | 98.6% | (97.1%; 99.4%)

NCI’s Independent Evaluation Report
Data File

#### GP Getein Biotech, Inc. One Step Test for Novel Coronavirus (2019-nCoV) IgM/IgG antibody (Colloidal Gold)

Manufacturer: GP Getein Biotech, Inc.
Device: One Step Test for Novel Coronavirus (2019-nCoV) IgM/IgG antibody (Colloidal Gold)
Date Performed: 2020-05-08
Lot Number: PGGM20015W
Panel: Panel 1
Marketing Status: Should not be distributed - Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 56.7% (17/30) | (39.2%; 72.6%)
IgM | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
IgG | Sensitivity | 73.3% (22/30) | (55.6%; 85.8%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 76.7% (23/30) | (59.1%; 88.2%)
Combined | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | PPV at prevalence = 5% | 76.3% | (31.6%; 95.5%)
Combined | NPV at prevalence = 5% | 98.8% | (97.7%; 99.4%)

NCI’s Independent Evaluation Report
Data File

#### Guangzhou Fenghua Bioengineering Co., Ltd. SARS-COV-2 IgM/IgG Combo Rapid Test Kit

Manufacturer: Guangzhou Fenghua Bioengineering Co., Ltd.
Device: SARS-COV-2 IgM/IgG Combo Rapid Test Kit
Date Performed: 2020-06-04
Lot Number: 20200508
Panel: Panel 2
Marketing Status: Should not be distributed - Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 70.0% (21/30) | (52.1%; 83.3%)
IgM | Specificity | 65.0% (52/80) | (54.1%; 74.5%)
IgG | Sensitivity | 70.0% (21/30) | (52.1%; 83.3%)
IgG | Specificity | 95.0% (76/80) | (87.8%; 98.0%)
Combined | Sensitivity | 80.0% (24/30) | (62.7%; 90.5%)
Combined | Specificity | 62.5% (50/80) | (51.5%; 72.3%)
Combined | PPV at prevalence = 5% | 10.1% | (6.4%; 14.7%)
Combined | NPV at prevalence = 5% | 98.3% | (96.3%; 99.3%)

NCI’s Independent Evaluation Report
Data File

#### Guangzhou Wondfo Biotech Co., Ltd. COVID-19 One Step, COVID-19 Test (Immunochromatography Assay)

Manufacturer: Guangzhou Wondfo Biotech Co., Ltd.
Device: COVID-19 One Step, COVID-19 Test (Immunochromatography Assay)
Date Performed: 2020-08-06
Lot Number: W19500310
Panel: Panel 2
Marketing Status: Should not be distributed – Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
(IgM / IgG) | Sensitivity | 100% (30/30) | (88.7%; 100%)
(IgM / IgG) | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
(IgM / IgG) | PPV at prevalence = 5% | 80.8% | (40.9%; 96.0%)
(IgM / IgG) | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Guangzhou Wondfo Biotech Co., Ltd. COVID-19 One Step, COVID-19 Test (Immunochromatography Assay) (combined evaluations)

Manufacturer: Guangzhou Wondfo Biotech Co., Ltd.
Device: COVID-19 One Step, COVID-19 Test (Immunochromatography Assay) (combined evaluations)
Date Performed: 2020-04-21, 2020-08-06
Lot Number: W19500328, W19500310
Panel: Panel 1, Panel 2
Marketing Status: Should not be distributed – Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
(IgM / IgG) | Sensitivity | 100% (50/50) | (92.9%; 100%)
(IgM / IgG) | Specificity | 99.2% (126/127) | (95.7%; 99.9%)
(IgM / IgG) | PPV at prevalence = 5% | 87.0% | (53.1%; 97.4%)
(IgM / IgG) | NPV at prevalence = 5% | 100% | (99.6%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Guangzhou Wondfo Biotech Co., Ltd. Wondfo SARS-CoV-2 Antibody Test

Manufacturer: Guangzhou Wondfo Biotech Co., Ltd.
Device: Wondfo SARS-CoV-2 Antibody Test
Date Performed: 2021-06-07
Lot Number: W195100312
Panel: Panel 2
Marketing Status: Should not be distributed – Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
(IgM / IgG) | Sensitivity | 100% (30/30) | (88.7%; 100%)
(IgM / IgG) | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
(IgM / IgG) | PPV at prevalence = 5% | 80.8% | (40.9%; 96.0%)
(IgM / IgG) | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI’s Independent Evaluation Report
Data File

#### H-Guard (China) Co., Ltd. Novel Coronavirus COVID-19 IgM/IgG Test Kit (colloidal gold)

Manufacturer: H-Guard (China) Co., Ltd.
Device: Novel Coronavirus COVID-19 IgM/IgG Test Kit (colloidal gold)
Date Performed: 2020-06-09
Lot Number: 20200406
Panel: Panel 2
Marketing Status: Should not be distributed - Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 53.3% (16/30) | (36.1%; 69.8%)
IgM | Specificity | 96.2% (77/80) | (89.5%; 98.7%)
IgG | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgG | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
Combined | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
Combined | Specificity | 93.8% (75/80) | (86.2%; 97.3%)
Combined | PPV at prevalence = 5% | 44.9% | (24.1%; 66.0%)
Combined | NPV at prevalence = 5% | 99.8% | (99.0%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Hangzhou AllTest Biotech Co. Ltd 2019-nCoV IgG/IgM Rapid Test Cassette(Whole Blood/Serum/Plasma)

Manufacturer: Hangzhou AllTest Biotech Co. Ltd
Device: 2019-nCoV IgG/IgM Rapid Test Cassette(Whole Blood/Serum/Plasma)
Date Performed: 2020-07-09
Lot Number: NCP20050100U
Panel: Panel 2
Marketing Status: Should not be distributed – Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 83.3% (25/30) | (66.4%; 92.7%)
IgM | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
IgG | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgG | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 96.2% (77/80) | (89.5%; 98.7%)
Combined | PPV at prevalence = 5% | 58.4% | (30.9%; 80.4%)
Combined | NPV at prevalence = 5% | 100% | (99.3%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Hangzhou Realy Tech Co., LTD COVID-19 IgG/IgM Rapid Device Test

Manufacturer: Hangzhou Realy Tech Co., LTD
Device: COVID-19 IgG/IgM Rapid Device Test
Date Performed: 2020-06-12
Lot Number: N01G17T
Panel: Panel 2
Marketing Status: Should not be distributed - Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgM | Specificity | 94.9% (75/79) | (87.7%; 98.0%)
IgG | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
IgG | Specificity | 97.5% (77/79) | (91.2%; 99.3%)
Combined | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
Combined | Specificity | 93.7% (74/79) | (86.0%; 97.3%)
Combined | PPV at prevalence = 5% | 44.6% | (23.9%; 65.7%)
Combined | NPV at prevalence = 5% | 99.8% | (99.0%; 100%)

NCI's Independent Evaluation Report
Data File

#### Humasis Co., Ltd. Humasis COVID-19 IgG/IgM Test

Manufacturer: Humasis Co., Ltd.
Device: Humasis COVID-19 IgG/IgM Test
Date Performed: 2021-11-12
Lot Number: SCOVC0011R
Panel: Panel 4
Marketing Status: Should not be distributed – Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
Combined | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | PPV at prevalence = 5% | 100% | (44.7%; 100%)
Combined | NPV at prevalence = 5% | 99.3% | (98.4%; 99.7%)

NCI’s Independent Evaluation Report
Data File

#### InBios International, Inc. InBios SCoV-2 Detect IgM/IgG Rapid Test

Manufacturer: InBios International, Inc.
Device: InBios SCoV-2 Detect IgM/IgG Rapid Test
Date Performed: 2020-10-09 through 2020-10-29
Lot Number: ZH5314
Panel: Panel 3
Marketing Status: Should not be distributed –– No notification or EUA authorization
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 83.3% (25/30) | (66.4%; 92.7%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | PPV at prevalence = 5% | 100% | (50.5%; 100%)
Combined | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Invenio Medical Inc. COVID-19 IgG/IgM Ab Rapid Test

Manufacturer: Invenio Medical Inc.
Device: COVID-19 IgG/IgM Ab Rapid Test
Date Performed: 2020-05-06
Lot Number: COVID20200424
Panel: Panel 1
Marketing Status: Should not be distributed -- Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 76.7% (23/30) | (59.1%; 88.2%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 80.0% (24/30) | (62.7%; 90.5%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 80.0% (24/30) | (62.7%; 90.5%)
Combined | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | PPV at prevalence = 5% | 100% | (41.9%; 100%)
Combined | NPV at prevalence = 5% | 99.0% | (98.0%; 99.5%)

NCI’s Independent Evaluation Report
Data File

#### Jiangsu Dablood Pharmaceutical Co. Ltd COVID-19 IgM/IgG One Step Rapid Test

Manufacturer: Jiangsu Dablood Pharmaceutical Co. Ltd
Device: COVID-19 IgM/IgG One Step Rapid Test
Date Performed: 2020-06-04
Lot Number: NA
Panel: Panel 2
Marketing Status: Should not be distributed - Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgM | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
IgG | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgG | Specificity | 82.5% (66/80) | (72.7%; 89.3%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 81.2% (65/80) | (71.3%; 88.3%)
Combined | PPV at prevalence = 5% | 21.9% | (14.0%; 31.0%)
Combined | NPV at prevalence = 5% | 100% | (99.2%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Jiangsu Superbio Biomedical (Nanjing) Co Ltd SARS-CoV-2 (COVID-19) IgM/IgG Antibody Fast Detection Kit (Colloidal Gold)

Manufacturer: Jiangsu Superbio Biomedical (Nanjing) Co Ltd
Device: SARS-CoV-2 (COVID-19) IgM/IgG Antibody Fast Detection Kit (Colloidal Gold)
Date Performed: 2020-06-23
Lot Number: SYG202027
Panel: Panel 2
Marketing Status: Should not be distributed - Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 40.0% (12/30) | (24.6%; 57.7%)
IgM | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
IgG | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgG | Specificity | 85.0% (68/80) | (75.6%; 91.2%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 83.8% (67/80) | (74.2%; 90.3%)
Combined | PPV at prevalence = 5% | 24.5% | (15.3%; 35.1%)
Combined | NPV at prevalence = 5% | 100% | (99.2%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Liming Bio Strong Step SARS-CoV-2 IgM/IgG Antibody Rapid Test

Manufacturer: Liming Bio
Device: Strong Step SARS-CoV-2 IgM/IgG Antibody Rapid Test
Date Performed: 2020-04-30
Lot Number: 2003024
Panel: Panel 1
Marketing Status: Should not be distributed – Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 6.7% (2/30) | (1.8%; 21.3%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 76.7% (23/30) | (59.1%; 88.2%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 76.7% (23/30) | (59.1%; 88.2%)
Combined | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | PPV at prevalence = 5% | 100% | (40.4%; 100%)
Combined | NPV at prevalence = 5% | 98.8% | (97.8%; 99.4%)

NCI’s Independent Evaluation Report
Data File

#### LumiQuick Diagnostics Quick Profile 2019-nCoV IgG/IgM Test Card

Manufacturer: LumiQuick Diagnostics
Device: Quick Profile 2019-nCoV IgG/IgM Test Card
Date Performed: 2020-06-03
Lot Number: 20042919
Panel: Panel 2
Marketing Status: Should not be distributed - Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
IgM | Specificity | 93.8% (75/80) | (86.2%; 97.3%)
IgG | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgG | Specificity | 96.2% (77/80) | (89.5%; 98.7%)
Combined | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
Combined | Specificity | 90.0% (72/80) | (81.5%; 94.8%)
Combined | PPV at prevalence = 5% | 33.7% | (19.2%; 50.4%)
Combined | NPV at prevalence = 5% | 99.8% | (98.9%; 100%)

NCI’s Independent Evaluation Report
Data File

#### MedMira Inc. REVEALCOVID-19 Total Antibody Test

Manufacturer: MedMira Inc.
Device: REVEALCOVID-19 Total Antibody Test
Date Performed: 2020-11-17
Lot Number: RVE0004-2108
Panel: Panel 3
Marketing Status: Should not be distributed – Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
Pan Ig | Sensitivity | 53.3% (16/30) | (36.1%; 69.8%)
Pan Ig | Specificity | 100% (80/80) | (95.4%; 100%)
Pan Ig | PPV at prevalence = 5% | 100% | (29.3%; 100%)
Pan Ig | NPV at prevalence = 5% | 97.6% | (96.6%; 98.4%)

NCI’s Independent Evaluation Report
Data File

#### MEDsan GmbH MEDsan biological health solutions, MEDsan COVID-19 IgM/IgG Rapid Test

Manufacturer: MEDsan GmbH
Device: MEDsan biological health solutions, MEDsan COVID-19 IgM/IgG Rapid Test
Date Performed: 2020-06-01
Lot Number: NA
Panel: Panel 2
Marketing Status: Should not be distributed –– No notification or EUA authorization
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
IgM | Specificity | 96.2% (77/80) | (89.5%; 98.7%)
IgG | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
IgG | Specificity | 93.8% (75/80) | (86.2%; 97.3%)
Combined | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
Combined | Specificity | 92.5% (74/80) | (84.6%; 96.5%)
Combined | PPV at prevalence = 5% | 38.7% | (20.3%; 59.3%)
Combined | NPV at prevalence = 5% | 99.4% | (98.4%; 99.8%)

NCI’s Independent Evaluation Report
Data File

#### MOKOBIO Biotechnology R&D Center, INC. SARS-CoV-2 IgM & IgG Quantum Dot Immunoassay

Manufacturer: MOKOBIO Biotechnology R&D Center, INC.
Device: SARS-CoV-2 IgM & IgG Quantum Dot Immunoassay
Date Performed: 2020-08-03 through 2020-08-07
Lot Number: 20200324
Panel: Panel 2
Marketing Status: Should not be distributed - Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 66.7% (20/30) | (48.8%; 80.8%)
IgM | Specificity | 91.2% (73/80) | (83.0%; 95.7%)
IgG | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgG | Specificity | 73.8% (59/80) | (63.2%; 82.1%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 72.5% (58/80) | (61.9%; 81.1%)
Combined | PPV at prevalence = 5% | 16.1% | (10.9%; 21.8%)
Combined | NPV at prevalence = 5% | 100% | (99.0%; 100%)

NCI's Independent Evaluation Report
Data File

#### MP Biomedicals Asia Pacific Pte. Ltd. MP Diagnostics Assure SARS-CoV-2 IgG/IgM Rapid Test

Manufacturer: MP Biomedicals Asia Pacific Pte. Ltd.
Device: MP Diagnostics Assure SARS-CoV-2 IgG/IgM Rapid Test
Date Performed: 2020-10-29
Lot Number: DC0005
Panel: Panel 3
Marketing Status: Should not be distributed –– No notification or EUA authorization
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 66.7% (20/30) | (48.8%; 80.8%)
IgM | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
IgG | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgG | Specificity | 91.2% (73/80) | (83.0%; 95.7%)
Combined | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
Combined | Specificity | 88.7% (71/80) | (80.0%; 94.0%)
Combined | PPV at prevalence = 5% | 31.1% | (18.0%; 46.4%)
Combined | NPV at prevalence = 5% | 99.8% | (98.9%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Nanjing Vazyme Medical Technology Co. LTD Vazyme 2019-nCoV IgG/IgM Detection Kit (Colloidal Gold-Based)

Manufacturer: Nanjing Vazyme Medical Technology Co. LTD
Device: Vazyme 2019-nCoV IgG/IgM Detection Kit (Colloidal Gold-Based)
Date Performed: 2020-05-29
Lot Number: 5020042252B
Panel: Panel 2
Marketing Status: Should not be distributed - Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 66.7% (20/30) | (48.8%; 80.8%)
IgM | Specificity | 77.5% (62/80) | (67.2%; 85.3%)
IgG | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgG | Specificity | 90.0% (72/80) | (81.5%; 94.8%)
Combined | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
Combined | Specificity | 68.8% (55/80) | (57.9%; 77.9%)
Combined | PPV at prevalence = 5% | 14.0% | (9.4%; 19.1%)
Combined | NPV at prevalence = 5% | 99.7% | (98.5%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Nantong Egens Biotechnology Co., Ltd. COVID-19 IgG/IgM Rapid Test Kit

Manufacturer: Nantong Egens Biotechnology Co., Ltd.
Device: COVID-19 IgG/IgM Rapid Test Kit
Date Performed: 2020-06-11
Lot Number: 20200325
Panel: Panel 2
Marketing Status: Should not be distributed – Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 73.3% (22/30) | (55.6%; 85.8%)
IgM | Specificity | 50.0% (40/80) | (39.3%; 60.7%)
IgG | Sensitivity | 73.3% (22/30) | (55.6%; 85.8%)
IgG | Specificity | 92.5% (74/80) | (84.6%; 96.5%)
Combined | Sensitivity | 76.7% (23/30) | (59.1%; 88.2%)
Combined | Specificity | 50.0% (40/80) | (39.3%; 60.7%)
Combined | PPV at prevalence = 5% | 7.5% | (4.9%; 10.6%)
Combined | NPV at prevalence = 5% | 97.6% | (94.8%; 99.0%)

NCI’s Independent Evaluation Report
Data File

#### PCL, Inc. PCL COVID19 IgG/IgM Rapid Gold

Manufacturer: PCL, Inc.
Device: PCL COVID19 IgG/IgM Rapid Gold
Date Performed: 2020-06-04
Lot Number: COV03-200325
Panel: Panel 2
Marketing Status: Should not be distributed - Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgM | Specificity | 100% (70/70) | (94.8%; 100%)
IgG | Sensitivity | 80.0% (24/30) | (62.7%; 90.5%)
IgG | Specificity | 100% (70/70) | (94.8%; 100%)
Combined | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
Combined | Specificity | 100% (70/70) | (94.8%; 100%)
Combined | PPV at prevalence = 5% | 100% | (45.7%; 100%)
Combined | NPV at prevalence = 5% | 99.8% | (99.1%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Phamatech COVID19 RAPID TEST

Manufacturer: Phamatech
Device: COVID19 RAPID TEST
Date Performed: 2020-04-21
Lot Number: NCP20030239
Panel: Panel 1
Marketing Status: Should not be distributed - Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 26.7% (8/30) | (14.2%; 44.4%)
IgM | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
IgG | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
IgG | Specificity | 96.2% (77/80) | (89.5%; 98.7%)
Combined | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
Combined | Specificity | 93.8% (75/80) | (86.2%; 97.3%)
Combined | PPV at prevalence = 5% | 42.2% | (21.1%; 64.9%)
Combined | NPV at prevalence = 5% | 99.3% | (98.2%; 99.7%)

NCI’s Independent Evaluation Report
Data File

#### Plexense, Inc. ACCEL ELISA COVID-19

Manufacturer: Plexense, Inc.
Device: ACCEL ELISA COVID-19
Date Performed: 2020-10-09
Lot Number: PXCOV061820
Panel: Panel 3
Marketing Status: Should not be distributed – Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
Pan Ig | Sensitivity | 73.3% (22/30) | (55.6%; 85.8%)
Pan Ig | Specificity | 100% (80/80) | (95.4%; 100%)
Pan Ig | PPV at prevalence = 5% | 100% | (39.0%; 100%)
Pan Ig | NPV at prevalence = 5% | 98.6% | (97.6%; 99.3%)

NCI’s Independent Evaluation Report
Data File

#### Polymedco, Inc. Polystat SARS-CoV-2 Antibody Test

Manufacturer: Polymedco, Inc.
Device: Polystat SARS-CoV-2 Antibody Test
Date Performed: 2020-08-06
Lot Number: 20200303
Panel: Panel 2
Marketing Status: Should not be distributed –– No notification or EUA authorization
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgG | Sensitivity | 60.0% (18/30) | (42.3%; 75.4%)
IgG | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
(IgM / IgA) | Sensitivity | 50.0% (15/30) | (33.2%; 66.8%)
(IgM / IgA) | Specificity | 93.8% (75/80) | (86.2%; 97.3%)
Combined | Sensitivity | 76.7% (23/30) | (59.1%; 88.2%)
Combined | Specificity | 91.2% (73/80) | (83.0%; 95.7%)
Combined | PPV at prevalence = 5% | 31.6% | (15.5%; 51.9%)
Combined | NPV at prevalence = 5% | 98.7% | (97.5%; 99.4%)

NCI’s Independent Evaluation Report
Data File

#### Predictive Laboratories, Inc. Assurance AB COVID-19 IgM/IgG Rapid Antibody Test

Manufacturer: Predictive Laboratories, Inc.
Device: Assurance AB COVID-19 IgM/IgG Rapid Antibody Test
Date Performed: 2020-08-21
Lot Number: 2020AB12
Panel: Panel 2
Marketing Status: Should not be distributed – Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 50.0% (15/30) | (33.2%; 66.8%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
Combined | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | PPV at prevalence = 5% | 100% | (46.1%; 100%)
Combined | NPV at prevalence = 5% | 99.5% | (98.6%; 99.8%)

NCI’s Independent Evaluation Report
Data File

#### RayBiotech Novel Coronavirus (SARS-CoV-2) IgM and IgG Dual Combined Antibody Detection Kit (Colloidal Gold Method)

Manufacturer: RayBiotech
Device: Novel Coronavirus (SARS-CoV-2) IgM and IgG Dual Combined Antibody Detection Kit (Colloidal Gold Method)
Date Performed: 2020-06-01
Lot Number: 0505202977
Panel: Panel 2
Marketing Status: Should not be distributed - Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 60.0% (18/30) | (42.3%; 75.4%)
IgM | Specificity | 57.5% (46/80) | (46.6%; 67.7%)
IgG | Sensitivity | 46.7% (14/30) | (30.2%; 63.9%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 70.0% (21/30) | (52.1%; 83.3%)
Combined | Specificity | 57.5% (46/80) | (46.6%; 67.7%)
Combined | PPV at prevalence = 5% | 8.0% | (4.9%; 12.0%)
Combined | NPV at prevalence = 5% | 97.3% | (94.9%; 98.7%)

NCI’s Independent Evaluation Report
Data File

#### SD BIOSENSOR, Inc. STANDARD Q COVID-19 IgM/IgG Duo

Manufacturer: SD BIOSENSOR, Inc.
Device: STANDARD Q COVID-19 IgM/IgG Duo
Date Performed: 2020-05-06 through 2020-05-13
Lot Number: QC01020007/sub : A-2
Panel: Panel 1
Marketing Status: Should not be distributed - Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 53.3% (16/30) | (36.1%; 69.8%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 73.3% (22/30) | (55.6%; 85.8%)
IgG | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | Sensitivity | 76.7% (23/30) | (59.1%; 88.2%)
Combined | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | PPV at prevalence = 5% | 76.3% | (31.6%; 95.5%)
Combined | NPV at prevalence = 5% | 98.8% | (97.7%; 99.4%)

NCI’s Independent Evaluation Report
Data File

#### Shanghai Fosun Long March Medical Science Co., Ltd. Fosun COVID-19 IgG/IgM Rapid Antibody Detection Kit

Manufacturer: Shanghai Fosun Long March Medical Science Co., Ltd.
Device: Fosun COVID-19 IgG/IgM Rapid Antibody Detection Kit
Date Performed: 2020-05-08
Lot Number: 20200302
Panel: Panel 1
Marketing Status: Should not be distributed - Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 10.0% (3/30) | (3.5%; 25.6%)
IgM | Specificity | 96.2% (77/80) | (89.5%; 98.7%)
IgG | Sensitivity | 36.7% (11/30) | (21.9%; 54.5%)
IgG | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | Sensitivity | 36.7% (11/30) | (21.9%; 54.5%)
Combined | Specificity | 95.0% (76/80) | (87.8%; 98.0%)
Combined | PPV at prevalence = 5% | 27.8% | (8.6%; 59.4%)
Combined | NPV at prevalence = 5% | 96.6% | (95.5%; 97.6%)

NCI’s Independent Evaluation Report
Data File

#### Shenzhen JetMay Care Limited COVID-19 IgM & IgG Test

Manufacturer: Shenzhen JetMay Care Limited
Device: COVID-19 IgM & IgG Test
Date Performed: 2020-09-25
Lot Number: 20200401
Panel: Panel 3
Marketing Status: Should not be distributed - Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 53.3% (16/30) | (36.1%; 69.8%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 56.7% (17/30) | (39.2%; 72.6%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 66.7% (20/30) | (48.8%; 80.8%)
Combined | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | PPV at prevalence = 5% | 100% | (35.9%; 100%)
Combined | NPV at prevalence = 5% | 98.3% | (97.3%; 99.0%)

NCI’s Independent Evaluation Report
Data File

#### Sugentech, Inc. Sugentech SGTi-flex COVID-19 IgM/IgG

Manufacturer: Sugentech, Inc.
Device: Sugentech SGTi-flex COVID-19 IgM/IgG
Date Performed: 2020-05-28
Lot Number: COVT20906
Panel: Panel 2
Marketing Status: Should not be distributed - Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgM | Specificity | 90.0% (72/80) | (81.5%; 94.8%)
IgG | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 90.0% (72/80) | (81.5%; 94.8%)
Combined | PPV at prevalence = 5% | 34.5% | (20.1%; 50.5%)
Combined | NPV at prevalence = 5% | 100% | (99.3%; 100%)

NCI’s Independent Evaluation Report
Data File

#### SurExam Bio-Tech Co. Ltd. Surplex COVID-19 IgM/IgG Rapid Test

Manufacturer: SurExam Bio-Tech Co. Ltd.
Device: Surplex COVID-19 IgM/IgG Rapid Test
Date Performed: 2020-10-21
Lot Number: 20052901
Panel: Panel 3
Marketing Status: Should not be distributed –– No notification or EUA authorization
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 76.7% (23/30) | (59.1%; 88.2%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 76.7% (23/30) | (59.1%; 88.2%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 76.7% (23/30) | (59.1%; 88.2%)
Combined | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | PPV at prevalence = 5% | 100% | (40.4%; 100%)
Combined | NPV at prevalence = 5% | 98.8% | (97.8%; 99.4%)

NCI’s Independent Evaluation Report
Data File

#### Teco Diagnostics Scanwell SARS-CoV-2 IgM & IgG Rapid Test

Manufacturer: Teco Diagnostics
Device: Scanwell SARS-CoV-2 IgM & IgG Rapid Test
Date Performed: 2021-03-22
Lot Number: 20201001
Panel: Panel 2
Marketing Status: Should not be distributed –– No notification or EUA authorization
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 80.0% (24/30) | (62.7%; 90.5%)
IgM | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
IgG | Sensitivity | 83.3% (25/30) | (66.4%; 92.7%)
IgG | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
Combined | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
Combined | PPV at prevalence = 5% | 65.5% | (31.1%; 88.1%)
Combined | NPV at prevalence = 5% | 99.5% | (98.5%; 99.8%)

NCI’s Independent Evaluation Report
Data File

#### Teco Diagnostics Scanwell SARS-CoV-2 IgM & IgG Rapid Test (combined evaluations)

Manufacturer: Teco Diagnostics
Device: Scanwell SARS-CoV-2 IgM & IgG Rapid Test (combined evaluations)
Date Performed: 2021-03-05, 2021-03-22
Lot Number: 20201001
Panel: Panel 3, Panel 2
Marketing Status: Should not be distributed –– No notification or EUA authorization
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 86.2% (50/58) | (75.1%; 92.8%)
IgM | Specificity | 99.0% (96/97) | (94.4%; 99.8%)
IgG | Sensitivity | 84.5% (49/58) | (73.1%; 91.6%)
IgG | Specificity | 99.0% (96/97) | (94.4%; 99.8%)
Combined | Sensitivity | 93.1% (54/58) | (83.6%; 97.3%)
Combined | Specificity | 97.9% (95/97) | (92.8%; 99.4%)
Combined | PPV at prevalence = 5% | 70.4% | (37.9%; 90.0%)
Combined | NPV at prevalence = 5% | 99.6% | (99.1%; 99.9%)

NCI’s Independent Evaluation Report
Data File

#### Teco Diagnostics Scanwell SARS-CoV-2 IgM & IgG Test

Manufacturer: Teco Diagnostics
Device: Scanwell SARS-CoV-2 IgM & IgG Test
Date Performed: 2021-03-05
Lot Number: 20201001
Panel: Panel 3
Marketing Status: Should not be distributed –– No notification or EUA authorization
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
Combined | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | PPV at prevalence = 5% | 100% | (48.9%; 100%)
Combined | NPV at prevalence = 5% | 99.8% | (99.1%; 100%)

NCI’s Independent Evaluation Report
Data File

#### TESTSEALABS SARS-COV-2-IgG/IgM Test Cassette

Manufacturer: TESTSEALABS
Device: SARS-COV-2-IgG/IgM Test Cassette
Date Performed: 2020-04-21
Lot Number: 20200320
Panel: Panel 1
Marketing Status: Should not be distributed - Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 73.3% (22/30) | (55.6%; 85.8%)
IgM | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
IgG | Sensitivity | 40.0% (12/30) | (24.6%; 57.7%)
IgG | Specificity | 93.8% (75/80) | (86.2%; 97.3%)
Combined | Sensitivity | 83.3% (25/30) | (66.4%; 92.7%)
Combined | Specificity | 92.5% (74/80) | (84.6%; 96.5%)
Combined | PPV at prevalence = 5% | 36.9% | (18.5%; 58.3%)
Combined | NPV at prevalence = 5% | 99.1% | (98.0%; 99.6%)

NCI’s Independent Evaluation Report
Data File

#### The Lab-19 COVID-19 IgM/IgG Antibodies Rapid Test

Manufacturer: The Lab-19
Device: COVID-19 IgM/IgG Antibodies Rapid Test
Date Performed: 2020-06-09
Lot Number: 20200301
Panel: Panel 2
Marketing Status: Should not be distributed – No notification or EUA authorization
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | PPV at prevalence = 5% | 100% | (50.5%; 100%)
Combined | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Tianjin Beroni Biotechnology Co., Ltd. SARS-COV-2 IgG/IgM Antibody Detection Kit

Manufacturer: Tianjin Beroni Biotechnology Co., Ltd.
Device: SARS-COV-2 IgG/IgM Antibody Detection Kit
Date Performed: 2020-04-21
Lot Number: 20200405 (Test Strip)
Panel: Panel 1
Marketing Status: Should not be distributed - Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 83.3% (25/30) | (66.4%; 92.7%)
IgM | Specificity | 100% (70/70) | (94.8%; 100%)
IgG | Sensitivity | 30.0% (9/30) | (16.7%; 47.9%)
IgG | Specificity | 100% (70/70) | (94.8%; 100%)
Combined | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
Combined | Specificity | 100% (70/70) | (94.8%; 100%)
Combined | PPV at prevalence = 5% | 100% | (42.9%; 100%)
Combined | NPV at prevalence = 5% | 99.5% | (98.6%; 99.8%)

NCI’s Independent Evaluation Report
Data File

#### Tianjin New Bay Bioresearch C. #1 Quik Pac II COVID-19 IgG & IgM Test

Manufacturer: Tianjin New Bay Bioresearch C. #1
Device: Quik Pac II COVID-19 IgG & IgM Test
Date Performed: 2020-06-10
Lot Number: 2005059
Panel: Panel 2
Marketing Status: Should not be distributed - Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgM | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
IgG | Sensitivity | 73.3% (22/30) | (55.6%; 85.8%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
Combined | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
Combined | PPV at prevalence = 5% | 67.1% | (33.6%; 88.4%)
Combined | NPV at prevalence = 5% | 99.8% | (99.0%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Top Biotech Sdn. Bhd. Top Rapid COVID-19 Rapid Antibody IgG/IgM Test Kit

Manufacturer: Top Biotech Sdn. Bhd.
Device: Top Rapid COVID-19 Rapid Antibody IgG/IgM Test Kit
Date Performed: 2020-09-28 through 2020-10-02
Lot Number: TBCV04007001T
Panel: Panel 3
Marketing Status: Should not be distributed –– No notification or EUA authorization
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgM | Specificity | 90.0% (72/80) | (81.5%; 94.8%)
IgG | Sensitivity | 83.3% (25/30) | (66.4%; 92.7%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 90.0% (72/80) | (81.5%; 94.8%)
Combined | PPV at prevalence = 5% | 34.5% | (20.1%; 50.5%)
Combined | NPV at prevalence = 5% | 100% | (99.3%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Vincitek LLC Vincitek S2-AB Test Card

Manufacturer: Vincitek LLC
Device: Vincitek S2-AB Test Card
Date Performed: 2020-10-29
Lot Number: S2AB200914
Panel: Panel 3
Marketing Status: Should not be distributed –– No notification or EUA authorization
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 53.3% (16/30) | (36.1%; 69.8%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 83.3% (25/30) | (66.4%; 92.7%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 83.3% (25/30) | (66.4%; 92.7%)
Combined | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | PPV at prevalence = 5% | 100% | (43.3%; 100%)
Combined | NPV at prevalence = 5% | 99.1% | (98.2%; 99.6%)

NCI’s Independent Evaluation Report
Data File

#### W.H.P.M, Inc. Covisure Covid-19 IgM/IgG Rapid Test

Manufacturer: W.H.P.M, Inc.
Device: Covisure Covid-19 IgM/IgG Rapid Test
Date Performed: 2020-04-27
Lot Number: P0406203922
Panel: Panel 1
Marketing Status: Should not be distributed - Removed from Notification List
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 76.7% (23/30) | (59.1%; 88.2%)
IgM | Specificity | 97.1% (68/70) | (90.2%; 99.2%)
IgG | Sensitivity | 70.0% (21/30) | (52.1%; 83.3%)
IgG | Specificity | 97.1% (68/70) | (90.2%; 99.2%)
Combined | Sensitivity | 76.7% (23/30) | (59.1%; 88.2%)
Combined | Specificity | 97.1% (68/70) | (90.2%; 99.2%)
Combined | PPV at prevalence = 5% | 58.5% | (24.0%; 85.5%)
Combined | NPV at prevalence = 5% | 98.8% | (97.7%; 99.4%)

NCI’s Independent Evaluation Report
Data File

#### Wondfo SARS-CoV-2 Antibody Test (Lateral Flow Method)

Manufacturer: Wondfo
Device: SARS-CoV-2 Antibody Test (Lateral Flow Method)
Date Performed: 2020-04-21
Lot Number: W19500328
Panel: Panel 1
Marketing Status: Should not be distributed – Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
(IgM / IgG) | Sensitivity | 100% (30/30) | (88.7%; 100%)
(IgM / IgG) | Specificity | 100% (80/80) | (95.4%; 100%)
(IgM / IgG) | PPV at prevalence = 5% | 100% | (50.5%; 100%)
(IgM / IgG) | NPV at prevalence = 5% | 100% | (99.4%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Wuhan Easy Diagnosis Biomedicine Co. Ltd. COVID-19 (SARS-CoV-2) IgM/IgG Antibody Test Kit

Manufacturer: Wuhan Easy Diagnosis Biomedicine Co. Ltd.
Device: COVID-19 (SARS-CoV-2) IgM/IgG Antibody Test Kit
Date Performed: 2020-06-11
Lot Number: 20030401
Panel: Panel 2
Marketing Status: Should not be distributed - Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgM | Specificity | 88.8% (71/80) | (80.0%; 94.0%)
IgG | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgG | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 87.5% (70/80) | (78.5%; 93.1%)
Combined | PPV at prevalence = 5% | 29.6% | (17.8%; 43.2%)
Combined | NPV at prevalence = 5% | 100% | (99.2%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Xiamen AmonMed Biotechnology Co., Ltd COVID-19 IgM/IgG Test Kit (colloidal gold)

Manufacturer: Xiamen AmonMed Biotechnology Co., Ltd
Device: COVID-19 IgM/IgG Test Kit (colloidal gold)
Date Performed: 2020-07-20
Lot Number: 3120200501
Panel: Panel 2
Marketing Status: Should not be distributed – Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 70.0% (21/30) | (52.1%; 83.3%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
IgG | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
Combined | Specificity | 98.8% (79/80) | (93.3%; 99.8%)
Combined | PPV at prevalence = 5% | 79.7% | (38.0%; 95.9%)
Combined | NPV at prevalence = 5% | 99.6% | (98.8%; 99.9%)

NCI’s Independent Evaluation Report
Data File

#### ZEUS Scientific, Inc. ZEUS SARS-CoV-2 IgM/IgG Lateral Flow Immunoassay

Manufacturer: ZEUS Scientific, Inc.
Device: ZEUS SARS-CoV-2 IgM/IgG Lateral Flow Immunoassay
Date Performed: 2020-12-01
Lot Number: 20100474
Panel: Panel 3
Marketing Status: Should not be distributed –– No notification or EUA authorization
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 90.0% (27/30) | (74.4%; 96.5%)
IgM | Specificity | 93.8% (75/80) | (86.2%; 97.3%)
IgG | Sensitivity | 100% (30/30) | (88.7%; 100%)
IgG | Specificity | 96.2% (77/80) | (89.5%; 98.7%)
Combined | Sensitivity | 100% (30/30) | (88.7%; 100%)
Combined | Specificity | 90.0% (72/80) | (81.5%; 94.8%)
Combined | PPV at prevalence = 5% | 34.5% | (20.1%; 50.5%)
Combined | NPV at prevalence = 5% | 100% | (99.3%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Zhongshan Bio-Tech Co LTD SARS-CoV-2 IgM-IgG (GICA)

Manufacturer: Zhongshan Bio-Tech Co LTD
Device: SARS-CoV-2 IgM-IgG (GICA)
Date Performed: 2020-06-03
Lot Number: 2020007
Panel: Panel 2
Marketing Status: Should not be distributed –– No notification or EUA authorization
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 50.0% (15/30) | (33.2%; 66.8%)
IgM | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
IgG | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
IgG | Specificity | 85.0% (68/80) | (75.6%; 91.2%)
Combined | Sensitivity | 96.7% (29/30) | (83.3%; 99.4%)
Combined | Specificity | 83.8% (67/80) | (74.2%; 90.3%)
Combined | PPV at prevalence = 5% | 23.8% | (14.5%; 34.9%)
Combined | NPV at prevalence = 5% | 99.8% | (98.8%; 100%)

NCI’s Independent Evaluation Report
Data File

#### Zhuhai Livzon Diagnostic Inc. IgM/IgG Diagnostic Kit for IgM/IgG Antibody to Coronavirus (SARS-COV-2)

Manufacturer: Zhuhai Livzon Diagnostic Inc.
Device: IgM/IgG Diagnostic Kit for IgM/IgG Antibody to Coronavirus (SARS-COV-2)
Date Performed: 2020-05-06
Lot Number: CK2004240410
Panel: Panel 1
Marketing Status: Should not be distributed - Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
IgM | Specificity | 100% (80/80) | (95.4%; 100%)
IgG | Sensitivity | 63.3% (19/30) | (45.5%; 78.1%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 93.3% (28/30) | (78.7%; 98.2%)
Combined | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | PPV at prevalence = 5% | 100% | (47.4%; 100%)
Combined | NPV at prevalence = 5% | 99.7% | (98.8%; 99.9%)

NCI’s Independent Evaluation Report
Data File

#### Zhuhai Livzon Diagnostics Inc Livzon IgM/IgG Diagnostic Kit for IgM/IgG Antibody to Coronovirus (SARS-Cov-2) Lateral Flow

Manufacturer: Zhuhai Livzon Diagnostics Inc
Device: Livzon IgM/IgG Diagnostic Kit for IgM/IgG Antibody to Coronovirus (SARS-Cov-2) Lateral Flow
Date Performed: 2020-06-03
Lot Number: CK2004350410
Panel: Panel 2
Marketing Status: Should not be distributed - Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
IgM | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
IgG | Sensitivity | 66.7% (20/30) | (48.8%; 80.8%)
IgG | Specificity | 100% (80/80) | (95.4%; 100%)
Combined | Sensitivity | 86.7% (26/30) | (70.3%; 94.7%)
Combined | Specificity | 97.5% (78/80) | (91.3%; 99.3%)
Combined | PPV at prevalence = 5% | 64.6% | (29.9%; 87.9%)
Combined | NPV at prevalence = 5% | 99.3% | (98.3%; 99.7%)

NCI’s Independent Evaluation Report
Data File

#### Zhuhai Livzon Diagnostics Inc Livzon IgM/IgG Diagnostic Kit for IgM/IgG Antibody to Coronovirus (SARS-Cov-2) Lateral Flow (combined evaluations)

Manufacturer: Zhuhai Livzon Diagnostics Inc
Device: Livzon IgM/IgG Diagnostic Kit for IgM/IgG Antibody to Coronovirus (SARS-Cov-2) Lateral Flow (combined evaluations)
Date Performed: 2020-05-06, 2020-06-03
Lot Number: CK2004240410, CK2004350410
Panel: Panel 1, Panel 2
Marketing Status: Should not be distributed - Voluntarily withdrawn
Antibody | Performance Measure | Estimate of Performance | 95% Confidence Interval
IgM | Sensitivity | 88.0% (44/50) | (76.2%; 94.4%)
IgM | Specificity | 98.4% (125/127) | (94.4%; 99.6%)
IgG | Sensitivity | 64.0% (32/50) | (50.1%; 75.9%)
IgG | Specificity | 100% (127/127) | (97.1%; 100%)
Combined | Sensitivity | 88.0% (44/50) | (76.2%; 94.4%)
Combined | Specificity | 98.4% (125/127) | (94.4%; 99.6%)
Combined | PPV at prevalence = 5% | 74.6% | (41.9%; 92.0%)
Combined | NPV at prevalence = 5% | 99.4% | (98.7%; 99.7%)

NCI's Independent Evaluation Report
Data File

## Learn more

General information: Learn more about EUA Authorized Serology Test Performance
