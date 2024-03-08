# Papers Summarized

# Ask Me What You Need:
Product Retrieval using Knowledge from GPT-3

This paper is “Ask Me What You Need:
Product Retrieval using Knowledge from GPT-3”

## ABSTRACT

As online merchandise become more common, many studies focus
on embedding-based methods where queries and products are represented in the semantic space. These methods alleviate the problem
of vocab mismatch between the language of queries and products.
However, past studies usually dealt with queries that precisely describe the product, and there still exists the need to answer imprecise queries that may require common sense knowledge, i.e., ‘what
should I get my mom for mother’s day.’ In this paper, we propose a
GPT-3 based product retrieval system that leverages the knowledgebase (KB) of GPT-3 for question answering; users do not need to
know the specific illustrative keywords for a product when querying.
Our method tunes prompt tokens of GPT-3 to prompt knowledge and
render answers that are mapped directly to products without further
processing. Our method shows consistent performance improvement
on two real-world and one public dataset, compared to the baseline
methods. We provide an in-depth discussion on leveraging GPT-3
knowledge into a question answering based retrieval system.

## CCS CONCEPTS

• Information systems → Information retrieval; • Computing
methodologies → Knowledge representation and reasoning.

## KEYWORDS

product retrieval, pretrained language models

## System Implementation

Figure 1: The overview of the proposed product retrieval system. (a) The retrieval model takes a query and selects top-𝐾 categories
according to the category score. (b) The top-𝐾 categories are mapped to candidate products using category-to-product mapping table.
(c) Lastly, the candidate products are ranked according to the ranking model.

Training method. To optimize GPT-3 for our downstream task, we
use the p-tuning method [6]. We formulate 𝑞˜𝑖 as a concatenation,
"[PROMPT1:𝑑
] [𝑞ˆ𝑖] [MASK]", in which [PROMPT1:𝑑
] are the trainable continuous prompt tokens, [𝑞ˆ𝑖] is the context, and [MASK] is
the target. 𝑑 is the hyperparameter determining the number of prompt
tokens. In p-tuning method, only the embeddings for the trainable
continuous prompt tokens are updated with the Cross-Entropy loss,
𝐿 = −
∑︁
𝑁
𝑖=1
𝑦
⊤
𝑖
𝑙𝑜𝑔M (𝑞˜𝑖), (1)
where M refers to the GPT-3 model, 𝑁 is the number of train data
and 𝑦𝑖
is the one-hot vector of the target category token in the
vocabulary of a language model M. In practice, fine-tuning could
also be adopted, but many work observed that GPT-style models
perform poorly to NLU tasks with fine-tuning [6]. Thus, we use
p-tuning in utilizing GPT-3 as an implicit KB for desired knowledge,
in other words, finding a relevant product’s category for a given
query. The comparison between performances of fine-tuning and
p-tuning is discussed in Section 4.2.
Inference. To select the top-𝐾 relevant product categories 𝐶ˆ, we
obtain the category score 𝑠𝑖 for each category. Let’s say the category
𝑐𝑖
is ‘baby product’ and its tokens are 𝑇 = [‘baby’, ‘pro-’, ‘-duct’].
𝑠𝑖
is formulated as,
𝑠𝑖 =
∑︁
|𝑇 |
𝑗=1
𝛼𝑗M (𝑡𝑗
|𝑞˜), (2)
where 𝑡𝑗 denotes 𝑗-th token in 𝑇 . The 𝛼𝑗
is the hyperparameter for
the weight of each token probability and Í
𝑗 𝛼𝑗 = 1. 𝑠𝑖
is calculated
as the weighted average of the logit scores of tokens in 𝑐𝑖 ∈ 𝐶,
conditioned on the query.
In our experiment, we heuristically set 𝛼1 to 0.8 and let the rest
share the same weight of Í|𝑇 |
𝑗=2
𝛼𝑗 = 0.2. We give the highest weight
to the first token because it is the most important in decoding the
answer from GPT-3. Finally, category set 𝐶 is sorted by 𝑠𝑖 and the
top-𝐾 categories 𝐶ˆ are used in the ranking stage.
Table 1: Basic Statistics of Datasets.
Dataset # of Pair # of Categories # of Items
Train Valid Test
Gift 44,173 5,522 5,522 1,357 41,589
Co-purchase 67,524 8,441 8,440 1,076 64,020
Google LCC 5603 476 476 5 6555

