# The Data Privacy Anonymization and Reidentification Dilemma - How Entity Resolution IS Used to Exploit Us

# The Identity Utilization Taxonomy & The Dilemma

<aside>
‼️ Most data about persons, in combination, can become PI, SPI, PHI, or PII

</aside>

Reidentification, entity resolution, and identity fingerprinting -

Related concepts that involve the process of discovering or inferring an individual's identity from data sets that may have been anonymized, pseudonymized, or aggregated. These techniques can be used for malicious purposes (e.g., violating privacy) or legitimate reasons (e.g., fraud detection, marketing). In response, various defenses have been developed to protect individuals' privacy.

## **Taxonomy of Reidentification & Anonymization**

1. **Reidentification**
    1. Malicious
        1. Homogeneity Attack
        2. Background Knowledge Attack
    2. Legitimate - *still unethical with companies like the FAANG ones*
        1. SQL Joins, 
        2. Data Engineering & Analytics ( data integration or ETL, data processing, etc) 
            1. Record Linkage / Entity Resolution / Data Matching (synonyms)
            2. Deduplication
2. **Anonymization/Deidentification**
    1. K-Anonymity
    2. Differential Privacy
    3. L-Diversity
    4. T-Closeness

## Malicious **Reidentification**

### Homogeneity Attacks

A homogeneity attack occurs when an attacker exploits the fact that a group of individuals in a dataset have the same sensitive attribute value. This can allow the attacker to infer sensitive information even without identifying a specific individual.

Imagine the following anonymized dataset containing age, zip code, and medical condition:

| Age | Zip Code | Medical Condition |
| --- | --- | --- |
| 32 | 12345 | Diabetes |
| 40 | 12345 | Diabetes |
| 36 | 67890 | Hypertension |
| 50 | 67890 | Hypertension |

Here, all users in zip code **`12345`** have the same medical condition (Diabetes). An attacker who knows that a specific individual is part of this dataset and lives in zip code **`12345`** can infer their medical condition (Diabetes) without knowing their exact age.

### **Background Knowledge Attacks**

In a background knowledge attack, an attacker uses external information or prior knowledge about an individual to infer their identity or sensitive attributes from the anonymized data.

Consider the following dataset with age, zip code, and salary:

| Age | Zip Code | Salary |
| --- | --- | --- |
| 35 | 12345 | 80,000 |
| 42 | 12345 | 65,000 |
| 30 | 67890 | 90,000 |
| 45 | 67890 | 100,000 |

An attacker knows that John is 30 years old and lives in zip code **`67890`**. Using this background knowledge, the attacker can infer that John's salary is 90,000 dollars, even though John's name is not included in the dataset.

In both types of attacks, the attacker exploits the information contained in the dataset to reveal sensitive information about individuals, either by exploiting homogeneity within groups or leveraging prior knowledge about the target.

## Legitimate Reidentification (still usually unethical)

Entity Resolution, also known as record linkage, data matching, or sometimes manifesting as deduplication, is a process used to identify, match, and link or “dedup” records that refer to the same real-world entity (usually people) across different data sources. It is an essential step in data integration, cleaning, and consolidation tasks. The process helps to reduce data redundancy, improve data quality, and provide a more comprehensive view of entities (e.g., individuals, organizations, products), or it can simply allow for a single source of truth (SSOT). 

Nevertheless, this process should always be considered unethical if it is done with the PII (personally identifiable information) of unconsenting users, or if users are being reidentified using data from an external system in which users: 1) don’t know their data is being shared from, or 2) don’t know their data is being stored or processed.

> Artificial Intelligence and ML techniques makes it easy for advertising teams and organizations (especially the big ones) to have a means to their own ends.  These means are usually fueled by user data and LOTS of it.  Users cannot be sure that these pursued ends align with their own or that these means are morally justifiable
> 

### **Data Integration**

Data integration involves combining data from multiple sources into a single, unified view. It aims to create a consistent and accurate representation of the data, making it easier for businesses and organizations to make informed decisions based on the integrated data. Data integration can involve various processes, such as ETL, data cleaning, data transformation, and record linkage/entity resolution/data matching.

**Example:**

