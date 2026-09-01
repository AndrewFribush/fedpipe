# API Documentation

Source: https://www.justice.gov/developer/api-documentation/api_v1

---

Department of Justice | Version api_v1

Skip to main content

Official websites use .gov

A .gov website belongs to an official government organization in the United States.

Secure .gov websites use HTTPS

A lock (

) or https:// means you’ve safely connected to the .gov website. Share sensitive information only on official, secure websites.

Search

Menu
Close

Search

#
Version api_v1

Share

Facebook

X

LinkedIn

Email

## API Overview

The base URL for all API resources described below is: http://www.justice.gov

#### Fields and Parameters

You may specify which fields the API should return in the response. If you do not specify any fields, all fields will be returned by default.
The unique identifier field is named "uuid".
You may filter press releases by title and date, using the following format as a URL argument:
/api/v1/press_releases.json?parameters[date]=1231243200
/api/v1/press_releases.json?parameters[title]="Chicago"

#### Page Limits and Rate Limits

The default number of results is 20. This can be changed with "pagesize=50" as a URL argument. There is a maximum limit of 50 results per request. If you request a pagesize that is larger than 50, you will receive a response with no more than 50 results. Developers leveraging this API should keep the stability of the API and their own applications in mind. Individual users issuing more than 4 requests per second will experience degraded performance and may be blocked entirely.
Pages after the first set can be retrieved with a URL argument of "page=N", such as:
/api/v1/press_releases.json?parameters[title]="Chicago"&page=2

## Resources

- GET /api/v1/blog_entries.json
- GET /api/v1/blog_entries/[uuid].json
- GET /api/v1/press_releases.json
- GET /api/v1/press_releases/[uuid].json

## blog_entries

#### GET /api/v1/blog_entries/[uuid].json

Provides information on a specific blog entry

##### Arguments

- string fields GET(optional)
- A comma-separated list of fields is needed.

##### Request Example

/api/v1/blog_entries/52f344c4-1ab8-48b5-a130-711e6a6f311d.json?fields=title,url,uuid

##### Response Example

{
"metadata": {
"responseInfo": {
"status": 200
},
"resultset": {
"count": "1",
"pagesize": 20,
"page": 0
},
"executionTime": 0.0100619792938232
},
"results": [
{
"title": "Celebrating the History &amp; Legacy of the Civil Rights Division",
"url": "https://justice.gov/archives/opa/blog/celebrating-history-legacy-civil-rights-division",
"uuid": "52f344c4-1ab8-48b5-a130-711e6a6f311d"
}
]
}

#### GET /api/v1/blog_entries.json

Provides a list of all blog entries

##### Arguments

- string fields GET(optional)
- A comma separated list of fields to get.
- int page GET(optional)
- The zero-based index of the page to get, defaults to 0.
- int pagesize GET(optional)
- Number of records to get per page.
- string sort GET(optional)
- Field to sort by, example "changed", "created", or "date".
- string direction GET(optional)
- Direction of the sort. ASC or DESC.

##### Request Example

/api/v1/blog_entries.json?sort=created&direction=DESC&pagesize=2&page=2

##### Response Example

