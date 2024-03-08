# Code and method

Yes, you could feasibly use Python to implement topic extraction from markup in .txt files using a simplified version of the GPT-3 and BERT models discussed above. Here's a rough pseudocode sketch for how you might do this.

In this example, we'll use the transformers library to access GPT-3 and BERT models. You'll need to sign up for an API key with OpenAI to use GPT-3 and you'll also need PyTorch or TensorFlow installed to use the transformers library.

```python
# Required Libraries
from transformers import GPT2LMHeadModel, GPT2Tokenizer, BertModel, BertTokenizer
from sklearn.metrics.pairwise import cosine_similarity
import torch

# Load GPT-3 model
gpt3_tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
gpt3_model = GPT2LMHeadModel.from_pretrained('gpt2')

# Load BERT model
bert_tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
bert_model = BertModel.from_pretrained('bert-base-uncased')

# Load your text files
with open('your_file.txt', 'r') as file:
    data = file.read()

# Tokenize your data
gpt3_inputs = gpt3_tokenizer(data, return_tensors='pt')

# Extract topics using GPT-3
gpt3_outputs = gpt3_model(**gpt3_inputs)
gpt3_topics = gpt3_outputs.logits.argmax(-1)

# Now, to rank topics using BERT, first tokenize the topics
bert_inputs = bert_tokenizer(gpt3_topics, return_tensors='pt')

# Get BERT embeddings
bert_outputs = bert_model(**bert_inputs)
bert_embeddings = bert_outputs.last_hidden_state.mean(1)

# Now, you can use cosine similarity or any other method to rank topics
# For example, you might compare the cosine similarity of the topic embeddings to the BERT embedding of the entire document
doc_embedding = bert_model(**bert_tokenizer(data, return_tensors='pt')).last_hidden_state.mean(1)
topic_scores = cosine_similarity(bert_embeddings.detach().numpy(), doc_embedding.detach().numpy())

# You can then sort the topics based on these scores
sorted_topics = [x for _, x in sorted(zip(topic_scores, gpt3_topics), key=lambda pair: pair[0], reverse=True)]
```