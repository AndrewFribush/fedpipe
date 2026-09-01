# Device Classification

Source: https://open.fda.gov/apis/device/classification/

---

## Device Classification Overview

Most medical devices can be classified by finding the matching description of the device in Title 21 of the Code of Federal Regulations (CFR), Parts 862-892.
The Food and Drug Administration (FDA) has established classifications for approximately 1,700 different generic types of devices and grouped them into 16 medical specialties referred to as panels. Each of these generic types of devices is assigned to one of three regulatory classes based on the level of control necessary to assure the safety and effectiveness of the device.
The openFDA Device Classification API contains medical device names, their associated product codes, their medical specialty areas (panels) and their classification. The name and product code identify the generic category of a device for FDA. The product code assigned to a device is based upon the medical device product classification designated under 21 CFR Parts 862-892.
For additional information, see here.

### Key Facts

- Source of the data:
Product Classification Database

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

### Disclaimer

This data should not be used as a method to collect data to issue alerts to the public, nor should it be used to track the lifecycle of a recall. FDA seeks publicity about a recall only when it believes the public needs to be alerted to a serious hazard. FDA works with industry and our state partners to publish press releases and other public notices about recalls that may potentially present a significant or serious risk to the consumer or user of the product. Subscribe to this Recall/Safety Alert feed here.
Further, FDA does not update the status of a recall after the recall has been classified according to its level of hazard. As such, the status of a recall (open, completed, or terminated) will remain unchanged after published in the Enforcement Reports.