{
"metadata": {
"responseInfo": {
"status": 200
},
"resultset": {
"count": "3215",
"pagesize": "2",
"page": 2
},
"executionTime": 0.0413501262664795
},
"results": [
{
"attachments":" ",
"body": "Technology is growing ever more indispensable to many aspects of modern life. Consequently, ensuring that Technology does not create new barriers for people with disabilities, and that disabled people can fully access and benefit from Technology, is becoming increasingly important to securing the promise of equal opportunity under the Americans with Disabilities Act (ADA). This includes the technologies deployed by employers, state and local government services such as public schools, voting systems, public transit systems, and places of public accommodation such as doctors' offices and private colleges. As the ADA reaches its 34th anniversary this month, the Justice Department's Civil Rights Division and the Equal Employment Opportunity Commission (EEOC) are working closely with one another to prioritize issues of technological equity, inclusion, and accessibility through a multi-pronged approach.\n\nOur agencies have engaged in rulemaking as well as enforcement in this area. Earlier this year, the department finalized regulations on the Accessibility of Web Information and Services of State and Local Government Entities, establishing a technical standard for the accessibility of web content and mobile apps provided or made available by entities covered by Title II of the ADA. The Justice Department recently reached agreements under Title II of the ADA to ensure that four counties in Texas have accessible election websites and that an Oklahoma state agency's mobile applications are accessible to people with disabilities. Employers (covered by Title I of the ADA) and places of public accommodation (covered by Title III of the ADA) also have to make information they present online accessible to people with disabilities, including people who use assistive Technology. For example, the department recently reached a settlement with a health clinic in Springfield, Illinois, under which the clinic agreed to make its website, patient portal, and mobile applications accessible to people with disabilities, as required by Title III of the ADA. Employers who do not allow disabled people to use assistive Technology (whether provided by the employer or someone else) that they need to apply for a job, perform a job or enjoy equal terms, conditions or privileges of employment, even if the employer must consider making other modifications to workplace systems to accommodate that assistive Technology, may face legal action, as evidenced by two recent lawsuits filed by the EEOC in Maryland and North Carolina.\n\nWhen applied to Technology, the ADA's equal-opportunity mandate goes beyond making sure that information provided through electronic means is as readily accessible to people with disabilities as it is to those without disabilities. It also means ensuring that software and other information technology deployed by employers to aid in the hiring process or to monitor and rate employee performance does not screen out qualified applicants or employees with disabilities or otherwise discriminate against them in violation of Title I of the ADA. The EEOC and Justice Department have both recently published technical assistance documents explaining how some of these popular software tools, such as interview chatbots, keystroke trackers, and algorithms that analyze voice patterns, personality traits, or work history, can disadvantage disabled people and how employers can take proactive steps to guard against such algorithmic discrimination. The EEOC has also published an ASL video on this topic and a list of tips for employees and applicants.\n\nTechnology continues to evolve at the speed of human ingenuity, which means that the broad antidiscrimination mandates of the ADA must continually be applied to new situations. Fortunately, Technology offers many innovative tools to make life more accessible and eliminate barriers to equal opportunity. Some of these technological tools are described in the EEOC's recent technical assistance documents regarding the rights of people with hearing and visual disabilities in the workplace, and further information about assistive Technology and other accommodations in the workplace is available through the Job Accommodation Network. But where technology risks creating or perpetuating barriers rather than removing them, the EEOC and the Justice Department stand ready to use the legal tools at our disposal to defend and advance the rights of people with disabilities in the digital age.\n",
"changed": "\u003Ctime datetime=\"2024-07-26T14:07:09+00:00\"\u003E1722002829\u003C/time\u003E\n",
"component": [
{
"uuid": "da7df438-b3e4-4b73-9250-9974ae754efc",
"name": "Civil Rights Division"
}
],
"created": "\u003Ctime datetime=\"2024-07-26T12:58:36+00:00\"\u003E1721998716\u003C/time\u003E\n",
"date": "1721995200",
"image":" ",
"teaser": "\u003Cp\u003ETechnology is growing ever more indispensable to many aspects of modern life. Consequently, ensuring that Technology does not create new barriers for people with disabilities, and that disabled people can fully access and benefit from Technology, is becoming increasingly important to securing the promise of equal opportunity under the Americans with Disabilities Act (ADA). This includes the technologies deployed by employers, state and local government services such as public schools, voting systems, public transit systems, and places of public accommodation such as doctors' offices and private colleges. As the ADA reaches its 34th anniversary this month, the Justice Department's Civil Rights Division and the Equal Employment Opportunity Commission (EEOC) are working closely with one another to prioritize issues of technological equity, inclusion, and accessibility through a multi-pronged approach.\u003C/p\u003E\n",
"title": "On Anniversary of the Americans with Disabilities Act, Justice Department and Equal Employment Opportunity Commission Affirm Commitment to Technological Equity for People with Disabilities",
"topic": "\u003Ca href=\"/taxonomy/term/25316\" hreflang=\"en\"\u003ECivil Rights\u003C/a\u003E, \u003Ca href=\"/taxonomy/term/43866\" hreflang=\"en\"\u003EDisability Rights\u003C/a\u003E",
"url": "https://justice.gov/opa/blog/anniversary-americans-disabilities-act-justice-department-and-equal-employment-opportunity",
"uuid": "e7004df7-c5d9-4b5d-bb83-e22b54d6495d"
},
{
"attachments":" ",
"body": "The Justice Department's Environment and Natural Resources Division (ENRD) recently partnered with the Environmental Protection Agency (EPA) to host a workshop to enhance coordination in addressing environmental crime and examine improved enforcement techniques. Individuals from the FBI, Homeland Security Investigations (HSI), and the U.S. Coast Guard – as well as representatives of Europol and the governments of Scotland, Canada, and Mexico – also attended the workshop.\n\n\n\n\n\n \n \n \n\n\n\n \n\n\n \n\nENRD Environmental Crimes Section (ECS) Deputy Chief Joseph Poux (left) walks to the workshop.\n\n\n\nChapter 24 of the United States-Mexico-Canada Agreement (USMCA) – entered into in 2020 – outlines seven multilateral environmental agreements, including to combat wildlife and fauna trafficking and to address air quality and ocean pollution. The workshop focused on pollution and waste crimes.\n\n\n\n\n\n \n \n \n\n\n\n \n\n\n \n\nENRD Deputy Assistant Attorney General Seth Barsky addresses the workshop.\n\n\n\nSpeakers highlighted the increased importance of enforcing environmental laws and international agreements in light of climate change and its devastating and increasingly apparent effects around the globe. Investigating and prosecuting environmental crime can be challenging because of the intersection of complex white-collar crime, financial structures, and technical and scientific issues.\n\nAgainst this background, the workshop expanded on new enforcement techniques, like using data analytics and unmanned aerial vehicles, to improve the investigation and prosecution of environmental crimes across international borders. The workshop closed by identifying specific ways to deliver operational enforcement activities within the next year.\n\n\n "Environmental crimes are often transnational, affecting various communities in myriad ways. It is important to foster collaboration within the U.S. government and between our government and those of other nations to enforce laws to reduce waste and pollution, among other things. This week's workshop did that and highlighted ways to incorporate more sophisticated enforcement resources. We thank all who attended the workshop for their commitment to upholding the rule of law." \n\n— Assistant Attorney General Todd Kim of ENRD.\n\n\nThe workshop builds on ENRD's work to improve collaboration around the world in addressing environmental crimes, including in Guatemala, Mozambique, Ghana, Southeast Asia, Cameroon, and Ukraine.\n\n\n\n\n\n \n \n \n\n\n\n \n\n\n \n\nENRD ECS Deputy Chief Joseph Poux addresses the workshop.\n\n\n\n\n\n\n\n \n \n \n\n\n\n \n\n\n \n\nPhoto of workshop participants.\n\n\n\n&nbsp;\n",
"changed": "\u003Ctime datetime=\"2024-07-24T14:44:18+00:00\"\u003E1721832258\u003C/time\u003E\n",
"component": [
{
"uuid": "034d161d-6ac9-4dff-8362-616a47d3ecb7",
"name": "Environment and Natural Resources Division"
},
{
"uuid": "f979c7d0-a090-4fd2-9712-db78eb905a94",
"name": "ENRD - Environmental Crimes Section"
}
],
"created": "\u003Ctime datetime=\"2024-07-24T14:26:24+00:00\"\u003E1721831184\u003C/time\u003E\n",
"date": "1721822400",
"image": "\u003Ca href=\"/opa/media/1361416\" hreflang=\"en\"\u003EENRD Deputy Assistant Attorney General Seth Barsky addresses the workshop. \u003C/a\u003E, \u003Ca href=\"/opa/media/1361421\" hreflang=\" en\ "\u003EENRD Environmental Crimes Section (ECS) Deputy Chief Joseph Poux (left) walks to the workshop.\u003C/a\u003E, \u003Ca href=\"/opa/media/1361426\" hreflang=\"en\"\u003EENRD ECS Deputy Chief Joseph Poux addresses the workshop.\u003C/a\u003E, \u003Ca href=\"/opa/media/1361431\" hreflang=\"en\"\u003EPhoto of workshop participants. \u003C/a\u003E",
"teaser":" ",
"title": "Justice Department Hosts Workshop to Enhance Cooperation in Tackling Environmental Crime ",
"topic": "\u003Ca href=\"/taxonomy/term/25341\" hreflang=\"en\"\u003EEnvironment\u003C/a\u003E",
"url": "https://justice.gov/opa/blog/justice-department-hosts-workshop-enhance-cooperation-tackling-environmental-crime",
"uuid": "8d745679-955f-44da-a028-7a097d7a5344"
}
]
}

