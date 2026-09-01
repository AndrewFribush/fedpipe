# Device 510(k)

Source: https://open.fda.gov/apis/device/510k/

---

## Device 510(k) Overview

A 510(k) is a premarket submission made to FDA to demonstrate that the device to be marketed is at least as safe and effective, that is, substantially equivalent, to a legally marketed device (21 CFR 807.92(a)(3)) that is not subject to PMA. Submitters must compare their device to one or more similar legally marketed devices and make and support their substantial equivalency claims. A legally marketed device, as described in 21 CFR 807.92(a)(3), is a device that was legally marketed prior to May 28, 1976 (preamendments device), for which a PMA is not required, or a device which has been reclassified from Class III to Class II or I, or a device which has been found substantially equivalent through the 510(k) process. The legally marketed device(s) to which equivalence is drawn is commonly known as the “predicate".
The openFDA Device 510(k) Clearances API contains details about specific products and the original sponsors of premarket notification applications. It also contains administrative and tracking information about the applications and receipt and decision dates.
For additional information, please visit the FDA's Premarket Notification 510(k) page.
Advisory Committee

### Key Facts

- Source of the data:
510(k) Clearances

- Changes to the source data:
openFDA annotates the original records with special fields and converts the data into JSON, which is a widely used machine readable format.

- Time period covered in this API:
1976 to null

- Frequency of API updates:
Monthly

### Fields Harmonization

Different datasets use different unique identifiers, which can make it difficult to find the same device in each dataset.
openFDA features harmonization on specific identifiers to make it easier to both search for and understand the drug products returned by API queries. These additional fields are attached to records in all categories, if applicable.
Review the chart below to better understand which fields are harmonized.

### Responsible use of the data

Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API in line with our Terms of Service
