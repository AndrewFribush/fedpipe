# Drug Labels

Source: https://open.fda.gov/apis/drug/label/

---

## Drug Labeling Overview

Drug manufacturers and distributors submit documentation about their products to FDA in the Structured Product Labeling (SPL) format. The openFDA drug product labeling API returns data from this dataset.
The labeling is a 'living document' that changes over time to reflect increased knowledge about the safety and effectiveness of the drug.
The openFDA drug product labels API returns data from these submissions for both prescription and over-the-counter (OTC) drugs. The labels are broken into sections, such as indications for use (prescription drugs) or purpose (OTC drugs), adverse reactions, and so forth. There is considerable variation between drug products in terms of these sections and their contents, since the information required for safe and effective use varies with the unique characteristics of each drug product.
To read more about Structured Product Labeling, please visit the FDA’s SPL Resources page.
Route

### Key Facts

- Source of the data:
FDA SPL files

- Changes to the source data:
openFDA annotates the original records with special fields and converts the data into JSON, which is a widely used machine readable format.

- Time period covered in this API:
The bulk of the data is from June 2009 (when labeling was first posted publicly in the SPL format) to the present. However, there are a small number of records from earlier than mid-2009. The last update was on null

- Frequency of API updates:
Weekly

### Fields Harmonization

Different datasets use different unique identifiers, which can make it difficult to find the same drug in each dataset.
openFDA features harmonization on specific identifiers to make it easier to both search for and understand the drug products returned by API queries. These additional fields are attached to records in all categories, if applicable.
Review the chart below to better understand which fields are harmonized.

### Responsible use of the data

Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API in line with our Terms of Service.

### Disclaimer

Please be aware of the following when using information from this API:
The drug labels and other drug-specific information provided in this API represent the most recent drug listing information companies have submitted to the Food and Drug Administration (FDA). (See 21 CFR part 207.) The drug labeling and other information has been reformatted to make it easier to read but its content has neither been altered nor verified by FDA. The drug labeling provided in this API may not be the labeling on currently distributed products or identical to the labeling that is approved. Most OTC drugs are not reviewed and approved by FDA; however, they may be marketed if they comply with applicable regulations and policies described in monographs. Drugs marked 'OTC monograph final' or 'OTC monograph not final' are not checked for conformance to the monograph. Drugs marked 'unapproved medical gas', 'unapproved homeopathic' or 'unapproved drug other' have not been evaluated by FDA for safety and efficacy and their labeling has not been approved. In addition, FDA is not aware of scientific evidence to support homeopathy as effective.
