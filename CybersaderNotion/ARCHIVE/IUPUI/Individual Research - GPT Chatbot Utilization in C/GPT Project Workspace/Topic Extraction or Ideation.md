# Topic Extraction or Ideation

# Development and Architecture

- Includes prior prompt or topic keywords?
    - Prompt
        - feed prompt into GPT3 to generate keywords
    - Topic Keywords list
    - FEED THIS INTO
    - Guided LDA
- IF NOT - use LDA to generate topics with key words? LDA
- Also, generate infrequent word counts for unique words in the paper
    - Utilize NER (named entity recognition) too using spacy

## Process

## Design with GPT

Okay I've need to design a topic_extraction.py file with a topic_extraction module now.  A run_topic_extraction function should be created in [rexplorer.py](http://rexplorer.py/) like "def run_topic_extraction(self, superjob_id, prompt, topics, keywords):".

"run_topic_extraction" should simply use function from topic_extraction.py.  There should a TopicExtraction or TopicExtractor class.  This class should functions that do various tasks in the outlined process below:

- If there is inputted prompt, topics, or keywords, then use these?
    - For each input
        - For prompt
            - feed prompt into GPT3 to generate additional keywords in a list
            - extract the list from GPT's response (only if the format is correct)
        - For topics dictionary
            - Feed into guided LDA to get outputted topics or keywords (could be dictionary or list)
        - For keywords list
            - Feed into guided LDA to get outputted topics or keywords (could be dictionary or list)
- IF there are no inputted prompt, topics, or keywords - use LDA to generate topics with key words?
- Also, generate infrequent word counts for unique words in the paper
    - Utilize NER (named entity recognition) using spacy

To obtain the data/markup use the provided superjob_id parameter to get the superjob_<superjob_id> folder.  Then, go into the jobs folder. For each "<job_num>**<depth>**<superjob_id>" job folder, go into the data folder and take each HTML file name into a list with their paths or something like that.  You could use a function to output this list.  This list will then be ingested along with the other parameters to do the process that is outlined above.

Below is some more additional information and tech that can be used to accomplish this:

- **Latent Dirichlet Allocation (LDA)**
    - **Technology:** LDA is a generative statistical model that assumes each piece of text (like a document or sentence) is a mixture of a certain number of topics. Each topic is a collection of words with certain probabilities.
    - **Python Library:** **`gensim`**, **`sklearn`**
    - **Use Case:** Suitable for document categorization, information retrieval from unstructured text, and feature selection.
    - **Limitations:**
        - Need to specify the number of topics beforehand.
        - Topics generated may not be meaningful.
        - Doesn't consider word order or sentence context. ****
    - Code Example:
        
        ```python
        from gensim import corpora, models
        
        # let's assume texts is a list of sentences (each sentence is a list of words)
        dictionary = corpora.Dictionary(texts)
        corpus = [dictionary.doc2bow(text) for text in texts]
        
        # train LDA model
        lda = models.LdaModel(corpus, id2word=dictionary, num_topics=10)
        
        # print topics
        lda.print_topics()
        ```
        
