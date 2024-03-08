# code

```python
import requests
from bs4 import BeautifulSoup
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors

def get_urls(query, num_results=10):
    """
    Retrieve top n URLs returned by Google, Bing, and DuckDuckGo for a given query.
    """
    urls = []
    
    # Google
    url = f"https://www.google.com/search?q={query}&num={num_results}"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    for g in soup.find_all('div', class_='r'):
        anchors = g.find_all('a')
        if anchors:
            urls.append(anchors[0]['href'])
    
    # Bing
    url = f"https://www.bing.com/search?q={query}&count={num_results}"
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    for li in soup.find_all('li', class_='b_algo'):
        anchors = li.find_all('a')
        if anchors:
            urls.append(anchors[0]['href'])
    
    # DuckDuckGo
    url = f"https://duckduckgo.com/html/?q={query}&kl=us-en&kp=-2&kj=888888&k1=-1&kx=h&kh=1&km=m&kt=a&kd=-1&kaj=m&kae=b&ka=p&ks=m&kaq=-1&kao=-1&kau=-1&kap=-1&kba=-1&ktm=1&kai=1&ka=h&k5=1&kaa=1&ka1=-1&ke=-1&kf=-1&ko=s&kak=-1&kav=1&kam=google-maps&kay=browser-sys&kbaexp=b&ksm=1"
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    for a in soup.find_all('a', class_='result__url'):
        urls.append(a['href'])
    
    return urls

def get_expansion_terms(query, num_results=10, num_terms=10):
    """
    Retrieve relevant terms from the top n URLs returned by search engines for a given query.
    """
    urls = get_urls(query, num_results)
    texts = []
    for url in urls:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        text = soup.get_text()
        texts.append(text)
    
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(texts)
    nn = NearestNeighbors(n_neighbors=num_terms)
    nn.fit(X)
    query_vector = vectorizer.transform([query])
    indices = nn.kneighbors(query_vector, return_distance=False)
    expansion_terms = []
    for index in indices[0]:
        expansion_terms.extend(vectorizer.get_feature_names()[index].split())
    
    return expansion_terms

def wkqe(query, num_results=20, weighting='tf-idf'):
    """
    Web Knowledge based Query Expansion (WKQE) method for information retrieval.
    """
    expansion_terms = get_expansion_terms(query, num_results=num_results, num_terms=10)
    expanded
```

```python
import requests
from bs4 import BeautifulSoup
from collections import Counter
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
from scipy.stats import pearsonr

# Set the initial query
query = "information retrieval"

# Retrieve the top n URLs from Google, Bing, and DuckDuckGo
num_urls = 20
google_results = requests.get(f"https://www.google.com/search?q={query}&num={num_urls}")
bing_results = requests.get(f"https://www.bing.com/search?q={query}&count={num_urls}")
duckduckgo_results = requests.get(f"https://duckduckgo.com/html/?q={query}&kl=us-en&t=h_&iar=html&ia=web&iax=about&iai=http://duckduckgo.com")

# Parse the HTML content of each search engine result page
google_soup = BeautifulSoup(google_results.content, "html.parser")
bing_soup = BeautifulSoup(bing_results.content, "html.parser")
duckduckgo_soup = BeautifulSoup(duckduckgo_results.content, "html.parser")

# Extract the text content from each URL
google_urls = [a["href"] for a in google_soup.find_all("a", href=True)]
bing_urls = [a["href"] for a in bing_soup.find_all("a", href=True)]
duckduckgo_urls = [a["href"] for a in duckduckgo_soup.find_all("a", href=True)]

google_text = ""
bing_text = ""
duckduckgo_text = ""

for url in google_urls:
    try:
        r = requests.get(url)
        soup = BeautifulSoup(r.content, "html.parser")
        text = soup.get_text()
        google_text += text + "\n"
    except:
        pass

for url in bing_urls:
    try:
        r = requests.get(url)
        soup = BeautifulSoup(r.content, "html.parser")
        text = soup.get_text()
        bing_text += text + "\n"
    except:
        pass

for url in duckduckgo_urls:
    try:
        r = requests.get(url)
        soup = BeautifulSoup(r.content, "html.parser")
        text = soup.get_text()
        duckduckgo_text += text + "\n"
    except:
        pass

# Extract relevant terms from the retrieved URLs
google_terms = Counter(google_text.split()).most_common(100)
bing_terms = Counter(bing_text.split()).most_common(100)
duckduckgo_terms = Counter(duckduckgo_text.split()).most_common(100)

# Use the relevant terms for query expansion
expanded_query = query
for term, count in google_terms+bing_terms+duckduckgo_terms:
    if term not in query:
        expanded_query += " " + term

# Calculate the tf-idf, kNN-based cosine similarity, and correlation scores
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform([google_text, bing_text, duckduckgo_text])
terms = vectorizer.get_feature_names()

knn = NearestNeighbors(n_neighbors=2, algorithm="ball_tree")
knn.fit(X)
distances, indices = knn.kneighbors(X)

tfidf_scores = dict(zip(terms, X[0].toarray()[0]))
knn_scores = {}
for i in range(len(terms)):
    knn_scores[terms[i]] = 1 - distances[0][1-i]

correlation_scores = {}
for term in terms:
    x = X[:, vectorizer.vocabulary_[term]].toarray()
    corr, _ = pearsonr(x.flatten(), X[0].toarray().flatten())
    correlation_scores
```

