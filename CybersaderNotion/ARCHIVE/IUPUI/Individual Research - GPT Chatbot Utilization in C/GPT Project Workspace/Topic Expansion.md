# Topic Expansion

# Process

- Utilize multiple modules
    - GPT module - uses GPT to generate more queries.  Expansion prompts can be configured.  Must use a certain format
    - ML, AI, and Mathematical Implementations
- Look for links
    - 

# Options and Methods

## Traditional Query Expansion Methods

- Synonymy expansion: adding synonyms of the query terms to the original query
- Polysemy expansion: adding different meanings of the query terms to the original query
- Hierarchy expansion: adding broader or narrower terms of the query terms to the original query
- Textual-thesaurus expansion: using external knowledge sources such as a thesaurus or ontology to add related terms to the original query
- Pseudo-relevance feedback: using the top retrieved documents to identify and add new terms to the original query

## Related Topics

- Query reformulation: the process of modifying a user's query to make it more effective in retrieving relevant documents.
- Query understanding: the process of understanding the intent and meaning behind a user's query, which can be used to improve the effectiveness of search results.

# GPT Ideation

I'm looking for simple and effective query or topic expansion methods that can use dictionaries of topic:keywords combinations, keyword lists, or prompts to expand topics, expand queries, and ultimately formulate new prompts, topics, keywords, and then use these to generate search queries with GPT 3. I need you to help me read the following information to formulate methods and code that could be used in Python

---

To summarize, you are looking for methods to expand topics and queries using dictionaries of topic:keywords combinations, keyword lists, or prompts. Here are some traditional query expansion methods you can consider:

1. Synonymy expansion: Adding synonyms of the query terms to the original query.
2. Polysemy expansion: Adding different meanings of the query terms to the original query.
3. Hierarchy expansion: Adding broader or narrower terms of the query terms to the original query.
4. Textual-thesaurus expansion: Using external knowledge sources such as a thesaurus or ontology to add related terms to the original query.
5. Pseudo-relevance feedback: Using the top retrieved documents to identify and add new terms to the original query.

You can also consider related terms and topics such as query reformulation, query understanding, LOD, LDA, BERT, relevance feedback, interactive query filtration, corpus dependent and independent knowledge models, result clustering, word sense disambiguation, weighting schemes, ontology/knowledge model use for expansion, thesaurus-based QE, WWQE, etc.

To implement these methods in Python, you can use various libraries such as nltk, gensim, spaCy, pyLDAvis, scikit-learn, etc., depending on the specific method you choose. You can also use GPT-3 for query generation.

---

## Ideated Methods

### From Papers

- **Improving query expansion using pseudo-relevant web knowledge for information retrieval**
    - This paper proposes a method for improving query expansion by using pseudo-relevant web knowledge for information retrieval. The proposed method, called Web Knowledge based Query Expansion (WKQE), involves the retrieval of top n URLs returned by popular search engines Google, Bing, and DuckDuckGo in response to the initial query. Relevant terms found in these pseudo-relevant documents are used for query expansion. The proposed model achieves improvement in retrieval effectiveness by proposing three weighting models based on tf-idf, k-nearest neighbor (kNN) based cosine similarity, and correlation score. Among the three weighting models, tf-idf scores each of the individual terms obtained from the web content, kNN-based cosine similarity scores the expansion terms to obtain the term-term relationship, and correlation score weighs the selected expansion terms with respect to the whole query. The proposed model showed the best performance for n=20, and a comparative analysis of the WKQE techniques with other related approaches clearly shows significant improvement in retrieval performance. Additionally, the paper analyzes the effect of varying the number of pseudo-relevant documents and expansion terms on the retrieval effectiveness of the proposed model.
    
    [code](Topic%20Expansion/code.md)
    
- **Query expansion – Hybrid framework using fuzzy logic and PRF**
    
    [code](Topic%20Expansion/code.md%20_(2)_)
    

### Traditional

Sure, here are some examples of Python methods that are simple and effective for query expansion:

1. Synonym Expansion:

You can use the **`nltk`** library to perform synonym expansion. Here's an example:

```python
import nltk
from nltk.corpus import wordnet 

def synonym_expansion(query):
    synonyms = []
    for word in query.split():
        for syn in wordnet.synsets(word):
            for lemma in syn.lemmas():
                synonyms.append(lemma.name())
    return ' '.join(set(synonyms))
```

This method takes a query as input, and returns a modified query with synonyms added to it.

