# Data Analytics Lifecycle, Overview of Data Analytics Methodologies

# Intro

- Data science different from BI projects
- More exploratory
- Project process - like SDLC

# Data Analytics Lifecycle

1. Discovery
2. Data Preparation
    1. preprocessing
3. Model Planning
    1. supervised, unsupervised
4. Model Building
    1. architecture
5. Communicate Results
    1. how do we visualize
6. Operationalize
    1. deploy the project?

# Development Methodology

- We use AGILE

# Key Roles

![Untitled](LESSONS/Untitled%2012.png)

- End User
- Project Sponsor
- Project Manager
- BI Analyst
- DB admin
    - manage db
- Data engineer
    - pull data

# Phases

1. Discovery
    1. learn the business domain
    2. resources
    3. framing the problem
    4. key stakeholders
    5. interviewing the analytics sponsor
    6. developing initial hypotheses
    7. identifying potential data sources
2. Data Preparation
    1. Includes steps to explore preprocess and condition the data
    2. create analytics sandbox - architecture
    3. Data prep - most intensive
    4. often underestimated
    5. 50% of time and effort is here
    6. Sub-phases
    7. Performing ETL
        1. extract transform load
        2. important especially when transforming certain attributes or data structure
    8. Learning about the Data
        1. Do analytics on the attributes/columns before running the data sets
    9. Learn about the data sample data set inventory
        1. table to track inputs and outputs in the process
            
            ![Untitled](LESSONS/Untitled%2013.png)
            
    10. Data Conditioning
        1. cleaning data
        2. normalizing datasets
        3. performing transformations
        4. MORE DATA BETTER
            1. better for patterns
            2. part of the machine learning
            3. get rid of biases
            4. diversify the data
    11. Study and Visualize
        1. Shneiderman’s mantra
            1. overview, zoom, filter, details on demand
        2. data visualization
    12. Suvery and Visualize Guidelines and considerations
        1. ensure consistency
        2. is distribution consistent
        3. representative of the population of interest?
        4. Check time-related variables
        5. is the data normalized?
        6. For geospatial, are locations and abbreviations consistent
        7. Granualarity of the data
3. Model Planning
    1. assess the structure of the data
    2. ensure teh analytics techniques enable the team to meet the business objectives adn accept or reject the working hypotheses
    3. What is the workflow or architecture
        1. single model or a string of tooling, models, and transformations
4. Model Selection
    1. based on structure of the data
    2. supervised or unsupervised
5. Model Building
    1. develop datasets for training, testing, and production
    2. develop analytic model on training data, test on test data
    3. Questions:
        1. Can the model be applied in realtime
        2. WIll it still work in solving the problem
6. Operationalize
    1. Satisfy needs of key roles
        1. End user (business)
            1. determine benefits and implications
        2. Project sponsor
            1. wants business impact and risks
    2. 4 main deliverables:
        1. Presentation for project sponsors
        2. Presentation for analysts
        3. Code for technical people
        4. Technical specifications of implementing the code

# Case Studies

## Global Innovation Network and Analysis

- dealing with attribute discrepencies
- Tried stuff:
    - graph visualization
    - NLP from text
- Social graph had clusters
- Found high density of innovators in Ireland

## Predictive Analysis on Email Opening

- Wanted to know the effectiveness of email marketing strategies
- Identify the key variables of success
- Log files of email sending:
    - what devices
    - how long
- Build some classification or prediction models
- Look at the data first and do some basic analysis
- Models
    - NLP on textual description
    - decision tree
    - Support Vector Machine