# GPT Trainer

# GPT Ideation

```python
# Assuming the folder structure is:
    # superjobs folder/
    #   superjob_preconfigured_superjob
    #   ├── job_1__1__preconfigured_superjob
    #   │   ├── data
    #   │   │   ├── example1.html
    #   │   │   └── example2.html
    #   │   └── ...
    #   └── ...

Write me a GPT trainer class in Python that can take an inputted superjob_id, then crawl through each superjob in the superjobs folder, each job within the jobs folder, and take each html file in the "data" folder and train a GPT model using the openai API.  I'm not sure how much data it takes to train each separate size of GPT model so maybe show me a breakout of the comparisons. 

I need this class to also handle preprocessing of html data in the simplest way possible.  Implement a verbose flag and use a combination of tqdm and colorama to achieve good pretty prints during operations.

Lastly, make a simple test function for the "if __name__ == '__main__':" that has a hardcoded ready-to-go prepared superjob_id and ask the user for an OpenAI API token to input before running.  

Also, have checks for certain parameters missing or obvious errors
```

---