```python
import requests
from bs4 import BeautifulSoup
from collections import Counter
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
from scipy.stats import pearsonr

# Set the initial query
query = "information retrieval"

# Retrieve the top n URLs from Google, Bing, and DuckDuckGo
num_urls = 20
google_results = requests.get(f"https://www.google.com/search?q={query}&num={num_urls}")
bing_results = requests.get(f"https://www.bing.com/search?q={query}&count={num_urls}")
duckduckgo_results = requests.get(f"https://duckduckgo.com/html/?q={query}&kl=us-en&t=h_&iar=html&ia=web&iax=about&iai=http://duckduckgo.com")

# Parse the HTML content of each search engine result page
google_soup = BeautifulSoup(google_results.content, "html.parser")
bing_soup = BeautifulSoup(bing_results.content, "html.parser")
duckduckgo_soup = BeautifulSoup(duckduckgo_results.content, "html.parser")

# Extract the text content from each URL
google_urls = [a["href"] for a in google_soup.find_all("a", href=True)]
bing_urls = [a["href"] for a in bing_soup.find_all("a", href=True)]
duckduckgo_urls = [a["href"] for a in duckduckgo_soup.find_all("a", href=True)]

google_text = ""
bing_text = ""
duckduckgo_text = ""

for url in google_urls:
    try:
        r = requests.get(url)
        soup = BeautifulSoup(r.content, "html.parser")
        text = soup.get_text()
        google_text += text + "\n"
    except:
        pass

for url in bing_urls:
    try:
        r = requests.get(url)
        soup = BeautifulSoup(r.content, "html.parser")
        text = soup.get_text()
        bing_text += text + "\n"
    except:
        pass

for url in duckduckgo_urls:
    try:
        r = requests.get(url)
        soup = BeautifulSoup(r.content, "html.parser")
        text = soup.get_text()
        duckduckgo_text += text + "\n"
    except:
        pass

# Extract relevant terms from the retrieved URLs
google_terms = Counter(google_text.split()).most_common(100)
bing_terms = Counter(bing_text.split()).most_common(100)
duckduckgo_terms = Counter(duckduckgo_text.split()).most_common(100)

# Use the relevant terms for query expansion
expanded_query = query
for term, count in google_terms+bing_terms+duckduckgo_terms:
    if term not in query:
        expanded_query += " " + term

# Calculate the tf-idf, kNN-based cosine similarity, and correlation scores
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform([google_text, bing_text, duckduckgo_text])
terms = vectorizer.get_feature_names()

knn = NearestNeighbors(n_neighbors=2, algorithm="ball_tree")
knn.fit(X)
distances, indices = knn.kneighbors(X)

tfidf_scores = dict(zip(terms, X[0].toarray()[0]))
knn_scores = {}
for i in range(len(terms)):
    knn_scores[terms[i]] = 1 - distances[0][1-i]

correlation_scores = {}
for term in terms:
    x = X[:, vectorizer.vocabulary_[term]].toarray()
    corr, _ = pearsonr(x.flatten(), X[0].toarray().flatten())
    correlation_scores
```

```python
# select the top n documents from each search engine
google_results = search('initial query', num_results=n, search_engine='google')
bing_results = search('initial query', num_results=n, search_engine='bing')
duckduckgo_results = search('initial query', num_results=n, search_engine='duckduckgo')

# create a list of all the urls from the top n documents
urls = []
for result in google_results:
    urls.append(result.url)
for result in bing_results:
    urls.append(result.url)
for result in duckduckgo_results:
    urls.append(result.url)

# extract relevant terms from the web content of the top n documents
relevant_terms = []
for url in urls:
    content = get_web_content(url)
    relevant_terms.extend(extract_terms(content))

# apply the tf-idf, kNN, and correlation weighting models
expanded_query = ""
if weighting_model == "tf-idf":
    expanded_query = apply_tf_idf(relevant_terms)
elif weighting_model == "kNN":
    expanded_query = apply_kNN(relevant_terms)
elif weighting_model == "correlation":
    expanded_query = apply_correlation(relevant_terms)

# use the expanded query for information retrieval
retrieved_docs = retrieve_documents(expanded_query)

# evaluate the retrieval effectiveness of the expanded query
evaluation_results = evaluate_retrieval(retrieved_docs)

# output the results
print("Expanded Query: " + expanded_query)
print("Retrieved Documents: ")
for doc in retrieved_docs:
    print(doc.title + " (" + doc.url + ")")
print("Evaluation Results: " + str(evaluation_results))
```