<aside>
<img src="https://www.notion.so/icons/table_green.svg" alt="https://www.notion.so/icons/table_green.svg" width="40px" /> The below example is the same as an SQL LEFT JOIN operation.

</aside>

**Dataset A**

| User ID | Age | Zip Code |
| --- | --- | --- |
| 1 | 30 | 12345 |
| 2 | 35 | 67890 |

**Dataset B**

| User ID | Gender | Occupation |
| --- | --- | --- |
| 1 | M | Engineer |
| 2 | F | Teacher |

**Integrated Data**

| User ID | Age | Zip Code | Gender | Occupation |
| --- | --- | --- | --- | --- |
| 1 | 30 | 12345 | M | Engineer |
| 2 | 35 | 67890 | F | Teacher |

### **Entity Resolution - Record Linkage / Data Matching / Deduplication**

Record linkage/entity resolution/data matching is a specific technique used in the data integration process to identify and connect records from different data sources that relate to the same entity. This method is employed when the data sources do not have a common identifier or when the identifier is prone to errors or inconsistencies. The goal is to create a more complete and accurate view of each entity.

**Record Linkage Example:**

<aside>
‼️ This matches the same example as with “data integration” because entity resolution is a part of data integration.  An SQL LEFT JOIN is the most basic example.

</aside>

**Dataset 1**

| Employee ID | Name | Department |
| --- | --- | --- |
| 1001 | Alice Brown | HR |
| 1002 | Bob Green | IT |

**Dataset 2**

| Emp ID | Full Name | Salary |
| --- | --- | --- |
| 1001 | Alice Brown | 60,000 |
| 1002 | Bob Green | 75,000 |

**Linked Data**

| Employee ID | Name | Department | Salary |
| --- | --- | --- | --- |
| 1001 | Alice Brown | HR | 60,000 |
| 1002 | Bob Green | IT | 75,000 |

Deduplication - although deduplication is considered separate from entity resolution, data matching, or record linkage. They result in the same amount of risk to the privacy of the individual.

**Deduplication Example:**

**Original Data**

| Customer ID | Name | Address | Phone Number |
| --- | --- | --- | --- |
| 1 | John Doe | 123 Main St | 555-123-4567 |
| 2 | Jane Smith | 456 Elm St | 555-987-6543 |
| 3 | Jon Doe | 123 Main Street | 555-123-4567 |

**After Deduplication**

| Customer ID | Name | Address | Phone Number |
| --- | --- | --- | --- |
| 1 | John Doe | 123 Main St | 555-123-4567 |
| 2 | Jane Smith | 456 Elm St | 555-987-6543 |

In the above example, records 1 and 3 represent the same person with slightly different name and address representations. After deduplication, the dataset is cleaned, and only unique records remain.

In summary, data integration is the overarching process of combining data from multiple sources into a single view, while record linkage/entity resolution/data matching/deduplication is a specific technique used to identify and connect or “dedup"records that relate to the same entity across different data sources. ETL is another example of a process involved in data integration.

## Advanced Techniques for Entity Resolution

Advanced entity resolution techniques, such as fuzzy matching, crowdsourcing, and machine learning, can be particularly useful for identifying and linking records that do not have a common identifier or when dealing with inconsistencies and variations in the data.

### Fuzzy Entity Resolution (Single Attribute)

Fuzzy entity resolution uses AI and ML algorithms to identify and link records with similar but not identical attributes. By leveraging probabilistic matching and similarity measures, fuzzy entity resolution can identify related records that might have been missed by traditional techniques.

**Dataset 1**

| Name | Department | Address |
| --- | --- | --- |
| Alice Brown | HR | 123 Main St |
| Bob Green | IT | 456 Market St |

**Dataset 2**

| Full Name | Position | Street |
| --- | --- | --- |
| Alic Brown | HR Manager | 123 Main Street |
| Robert Green | IT Analyst | 456 Market St |

Using fuzzy entity resolution, the algorithm can detect that "Alic Brown" and "Alice Brown" are the same person, as well as "Bob Green" and "Robert Green," even though the datasets do not have a common identifier and contain variations in attributes such as address and position.

**Linked Data**

