# Brainstorm

Generating dictionary attack, password guessing wordlists from OSINT, social media, and unstructured textual data

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