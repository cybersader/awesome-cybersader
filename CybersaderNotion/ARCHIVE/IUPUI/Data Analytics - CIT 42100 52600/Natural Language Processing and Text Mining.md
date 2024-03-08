# Natural Language Processing and Text Mining

# basics

## Text analysis

- what does the actual text mean, represent, model, etc
- derive insights

## Text mining

- relationships and patterns
- component of text analysis

## Corpus

- large collection of text

# Text Mining Steps

- Pre-processing & Parsing
    - Text is unstructured
    - usually involves tokenizing
    - Some tech:
        - tokenization
        - POS tagging
        - Stemming

## Part of Speech (POS) Tagging and Dependency Tree

- Break up things into their linguistical pieces

![Untitled](LESSONS/Untitled%2025.png)

## Lemmatization & Stemming

- Lemmatization
    - Turn words into base form
- Stemming
    - No dictionary required
        - Breaking words down with patterns
        - EX; remove ‘s’

# Representing Text

## Tokenization

![Untitled](LESSONS/Untitled%2026.png)

## Case folding

![Untitled](LESSONS/Untitled%2027.png)

## Bag of Words Representation

- represent text as set of words
- Gets rid of the order of the words

### TFIDF

- TF - term frequency
    - get frequency of words in text
- Get rid of stopwords
- look at document frequency (DF)
    - how often it appears in text (corpus)

# Topic Modeling

Learn topics from set of documents.  

- Applies to a large document or a document set
- Learn number of topics and important terms or keywords for topics

## Categorizing Documents by Topics

Methods:

- Latent Semantic Analysis
    - older 1988
- Probabilistic Latent Semantic Analysis
- Latent Dirichlet Allocation
- Neural Network
    - Graph Model - Based + NN
    - Word Vectors
    - Semantic Analysis

## Visualizing Textual Data

- Word Clouds
    - Most common words
    - BE CAREFUL of stopword lists
        - Sometimes these are manually curated per use case
        - ask some knowledge engineers