| Name | Department | Address | Position |
| --- | --- | --- | --- |
| Alice Brown | HR | 123 Main St | HR Manager |
| Bob Green | IT | 456 Market St | IT Analyst |

### Crowdsourced Entity Resolution (Advanced Example)

Crowdsourced entity resolution involves using human intelligence to identify and link records that relate to the same entity. This approach can be particularly helpful when dealing with complex or domain-specific data that requires expert knowledge or human intuition.

**Dataset 1**

| Name | University | Graduation Year |
| --- | --- | --- |
| Alice Brown | MIT | 2010 |
| Bob Green | Stanford | 2011 |

**Dataset 2**

| Full Name | School | Grad Year |
| --- | --- | --- |
| Alice Brown | MIT | 2010 |
| Robert G. | Stanford U | 2011 |

A crowdsourced entity resolution approach would involve human experts who can recognize that "Robert G." is likely "Bob Green" based on their knowledge of the individuals and their academic history.

**Linked Data**

| Name | University | Graduation Year | School | Grad Year |
| --- | --- | --- | --- | --- |
| Alice Brown | MIT | 2010 | MIT | 2010 |
| Bob Green | Stanford | 2011 | Stanford U | 2011 |

### Machine Learning for Entity Resolution

Machine learning algorithms can be used to train models that predict the likelihood of two records being the same entity based on the similarity of their attributes. By learning from a large dataset with labeled examples, the model can recognize patterns and connections that might not be obvious to human experts.

**Example:**

A supervised ML model can be trained on a dataset with labeled examples of matching and non-matching record pairs. The model can then predict the probability of a match for new, unlabeled record pairs. The higher the probability, the more likely the records are the same entity.

### Column Matching

AI techniques can also be used to identify columns that represent the same information across different datasets. This process, sometimes referred to as schema matching, helps in the data integration process by aligning the data structures.

**Example:**

An AI algorithm can analyze the content and structure of columns in different datasets and recognize that the "University" column in Dataset 1 and the "School" column in Dataset 2 contain the same type of information. Similarly, it can detect that "Graduation Year" and "Grad Year" represent the same attribute.

### Fuzzy Entity Resolution with Multiple Attributes

AI and ML algorithms can also be used to resolve entities based on multiple attributes, even when none of them uniquely identify individuals. By analyzing the relationships between attributes and learning from training data, the algorithms can predict which records are likely to represent the same entity.

**Dataset 1**

| Name | Birth Month | Email | Phone Number |
| --- | --- | --- | --- |
| Alice Brown | January | mailto:alice.brown@email.com | 555-123-4567 |
| Bob Green | February | mailto:bob.green@email.com | 555-987-6543 |

**Dataset 2**

| Full Name | B. Month | Email Address | Phone |
| --- | --- | --- | --- |
| Alice Brown | Jan | mailto:a.brown@email.com | 555-123-4567 |
| Robert Green | Feb | mailto:r.green@email.com | 555-987-6543 |

An AI algorithm can analyze multiple attributes and recognize that the records for Alice Brown and Bob Green are likely to represent the same entities, even though their email addresses and the representation of their birth months differ.

**Linked Data**

| Name | Birth Month | Email | Phone Number |
| --- | --- | --- | --- |
| Alice Brown | January | mailto:alice.brown@email.com | 555-123-4567 |
| Bob Green | February | mailto:bob.green@email.com | 555-987-6543 |

### **AI-Assisted Crowdsourced Entity Resolution (AICER) - Basic Example**

AI-Assisted Crowdsourced Entity Resolution (AICER) would be an advanced approach to entity resolution that combines the power of large AI models, crowdsourced verification, and reinforcement learning to recognize matching entities across datasets with little data and mismatched columns.

**AICER Workflow**

1. The AI model analyzes multiple datasets and identifies columns that likely represent the same attribute, even if the columns have different names or formatting.
2. The AI model then attempts to resolve entities across the datasets based on its understanding of the attributes and relationships between them.
3. When the AI model is not confident in a potential match, it sends the record pair to a crowdsourced verification step where human experts review the data and confirm or reject the match.
4. The AI model uses reinforcement learning to update its understanding of the relationships between attributes and entities based on the human feedback.
5. The process iterates, with the AI model becoming increasingly more accurate at resolving entities and identifying attribute relationships as it receives more human feedback.