1. Pseudo-Relevance Feedback:

You can use **`scikit-learn`** to perform pseudo-relevance feedback. Here's an example:

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity

def pseudo_relevance_feedback(query, documents):
    tfidf = TfidfVectorizer().fit_transform(documents)
    query_vec = TfidfVectorizer().transform([query])
    similarity = cosine_similarity(query_vec, tfidf)
    top_docs_idx = similarity.argsort()[0][-5:] # get top 5 similar documents
    top_docs = [documents[i] for i in top_docs_idx]
    expanded_query = ' '.join([query] + top_docs)
    return expanded_query
```

This method takes a query and a list of documents as input, and returns a modified query with terms from the top 5 similar documents added to it.

1. Ontology-Based Expansion:

You can use **`rdflib`** to perform ontology-based expansion. Here's an example:

```python
from rdflib import Graph

def ontology_expansion(query):
    graph = Graph()
    graph.parse('ontology.rdf', format='xml')
    expanded_query = query
    for subj, pred, obj in graph:
        if obj.toPython() in query:
            expanded_query += ' ' + subj.toPython()
    return expanded_query
```

This method takes a query as input, and returns a modified query with terms from the ontology added to it.

These are just a few examples of the many methods you can use for query expansion in Python. You can modify these methods to suit your specific needs, or explore other methods and libraries that are available.

1. Word Embedding Expansion:

You can use pre-trained word embeddings (such as word2vec or GloVe) to perform word embedding-based expansion. Here's an example using **`gensim`**:

```python
import gensim

def embedding_expansion(query):
    model = gensim.models.KeyedVectors.load_word2vec_format('path/to/word2vec.bin', binary=True)
    expanded_query = query
    for word in query.split():
        if word in model.vocab:
            similar_words = model.most_similar(word, topn=5)
            for sim_word in similar_words:
                expanded_query += ' ' + sim_word[0]
    return expanded_query
```

This method takes a query as input, and returns a modified query with similar words added to it using pre-trained word embeddings.

1. BERT-Based Expansion:

You can use a pre-trained BERT model to perform BERT-based expansion. Here's an example using the **`transformers`** library:

```python
from transformers import pipeline

def bert_expansion(query):
    nlp = pipeline("text2text-generation", model="ramsrigouthamg/t5_paraphraser")
    expanded_query = query
    for i in range(5):
        result = nlp(query, max_length=30, do_sample=True, temperature=0.7)[0]['generated_text']
        expanded_query += ' ' + result.strip()
    return expanded_query
```

This method takes a query as input, and returns a modified query with paraphrased versions of the query using a pre-trained T5 model.

1. Thesaurus-Based Expansion:

You can use a pre-built thesaurus (such as WordNet) to perform thesaurus-based expansion. Here's an example using **`nltk`**:

```python
from nltk.corpus import wordnet

def thesaurus_expansion(query):
    expanded_query = query
    for word in query.split():
        synonyms = []
        for syn in wordnet.synsets(word):
            for lemma in syn.lemmas():
                synonyms.append(lemma.name())
        if synonyms:
            expanded_query += ' ' + ' '.join(set(synonyms))
    return expanded_query
```

1. Concept-Based Expansion:

You can use concept-based expansion to add related concepts to the original query. Here's an example using **`pyLDAvis`** and **`gensim`**:

```python
import pyLDAvis.gensim_models
import gensim

def concept_expansion(query):
    topics = pyLDAvis.gensim_models.prepare(gensim.models.ldamodel.LdaModel.load('lda_model'), gensim.corpora.Dictionary.load('dictionary'), gensim.corpora.MmCorpus('corpus.mm'))
    expanded_query = query
    for topic in topics[1]['terms']:
        expanded_query += ' ' + topic
    return expanded_query
```

This method takes a query as input, and returns a modified query with terms from the most relevant topics added to it.

1. Multi-Word Expansion:

You can use multi-word expansion to add multi-word terms to the original query. Here's an example using a pre-built multi-word dictionary:

```python
def multiword_expansion(query):
    expanded_query = query
    multiword_dict = {'artificial intelligence': 'AI', 'machine learning': 'ML', 'deep learning': 'DL'}
    for key, value in multiword_dict.items():
        if key in query:
            expanded_query = expanded_query.replace(key, value)
    return expanded_query
