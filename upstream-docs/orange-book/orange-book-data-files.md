# Orange Book data files

Source: https://www.fda.gov/drugs/drug-approvals-and-databases/orange-book-data-files

---

Orange Book Data Files | FDA

- Skip to main content

- Skip to FDA Search

- Skip to in this section menu

- Skip to footer links

Home

Drugs

Development & Approval Process | Drugs

Drug Approvals and Databases

Orange Book Data Files

Drug Approvals and Databases

In this section

Downloadable Data Files for the Orange Book

- The compressed (.ZIP) data file unzips into three files, whose field descriptions appear below. All three files are in ASCII text, tilde (~) delimited format.
OpenFDA

- Orange Book API Search and download Orange Book data programmatically. Data are available in JSON format and updated monthly.
The Orange Book Appendices are available in PDF format:

- Appendix A: Product Name Index
- Appendix B: Product Name Sorted by Applicant
- Appendix C: Uniform Terms
Additional Orange Book Publications and Resources

- Orange Book Search
You can search by active ingredient, proprietary name, applicant, or application number.
- Orange Book Home
Additional information, help, and background information for the Orange Book

### Data Descriptions

1. Products.txt

- Ingredient
The active ingredient(s) for the product. Multiple ingredients are in alphabetical order, separated by a semicolon.
- Dosage form; Route of Administration
The product dosage form and route separated by a semi-colon. The format is not all uppercase.
- Trade Name
The trade name of the product as shown on the labeling.
- Applicant
The firm name holding legal responsibility for the new drug application. The firm name is condensed to a maximum twenty character unique string.
- Strength
The potency of the active ingredient. May repeat for multiple part products.
- New Drug Application Type
The type of new drug application approval. New Drug Applications (NDA or innovator) are ”N”. Abbreviated New Drug Applications (ANDA or generic) are “A”.
- New Drug Application (NDA) Number
The FDA assigned number to the application. Format is nnnnnn.
- Product Number
The FDA assigned number to identify the application products. Each strength is a separate product. May repeat for multiple part products. Format is nnn.
- Therapeutic Equivalence (TE) Code
The TE Code indicates the therapeutic equivalence rating of generic to innovator Rx products.
- Approval Date
- The date the product was approved as stated in the FDA approval letter to the applicant. The format is Mmm dd, yyyy. Products approved prior to the January 1, 1982 contain the phrase: "Approved prior to Jan 1, 1982".
- Reference Listed Drug (RLD)
The RLD is a drug product approved under section 505(c) of the FD&C Act for which FDA has made a finding of safety and effectiveness. In the electronic Orange Book, an RLD is identified by “RLD” in the RLD column.
- Reference Standard (RS)
A “reference standard” is the drug product selected by FDA that an applicant seeking approval of an ANDA must use in conducting an in vivo bioequivalence study required for approval of an ANDA. In the electronic Orange Book, a reference standard is identified by “RS” in the RS column.
- Type
The group or category of approved drugs. Format is RX, OTC, DISCN.
- Applicant Full Name
The full name of the firm holding legal responsibility for the new drug application.
2. Patent.txt

- New Drug Application Type
The type of new drug application approval. New Drug Applications (NDA or innovator) are ”N”. Abbreviated New Drug Applications (ANDA or generic) are “A”.
- New Drug Application (NDA) Number
The FDA assigned number to the application. Format is nnnnnn.
- Product Number
The FDA assigned number to identify the application products. Each strength is a separate product. May repeat for multiple part products. Format is nnn.
- Patent Number
Patent numbers as submitted by the applicant holder for patents covered by the statutory provisions. May repeat for multiple applications and multiple products. Includes pediatric exclusivity granted by the agency. Format is nnnnnnnnnnn.
- Patent Expire Date
The date the patent expires as submitted by the applicant holder including applicable extensions. The format is MMM DD, YYYY.
- Drug Substance Flag
Patents submitted on FDA Form 3542 and listed after August 18, 2003 may have a drug substance flag indicating the sponsor submitted the patent as claiming the drug substance. Format is Y or null.
- Drug Product Flag
Patents submitted on FDA Form 3542 and listed after August 18, 2003 may have a drug product flag indicating the sponsor submitted the patent as claiming the drug product. Format is Y or null.
- Patent Use Code
Code to designate a use patent that covers the approved indication or use of a drug product. May repeat for multiple applications, multiple products and multiple patents. Format is nnnnnnnnnn.
- Patent Delist Request Flag
Sponsor has requested patent be delisted. This patent has remained listed because, under Section 505(j)(5)(D)(i) of the Act, a first applicant may retain eligibility for 180-day exclusivity based on a paragraph IV certification to this patent for a certain period. Applicants under Section 505(b)(2) are not required to certify to patents where this flag is set to Y. Format is Y or null.
- Patent Submission Date
The date on which the FDA receives patent information from the new drug application (NDA) holder. Format is Mmm d, yyyy
3. Exclusivity.txt

- New Drug Application Type
The type of new drug application approval. New Drug Applications (NDA or innovator) are ”N”. Abbreviated New Drug Applications (ANDA or generic) are “A”.
- New Drug Application (NDA) Number
The FDA assigned number to the application. Format is nnnnnn.
- Product Number
The FDA assigned number to identify the application products. Each strength is a separate product. May repeat for multiple part products. Format is nnn.
- Exclusivity Code
Code to designate exclusivity granted by the FDA to a drug product. Format is nnnnnnnnnn.
- Exclusivity Date
The date the exclusivity expires. Format is MMM DD, YYYY.

## Content current as of:

08/18/2026

## Regulated Product(s)

- Drugs

Feedback

Back to Top