The future of entity resolution is likely to involve even more sophisticated AI and ML techniques, which can bring significant benefits in terms of data quality and insights. However, these advanced techniques also pose privacy risks. By linking previously unconnected datasets, it becomes easier for attackers to reidentify individuals, even if their data was initially anonymized or pseudonymized.

**AICER Example**

**Dataset 1**

| Name | Birth Month | Email | Phone Number |
| --- | --- | --- | --- |
| Alice Brown | January | mailto:alice.brown@email.com | 555-123-4567 |
| Bob Green | February | mailto:bob.green@email.com | 555-987-6543 |

**Dataset 2**

| Full Name | B. Month | Email Address | Telephone |
| --- | --- | --- | --- |
| Alice Brown | Jan | mailto:a.brown@email.com | 555-123-4567 |
| Robert Green | Feb | mailto:r.green@email.com | 555-987-6544 |

The AICER system first identifies that the "Name" and "Full Name" columns likely represent the same attribute, as do the "Birth Month" and "B. Month" columns, "Email" and "Email Address," and "Phone Number" and "Telephone."

The AI model then attempts to resolve entities by analyzing the relationships between the attributes. For Alice Brown, the AI model confidently resolves the entities based on the matching birth month, email, and phone number.

However, for Bob Green and Robert Green, the AI model is less confident due to the slightly different phone numbers. The AI model sends the record pair to a crowdsourced verification step, where human experts confirm that the records are indeed a match, despite the discrepancy in the phone numbers.

The AI model receives feedback from the human experts and updates its understanding of the relationships between attributes and entities. As the AICER system continues to process more datasets and receive more human feedback, its accuracy in resolving entities and identifying attribute relationships will improve.

**Linked Data**

| Name | Birth Month | Email | Phone Number |
| --- | --- | --- | --- |
| Alice Brown | January | mailto:alice.brown@email.com | 555-123-4567 |
| Bob Green | February | mailto:bob.green@email.com | 555-987-6543 |

AICER is an innovative and futuristic approach to entity resolution that leverages the strengths of AI, human intelligence, and reinforcement learning to provide highly accurate and efficient solutions for complex data integration tasks.

### **AI-Assisted Crowdsourced Entity Resolution (AICER) - Browser Fingerprinting Example**

In this example, we demonstrate how AICER can handle complex entity resolution tasks with a large number of non-PII attributes. These attributes are often collected when users interact with websites, even when using a private browser. The example highlights the power of AI in resolving online identities based on seemingly innocent digital attributes, including browser fingerprinting.

**Dataset 1**

| User ID | Browser | OS | Screen Resolution | Timezone | Language | Device Brand | Device Model | IP Prefix | Connection Type | Visit Duration | Pages Visited | Referring Domain | Search Keywords |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Chrome | Windows | 1920x1080 | UTC-05:00 | en-US | Dell | XPS 15 | 192.0.2.* | Broadband | 5m12s | 3 | google.com | AI research |
| 2 | Firefox | macOS | 1440x900 | UTC-08:00 | en-US | Apple | MacBook Air | 198.51.100.* | Wi-Fi | 7m32s | 4 | duckduckgo.com | latest gadgets |

**Dataset 2**

| Visitor ID | Browser | OS | Screen Size | Timezone Offset | Language | Device Make | Device Model | IP Range | Connection | Session Length | Page Views | Referrer | Searched Terms |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | Chrome | Windows | 1920x1080 | -05:00 | en-US | Dell | XPS 15 | 192.0.2.* | Broadband | 5m9s | 3 | google.com | AI technology |
| B | Firefox | macOS | 1440x900 | -08:00 | en-US | Apple | MacBook Air | 198.51.100.* | Wi-Fi | 7m29s | 4 | duckduckgo.com | new gadgets |

In this case, the AICER system faces a more challenging task due to the large number of non-PII attributes and subtle differences between records. The AI model analyzes multiple datasets and identifies columns that likely represent the same attribute, even if the columns have different names or formatting.