## press_releases

#### GET /api/v1/press_releases/[uuid].json

Provides information on a specific press release.

##### Arguments

- string uuid
- The UUID of the node to retrieve.
- string fields GET(optional)
- A comma separated list of fields to get.

##### Request Example

/api/v1/press_releases/98baba74-8922-41de-95f1-73a82695a3d1.json?fields=date,title,url,uuid

##### Response Example

{
"metadata": {
"responseInfo": {
"status": 200
},
"resultset": {
"count": "1",
"pagesize": 20,
"page": 0
},
"executionTime": 0.00603389739990234
},
"results": [
{
"date": "1723032000",
"title": "Rochester Man Indicted for Illegal Possession of a Firearm, Fentanyl Trafficking",
"url": "https://justice.gov/usao-mn/pr/rochester-man-indicted-illegal-possession-firearm-fentanyl-trafficking",
"uuid": "98baba74-8922-41de-95f1-73a82695a3d1"
}
]
}

#### GET /api/v1/press_releases.json

Provides a list of all press releases.

##### Arguments

- string fields GET(optional)
- A comma separated list of fields to get.
- array parameters GET(optional)
- Filter parameters array such as parameters[title]="test"
- int page GET(optional)
- The zero-based index of the page to get, defaults to 0.
- int pagesize GET(optional)
- Number of records to get per page.
- string sort GET(optional)
- Field to sort by.
- string direction GET(optional)
- Direction of the sort. ASC or DESC.

