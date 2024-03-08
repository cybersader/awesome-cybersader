# Neural text generation for query expansion in information retrieval | IEEE/WIC/ACM International Conference on Web Intelligence and Intelligent Agent Technology

Tags: GPT, Information Retrieval, Query Expansion
Terms: - GPT-2
- large margin (+10 %MAP gains)
- outperforms strong baselines also relying on query expansion (RM3)
- GPT models are easily available
Year: 2021
the gist: Expanding users’ query is a well-known way to improve the performance of document retrieval systems. Several approaches have been proposed in the literature, and some of them are considered as yielding state-of-the-art results in Information Retrieval. In this paper, we explore the use of text generation to automatically expand the queries. We rely on a well-known neural generative model, OpenAI’s GPT-2, that comes with pre-trained models for English but can also be fine-tuned on specific corpora. Through different experiments and several datasets, we show that text generation is a very effective way to improve the performance of an IR system, with a large margin (+10 %MAP gains), and that it outperforms strong baselines also relying on query expansion (RM3). This conceptually simple approach can easily be implemented on any IR system thanks to the availability of GPT code and models.