The AI model then attempts to resolve entities by analyzing the relationships between the attributes. For User ID 1 and Visitor ID A, the AI model confidently resolves the entities based on the matching browser, OS, screen resolution, timezone, language, device brand, device model, IP prefix, connection type, and other attributes, despite slight differences in visit duration, pages visited, and search keywords.

However, for User ID 2 and Visitor ID B, the AI model is less confident due to the slightly different session length, page views, and searched terms. The AI model sends the record pair to a crowdsourced verification step, where human experts confirm that the records are indeed a match, despite the discrepancies in these attributes.

The AI model receives feedback from the human experts and updates its understanding of the relationships between attributes and entities. As the AICER system continues to process more datasets and receive more human feedback, its accuracy in resolving

### **AI-Assisted Crowdsourced Entity Resolution (AICER) - FAANG Company Data Sharing Example**

In this example, we demonstrate how AICER can handle complex entity resolution tasks when two FAANG companies share data containing seemingly innocent or harmless digital attributes along with email or phone number.

**Dataset 1** (Shared by Company Alpha)

| Email | Browser | OS | Screen Resolution | Timezone | Language | Device Brand | Device Model | Connection Type | Pages Visited | Referring Domain | Search Keywords |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mailto:alice.brown@email.com | Chrome | Windows | 1920x1080 | UTC-05:00 | en-US | Dell | XPS 15 | Broadband | 3 | google.com | AI research |
| mailto:bob.green@email.com | Firefox | macOS | 1440x900 | UTC-08:00 | en-US | Apple | MacBook Air | Wi-Fi | 4 | duckduckgo.com | latest gadgets |

**Dataset 2** (Shared by Company Beta)

| Phone Number | Browser | OS | Screen Size | Timezone Offset | Language | Device Make | Device Model | Connection | Page Views | Referrer | Searched Terms |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 555-123-4567 | Chrome | Windows | 1920x1080 | -05:00 | en-US | Dell | XPS 15 | Broadband | 3 | google.com | AI technology |
| 555-987-6543 | Firefox | macOS | 1440x900 | -08:00 | en-US | Apple | MacBook Air | Wi-Fi | 4 | duckduckgo.com | new gadgets |

In this case, the AICER system faces a more challenging task due to the mix of non-PII and PII attributes. The AI model first identifies columns that likely represent the same attribute, even if the columns have different names or formatting.

The AI model then attempts to resolve entities by analyzing the relationships between the attributes. For Alice Brown's email and the corresponding phone number (`555-123-4567`), the AI model confidently resolves the entities based on the matching browser, OS, screen resolution, timezone, language, device brand, device model, connection type, and other attributes, despite slight differences in pages visited and search keywords.

However, for Bob Green's email and the corresponding phone number (`555-987-6543`), the AI model is less confident due to the slightly different page views and searched terms. The AI model sends the record pair to a crowdsourced verification step, where human experts confirm that the records are indeed a match, despite the discrepancies in these attributes.

**Linked Data**

| Name | Email | Phone Number | Browser | OS | Screen Resolution | Timezone | Language | Device Brand | Device Model | Connection Type | Pages Visited | Referring Domain | Search Keywords |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Alice Brown | mailto:alice.brown@email.com | 555-123-4567 | Chrome | Windows | 1920x1080 | UTC-05:00 | en-US | Dell | XPS 15 | Broadband | 3 | google.com | AI research |
| Bob Green | mailto:bob.green@email.com | 555-987-6543 | Firefox | macOS | 1440x900 | UTC-08:00 | en-US | Apple | MacBook Air | Wi-Fi | 4 | duckduckgo.com | latest gadgets |

In this resolved entities table, the system has successfully linked the email addresses and phone numbers from the two datasets provided by Company Alpha and Company Beta. The AICER system combined the seemingly innocent digital attributes with the PII attributes (email and phone number) to produce a unified view of the users' data.

The AI model receives feedback from the human experts and updates its understanding of the relationships between attributes and entities. As the AICER system continues to process more datasets and receive more human feedback, its accuracy in resolving entities based on seemingly innocent or harmless digital attributes improves.

As the AI-Assisted Crowdsourced Entity Resolution (AICER) system improves its accuracy, it becomes more effective in resolving entities based on seemingly innocent or harmless digital attributes. This can have both positive and negative implications.

