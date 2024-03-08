# Project Options

## 1) Correlation Between Compromised Passwords and Social Media Accounts with NLP (OR any unstructured text) (English)

### Ideas

- Compare word vector (Word2Vec) or some other representation or word embedding between the password and the Pwned Passwords.
- Use BERT or some sort of ontology mapper to apply to textual data on a social media account or other accounts to guess passwords
- Use NER along with ontology:
    - Use OSINT to get related social media accounts
    - Use scraping to pull data out of page
    - Pull out names, proper nouns, etc.
    - Apply to ontology mapping
    - generate passwords using common passwords along with ontology mapping to get potential passwords
- Password mangling, prediction, and cracking using NLP models and methods
    - generative models
    - inference
    - prediction

### Model

- Should be able to take text representation of a social media page and a dataset of passwords to compare if the social media page has too much revealing information compared to the password.  Generate a score based on this information.

### Data Sets

- [Have I Been Pwned: Pwned Passwords](https://haveibeenpwned.com/Passwords) ****
- [Yahoo Password Frequency Corpus](https://figshare.com/articles/dataset/Yahoo_Password_Frequency_Corpus/2057937)
- [RockYou](https://www.kaggle.com/datasets/wjburns/common-password-list-rockyoutxt)
    - [rock_you | TensorFlow Datasets](https://www.tensorflow.org/datasets/catalog/rock_you)
- MySpace
    - [Passwords - SkullSecurity](https://wiki.skullsecurity.org/index.php/Passwords)
- 000webhost
    - https://github.com/devanshi13/Password-Strength-Classifier
- [Passwords - SkullSecurity](https://wiki.skullsecurity.org/index.php/Passwords)
- [SecLists/Passwords at master · danielmiessler/SecLists](https://github.com/danielmiessler/SecLists/tree/master/Passwords/Leaked-Databases)

## 2) Anomaly Detection for Failed Authentication Time Series Data

### Model

- Combine SARIMA model with Decision Tree to look for anomalous failed authentication

### Data Sets

- [User-Computer Authentication Associations in Time - Cyber Security Research](https://csr.lanl.gov/data/auth/)

## 3) Password Spray Detection Methods Using Decision Tree, SARIMA Model, and Manual vs. Automated Validation of Attack Success Based on Attributes

### Model

- Uses a combination of SARIMA and Decision Tree to check if password failures goes above a certain threshold, and if it does check whether that attacker had a successful connection.

### Testing

- It’s possible this could be run using Azure Directory in combination with some pentesting tools:
    - BadBlood
    - Bloodhound, Plumhound
    - Bruteloops
- SIEM
    - Sentinel along with some Kibana Query Language and some implementation of SARIMA somehow
    - Use ELK stack along with some sort of fake AD environment

### Data Sets

- [Unified Host and Network Data Set - Cyber Security Research](https://csr.lanl.gov/data/2017/)

## 4) Cybersecurity Ontology Curation, Generation, Analysis, Engineering

### Resources

- [Semantic Web Standards](https://www.w3.org/2001/sw/wiki/Main_Page)
- 

### Model

- 

### Application

- 

### Testing

- 

### Data Sets

-