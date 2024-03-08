# Code and methods

# Summarized papers

The two papers you provided touch on some interesting techniques for information retrieval and topic extraction, particularly in a web context.

The first paper, "**A Semantic Focused Web Crawler Based on a Knowledge Representation Schema**", presents a novel semantic focused web crawler (SFWC) that utilizes a generic knowledge representation schema to model the crawler's domain, reducing the complexity and cost of constructing a more formal representation. It leverages a similarity measure that combines the inverse document frequency (IDF) metric, standard deviation, and the arithmetic mean to filter web page contents that align with the domain of interest.

The second paper, "**Agent for Recommending Information Relevant to Web-based Discussion by Generating Query Terms using GPT-3**", develops an agent that automatically recommends information related to ongoing web discussions. It uses a pre-trained query-term-generation model, presumably GPT-3, to generate query words for real-time search.

# Method and Code

Based on the techniques and methods mentioned in these papers, I can outline a simple methodology for topic extraction from web data:

1. **Web Scraping:** Utilize Python libraries like **`requests`** and **`BeautifulSoup`** to retrieve and parse web data. This is the first step where you crawl the website and fetch the HTML data.
2. **Text Preprocessing:** Clean the fetched data to remove HTML tags, special characters, etc. You can use the **`re`** (regular expressions) library in Python for this purpose.
3. **Document Representation:** Convert the cleaned data into a format that can be processed by machine learning algorithms. Techniques like Bag of Words (BoW), TF-IDF, or even word embeddings (like word2vec, GloVe, or FastText) can be used depending on the complexity of your task.
4. **Topic Extraction:** Use unsupervised machine learning techniques to extract topics. If your data is not too large and you want a simple solution, Latent Dirichlet Allocation (LDA) is a common choice. For a more modern approach that could potentially yield better results, you could use BERTopic, a topic modeling technique that leverages transformers and c-TF-IDF.
5. **Query Expansion:** Based on the topics extracted, you could use methods like relevance feedback, synonym mapping, or even transformer models like GPT-3 to generate search engine prompts that can be used to further expand on the topics.

Here is a simplified code that implements these steps using Python:

```python
from bs4 import BeautifulSoup
import requests
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import LatentDirichletAllocation
from bertopic import BERTopic

# Step 1: Web Scraping
url = "https://www.example.com"
data = requests.get(url).text
soup = BeautifulSoup(data, 'html.parser')

# Step 2: Text Preprocessing
text = soup.get_text()
cleaned_text = re.sub(r'\W', ' ', text)  # remove non-word characters

# Step 3: Document Representation
vectorizer = TfidfVectorizer(stop_words='english')
tfidf = vectorizer.fit_transform([cleaned_text])

# Step 4: Topic Extraction
lda = LatentDirichletAllocation(n_components=5)
lda.fit(tfidf)
topics = lda.transform(tfidf)

# OR you could use BERTopic for topic extraction
bertopic = BERTopic(language="english")
topics, _ = bertopic.fit_transform([cleaned_text])

# Step 5: Query Expansion
# Here, you could use methods like relevance feedback, synonym mapping, or even a transformer model
# like GPT-3 to generate search engine prompts that can be used to further expand on the topics.from bs4 import BeautifulSoup
import requests
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import LatentDirichletAllocation
from bertopic import BERTopic

# Step 1: Web Scraping
url = "https://www.example.com"
data = requests.get(url).text
soup = BeautifulSoup(data, 'html.parser')

# Step 2: Text Preprocessing
text = soup.get_text()
cleaned_text = re.sub(r'\W', ' ', text)  # remove non-word characters

# Step 3: Document Representation
vectorizer = TfidfVectorizer(stop_words='english')
tfidf = vectorizer.fit_transform([cleaned_text])

# Step 4: Topic Extraction
lda = LatentDirichletAllocation(n_components=5)
lda.fit(tfidf)
topics = lda.transform(tfidf)

# OR you could use BERTopic for topic extraction
bertopic = BERTopic(language="english")
topics, _ = bertopic.fit_transform([cleaned_text])

# Step 5: Query Expansion
# Here, you could use methods like relevance feedback, synonym mapping, or even a transformer model
# like GPT-3 to generate search engine prompts that can be used to further expand on the topics.
```