**Positive Implications**

1. Improved Personalization: With better entity resolution, companies can provide personalized recommendations, advertisements, and content based on users' preferences, browsing history, and other data points. This can lead to better user experiences and increased customer satisfaction.
2. Enhanced Analytics: Companies can gain deeper insights into user behavior and preferences by combining data from multiple sources. This can help improve decision-making and drive product development, marketing strategies, and other business initiatives.
3. Fraud Detection and Prevention: Enhanced entity resolution can help companies identify suspicious activities or patterns, which can be useful for detecting and preventing fraud or other malicious activities.

**Negative Implications**

1. Privacy Concerns: As AI models become better at resolving entities, it raises privacy concerns for users, who may not be aware that their seemingly innocent digital attributes can be used to track or identify them. This can lead to a loss of trust in online services.
2. Misuse of Data: With more powerful entity resolution techniques, there is a risk of misuse by malicious actors who can combine data from multiple sources to identify individuals, steal their identities, or target them for scams, harassment, or other malicious activities.
3. Legal and Ethical Issues: The use of AI and crowdsourced entity resolution can raise legal and ethical issues related to data privacy, consent, and sharing of information between companies. Companies must ensure compliance with data protection regulations and adhere to ethical guidelines to avoid potential lawsuits or public backlash.

To mitigate the negative implications and reap the benefits of advanced entity resolution techniques, it is crucial for companies to implement robust privacy protection measures, such as anonymization, data minimization, and encryption. Additionally, companies should be transparent with their users about data collection and usage practices and ensure that they obtain user consent when necessary. By striking the right balance between personalization and privacy, companies can enhance user experiences while maintaining user trust and adhering to ethical guidelines.

### **AI-Assisted Crowdsourced Entity Resolution (AICER) - FAANG 3rd Party Advertising Example**

## Organizational **Defenses**

<aside>
🏢 These are applicable to the teams that store, process, or share data (e.g., data analysts, marketing, preference engine engineers).

</aside>

### **K-Anonymity**

K-Anonymity is a privacy-preserving technique that aims to ensure that each individual in a dataset is indistinguishable from at least k-1 other individuals regarding certain quasi-identifiers (attributes that can be linked to external data sources). This makes it harder to resolve an entity between a table with a known identity and a table with attributes about an unknown entity.

**Original Data**

| Age | Zip Code | Medical Condition |
| --- | --- | --- |
| 25 | 12345 | Diabetes |
| 35 | 12345 | Diabetes |
| 30 | 67890 | Hypertension |
| 40 | 67890 | Hypertension |

**K-Anonymity (k=2)**

| Age Group | Zip Code | Medical Condition |
| --- | --- | --- |
| 20-39 | 12345 | Diabetes |
| 20-39 | 12345 | Diabetes |
| 20-39 | 67890 | Hypertension |
| 20-39 | 67890 | Hypertension |

In this example, age is generalized to create age groups, ensuring that each individual is indistinguishable from at least one other person based on age and zip code.

### **Differential Privacy**

Differential privacy is a technique that adds noise or modifies the data in a way that it becomes challenging to resolve an identity given related attributes in a table with identities. However, the data retains its shape enough to be useful for its use or analysis. Differential privacy uses mathematical algorithms to provide privacy guarantees while maintaining the utility of the data.

**Original Data**

| Age | Zip Code | Salary |
| --- | --- | --- |
| 35 | 12345 | 80,000 |
| 42 | 12345 | 65,000 |
| 30 | 67890 | 90,000 |
| 45 | 67890 | 100,000 |

**Differentially Private Data**

| Age | Zip Code | Salary |
| --- | --- | --- |
| 33 | 12345 | 81,500 |
| 44 | 12345 | 66,300 |
| 32 | 67890 | 91,000 |
| 47 | 67890 | 99,500 |

In this example, noise is added to the age and salary attributes, making it harder to resolve an identity while preserving the overall structure of the data.

### **L-Diversity**

L-Diversity is an extension of k-anonymity that addresses the limitations of the latter. It requires that each group of records sharing the same quasi-identifiers contains at least "l" distinct values for each sensitive attribute, providing more robust privacy protection.

**Original Data**

