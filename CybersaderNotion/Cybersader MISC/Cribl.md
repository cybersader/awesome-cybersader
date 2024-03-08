# Cribl

# Cribl Notes

## Cribl Breakdown

[Route, Replay, and Re-deliver - YouTube](https://www.youtube.com/watch?v=AEWaDRQCIcw) 

- What is Cribl
    - fancy pipeline system for data engineering and transformation
- Strong features
    - Not just simple event streaming
        - Protocol support for data transportation
        - supports data shapes and formats
            - unstructured, structured, etc.
        - scale
            - infrastructure scales in many directions and is flexible
        
        ![Untitled](Cribl/Untitled.png)
        
    - Input → Processing → Output
        
        ![Untitled](Cribl/Untitled%201.png)
        
        - Inputs:
            - Solicited and Listening (receiving vs collecting)
        - Processing:
            - Tons of baked in functions
- LogStream Demo takeaways
    
    ![Untitled](Cribl/Untitled%202.png)
    
    - Data Collector
        
        ![Untitled](Cribl/Untitled%203.png)
        
        - We can store logs for archives into cheaper storage then our destinations and ask for it when we need it
    - Event Processing
        - Act on events or sourcetypes
        - Lots of builtin functions, but you can create your own
        - SCHEMA AGNOSTIC (tranforming between data formats)

![Untitled](Cribl/Untitled%204.png)

- Purpose and Use Case
    - Optimizing Data
    - Reducing Data Size from within Cloud Infrastructure to reduce egress costs
    - Transforming Data
    - One Place to Route All Data To
    - Exploring Data