```

This method takes a query as input, and returns a modified query with multi-word terms replaced with abbreviations.

1. User Feedback Expansion:

You can use user feedback to improve the original query. Here's an example using a simple user feedback loop:

```python
def feedback_expansion(query):
    expanded_query = query
    response = input('Did you find what you were looking for? (Y/N) ')
    if response == 'N':
        feedback = input('What was missing from the results? ')
        expanded_query += ' ' + feedback
    return expanded_query
```

## Papers

[**Improving query expansion using pseudo-relevant web knowledge for information retrieval**](Topic%20Expansion/Improving%20query%20expansion%20using%20pseudo-relevant%20we.md)

## Coding

```python
I'm designing a topic expansion system in Python under topic_expansion.py.  This topic expansion system can take prompts and a topic dictionary which has a dictionary with topic: [keywords] items like below.  I want to make a class called "TopicExpander" that takes a superjob_id and depth parameter.  

Inside the root folder of the project there is a superjobs folder then a hierarchy like below:

    # Assuming the folder structure is:
    # superjobs folder/
    #   superjob_preconfigured_superjob
    #   ├── job_1__1__preconfigured_superjob
    #   │   ├── data
    #   │   │   ├── example1.html
    #   │   │   └── example2.html
    #   │   └── ...
    #   └── ...

# topic dictionary from topic_extraction_data.json (stored in each individual superjob folder)

{
    "6eeb9535-0934-4deb-976f-172cd72db2e4": {
        "1__0__6eeb9535-0934-4deb-976f-172cd72db2e4": {
            "18648289": {
                "topics": {
                    "topic1": [
                        "without",
                        "use",
                        "prior",
                        "permission",
                        "may",
                        "literature",
                        "information",
                        "illustrative",
                        "example",
                        "domain"
                    ],
                    "topic2": [
                        "without",
                        "use",
                        "prior",
                        "permission",
                        "may",
                        "literature",
                        "information",
                        "illustrative",
                        "example",
                        "domain"
                    ],
                    "topic3": [
                        "example",
                        "use",
                        "without",
                        "prior",
                        "permission",
                        "may",
                        "literature",
                        "information",
                        "illustrative",
                        "document"
                    ],
                    "topic4": [
                        "domain",
                        "coordination",
                        "asking",
                        "without",
                        "use",
                        "prior",
                        "permission",
                        "may",
                        "literature",
                        "information"
                    ],
                    "topic5": [
                        "without",
                        "use",
                        "prior",
                        "permission",
                        "may",
                        "literature",
                        "information",
                        "illustrative",
                        "example",
                        "domain"
                    ]
                },
                "entities": {}
            },
            "59162027": {
                "topics": {
                    "topic1": [
                        "without",
                        "use",
                        "prior",
                        "permission",
                        "may",
                        "literature",
                        "information",
                        "illustrative",
                        "example",
                        "domain"
                    ],
                    "topic2": [
                        "without",
                        "use",
                        "prior",
                        "permission",
                        "may",
                        "literature",
                        "information",
                        "illustrative",
                        "example",
                        "domain"
                    ],
                    "topic3": [
                        "example",
                        "use",
                        "without",
                        "prior",
                        "permission",
                        "may",
                        "literature",
                        "information",
                        "illustrative",
                        "document"
                    ],
                    "topic4": [
                        "domain",
                        "coordination",
                        "asking",
                        "without",
                        "use",
                        "prior",
                        "permission",
                        "may",
                        "literature",
                        "information"
                    ],
                    "topic5": [
                        "without",
                        "use",
                        "prior",
                        "permission",
                        "may",
                        "literature",
                        "information",
                        "illustrative",
                        "example",
                        "domain"
                    ]
                },
                "entities": {}
            },
            "91394021": {
                "topics": {
                    "topic1": [
                        "without",
                        "use",
                        "prior",
                        "permission",
                        "may",
                        "literature",
                        "information",
                        "illustrative",
                        "example",
                        "domain"
                    ],
                    "topic2": [
                        "without",
                        "use",
                        "prior",
                        "permission",
                        "may",
                        "literature",
                        "information",
                        "illustrative",
                        "example",
                        "domain"
                    ],
                    "topic3": [
                        "example",
                        "use",
                        "without",
                        "prior",
                        "permission",
                        "may",
                        "literature",
                        "information",
                        "illustrative",
                        "document"
                    ],
                    "topic4": [
                        "domain",
                        "coordination",
                        "asking",
                        "without",
                        "use",
                        "prior",
                        "permission",
                        "may",
                        "literature",
                        "information"
                    ],
                    "topic5": [
                        "without",
                        "use",
                        "prior",
                        "permission",
                        "may",
                        "literature",
                        "information",
                        "illustrative",
                        "example",
                        "domain"
                    ]
                },
                "entities": {}
            }
        }
    }
}