| Age Group | Zip Code | Medical Condition |
| --- | --- | --- |
| 20-39 | 12345 | Diabetes |
| 20-39 | 12345 | Diabetes |
| 20-39 | 67890 | Hypertension |
| 20-39 | 67890 | Hypertension |

**L-Diversity (l=2)**

| Age Group | Zip Code | Medical Condition |
| --- | --- | --- |
| 20-39 | 12345 | Diabetes |
| 20-39 | 12345 | Asthma |
| 20-39 | 67890 | Hypertension |
| 20-39 | 67890 | Heart Disease |

In this example, the dataset is modified to meet the l-diversity requirement by ensuring that each group with the same quasi-identifiers (age group and zip code) contains at least two distinct medical conditions. This makes it more challenging for an attacker to infer an individual's medical condition based on their age group and zip code.

### **T-Closeness**

T-Closeness is another extension of k-anonymity that ensures the distribution of a sensitive attribute in each group of records sharing the same quasi-identifiers is close to the overall distribution of that attribute in the entire data set. This limits the attacker's ability to infer sensitive information based on the distribution of the attribute values.

**Original Data**

| Age Group | Zip Code | Medical Condition |
| --- | --- | --- |
| 20-39 | 12345 | Diabetes |
| 20-39 | 12345 | Diabetes |
| 20-39 | 67890 | Hypertension |
| 20-39 | 67890 | Hypertension |

**Overall Distribution**

| Medical Condition | Percentage |
| --- | --- |
| Diabetes | 50% |
| Hypertension | 50% |

**T-Closeness (t=0.25)**

| Age Group | Zip Code | Medical Condition |
| --- | --- | --- |
| 20-39 | 12345 | Diabetes |
| 20-39 | 12345 | Hypertension |
| 20-39 | 67890 | Hypertension |
| 20-39 | 67890 | Diabetes |

In this example, the dataset is modified to meet the t-closeness requirement by balancing the distribution of medical conditions in each group, making it difficult for an attacker to infer an individual's medical condition based on the distribution of attribute values within the group.

## Personal Privacy Defenses

dsadsa

## Modern **Examples**

In marketing, companies like Amazon and Google collect vast amounts of data on user behavior, preferences, and demographics. This data can be used for targeted advertising, personalization, and improving user experiences. However, privacy concerns arise when these companies share or sell aggregated or anonymized data to third parties, as reidentification attacks and entity resolution techniques can potentially reveal users' identities. Ultimately, we cannot ensure that the uses of their identities and data are moral or ethical. We can only assume that user data is a means to the data processor’s ends. The ends, goals, or intentions of the processor will not always be the same of the data owner’s. Therefore, organizations responsible for privacy legislation ought to make it easier for users to know when this sort of dynamic takes place, and they ought to encourage and nourish the creation of systems and solutions that allow data owners to have control over how their data is ultimately used.  

Sure, an attacker could combine anonymized browsing history data from an advertising company with publicly available social media profiles or other online resources to reidentify specific users, violating their privacy. However, a seemingly ethical company with a seemingly noble goal can do just as much damage by subverting the ultimate interests of the data owners or users.

To mitigate these risks, companies should employ various defenses, including the basic and somewhat traditional k-anonymity, differential privacy, l-diversity, and t-closeness methods, along with new modern techniques that simplify the process and give granular control over the privacy ↔ returns on user data teeter totter. By using these techniques, organizations can ensure that they are protecting user privacy while still leveraging data for legitimate business purposes. Not to mention, this helps the organization be more compliant with existing and future privacy regulations, legislation, and frameworks.

In summary, reidentification, entity resolution, and identity fingerprinting are techniques that can be used to discover or infer an individual's identity from anonymized, pseudonymized, or aggregated data. These techniques can be employed for both malicious and legitimate purposes. In response, a variety of defenses have been developed to protect individuals' privacy. These techniques are used across various domains, such as marketing, healthcare, finance, and human resources, to protect user privacy while maintaining the utility of the data for the use of the processing organization while staying in line with the perceived and accepted interests of the data owners.

