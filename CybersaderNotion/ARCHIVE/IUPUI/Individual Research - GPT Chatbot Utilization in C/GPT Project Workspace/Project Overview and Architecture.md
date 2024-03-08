# Project Overview and Architecture

I plan on building out a flexible local or cloud-based system for training a GPT model on cybersecurity data. I want to know how fast it trains, if it can train well on specific topics, and how this can be utilized at scale. I will also look at how model size affects speed and effectiveness of training and generating prompt based on very specific domains of Cybersecurity. For example, GPT 3 may not be able to answer a specific question about CV2X despite me feeding it a related article, because GPT 3 is a large model and needs more training data. Additionally, I will attempt to develop a workflow that is 2-tiered for automated problem domain training. The idea is to feed a custom program that I build URLs of articles or papers in a specific cyber domain, extract potential topics and prompts from the textual data (using topic modeling or another technique), and then expand on those topics via more specialized search engine queries. I can call this "naive topic expansion" or something of the like. Then the GPT model is trained on those topics. This would focus more on the specialized training of the model. I understand that evaluating effectiveness could also be quite difficult if not impossible. Most of these results will probably require a more qualitative approach for evaluation

## General Processes

1. **Data Acquisition**: Develop a web scraping and crawling system that can fetch the articles or papers in the cybersecurity domain based on the given URLs. Use libraries like Scrapy, BeautifulSoup or Selenium for web scraping, and manage rate limiting to avoid getting blocked by websites.
2. **Topic Extraction**: Implement a topic extraction module to analyze the textual data from the fetched articles and identify potential topics and prompts. You can use topic modeling techniques like LDA, LSA, or TextRank for this purpose. Additionally, you can experiment with using GPT-3 or GPT-4 for topic extraction and prompt generation.
3. **Topic Expansion**: Design a topic expansion system that uses the extracted topics to generate more specialized search engine queries. Explore different query expansion methods such as synonymy expansion, polysemy expansion, hierarchy expansion, textual-thesaurus expansion, and pseudo-relevance feedback. Leverage the search engine APIs (e.g., Google Search API) to execute the generated queries and retrieve more articles.
4. **Recursive Expansion**: Develop a mechanism to control the recursiveness of the topic expansion process. Implement parameters like the maximum depth of recursion and the number of topics to expand at each level. This will help in managing the complexity and scope of the generated dataset.
5. **Data Preprocessing**: Clean and preprocess the collected textual data. This involves tasks like removing HTML tags, special characters, and stopwords, as well as tokenization, stemming, and lemmatization.
6. **GPT Model Training**: Train a GPT model (like GPT-2) on the preprocessed data. Fine-tune the model to specialize in the cybersecurity domain. Consider using different model sizes and compare their speed and effectiveness in terms of training and generating responses.
7. **Prompting System**: Design a user-friendly interface that allows users to interact with the trained GPT model. You can use a web-based or desktop interface to take input from users and display the model's generated responses. The interface can be similar to the one found in chat.openai.com.
8. **Evaluation**: Establish a qualitative evaluation approach to assess the effectiveness of the trained model. This can involve expert reviews or measuring user satisfaction with the model's responses.

## Tech Stack

- Python that can double for a desktop and web-based interface if possible
- Everything is “portable” and therefore can all be stored in a local folder

## Solution Architecture

### Overall Architecture

- Training through topic/query expansion System
- Prompting System

### Topic/Query Expansion and Recursive Web Crawling or Corpus/Dataset Generation System

I'm trying to design a system that can use GPT-3 to generate search queries for web crawling and training a GPT model to create a specialized chatbot. I want to give the user who is training the GPT model the ability to define search queries or describe what they want to train on. I want the GPT model to then generate potential search queries for the user based on a list of URLs that it is fed or based on search queries it generates. Essentially, I'm trying to create a web crawling and training system that revolves around ideas of recursion and expansion. I've also heard phrases that describe this process as "query expansion", "topic expansion", etc. At the core, I want to design a cross-domain, cross-language, recursive, flexible, and controllable process for repeatable information retrieval and query expansion that can feed training data into a domain-specific specialized GPT model (likely GPT 2) that can be utilized by internal teams in organizations.

- Designing a Topic Expansion system:
    - The idea is to feed a custom program that I build URLs of articles or papers in a specific cyber domain, extract potential topics and prompts from the textual data (using topic modeling or another technique), and then expand on those topics via more specialized search engine queries. I can call this "naive topic expansion" or something of the like. Then the GPT model is trained on those topics. This would focus more on the specialized training of the model. I understand that evaluating effectiveness could also be quite difficult if not impossible. Most of these results will probably require a more qualitative approach for evaluation.
    - I want to design a ML and GPT/AI-based program that I can feed URLs, extract topics and/or prompts from the textual data, create specialized search queries or GPT prompts for that topic (this means prompts for GPT or search queries for Google), perform search queries or GPT prompts, then extract more topics from the returned search results of GPT answers, and so on. This means that the process will be recursive. I want to have control over the recursiveness, how many topics it expands on, and how many times the whole process is repeated
    - The topic expansion system could use LDA, LSA, clustering, Text mining, TextRank, or most likely another larger GPT model like GPT 4 or 3.

Traditional Query Expansion Methods

- Synonymy expansion: adding synonyms of the query terms to the original query
- Polysemy expansion: adding different meanings of the query terms to the original query
- Hierarchy expansion: adding broader or narrower terms of the query terms to the original query
- Textual-thesaurus expansion: using external knowledge sources such as a thesaurus or ontology to add related terms to the original query
- Pseudo-relevance feedback: using the top retrieved documents to identify and add new terms to the original query

### Web Scraping and Ingesting Corpora

- I need to use something like Scrapy or BeautifulSoup
- I need to use rate limiting

### Prompting System

- The prompting is actually relatively simple
- It should have an interface similar or exactly like the one in chat.openai.com