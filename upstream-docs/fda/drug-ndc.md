# Drug NDC

Source: https://open.fda.gov/apis/drug/ndc/

---

## Drug NDC Overview

The Drug Listing Act of 1972 requires registered drug establishments to provide the Food and Drug Administration (FDA) with a current list of all drugs manufactured, prepared, propagated, compounded, or processed by it for commercial distribution.
The openFDA drug NDC Directory endpoint returns data from the NDC Directory, a database that contains information on the National Drug Code (NDC). FDA publishes the listed NDC numbers and the information submitted as part of the listing information in the NDC Directory which is updated daily.
The information submitted as part of the listing process, the NDC number, and the NDC Directory are used in the implementation and enforcement of the Act.
If you experience any issues accessing the data or issues related to data accuracy, please report your concerns via the CDER Contact form.

### Key Facts

- Source of the data:
NDC Directory

- Changes to the source data:
openFDA annotates the original records with special fields and converts the data into JSON, which is a widely used machine readable format.

- Time period covered in this API:
Last updated on null

- Frequency of API updates:
Daily

### Fields Harmonization

Different datasets use different unique identifiers, which can make it difficult to find the same drug in each dataset.
openFDA features harmonization on specific identifiers to make it easier to both search for and understand the drug products returned by API queries. These additional fields are attached to records in all categories, if applicable.
Review the chart below to better understand which fields are harmonized.

### Additional Information About Drug NDC Directory

To read more about Drug NDC Directory, please visit:

- NDC Directory data definitions and download page

### Responsible use of the data

Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API in line with our Terms of Service

### Disclaimer

Please be aware of the following when using information from this endpoint:
The NDC Directory contains ONLY information on final marketed drugs submitted to FDA in SPL electronic listing files by labelers. (A labeler may be either a manufacturer, including a repackager or relabeler, or, for drugs subject to private labeling arrangements, the entity under whose own label or trade name the product will be distributed.) Inclusion of information in the NDC Directory does not indicate that FDA has verified the information provided. The content of each NDC Directory entry is the responsibility of the labeler submitting the SPL file.
Assignment of an NDC number does not in any way denote FDA approval of the product. Any representation that creates an impression of official approval because of possession of an NDC number is misleading and constitutes misbranding. (21 CFR 207.37 (a)(2))
Neither inclusion in the NDC Directory nor assignment of an NDC number is a determination that a product is a drug as defined by the FD&C Act, nor does either denote that a product is covered or eligible for reimbursement by Medicare, Medicaid or other payers. Assignment of NDC number to non-drug products is extremely prohibited.