The ultimate issue with entity resolution or any form of figuring out a person’s identity (their attributes) with little data is that the data owner or source cannot be sure that the data processor is using the data for interests that align with their own.  The data source usually doesn’t have knowledge of this either. In other words, the data source must consent with the use of its data; consent - meaning that it perceives the interests (goals) and means (the how) of the data processor to be in agreement with its own (morality, ethics, perception of law.)  Entity resolution makes it easy for institutions, organizations, or even systems (e.g., AI, preference engines) to use the data as a means for its own interests - which usually don’t align with the interests of the data owner or data source (person). In fact, often, the means or the ends of such institutions, organizations, or systems subvert, undermine, or directly conflict with the interests of the data owner or source (person). Even more so, entity resolution, as is its nature, exploits the person through aggressive utilization of the various attributes of such person.

> At the heart of entity resolution and all efforts to ascertain an individual's identity through limited data lies a fundamental issue - the question of trust. Can data owners and sources be confident that the data processor is using their data in ways that align with their own interests and values? Unfortunately, this is rarely the case. The data source is often unaware of the motivations behind the data processor's actions, leaving them vulnerable to exploitation.
> 

> To truly give consent for the use of their data, the data source must be assured that the interests and means of the data processor are in line with their own moral, ethical, and legal values. Entity resolution provides institutions, organizations, and AI systems with a powerful tool to access and use data in ways that serve their own interests, often without consideration for the data owner or source. In some cases, these interests may even be in direct conflict with the values and goals of the data owner.
> 

> Therefore, it is crucial that we prioritize data privacy, ownership, and consent in all data processing activities. We must be vigilant in our efforts to ensure that the use of personal data is not only legal but also ethical and aligned with the best interests of the data owner. Let us strive to create a world where trust and mutual respect underpin all data-related interactions, and where the rights of the individual are protected above all else.’
> 

The advent of preference engines on social media has revolutionized the way in which we consume and engage with content. Yet, as with all innovations, there is a darker side to this technological advancement. The exploitation of personal data has become a hallmark of the digital age, and preference engines are at the forefront of this disturbing trend.

By analyzing the attributes of individuals, preference engines can create customized content that caters to their interests and desires. However, this seemingly innocuous feature is actually a double-edged sword. It can exploit humanity's desire for negativity, as social media algorithms often show more negative content to increase engagement. It can also exploit our desire for things we agree with, creating echo chambers that limit our exposure to diverse perspectives and ideas.

Furthermore, preference engines can also exploit our desire for things that shock us and our desire for novel things. This constant bombardment of new and novel content can lead to social polarization, as individuals become increasingly entrenched in their own beliefs and ideologies.

Even more concerning is the exploitation of our aversion to sexual images. Preference engines have been known to use this aversion to increase engagement by sensationalizing sexual content or using sexual innuendo to grab the attention of users. This can lead to a dangerous normalization of sexual exploitation, and further exacerbate social polarization.

In short, preference engines have become a powerful tool for exploiting individuals, tapping into their most basic desires and emotions to increase engagement and ultimately drive profits for tech companies. It is imperative that we recognize the potential harm of these technologies and work to ensure that they are used ethically and responsibly. Only by prioritizing the dignity and autonomy of the individual can we hope to create a world where technology serves the common good, rather than exploiting the most vulnerable among us.

Even more concerning is the exploitation of our aversion to sexual images, tapping into one of our most basic desires and emotions to increase engagement and ultimately drive profits for tech companies. The impact of this normalization is particularly severe on those struggling with porn addiction or sexual addiction, as it can trigger relapses and exacerbate their conditions. The incessant barrage of sexual content can have a corrosive effect on society, further polarizing individuals and driving a wedge between communities. It leads to an erosion of our social norms and values, as we become increasingly desensitized. It is imperative that we recognize the potential harm of these technologies and work to ensure that they are used ethically and responsibly. Only by prioritizing the dignity and autonomy of the individual can we hope to create a world where technology serves the common good, rather than by exploiting the most vulnerable among us. Companies have created these solutions with the ends of connecting all peoples. However, the means of doing so with AI and user data, and by using methods like entity resolution, have led to the undesirably opposite effect of subverting our humanity with the only benefit being a slightly more connected, yet more divided world.

SOCIAL MEDIA WAS NEVER FREE