- **GuidedLDA**
    - **Technology:** GuidedLDA is a variation of LDA which allows you to guide your topics to be formed around certain seed words.
    - **Python Library:** **`guidedlda`**
        - [https://guidedlda.readthedocs.io/en/latest/#installation](https://guidedlda.readthedocs.io/en/latest/#installation)
    - **Use Case:** When you have a priori knowledge of what kind of topics should be present.
    - **Limitations:**
        - Just like LDA, you have to specify the number of topics.
        - Needs seed words to guide the topics.
    - Code Example:
        
        ```python
        from guidedlda import GuidedLDA
        
        # Define seed topics
        seed_topic_list = [['word1', 'word2', 'word3'], ['word4', 'word5', 'word6'], ...]
        
        # Create a dictionary mapping from word IDs to words.
        word2id = corpora.Dictionary(texts)
        
        # Convert the list of
        
        import numpy as np
        import guidedlda
        
        # Suppose X is your term-document matrix and word2id is a dictionary mapping from words to their corresponding ids in your vocabulary
        X = ...
        word2id = ...
        
        # Define your seeds. The keys of the dictionary are your topics, and the values are lists of seed words for each topic.
        seed_topic_list = {'topic_1': ['keyword1', 'keyword2', 'keyword3'],
                           'topic_2': ['keyword4', 'keyword5', 'keyword6']}
        
        # Build a matrix where the entry in the ith row and jth column is 1 if the ith word is a seed for the jth topic, and 0 otherwise
        seeds = np.zeros((len(word2id), len(seed_topic_list)))
        for t, seeds in enumerate(seed_topic_list.values()):
            for word in seeds:
                i = word2id[word]
                seeds[i, t] = 1
        
        # Instantiate the model. n_topics should be equal to the number of topics you defined in your seeds.
        model = guidedlda.GuidedLDA(n_topics=len(seed_topic_list), n_iter=100, random_state=7, refresh=20)
        
        # Fit the model
        model.fit(X, seed_topics=seeds, seed_confidence=0.15)
        
        # Now you can use the model to transform new documents into topic distributions, or to get the top words for each topic, etc.
        ```
        
- **NER (named entity recognition)**
    - Remember that no NER tool is perfect and results may vary depending on the complexity of the text and the domain. The example above uses a pre-trained model **`en_core_web_sm`** which might not be perfect for all use cases. For more specialized domains, you might need to train a model with your own data, which is a more complex task.
    - If you're looking for a more lightweight solution and your problem domain allows for it, you could also consider a simpler approach: extract all words that are not in a list of common English words. This would give you a list of "unusual" words that might include the entities you're interested in. However, this approach might also give you a lot of noise, like misspelled words or random strings, so it would require some additional filtering.
    - Code Example
        
        ```python
        import spacy
        
        nlp = spacy.load('en_core_web_sm')
        
        text = """Google LLC is an American multinational technology company that specializes in Internet-related services and products. 
        These include online advertising technologies, a search engine, cloud computing, software, and hardware."""
        
        doc = nlp(text)
        
        # Extract entities
        for ent in doc.ents:
            print(ent.text, ent.label_)
        ```
        

---

```python
Finish the below extract_topics functions based on the following information.

# current function

    def extract_topics(self, prompt=None, topics=None, keywords=None):
        # Extract topics here
        # You can use LDA, GuidedLDA or any other method
        pass

# example inputs

prompt = "sample prompt about topic for GPT to learn about"
    topics = {"topic1": ['keyword_1', 'keyword2'], "topic2": ['keyword_1', 'keyword2']}
    keywords = ["keyword1", "keyword2", "keyword3"]

# general process for the function
- If there is inputted prompt, topics, or keywords, then use these?
    - For each input
        - For prompt
            - feed prompt into GPT3 to generate additional keywords in a list
            - extract the list from GPT's response (only if the format is correct)
        - For topics dictionary
            - Feed into guided LDA to get outputted topics or keywords (could be dictionary or list)
        - For keywords list
            - Feed into guided LDA to get outputted topics or keywords (could be dictionary or list)
- IF there are no inputted prompt, topics, or keywords - use LDA to generate topics with key words?
- Also, generate infrequent word counts for unique words in the paper
    - Utilize NER (named entity recognition) using spacy

# examples of functions 

## example of guided LDA usage

import numpy as np
from lda import guidedlda as glda
##from lda import glda_datasets as gldad
##X = gldad.load_data(gldad.NYT)
##vocab = gldad.load_vocab(gldad.NYT)</s>

import lda.datasets as gldad
X = gldad.load_reuters()
vocab = gldad.load_reuters_vocab()
word2id = dict((v, idx) for idx, v in enumerate(vocab))
print(X[:10])
print("TESTING....")
seed_topic_list = [['game', 'team', 'win', 'player', 'season', 'second', 'victory'],
                   ['percent', 'company', 'market', 'price', 'sell', 'business', 'stock', 'share'],
                   ['music', 'write', 'art', 'book', 'world', 'film'],
                   ['political', 'government', 'leader', 'official', 'state', 'country',
                    'american','case', 'law', 'police', 'charge', 'officer', 'kill', 'arrest', 'lawyer']]
model = glda.GuidedLDA(n_topics=5, n_iter=100, random_state=7, refresh=20)
seed_topics = {}
for t_id, st in enumerate(seed_topic_list):
    for word in st:
        seed_topics[word2id[word]] = t_id
model.fit(X, seed_topics=seed_topics, seed_confidence=0.15)
n_top_words = 10
topic_word = model.topic_word_
for i, topic_dist in enumerate(topic_word):
    topic_words = np.array(vocab)[np.argsort(topic_dist)][:-(n_top_words+1):-1]
    print('Topic {}: {}'.format(i, ' '.join(topic_words)))

## example of LDA usage

from gensim import corpora, models

# let's assume texts is a list of sentences (each sentence is a list of words)
dictionary = corpora.Dictionary(texts)
corpus = [dictionary.doc2bow(text) for text in texts]

# train LDA model
lda = models.LdaModel(corpus, id2word=dictionary, num_topics=10)

# print topics
lda.print_topics()

## example of NER (used for extract_entities function with HTML file paths)

import spacy

nlp = spacy.load('en_core_web_sm')

text = """Google LLC is an American multinational technology company that specializes in Internet-related services and products. 
These include online advertising technologies, a search engine, cloud computing, software, and hardware."""

doc = nlp(text)

# Extract entities
for ent in doc.ents:
    print(ent.text, ent.label_)
```

---

## Topic Extraction JSON and its structure

The current JSON output is structured as follows:

- The first key is a UUID (unique identifier) representing the extraction process.
- The second key, which is in the format **`depth__iteration__UUID`**, contains the depth and iteration of the extraction process and the UUID.
- The third key represents the file's index number.
- Inside this, there are two sub-keys: "topics" and "entities". "topics" contains a list of topics where each topic is a tuple of (topic_id, topic_keywords). "entities" is currently empty because there were no entities extracted.

Me : 

I have some questions about the structure and where it comes from:
Why is there indexes for each HTML page under "topics"?  I'm confused why an index is needed. Moreover I'm confused why the values of those indexes or the values in that array are phrases or sentences. I thought that GuidedLDA generates keywords.  What format and type of data does GuidedLDA and the LDA functions both output?  If there is an option to output multiple types then that would be great. These types could include a list of individual keywords, a topic list of lists with topic:keywords combos, or there could be a topics values with little descriptions or summaries of the pages.  I want to know what these functions are supposed to output

GPT;

When using the **`GuidedLDA`** model, the output is a document-topic matrix and a topic-word matrix. The document-topic matrix represents the probability distribution of topics for each document, while the topic-word matrix represents the probability distribution of words for each topic.

The current implementation in your code outputs the top words for each topic, which are in the form of phrases or sentences. These are not ideal representations, as you would expect the output to be a list of individual keywords or a list of topics with their associated keywords.

```python
def _extract_topics(self, model, vocab):
    # Extract the topics from the model and map them to the words in the vocabulary
    topic_word_distributions = model.topic_word_
    topics = []
    for topic_idx, word_distribution in enumerate(topic_word_distributions):
        # Get the top N words for each topic (N is defined by 'n_top_words' parameter)
        top_word_indices = word_distribution.argsort()[:-self.n_top_words - 1:-1]
        top_words = [vocab[i] for i in top_word_indices]
        topics.append((topic_idx, top_words))
    return topics
```

---

Explain GuidedLDA's output with the matrix stuff and show examples so I can understand all of the data that I'm getting out of it. Also include and explanation and examples of the outputs of the LDA function

---

**LDA Output**

The LDA output, as implemented in your **`_run_lda`** function, is a list of tuples where each tuple represents a topic and its associated top words with their probabilities. The format of the output is as follows:

```python
[  (topic_index, "word1_prob * word1 + word2_prob * word2 + ..."),  ...]
```

For example, let's say you have 2 topics and 5 top words for each topic. The output might look like this:

```python
[  (0, "0.025 * apple + 0.020 * banana + 0.018 * orange + 0.017 * grape + 0.015 * strawberry"),  (1, "0.030 * dog + 0.023 * cat + 0.019 * fish + 0.018 * bird + 0.012 * hamster")]
```

**GuidedLDA Output**

In the case of GuidedLDA, the output is composed of two matrices: the document-topic matrix and the topic-word matrix.

1. Document-Topic Matrix: This matrix represents the probability distribution of topics for each document. The shape of this matrix is (n_documents, n_topics). Each row corresponds to a document, and each column represents a topic. The values in the matrix are the probabilities of each topic in the corresponding document.

Example:

```python
[
  [0.6, 0.4],  # Document 1 has 60% topic 0 and 40% topic 1
  [0.3, 0.7]   # Document 2 has 30% topic 0 and 70% topic 1
]
```

1. Topic-Word Matrix: This matrix represents the probability distribution of words for each topic. The shape of this matrix is (n_topics, vocab_size). Each row corresponds to a topic, and each column represents a word in the vocabulary. The values in the matrix are the probabilities of each word in the corresponding topic.

Example:

```python
[
  [0.025, 0.020, 0.018, 0.017, 0.015, ...],  # Topic 0 word probabilities
  [0.030, 0.023, 0.019, 0.018, 0.012, ...]   # Topic 1 word probabilities
]
```

Using the topic-word matrix, you can extract the top words for each topic (similar to the LDA output I explained earlier) and create a list of tuples with the topic index and its associated top words.

Example:

```python
[  (0, ['apple', 'banana', 'orange', 'grape', 'strawberry']),
  (1, ['dog', 'cat', 'fish', 'bird', 'hamster'])
]
```

Please note that in your current code, the LDA output is more like a phrase or sentence. You can modify the **`_extract_topics`** function as I explained in the previous response to have the output in the desired format of a list of tuples with the topic index and its associated top words.

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

# GPT Ideation

[Papers Summarized](Topic%20Extraction%20or%20Ideation/Papers%20Summarized.md)

[Related Terms](Topic%20Extraction%20or%20Ideation/Related%20Terms.md)

# Methods and Options

## Based on Papers

### GPT3 and BERT: Ask Me What You Need: Product Retrieval using Knowledge from GPT-3

[Code and method](Topic%20Extraction%20or%20Ideation/Code%20and%20method.md)

### GPT2 → BM25: **Query expansion with artificially generated texts**

[Code and methods](Topic%20Extraction%20or%20Ideation/Code%20and%20methods.md%20_(2)_)

### A study: query expansion methods in information
retrieval

[Code and methods](Topic%20Extraction%20or%20Ideation/Code%20and%20methods.md%20_(3)_)

### **A Semantic Focused Web Crawler Based on a Knowledge Representation Schema & Agent for Recommending Information Relevant to Web-based Discussion by Generating Query Terms using GPT-3**

[Code and methods](Topic%20Extraction%20or%20Ideation/Code%20and%20methods.md)

## Traditional & Modern

[misc methods](Topic%20Extraction%20or%20Ideation/misc%20methods.md)

### LDA

Latent Dirichlet Allocation (LDA) is an unsupervised method that discovers topics from a collection of documents. After you train an LDA model, it can provide a list of topics, each represented as a collection of keywords. You can then use these keywords to guide GPT in generating prompts. For example, if LDA generates a topic represented by the words ["climate", "global warming", "carbon"], you can instruct GPT to generate a prompt using these words.

Here's a simple example in Python using the **`gensim`** library:

```python
from gensim import corpora, models

# let's assume texts is a list of sentences (each sentence is a list of words)
dictionary = corpora.Dictionary(texts)
corpus = [dictionary.doc2bow(text) for text in texts]

# train LDA model
lda = models.LdaModel(corpus, id2word=dictionary, num_topics=10)

# print topics
lda.print_topics()
```

### GuidedLDA

GuidedLDA is a variation of LDA that incorporates prior knowledge in the form of "seed topics". A seed topic is a collection of words that you believe represent a topic. GuidedLDA uses these seed topics to guide the topic discovery process. This can be useful if you have some knowledge about what topics should be present in your documents.

Here's an example of how you could use seed topics with GuidedLDA:

```python
from guidedlda import GuidedLDA

# Define seed topics
seed_topic_list = [['word1', 'word2', 'word3'], ['word4', 'word5', 'word6'], ...]

# Create a dictionary mapping from word IDs to words.
word2id = corpora.Dictionary(texts)

# Convert the list of

import numpy as np
import guidedlda

# Suppose X is your term-document matrix and word2id is a dictionary mapping from words to their corresponding ids in your vocabulary
X = ...
word2id = ...

# Define your seeds. The keys of the dictionary are your topics, and the values are lists of seed words for each topic.
seed_topic_list = {'topic_1': ['keyword1', 'keyword2', 'keyword3'],
                   'topic_2': ['keyword4', 'keyword5', 'keyword6']}

# Build a matrix where the entry in the ith row and jth column is 1 if the ith word is a seed for the jth topic, and 0 otherwise
seeds = np.zeros((len(word2id), len(seed_topic_list)))
for t, seeds in enumerate(seed_topic_list.values()):
    for word in seeds:
        i = word2id[word]
        seeds[i, t] = 1

# Instantiate the model. n_topics should be equal to the number of topics you defined in your seeds.
model = guidedlda.GuidedLDA(n_topics=len(seed_topic_list), n_iter=100, random_state=7, refresh=20)

# Fit the model
model.fit(X, seed_topics=seeds, seed_confidence=0.15)

# Now you can use the model to transform new documents into topic distributions, or to get the top words for each topic, etc.
```

### NER (named entity recognition)

```python
import spacy

nlp = spacy.load('en_core_web_sm')

text = """Google LLC is an American multinational technology company that specializes in Internet-related services and products. 
These include online advertising technologies, a search engine, cloud computing, software, and hardware."""

doc = nlp(text)

# Extract entities
for ent in doc.ents:
    print(ent.text, ent.label_)
```

Remember that no NER tool is perfect and results may vary depending on the complexity of the text and the domain. The example above uses a pre-trained model **`en_core_web_sm`** which might not be perfect for all use cases. For more specialized domains, you might need to train a model with your own data, which is a more complex task.

If you're looking for a more lightweight solution and your problem domain allows for it, you could also consider a simpler approach: extract all words that are not in a list of common English words. This would give you a list of "unusual" words that might include the entities you're interested in. However, this approach might also give you a lot of noise, like misspelled words or random strings, so it would require some additional filtering.

### BERTopic

- Too much hardware cost and issues

## GPT-Based / Model-Defined

Using GPT-3 for topic extraction from large articles might not be straightforward due to the character limit. However, there are several approaches you can consider to work around this limitation:

1. **Text Segmentation**: Instead of feeding the entire article to GPT-4, you can break the article into smaller segments. You can either do this by splitting the text into paragraphs or by using a sliding window approach where you take a fixed number of characters or words at a time, overlapping between consecutive windows. For each segment, you can then use GPT-4 to generate a summary or extract topics. Finally, you can aggregate the results to get the overall topics for the entire article.
2. **Combination of Techniques**: You can combine traditional topic extraction techniques like LDA, LSA, or TextRank with GPT-4. You can first apply one of these techniques to get an initial set of topics or key phrases. Then, you can feed these key phrases to GPT-4 to generate a more coherent and human-readable summary, which can further help in refining the extracted topics.
3. **Compression before Summarization**: You can preprocess the articles to remove less relevant content, such as boilerplate text, ads, or navigation elements. This can help you focus on the main content and potentially reduce the size of the text. Additionally, you can remove stopwords, perform stemming, or lemmatization to further compress the text before feeding it to GPT-4 for summarization or topic extraction.
4. **Iterative Summarization**: You can use an iterative approach to summarization. Start by summarizing the whole article with GPT-4. If the article is too large to fit within the character limit, summarize larger sections of the article first. Then, use the summaries of those sections as input to create a final summary.