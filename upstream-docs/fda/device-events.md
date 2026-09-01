# Device Events

Source: https://open.fda.gov/apis/device/event/

---

## Device Adverse Event Overview

The U.S. Food and Drug Administration (FDA) regulates medical devices in the United States. Medical devices range from simple tongue depressors and bedpans to complex programmable pacemakers and laser surgical devices. In addition, medical devices include in vitro diagnostic products, such as general purpose lab equipment, reagents, and test kits, which may include monoclonal antibody technology. Certain electronic radiation emitting products with medical application and claims meet the definition of medical device. Examples include diagnostic ultrasound products, x-ray machines, and medical lasers.
An adverse event report is submitted to the FDA to report serious events or undesirable experiences associated with the use of a medical device.

### Important Update as of 10/20/22

Two data elements have been added to the UDI endpoint in openFDA: UDI-DI and UDI-Public.
UDI-Public is a redacted version of an identifier provided in MDR reports. Not all MDRs provide UDI data, and the current data is not validated.
Amount of Usage

### Key Facts

- Source of the data:
Manufacturer and User Facility Device Experience (MAUDE)

- Changes to the source data:
openFDA annotates the original records with special fields and converts the data into JSON, which is a widely used machine readable format.

- Time period covered in this API:
2009 to null

- Frequency of API updates:
Weekly

### About MAUDE data

The openFDA device adverse event API returns data from Manufacturer and User Facility Device Experience (MAUDE), an FDA dataset that contains medical device adverse event reports submitted by mandatory reporters—manufacturers, importers and device user facilities—and voluntary reporters such as health care professionals, patients, and consumers. Currently, this data covers publically releasable records submitted to the FDA from about 1992 to the present. The data is updated weekly.
Each year, the FDA receives several hundred thousand medical device reports (MDRs) of suspected device-associated deaths, serious injuries and malfunctions. The FDA uses MDRs to monitor device performance, detect potential device-related safety issues, and contribute to benefit-risk assessments of these products. The MAUDE database houses MDRs submitted to the FDA by mandatory reporters (manufacturers, importers and device user facilities) and by voluntary reporters (such as health care professionals, patients, and consumers).
Although MDRs are a valuable source of information, this passive surveillance system has limitations, including the potential submission of incomplete, inaccurate, untimely, unverified, or biased data. In addition, the incidence or prevalence of an event cannot be determined from this reporting system alone due to potential under-reporting of events and lack of information about frequency of device use. Because of this, MDRs comprise only one of the FDA’s several important postmarket surveillance data sources.
See the [MAUDE dataset page](/data/maude/) for more details.

### How adverse events are collected

Adverse events are collected through a series of safety reports. Each is identified by a 8-digit string (for instance, 6176304-1). The first 7 digits (before the hyphen) identify the individual report, and the last digit (after the hyphen) is a checksum. Rather than updating individual records in FAERS, subsequent updates are submitted in seperate reports.

### How records are organized

Device adverse event reports vary significantly, depending on who initially reported the event, what kind of event was reported, and whether there were follow-up reports. Some reports come directly from user facilities (like hospitals) or device importers (distributors), while others come directly from manufacturers. Some involve adverse reactions in patients, while others are reports of defects that did not result in such adverse reactions.
Records served by the openFDA device adverse events endpoint loosely reflect field organization found in the forms used by manufacturers and members of the public to report these events. Since reports may come from manufacturers, user facilities, distributors, and voluntary sources (such as patients and physicians) who are subject to different reporting requirements, the collected data in the adverse event system may not always capture every field and should not be interpreted as incomplete.

### Responsible use of the data

Adverse event reports submitted to FDA do not undergo extensive validation or verification. Therefore, a causal relationship cannot be established between product and reactions listed in a report. While a suspected relationship may exist, it is not medically validated and should not be the sole source of information for clinical decision making or other assumptions about the safety or efficacy of a product.
Additionally, it is important to remember that adverse event reports represent a small percentage of total usage numbers of a product. Common products may have a higher number of adverse events due to the higher total number of people using the product. In recent years the FDA has undertaken efforts to increase collection of adverse events. Increases in the total number of adverse events is likely caused by improved reporting.

### Disclaimer

Although MDRs are a valuable source of information, this passive surveillance system has limitations, including the potential submission of incomplete, inaccurate, untimely, unverified, or biased data. In addition, the incidence or prevalence of an event cannot be determined from this reporting system alone due to potential under-reporting of events and lack of information about frequency of device use. Because of this, MDRs comprise only one of the FDA's several important postmarket surveillance data sources.