I need you (GPT) to lay out the TopicExpander class to have all of the necessary pieces to creates a system that can expand on the inputted topics and prompts and produce search queries using the OpenAI API.  These search queries will use the google API or something to then retrieve URLs based on the search queries.  The query expansion step will depend on one of many potential methods....we can discuss these after we start the initial TopicExpander class
```

---

```python
1) The main function (for testing at the bottom) should look like this:
# Main function for testing topic_expansion
if __name__ == '__main__':
    # Ask for the OpenAI API key
    api_key = input("Please enter your OpenAI API key: ")

    # Use a custom superjob_id
    superjob_id = "6eeb9535-0934-4deb-976f-172cd72db2e4"  # SET THIS TO TEST
    depth = 0

    expander = TopicExpander(superjob_id, depth)

2) What does retrieve_urls do?

3) For each job "<job_num>__<depth>__<superjob_id>" that is in a topic_extraction_data.json with the matching depth and superjob_id,  an entry will be created in a new file called "topic_expansion.json" which will track many aspects during topic_expansion.  This will have the superjob_id as the utmost key with a child object.  The child_object key is the job_id which is "<job_num>__<depth>__<superjob_id>".  Each job object will then have a topics, entities, prompts, generated_prompts, and parent job keys.  If the parent job key is empty, then the depth should be 0 as well which means it didn't come from another job.

4) expand_topic should return a list of search queries

```

---

Can you change load_topic_dictionary, to instead be load_superjob_data or something like that.  I still think that topic_dictionary should be the ultimate variable that is tracked throughout TopicExpander, but instead I want to import multiple datasources into that variable.  I want the keys under the job_id (ex: "1__0__6eeb9535-0934-4deb-976f-172cd72db2e4") to all be imported into the topic_dictionary under a new topic_extract_data key.

I want additional functions to be created that will even more data to this topic_dictionary:

The data that comes from topic_extraction_data.json will have a sub_job_id with topics and entities as its children.  I want a new function to also get the URL of that sub_job_id via the "metadata.csv" file which is in each job folder.  An example path of this is "".\superjobs\superjob__6eeb9535-0934-4deb-976f-172cd72db2e4\jobs\1__0__6eeb9535-0934-4deb-976f-172cd72db2e4\metadata.csv""

I want the URL to be added within each sub_job_id (next to topics and entities keys as a URL key)

I also want TopicExpander to take some sort of URL expansion limit parameter to limit the number of URLs that can be generated ultimately via expand_topic and retrieve URLs

---

I want the superjob_data that is loaded including the sub_job_ids and their child objects or keys (topics, entities, URLs) to be put under each job_id in the topic_dictionary under a "topic_extraction_meta" key. I want another key called "topic_expansion_meta". The topic_expansion_meta should only have info loaded to it (USING A CUSTOM FUNCTION) when the depth is over 0. In that case, the data for job_ids with a depth 1 lower than the current should be loaded in to a parent jobs key (list) under "topic_expansion_meta" in the super_job_id key in self.topic_dictionary which is ultimately loaded to topic_expansion_data

---

# Explaining functions

I apologize for the confusion. Let me clarify how URLs are handled for each search_query:

1. generate_search_queries:
This function generates a list of search queries based on the topics dictionary. For each topic_id and its keywords, the **`expand_topic`** function is called to get the expanded keywords. However, note that the **`expand_topic`** function implementation is missing in the code you provided. You will need to implement a method to expand the keywords based on the input keywords and depth. Once the expanded keywords are obtained, they are joined using spaces to form a single search query. The search query is then added to the list of search_queries.

Example: If the expanded keywords for a topic are ['AI', 'ethics', 'debate'], the generated search query would be 'AI ethics debate'.

1. retrieve_urls:
This function takes the list of search queries generated by **`generate_search_queries`** and retrieves the URLs associated with each query. For each search query, it calls the **`search`** function from the **`googlesearch`** package, which fetches the search engine results for the query. The **`num_results`** parameter is set to 10, which means that the function retrieves the top 10 URLs for each search query. These URLs are then appended to a list called **`urls`**. After processing all the search queries, the function returns the list of retrieved URLs.

The **`googlesearch`** package is designed to query Google Search programmatically, but be aware that using it may violate Google's terms of service, and your IP address might get temporarily or permanently blocked by Google. It's recommended to use Google's official APIs, like the Google Search API or the Google Custom Search JSON API, for such tasks.

In summary, the **`generate_search_queries`** function creates search queries from the expanded keywords, and the **`retrieve_urls`** function fetches the top 10 URLs from Google Search results for each of those queries.

---

```python
I also now want two separate topic expansion functions.