##### Request Example

/api/v1/press_releases.json?sort=created&direction=DESC&pagesize=2&page=5

##### Response Example

{
"metadata": {
"responseInfo": {
"status": 200
},
"resultset": {
"count": "246868",
"pagesize": "2",
"page": 5
},
"executionTime": 0.0951321125030518
},
"results": [
{
"attachment": "",
"body": "\u003Cp\u003EBOISE – U.S. Attorney Josh Hurwit announced the results of three separate drug distribution cases in Southern Idaho today.\u003C/p\u003E\n\n\u003Cp\u003E“The case results announced today reflect stellar work by our prosecutors and staff,” said U.S. Attorney Hurwit.&nbsp; “Together with our law enforcement partners, our office is rising to meet the challenge that drug trafficking poses to communities in Idaho.&nbsp; The partnerships that drive these cases will continue to make our state a terrible place for drug dealers to do business.”\u003C/p\u003E\n\n\u003Cp\u003E\u003Cb\u003E1. Large Scale Methamphetamine Trafficker Sentenced to 10 Years in Federal Prison\u003C/b\u003E\u003C/p\u003E\n\n\u003Cp\u003EIn one case, Luis M. Villalobos-Galdamez, 27, an immigrant from El Salvador who was living in California at the time of his arrest, was sentenced by Senior U.S. District Judge B. Lynn Winmill to 120 months in federal prison for possession with intent to distribute methamphetamine.&nbsp;\u003C/p\u003E\n\n\u003Cp\u003EAccording to court records, on May 16, 2023, a detective from Deschutes County, Oregon, contacted the Idaho State Police (ISP) regarding a car traveling from California and heading towards the Magic Valley that was suspected of carrying a large quantity of controlled substances. &nbsp;The detective explained that they were investigating an individual named “Luis” who was believed to be a passenger in the car. &nbsp;An ongoing Deschutes County investigation showed that Villalobos-Galdamez had previously supplied large quantities of methamphetamine to Deschutes County and possibly Idaho on previous occasions. &nbsp;Based on this information, ISP detectives quickly worked to locate the car. &nbsp;After the car passed into Idaho, a traffic stop was conducted. &nbsp;During a subsequent search, police found 10 pounds of methamphetamine hidden under the spare tire in the trunk. &nbsp;More drugs were found hidden in the center console and backseat. &nbsp;In total, 21.46 pounds of methamphetamine was seized from Villalobos-Galdamez.\u003C/p\u003E\n\n\u003Cp\u003E“This case highlights the importance and effectiveness of partnerships in our criminal justice system. &nbsp;It takes all of us to ensure we continue fighting to keep drugs out of our communities,” said Deschutes County Sheriff L. Shane Nelson.\u003C/p\u003E\n\n\u003Cp\u003EJudge Winmill also ordered Villalobos-Galdamez to serve five years of supervised release following his prison sentence.&nbsp; It is expected that he will be deported to El Salvador upon his release from prison. &nbsp;Villalobos-Galdamez pleaded guilty to the federal charge in April 2024.\u003C/p\u003E\n\n\u003Cp\u003EU.S. Attorney Hurwit thanked the Idaho State Police and the Deschutes County Sheriff’s Office in Oregon, for their collaboration in this investigation. &nbsp;This case was prosecuted by Assistant U.S. Attorney Chris Booker.\u003C/p\u003E\n\n\u003Cp\u003E\u003Cb\u003E2. Nampa Man Convicted of Distribution of Methamphetamine Sentenced to More Than 6 Years in Federal Prison\u003C/b\u003E\u003C/p\u003E\n\n\u003Cp\u003EIn a separate case, Oswald Charles Reyna, 67, of Nampa, was sentenced to 78 months in federal prison following his conviction for distribution of methamphetamine.\u003C/p\u003E\n\n\u003Cp\u003EAccording to court records, Reyna sold individuals methamphetamine on July 31, August 7, and August 21, in 2023, at his home in Nampa.&nbsp; On August 26, 2023, Reyna was contacted by police officers in Fruitland, Idaho while meeting with another individual and a juvenile for an apparent drug deal at 2:00 a.m.&nbsp; After a positive alert for the presence of the odor of controlled substances emanating from Reyna’s vehicle by a drug detecting K9, investigators searched his vehicle and found approximately five ounces of methamphetamine.&nbsp; Reyna, who has a 26-year history of trafficking controlled substances pleaded guilty to this fifth drug trafficking offense on May 9, 2024.\u003C/p\u003E\n\n\u003Cp\u003E“I’m proud of the teamwork that went into this investigation to put a career criminal behind bars,” said Nampa Police Chief Joe Huff. &nbsp;“We all need to take a stand and speak up when we see unlawful activity happening. &nbsp;We need to let these criminals know that their illegal activity has no business in our community.”\u003C/p\u003E\n\n\u003Cp\u003E“Methamphetamine traffickers like Mr. Reyna prey on our communities for their own gain,” said David F. Reames, Special Agent in Charge, DEA Seattle Field Division.&nbsp; “DEA and our partners at the Nampa Police, the Fruitland Police, and the U.S. Attorney’s Office work hard to stop methamphetamine traffickers and ensure they are held accountable for their actions.&nbsp; Our community is a little safer because of Mr. Reyna’s sentence in this case.”\u003C/p\u003E\n\n\u003Cp\u003ESenior U.S. District Judge B. Lynn Winmill also ordered Reyna to pay a $500 fine, to serve four years of supervised release following his prison sentence and entered a final order of forfeiture for Reyna’s Nampa home that he used for his drug deals.\u003C/p\u003E\n\n\u003Cp\u003EU.S. Attorney Hurwit commended the work of DEA, the Nampa Police Department Special Investigations Unit, and the Fruitland Police Department, which led to the charges.&nbsp; Assistant U.S. Attorney David Morse prosecuted this case.\u003C/p\u003E\n\n\u003Cp\u003E\u003Cb\u003E3. Canyon County Man Sentenced to Over 4 Years for Distributing Fentanyl\u003C/b\u003E\u003C/p\u003E\n\n\u003Cp\u003EIn another case, Aaron Vincent Fretz, 41, of Nampa, was sentenced to 4 years and 9 months in federal prison for distribution of fentanyl.\u003C/p\u003E\n\n\u003Cp\u003EAccording to court records, in August 2023, Fretz sold a total of 5.5 grams of fentanyl and 84.1 grams of methamphetamine to another person on two occasions.\u003C/p\u003E\n\n\u003Cp\u003EFretz has a lengthy criminal history, which includes convictions for felony possession of methamphetamine and fentanyl, grand theft, and misdemeanor convictions for driving under the influence and possession of marijuana.\u003C/p\u003E\n\n\u003Cp\u003E“This case highlights the tireless efforts of the City County Narcotics Unit and our federal law enforcement partners when it comes to combatting the sale of illicit drugs in our community,” said Canyon County Sheriff and National Sheriffs’ Association President Kieran Donahue. &nbsp;“We must continue the fight against the bad actors who are actively trying to poison our citizens with dangerous drugs like fentanyl and methamphetamine.”\u003C/p\u003E\n\n\u003Cp\u003E“I am proud that as Idahoans, we are united in our efforts of upholding the rule of law and keeping our communities safe,” said Caldwell Police Chief Rex Ingram.&nbsp; “Through our relentless pursuit of justice by collaborating with our local, state, and federal partners, we can sleep well at night knowing that Idaho is safer with us all working together.”\u003C/p\u003E\n\n\u003Cp\u003ESenior U.S. District Judge B. Lynn Winmill also ordered Fretz to serve three years of supervised release following his prison sentence.&nbsp; Fretz pleaded guilty on May 2, 2024.\u003C/p\u003E\n\n\u003Cp\u003EU.S. Attorney Hurwit commended the work of City County Narcotics Unit for their investigation.&nbsp; Special Assistant U.S. Attorney Marie C. Chong prosecuted the case.\u003C/p\u003E\n\n\u003Cp\u003E\u003Ci\u003EThis case was prosecuted by the Special Assistant U.S. Attorney hired by the Ada County Prosecuting Attorney’s Office with funds provided by the Oregon-Idaho High Intensity Drug Trafficking Areas (HIDTA) program.&nbsp; HIDTA is an Office of National Drug Control Policy (ONDCP) sponsored counterdrug grant program that coordinates with and provides funding resources to multi-agency drug enforcement initiatives, including the Special Assistant U.S. Attorney position.\u003C/i\u003E\u003C/p\u003E\n\n\u003Cp class=\"text-align-center\"\u003E\u003Ci\u003E###\u003C/i\u003E\u003C/p\u003E\n",
"changed": "\u003Ctime datetime=\"2024-08-07T22:45:53+00:00\"\u003E1723070753\u003C/time\u003E\n",
"component": [
{
"uuid": "4f03e6af-f2cb-40c6-89c8-6871fdd8aa47",
"name": "Drug Enforcement Administration (DEA)"
},
{
"uuid": "62ddfbf9-51d3-44a9-ac88-489162361045",
"name": "U.S. Attorneys (USAO)"
},
{
"uuid": "82adcbda-83a7-4aee-8a37-9f205426bb18",
"name": "USAO - Idaho"
}
],
"created": "\u003Ctime datetime=\"2024-08-07T21:45:30+00:00\"\u003E1723067130\u003C/time\u003E\n",
"date": "1723032000",
"image": "",
"number": "",
"teaser": "\u003Cp\u003EU.S. Attorney Josh Hurwit announced the results of three separate drug distribution cases in Southern Idaho today.\u003C/p\u003E\n\n\u003Cp\u003E“The case results announced today reflect stellar work by our prosecutors and staff,” said U.S. Attorney Hurwit.&nbsp; “Together with our law enforcement partners, our office is rising to meet the challenge that drug trafficking poses to communities in Idaho.&nbsp; The partnerships that drive these cases will continue to make our state a terrible place for drug dealers to do business.”\u003C/p\u003E\n",
"title": "U.S. Attorney’s Office Highlights Success of Drug Distribution Prosecution Efforts in Southern Idaho",
"topic": [
{
"uuid": "68eea121-fc07-4c11-80e2-587b140b79b1",
"name": "Drug Trafficking"
}
],
"url": "https://justice.gov/usao-id/pr/us-attorneys-office-highlights-success-drug-distribution-prosecution-efforts-southern",
"uuid": "edd715cc-54ac-4dfc-a206-4671e6a7441d"
},
{
"attachment": "",
"body": "\u003Cp\u003EST. PAUL, Minn. – A Rochester man has been indicted on firearm and drug trafficking charges, announced U.S. Attorney Andrew M. Luger.\u003C/p\u003E\n\n\u003Cp\u003EAccording to court documents, on or about April 28, 2024, Liban Abdikadar Abdullahi, 29, knowingly possessed a 9mm Glock model 43 semiautomatic pistol. Abdullahi also possessed with the intent to distribute fentanyl and carried the Glock pistol to further his drug trafficking crime.\u003C/p\u003E\n\n\u003Cp\u003EBecause Abdullahi has prior felony convictions, he is prohibited under federal law from possessing firearms or ammunition at any time.\u003C/p\u003E\n\n\u003Cp\u003EThe indictment charges Abdullahi with one count of possessing a firearm as a felon, one count of possession with intent to distribute fentanyl, and one count of carrying a firearm in furtherance of a drug trafficking crime. Abdullahi made his initial appearance today in U.S. District Court before Magistrate Judge John F. Docherty.\u003C/p\u003E\n\n\u003Cp\u003EThis case is the result of an investigation conducted by the Rochester Police Department, the FBI, and the Bureau of Alcohol, Tobacco, Firearms and Explosives.\u003C/p\u003E\n\n\u003Cp\u003EAssistant U.S. Attorney Evan B. Gilead is prosecuting the case.\u003C/p\u003E\n\n\u003Cp\u003E\u003Ci\u003EAn indictment is merely an allegation, and the defendant is presumed innocent until proven guilty beyond a reasonable doubt in a court of law.\u003C/i\u003E\u003C/p\u003E\n",
"changed": "\u003Ctime datetime=\"2024-08-07T22:06:46+00:00\"\u003E1723068406\u003C/time\u003E\n",
"component": [
{
"uuid": "4c239363-a40c-4bc6-a17f-dabc265ead6d",
"name": "USAO - Minnesota"
}
],
"created": "\u003Ctime datetime=\"2024-08-07T21:41:22+00:00\"\u003E1723066882\u003C/time\u003E\n",
"date": "1723032000",
"image": "",
"number": "",
"teaser": "",
"title": "Rochester Man Indicted for Illegal Possession of a Firearm, Fentanyl Trafficking",
"topic": [
{
"uuid": "68eea121-fc07-4c11-80e2-587b140b79b1",
"name": "Drug Trafficking"
},
{
"uuid": "fefd28ee-ccc0-4f66-a585-8a61b66ed5c8",
"name": "Firearms Offenses"
}
],
"url": "https://justice.gov/usao-mn/pr/rochester-man-indicted-illegal-possession-firearm-fentanyl-trafficking",
"uuid": "98baba74-8922-41de-95f1-73a82695a3d1"
}
]
}

##

Updated December 18, 2025
