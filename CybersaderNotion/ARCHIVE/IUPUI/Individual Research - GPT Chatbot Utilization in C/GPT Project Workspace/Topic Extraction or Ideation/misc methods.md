# misc methods

### **1. Latent Dirichlet Allocation (LDA)**

- **Technology:** LDA is a generative statistical model that assumes each piece of text (like a document or sentence) is a mixture of a certain number of topics. Each topic is a collection of words with certain probabilities.
- **Python Library:** **`gensim`**, **`sklearn`**
- **Use Case:** Suitable for document categorization, information retrieval from unstructured text, and feature selection.
- **Limitations:**
    - Need to specify the number of topics beforehand.
    - Topics generated may not be meaningful.
    - Doesn't consider word order or sentence context.

### **2. Non-Negative Matrix Factorization (NMF)**

- **Technology:** NMF is a linear algebraic model, that factors high-dimensional vectors into a low-dimensionality representation. Similar to PCA, but the vectors are non-negative.
- **Python Library:** **`sklearn`**
- **Use Case:** Multi-variate analysis, and useful where PCA isn't applicable due to non-negativity constraints.
- **Limitations:**
    - The requirement of non-negativity can limit its applicability.
    - Need to specify the number of topics beforehand.

### **3. Latent Semantic Analysis (LSA)**

- **Technology:** LSA (or LSI) uses Bag of Words (BoW) model to convert text data into numerical form, then applies truncated SVD (Singular Value Decomposition) to reduce its dimensionality and
- **Use Case:** Information retrieval, document comparison, and clustering.
- **Limitations:**
    - LSA is unable to capture multiple meanings of words (polysemy).
    - LSA does not handle the effects of synonyms well.

### **4. BERTopic**

- **Technology:** BERTopic is a topic modeling technique that combines c-TF-IDF with the BERT embeddings to create dense clusters that form topics. It also uses UMAP for dimensionality reduction and HDBSCAN for the creation of topics.
- **Python Library:** **`bertopic`**
- **Use Case:** When you need state-of-the-art performance and interpretability is important as BERTopic visualizes topics interactively.
- **Limitations:**
    - Computationally intensive and time-consuming for large datasets.
    - Requires powerful hardware to run (GPUs preferred).

### **5. GuidedLDA**

- **Technology:** GuidedLDA is a variation of LDA which allows you to guide your topics to be formed around certain seed words.
- **Python Library:** **`guidedlda`**
- **Use Case:** When you have a priori knowledge of what kind of topics should be present.
- **Limitations:**
    - Just like LDA, you have to specify the number of topics.
    - Needs seed words to guide the topics.

### **6. Corex Topic Model**

- **Technology:** CorEx (Correlation Explanation) is a hierarchical topic model that leverages total correlations between word count vectors to generate more interpretable topics.
- **Python Library:** **`corextopic`**
- **Use Case:** If you have large text data and need interpretable topics.
- **Limitations:**
    - It is not as popular or widely used as methods like LDA or NMF.
    - It might be slower than other methods for larger datasets.