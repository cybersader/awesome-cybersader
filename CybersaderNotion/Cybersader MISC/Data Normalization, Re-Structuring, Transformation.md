# Data Normalization, Re-Structuring, Transformation, Standardization, Compatibility

- [Unstructured | The Unstructured Data ETL for Your LLM](https://unstructured.io/)
- [Re-Structuring Unstructured Data. Restructuring Unstructured Data… | by Sahil Sharma | Medium](https://medium.com/@DataEngineeer/re-structuring-unstructured-data-d4a2e39a876a)
- [Looking at Structured, Unstructured, and Semi-Structured Data (with…](https://www.matillion.com/blog/looking-at-structured-unstructured-and-semi-structured-data-with-examples)
- [JSON-LD - JSON for Linking Data](https://json-ld.org/#)
- 
- Formats:
    - Unstructured
    - Semi-Structured
    - Structured
    
    More like “Unstructured”
    
    EDI, protobuf, HTML
    
    |
    
    Parquet, CDW internal e.g. SUPER, VARIANT etc
    
    |
    
    Avro
    
    |
    
    JSON, XML, YAML, Ion, XHTML
    
    |
    
    Delimited, LJSON
    
    More like “Structured”
    
    The actual data can only be discovered by going ahead and reading it – known as “**schema on read**“
    
    # Data Pipelines with Data Classification
    
    **Normalizing Semi-Structured/Proprietary Event Formats:** I'm trying to find an approach to classifying or figuring out an event's data format when I know the event is semi-structured or unstructured. I also know that it's not JSON in this case from a previous check in my pipeline.The idea is to be able to manage sets of regex for various levels of data formats. For example, syslog always starts with a "<_>", but there are many other syslog implementations after that part.So, here's my approach to classifying and recognizing what data format an event is in:
    
    1. Start with general / tell-tale signs of certain formats
    2. Check for specific implementations of the format
    3. Give the most specific delineation of a data format
    4. Return unstrucutured if none are found
    
    Currently, I'm trying to do this semi-structured data event classification from within pipelines manually with lots of regex checks, then feeding the recognized formats (like syslog) into other evals or matching functions with even more specific regexes by using a filter.  It's like a big data classification funnel that tries to figure out the most accurate way to describe a data format.The other idea I had was to utilize a global variable or something similar with a `regex` column and a `data_format` column that could have a format like `generalFormatName__moreSpecificFormat__evenMoreSpecificFormat__mostSpecificFormat` .  Then I would use a  code function to program a system to check through this global variable object or something similar till it figures out the format.Any ideas on simplifying this process in a way that is relatively easy to manage or from one place?I couldn't figure out how to do this with Parsers.