Each one will utilize GPT through the openAI API which means I'll need to add a "openai_api_key=None" param to the TopicExpander class

1. expand_topic_aggregated - this will take a combination of all of the data in the topic_dictionary to generate search queries via the text-davinci-003.  Gpt should be told the format of the "topics" data, what the entities are, and the URL.  All of this should be laid out in a format that GPT should be able to understand easily while saving space in terms of tokens.  Additionally, a check should be done for the depth.  If the depth is more than 0 then data from the "topic_expansion.json" file for the previous depth should be taken.  You can use the function below that creates it for reference.   In these cases where the depth is more than zero, the "generated_prompts" key from the previous depth should also be known to GPT for it to keep on track by knowing what previous crawls involved searches with.   I also will need to change the TopicExpander class to take an initial prompts, initial_keywords, and initial_topics inputs.  GPT should also be told that these were the original/initial queries, topics, and keywords, and they follow the formats below.

# initial query values
"prompts": ["sample prompt about topic for GPT to learn about"],
        "topics": {"topic1": ['keyword_1','keyword2'], "topic2": ['keyword_1','keyword2']},
        "keywords": ["keyword1", "keyword2", "keyword3"]

# showing how topic_expansion.json is created
    def save_results_to_json(self, urls: List[str]) -> None:
        topic_expansion_data = {
            self.superjob_id: {
                f"{self.job_num}__{self.depth}__{self.superjob_id}": {
                    'topics': self.topic_dictionary[self.superjob_id]['topics'],
                    'entities': self.topic_dictionary[self.superjob_id]['entities'],
                    'prompts': [],  # Add prompts here
                    'generated_prompts': [],  # Add generated prompts here
                    'parent_job': '',  # Add parent job here if applicable
                    'expanded_urls': urls
                }
            }
        }

        with open('topic_expansion.json', 'w') as f:
            json.dump(topic_expansion_data, f, indent=2)

2) expand_topic_granular - this will operate similarly to the aggregated version except that GPT will only be shown data from the topic_dictionary that matches the specific relevant job_id.  Additionally, for the case of more than a depth of zero, then only the data from the topic_expansion.json from the previous depth will be used when the URL of the job is in the the "expanded_urls" key which was created during "save_results_to_json"

Lastly, I think that the "save_results_to_json" function likely needs refactored to also take a prompts input for the generated_prompts key.
```

---

```python
Okay there are some fixes that need to be made with these functions.  I've also list the structure of the topic_dictionary below too (same as the topic_expansion.json):

1) expand_topic_granular
- I don't want just any previous data added from the previous depth.  I only want data with matching URLs.  Additionally your syntax assumes superjob_id then the keys when really each superjob_id has a job_id key, then the topic_extraction_meta and topic_expansion_meta (like below in the topic dictionary example).
- Just make placeholders for functions or make one that only gets the data where the topic_extraction_meta.url matches one of the URLs of the previous depth job from the "expanded_urls" key of the topic_expansion.json.  Then it aggregates this data into a temporary object.

2) expand_topic_aggregated
- this is similar to the granular version except that it doesn't care about matching URLs.  It uses anything in the previous depth by looking at the topic_expansion.json for job_ids that match the current depth - 1.  

3) fix the below current generate_search_queries function

# topic_dictionary

{
  "6eeb9535-0934-4deb-976f-172cd72db2e4": {
    "1__0__6eeb9535-0934-4deb-976f-172cd72db2e4": {
      "topic_extraction_meta": {
        "topics": {
          "t1": [
            "keyword1",
            "keyword2",
            "keyword3"
          ],
          "t2": [
            "keyword4",
            "keyword5",
            "keyword6"
          ]
        },
        "entities": [
          "entity1",
          "entity2"
        ],
        "url": "https://example.com/source1"
      },
      "topic_expansion_meta": {
        "parent_jobs": [
          "1__0__6eeb9535-0934-4deb-976f-172cd72db2e4"
        ]
      }
    }
  }
}
```