### 2.2 Ranking Model

We first use the category-to-product mapping table, Figure 1-(b),
to prepare the candidate product set. The candidate products are
then ranked using the ranking model, which can be any model that
leverages embedding-based similarity methods.
In this paper, we use BERT [3] with multi-layer perceptron (MLP)
layers as the simple embedding method to leverage flexibility in the
architecture. Learning latent representations of queries and products
with this embedding method and then calculating a similarity score
is shown in Figure 1-(c). Specifically, given the query 𝑞ˆ and the
candidate product 𝑝ˆ𝑖
, the similarity score is calculated as,
𝑆 (𝑞,ˆ 𝑝ˆ𝑖) = 𝑓 (𝐸𝑞ˆ
; 𝜃) · 𝑓 (𝐸𝑝ˆ𝑖
;𝑤), (3)
where 𝐸𝑞ˆ and 𝐸𝑝ˆ𝑖
represent the BERT embeddings of 𝑞ˆ and 𝑝ˆ𝑖
, and
𝑓 is MLP layers parameterized by 𝜃 and 𝑤.
We use Binary Cross-Entropy (BCE) loss between the predicted
score 𝑆 (𝑞,ˆ 𝑝ˆ𝑖) and ground truth label 𝑦ˆ which is defined as,
𝑦ˆ =
(
1, (𝑞,ˆ 𝑝ˆ𝑗) ∈ 𝐷
𝑡𝑟
0, otherwise
(4)
where 𝐷
𝑡𝑟 is the set of query and product pairs (𝑞𝑖
, 𝑝𝑗) in the data
log. We also use the weighted loss to handle the class imbalance
problem between positive and negative samples. The weight update
happens both in the BERT parameters and MLP parameters.

### Comparison with other methods

We compare against a conventional baseline (TopPop), a traditional
web retrieval baseline (BM25 [11]), and an transformer-based baseline that is widely used for NLP modelling (BERT [3]). All these
baselines are formed as a 2-stage retrieval system, where the retrieval
model follows each baseline method but the same ranking model as
ours is shared across all baselines. Note that the top 10 categories
were retrieved for the gift and co-purchase dataset, whereas the top
one category was retrieved for the Google LLC dataset.

TopPop. Toppop baseline retrieves categories according to the category popularity. We test toppop on two levels, age and gender of the
user asking the query.
BM25. Overall, BM25 remains a strong baseline for zero-shot text
retrieval [11]. BM25 is a bag-of-words (BOW) information retrieval
model that relies on an exact lexical match between a query and
documents (categories).
BERT-based similarity search. The current effective approaches
integrate BERT [3] as an embedding generation component in the
retrieval model, with the input of a concatenated string of query and
candidate texts. BERT and a simple nonlinear model are then trained
with BCE loss where incorrect pairs get penalized.

# **Query expansion with artificially generated texts**

## Abstract

A well-known way to improve the performance of document retrieval is to expand the user's query. Several approaches have been proposed in the literature, and some of them are considered as yielding state-of-the-art results in IR. In this paper, we explore the use of text generation to automatically expand the queries. We rely on a well-known neural generative model, GPT-2, that comes with pre-trained models for English but can also be fine-tuned on specific corpora. Through different experiments, we show that text generation is a very effective way to improve the performance of an IR system, with a large margin (+10% MAP gains), and that it outperforms strong baselines also relying on query expansion (LM+RM3). This conceptually simple approach can easily be implemented on any IR system thanks to the availability of GPT code and models.

## Introduction

In the IR traditional setting, a user expresses his information needs with the help
of a query. Yet, it is sometimes difficult to match the query with the documents,
for instance because of the query vocabulary may differ from the documents.
Especially when the query is short, the performance of the system is usually
poor, as it is difficult to detect the precise focus of the information need, and
the relative importance of the query terms.
Query expansion aims at tackling these problems by transforming the short
query into a larger text (or set of words) that make it easier to match documents
from the collection. The main difficulty of query expansion is obviously to add
only relevant terms to the initial query. Several techniques have been proposed
in the literature, based on linguistic resources (e.g. synonym lists) or based on
the documents themselves (e.g. pseudo-relevance feedback).
In this paper, we explore the use of recent text generation models to expand
queries. We experimentally demonstrate that the recent advances in neural generation can dramatically improve ad-hoc retrieval, even when dealing with specialized domains. More precisely, through different experiments, we show that:

1. texts artificially generated from the query can be used for query expansion;
2. this approach does not only provide new terms to the query, but also a better
estimate of their relative weights;
3. in addition, it also provides a better estimate of the importance (i.e. weight)
of original query words;
4. this approach can also be used on specialized domains.

The paper is structured as follows. After a presentation of the related work,
Section 3 details the different components of our approach. Several experiments
are then detailed in Section 4. Last, some concluding remarks are given in Section 5

## Method and Implementation

As it was previously explained, our approach is very simple as it relies on existing
tools and techniques. From a query, multiple texts are generated by a GPT-2
model using the query as the seed. Note that the generation process is not
deterministic, and thus, even with the same seed, the texts are different. In the
experiments reported below, 100 texts per query are generated (unless specified
otherwise). These texts are concatenated and considered as the new query. In
our experiments, this new, very large, query is then fed to a simple BM25+ IR
system, but it could obviously be used in any other IR system.

An example of a text generated from a query is presented in Fig. 1. As one
can see, the generated text, while completely invented (note the barrel prices), is relevant for the query. It contains many terms, absent from the original query,
that are more or less closely related to the information need, such as orthographic
variants (United States vs. U.S.), meronyms-metonyms (barrel vs. oil), hypernyms (energy vs. oil) and more generally any paradigmatic (consumer, producer
vs. industry) or syntagmatic (production for oil) relations. It is worth noting
that such texts also give a valuable information about the relative frequency of
each terms (contrary to thesauri or embeddings).

Fig.1: “ U.S. oil production has been declining steadily for decades and it is not expected to
reverse. In fact, some argue that it may even get worse. The long-term trend is for oil
production to decline at a rate of about 1 percent per year. With production of about
8 million barrels per day now, there is no way the United States can replace its current
output.
The U.S. oil boom was a result of an energy revolution in the 1970s that led to increased
oil production, and a significant change in the global oil market. The U.S. now produces
about 2.3 million barrels of oil per day, the highest it has been in over 30 years.
The United States is now the world’s largest oil producer and the fourth largest oil
exporter.
What happened?
When oil prices peaked in the 1970s, the United States was the world’s largest oil
producer. But over the next several decades, the United States’ oil production began
to decline. The decline was most pronounced in the 1980s, when the United States
began to fall behind other oil producing countries.
The oil price decline in the 1970s was not entirely voluntary. The United States was
producing less oil and exporting more oil than it was consuming. The Federal Reserve
controlled the amount of dollars in the Federal Reserve’s reserves, so the United States
was not exporting as much oil as it was producing. The decline in U.S. oil production
was a result of the declining price of oil.
The price of oil had declined from $8 per barrel in 1973 to $2.50 per barrel in 1977. In
1979, the price of oil reached a high of $15.75 per barrel. By 1983, the price of oil had
fallen to $4.65 per barrel. By 1986, the price of oil had fallen to $1.86 per barrel. By
the end of the 1980s, the price of oil had fallen to $1.24 per barrel.
The decline in oil prices was a direct result of the energy revolution in the 1970s. The
United States was the world’s largest oil producer, but the United States was also the
world’s largest consumer of oil. When oil prices fell, so did the cost of producing oil”

### Models and Params

GPT-2 comes with several pre-trained models, having different size in terms
of parameters (from 124M to 1.5B). As it was previously said, their training
data was news-oriented general language. The largest model was used for two of
the tested collections (see below). While these all-purpose models are fine for IR 

collections whose documents are also general language, it may not be appropriate
for domain-specific IR collections. In the experiment reported in the next section,
we use the ohsumed collection, made of medical documents. For this collection,
we have fine-tuned the GPT-2 355M model on the documents of the collection in
order to adapt the language model to the specific medical syntax and vocabulary.
The fine-tuning was stopped after 250,000 samples were processed (this number
of sample process indirectly controls the under/over-fitting to the specialized
corpus) was set to and other parameters (batch size, optimizer, learning rate...)
let to their defaults. Although a larger set of medical documents could be used
(from Pubmed for instance), this small fine-tuned model is expected to be more
suited to generate useful documents to enrich the query.
Concerning the generation of documents, for reproducibity purposes, here
are the main GPT-2 parameters used (please refer to GPT-2 documentation1
):
length=512, temperature=0.5, top p=0.95, top k = 40.

## Conclusion

Neural approaches are increasingly used in IR, with mitigated results, especially
when compared with ”traditional” bag-of-word approaches [9,24]. Here, the neural part is successfully used outside of a ”traditional” IR system (but note that
it could be used with any IR systems, since it simply enriches the query). The
expansion approach presented in this paper is simple and easy to implement
(thanks to the availability of the GPT models and code) while offering impressive gains. Lot of parameters could be further optimized, especially on the GPT
model side (to influence the ”creativity” of the text generation), and the finetuning capabilities should also be explored more thoroughly (influence of bigger
specialized corpus if available, precise mix between pre-trained and fine-tuning,
etc.). The recent availability of GPT-32 makes it possible to even get greater
gains thanks to the alleged high quality of its outputs.
This whole approach also offers many research avenues: in this work, we
have used text generation as a way to perform data augmentation on the query
side, but it could also be used to augment the representation of the documents
(even if in practice, the cost is still prohibitive on large collection). All machinelearning (neural or not) approaches based on pseudo-relevance feedback to train
their model could instead use similar text generation with the advantage that
they would not be limited by the number of potential relevant documents in the
shortlist. And of course, similar data-augmentation strategy could be used for
other tasks than document retrieval.
More fundamentally, the recent improvements of text generation also question the relevance of the document retrieval task. Indeed, it is possible to envision
systems that will be able to generate one unique document answering the user’s
information need, similarly to question-answering. If the generative model is
trained on the document collection, the generated document will serve as a summary (which is one of the popular applications of GPT-x models) of the relevant
documents. Yet, the current limitations of the models tested in this paper make
them far from being suited for this ultimate task: the generated documents do
deal with the subject of the query, and thus use a relevant vocabulary, but do not
provide accurate, factual information (as seen in the Example in Fig. 1 about
the price of oil barrels).

# A study: query expansion methods in information
retrieval

## Abstract

—This paper study about a review of the literature on Query Expansion (QE)
methods. The main aspects of the review study are the methods, limitations of the QE
methods, and datasets used in QE. As the results of this study, we can conclude several
methods used on QE i.e., Ontology, Association Rules, Wordnet, Methathesaurus, Synonym
mapping, Concept-based, Local Co-occurrence, and Latent Semantic Indexing (LSI). Each of
the methods still has limitations. For datasets used in QE, many researchers use public
datasets

## Some Methods

Based on our review study, the methods used in QE have limitations. In the study using ontology in
QE, the method is unable to display the relationship between the terms in the document. Meanwhile, the Association Rules are limited to capture the relationship between concepts. The use of synonym mapping depends heavily on the completeness of the dictionary used and can occur over expansion, causing no relevant documents for some queries. The limitations of QE methods shown in Table 1.

Tabel 1. QE Methods
No Cites Uses Methods Limitations
1 [10] Ontology a
2 [25] Ontology a
3 [9] Ontology a
4 [26] Ontology a
5 [27] Ontology a
6 [28] Ontology a
7 [7] Association rules b
8 [22] Association rules b
9 [23] Lexicon domain c
10 [13] Association rules b
11 [20] Synonym mapping d
12 [8] WordNet e
13 [21] WordNet e
14 [19] Metathesaurus f
15 [24] Concept-Based g
16 [18] Relevance feedback h
17 [17] Local co-occurrence i
18 [16] Latent Semantic Indexing (LSI) j

## Query Expansion Dataset

Investigation results of our studies towards datasets, it has been used to perform QE shown in Table 2.
The previous research used two types of datasets to conduct QE, i.e., Private and Public datasets.
Based on our observation towards literature, QE uses various datasets, i.e., TREC, Wikipedia,
DBpedia, CLEF, etc. Based on Table 2, we can conclude that fourteen of eighteen research studies use
public datasets in their studies and other studies use private datasets.

Tabel 2. QE DATASET
No Cites Dataset Available
1 [10] TREC-CDS Public
2 [25] TREC and CLEF Public
3 [9] ImageCLEFmed Public
4 [26] Wikipedia Public
5 [27] TREC Public
6 [28] TREC Public
7 [7] DBPedia, Wikipedia Public
8 [22] CLEF 2003 corpus Public
9 [23] CLEF-IP patent Public
10 [13] CISI Public
11 [20] Malayalam Private
12 [8] Code Private
13 [21] CACM,CERC Public
14 [19] Medline Public
15 [24] Wikipedia Public
16 [18] XML Private
17 [17] TREC Public
18 [16] CA Private

## Conclusion and Future Work

In this paper, we have reviewed the methods, method limitations, and dataset used by QE on IR. As
the results, there are seven methods that can be used in QE such as Ontology, Association Rules,
Wordnet, Methathesaurus, Synonym mapping, concept-based, Local Co-occurrence, and Latent
Semantic Indexing (LSI). From the literature review, QE Research uses many public datasets. The
datasets used in QE include TREC-CDS (Clinical Decision Support), TREC, CLEF, I'mageCLEFmed, Wikipedia, DBpedia, Wikipedia, CLEF 2003 corpus, CLEF-IP patent, CISI Dataset,
Malayalam, Code, CACM, CERC, Medline, XML, and CA. The methods used in QE still have
limitations. For future work, to overcome these limitations, this study proposes a combination of
several methods, such as the use of Ontology and Association Rules, to overcome the limitations of
each method.

# **A Semantic Focused Web Crawler Based on a Knowledge Representation Schema**

## Query Expansion Related Terms Mentioned

- word polysemy problem
- knowledge-based, corpus-based approach, + relevance feedback

## Abstract

The Web has become the main source of information in the digital world, expanding to heterogeneous domains and continuously growing. By means of a search engine, users can systematically search over the web for particular information based on a text query, on the basis of a domain-unaware web search tool that maintains real-time information. One type of web search tool is the semantic focused web crawler (SFWC); it exploits the semantics of the Web based on some ontology heuristics to determine which web pages belong to the domain defined by the query. An SFWC is highly dependent on the ontological resource, which is created by domain human experts. This work presents a novel SFWC based on a generic knowledge representation schema to model the crawler’s domain, thus reducing the complexity and cost of constructing a more formal representation as the case when using ontologies. Furthermore, a similarity measure based on the combination of the inverse document frequency (IDF) metric, standard deviation, and the arithmetic mean is proposed for the SFWC. This measure filters web page contents in accordance with the domain of interest during the crawling task. A set of experiments were run over the domains of computer science, politics, and diabetes to validate and evaluate the proposed novel crawler. The quantitative (harvest ratio) and qualitative (Fleiss’ kappa) evaluations demonstrate the suitability of the proposed SFWC to crawl the Web using a knowledge representation schema instead of a domain ontology.

# **Agent for Recommending Information Relevant to Web-based Discussion by Generating Query Terms using GPT-3**

## **Abstract:**

In Web discussions, which have become mainstream with COVID-19, the amount of information possessed and the level of understanding of the discussion differ among participants. As a result, some participants may not be able to speak up satisfactorily, and this can hinder consensus building in the discussion as a whole. Therefore, we develop an agent that automatically recommends information related to the discussion as information that facilitates participants to speak up. The agent first obtains necessary discussion data from on-going Web discussions. The information to be recommended is determined by real-time search. Query words for the search are generated using a pre-trained query-term-generation model. When selecting information to recommend from the information obtained in the search, a model that classifies the acquired information according to the discussion phase is used. The results of a discussion experiment in which an agent intervened in a Web-based discussion showed many results indicating the effectiveness of the agent, although there are some points that need to be improved. However, since the scale of the discussion experiment was small, it will be necessary to validate the agent in large-scale discussions in the future.