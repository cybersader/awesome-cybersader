# LESSONS

# Intro (1)

# Class Overview

## Tools and Things we will learn

- Cloudera Hadoop
- NLP
- 

# Big Data Stuff

## What’s Big Data?

- Challenges
    - Capture
    - Curation
    - Storage
    - Search
    - Sharing
    - Transfer
    - Analysis
    - Visualization
- Big data
    - collection of data sets so large and complex that traditional means of managing and utilizing the data becomes difficult
- Applicable to tons of domains

## Big Data - 3V’s (sometimes 4)

![Untitled](LESSONS/Untitled.png)

- Volume
    - 44x increase from 09 to 2020
    - From 0.8 zettabytes to 35zb
- Velocity
    - How fast and often is data generated
- Variety
    - Relational Data (tables, transactional, legacy data)
    - Text Data (web)
    - Sem-structured (XML)
    - Graph Data
        - Networks, semantic web
- Veracity
    - Data in Doubt
        - Uncertainty
        - incompleteness
        - ambiguities
        - latency
        

## Harnessing Big Data

![Untitled](LESSONS/Untitled%201.png)

## Big Data Landscape

![Untitled](LESSONS/Untitled%202.png)

- We will be using Cloudera Hadoop
- Using machine learning to create a simple application

![Untitled](LESSONS/Untitled%203.png)

![Untitled](LESSONS/Untitled%204.png)

![Untitled](LESSONS/Untitled%205.png)

![Untitled](LESSONS/Untitled%206.png)

![Untitled](LESSONS/Untitled%207.png)

![Untitled](LESSONS/Untitled%208.png)

![Untitled](LESSONS/Untitled%209.png)

![Untitled](LESSONS/Untitled%2010.png)

![Untitled](LESSONS/Untitled%2011.png)

## Data Privacy

- GDPR, USA w/ FTC and ADPPA and CCPA

## Earthscope

- designed to track North America’s geological evolution

# Data Analytics Lifecycle, Overview of Data Analytics Methodologies (1)

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

# Intro to Data Analytics Packages in Python, JAVA and Weka, Data Preprocessing (1)

# Weka Intro

Tool for learning data analytics

- has great modules
- Importing data
    - csv and arff (relational) files
- Output
    - text-based results
    - Graphical-based results
- Purpose of Weka
    - DEFINITELY not for production
    - Used for learning data analytics
    - DEFINITELY NOT for automating with any sort of process
    

# Python for Data Science

- Python modules
    - Pandas
        - can be used with ML libraries and frameworks like Tensorflow and things like keras and Pytorch, etc.
    - scikit learn
    - SciPy
    - Matplotlib
    - NLTK!!!!!!!
    - VISUALS
        - seaborn
- Pycharm
    - use the correct interpreter
    - install some packages

# Python Data Science Intro - Pandas

- Import excel, csv, or whatever using pandas
    - turns it into a panda’s dataframe
- use pandas dataframe joins instead of PowerQuery joins in Excel

## groupby method

- similar to SQL groupby

## filtering

- we can use basic syntax for filtering
- just like excel or whatever
- filter rows

## slicing

- selecting subset of dataframe
- selecting one or more columns, one or more rows, etc
- slice by column, row values etc

## loc method

- select a range of rows or columns by using names

## iloc method

- select range using index

## Sorting

- sort values
- ascending by default

# In-Class Exercise

- take flights.csv

1. Load the csv file into a data frame

2. List all the columns and data type for each column

3. List the number of rows and columns

4. Use groupby to find out the total number of flights based on the

combination of origin and dest

# Feature Selection, Data Visualization (1)

# Plotting

## matplotlib from pylplot

- module for plotting
- you can plot using data frame objects from pandas

## Visualizations

### histogram

- organizes data into column groups
- kind of like pivot table

### scatter plot vs hexbin plot

- hexbin shows density whereas scatter merely shows every 2-dimension value

### barplot

- shows number per some attribute

### pairplot

- pairwise relationsihps between variables in a dataset

# Data Cleaning

VITAL part of data analytics

Common Tasks:

- fill in missing data
- correct inconsistencies
- resolve redundancy caused by data integration

## Missing Data

- A lot of reasons for missing data
    - equipment malfunction
    - some attributes can naturally be null

### Handling Missing Data

- Ignore the tuple
- integrate another dataset
- conditionally
- manually

### Handling Missing Data with Python

- Look for rows where certain attributes isnull() or is empty

### Df.method(s)

- dropna()
- fillna()
- isnull()
- notnull()

## Data Transformation

Some terms:

- Discretization - convert data into categorical data
- Aggregation - summarization, data cube construction
- Normalization - min-max, z-score, decimal scaling
- Attribute/feature construction

### Pandas Functions

- Aggregation - agg()
- Discretization
    - distance-based (divide into something each with pieces this length)
    - depth-based (divide into 9)
    - based on distribution
    - PANDAS:
        - pd.cut
        - from_tuples
- Data Integration
    - merges & joins
    - pd.merge
        - can automatically recongize the foreign keys
        - you can specify the redundant column
- Normalization
    - values into specificed ranges
    - common normalization
        - min-max normalization
            - changing a range into [0,1] is very common to help with scoring and creating features
        - z-score
            - use mean and standard deviation to calculate new values
                
                ![Untitled](LESSONS/Untitled%2014.png)
                
- Attribute/feature construction
    - conditional attributes that rely on other attributes

# Data Coding

Categorizing different attributes/features.

Processing works well with numbers, so try to break things into categories.

## Python Data Coding (useful for ML)

- LabelEncoder

# Feature Selection

Data must have sufficient information to predict outputs, without excessive redundancy.

- If not, you’ll have poor prediction

## Reasons for feature selection

- Dimensionality reduction
- Memory usage reduction
- Improved generalization
    - make patterns easy to notice
- Better human understanding

## Method for feature selection

- Intuition and existing knowledge
- Estimate relevance of certain features

## Some general math concepts

- Entropy
    - surprises?
    - 1 means high.
    - 0 means low.
- Conditional Entropy
    - some variables are linked
    - Information Gain captures arbitrary non-linear dependencies between variables
        - The amount decreases → the uncertainty decreases
- Overrall Information Gain for a variable
    - Entropy - conditional entropy
    - Highest information gain can show potential features

# Supervised Learning Algorithms 1 (1)

# Data Analytics

- Find patterns
- Extract Knowledge from huge amount of data

## What it is NOT

- Query processing
- Small statistics

## Steps

![Untitled](LESSONS/Untitled%2015.png)

- A LOT harder in practice
- It’s not simple to automate these things

# Analysis Models

Some basic ones:

- Clustering
- Classification
    - Categorical
    - Regression
- Semi-supervised
- Summarize
    - Summary stats, summary rules
- Link Analysis / Model Dependencies
    - Association rules
- Sequence Analysis
    - Time-series analysis, sequential association
- Detect Deviations

## Major Types of Data Analytics Tasks

1. Prediction
    1. predict future values of attributes through using other attributes
2. Description
    1. find patterns that can be understood by people

## Classification

![Untitled](LESSONS/Untitled%2016.png)

### Steps:

1. Divide data up into training and testing
    1. make sure there is no bias
2. Ideally the data distribution between training and testing should be the same
    1. features should have an approximately equal distribution
    2. AT LEAST shuffle the data randomly
3. Create the model
4. Train the model
5. Test the model

## Types of attributes

- Columns
    - Features
        - variables to train on
    - Class
        - variables to predict

## Questions when creating a classification model?

- how many classifications?

## Evaluating Classification Methods

- Accuracy
    - Classifier accuracy
    - Prediction accuracy
- Speed
    - training time
    - time to use the model
        - prediction time
        - classification time
- Interpretability
    - insight provided by the model
- OTHERs
    - precision
    - recall
- Is there “overfitting”

# Classification Steps

- Model construction - describe set of classes
    - class label attributes
    - set of tuples used for model construction is training set
    - model represented as classification rules, decision trees, or mathematical formules

## Model Construction

- Can even be decision trees (conditional statements)

## Using the Model in Prediction

- Push data into the model and adjudicate the results
- In neural networks, you would feed any new data back into the model for more training

# Decision Trees

- sequence of conditional decisions that form different end_node outputs
- fancy word for conditional statements (if-then-else)

## Decision Tree Induction Algorithms

- Hunt’s Algorithm
- CART
- C4.5 - J48 in weka

### Measures of Node Impurity

- Entropy
- Misclassification Error

### ⭐Information Gains

- Features with the highest information gain are likely to be a part of the decision tree

## Evaluating Decision Trees

- Advantages
    - inexpensive
    - fast computation
    - outputs are easy to interpret
    - handle numerical and categorical attributes
    - easy to build attributes (even with simple statistical analysis)
- Disadvantages
    - sensitive to small variations in the training data
    - poor if datasets has irrelevant columns

## Confusion Matrix

- You can evaluate classification with this
- Important Data
    - TP, FP, TN, FN

![Untitled](LESSONS/Untitled%2017.png)

# Important Metrics in Evaluating Models of Prediction

## Confusion Matrix

- Gives you the TP, FP, TN, FN amounts during model prediction
- Gives you important stats

## Evauation Metric

### ⭐Precision

- Related to minimizing the false positive rate (noise)
- TP over TP+FP
- How much noise?
- Disadvantages of Greater Precision
    - less TPs
    - more FNs
- Advantages of Greater Precision
    - more TNs
    - less FPs
- Use Cases:
    - Lower risk
    - Higher tolernace

### ⭐Recall ( **TPR - True Positive Rate /  Sensitivity)**

- Related to maximizing the True Positive Rate
- TP over TP+FN
- How much are you missing?
- Disadvantages of Greater Recall
    - less TNs
    - more FPs
- Advantages of Greater Recall
    - more TPs
    - less FNs
- Use Cases:
    - Higher risk
    - Lower tolerance

### Specificity

- TN over TN+FP

### FPR

- 1 - Specificity

### Accuracy

- TP over TP+FP+TN+FN
- Not applicable to prediction problems really

### Precision-Recall Tradeoff

- You can improve only one or the other

### AUROC (**Area Under the**
 **Receiver Operating Characteristics**
)

[https://medium.datadriveninvestor.com/understanding-auc-roc-clearly-explained-74c53d292a02](https://medium.datadriveninvestor.com/understanding-auc-roc-clearly-explained-74c53d292a02) 

- X-axis TPR
- Y-axis FPR
- Large area means better performance

![Untitled](LESSONS/Untitled%2018.png)

### How AUROC is generated

- Take a model where you have some condition that determines a class attribute
    - Ex: If (in this range) then 1, else 0
- Change the thresholding of that condition from both extremes till you arrive at a plot
- The thresholding must be done with some value

# Rule-Based Classifier

- Rules are based off of conditional statements

# Supervised Learning Algorithms 2 (1)

# Classification

- Predicts categorical class labels
- classifies data (constructs a model) based on the training set and the values (class labels) ina classifying attribute and uses it in classifying new data

## Rule Vs Instance Based

### Rule Based

- Decision Tree

## Instance Based

- K-nearest-neighbor
- k-NN

# k-NN (k-Nearest-Neighbors)

The idea is to calculate the general differences between different instances that need to be classified.

- There are a lot of different cases for calculating these differences (continuous & discrete values)

## Example 1 - Discrete

- If we are looking for closest instances to (great, no, no, normal, no) & k=2, then we look for two instances that are the closest to the same to the one being classified
    - then we pick: row 1 & 2 since they only have 1 and 2 mismatches

![Untitled](LESSONS/Untitled%2019.png)

## Example 2 - Continuous

- Take the Euclidean Distance
    
    ![Untitled](LESSONS/Untitled%2020.png)
    

## Incomparable Ranges

- You must normalize these ranges

## Non-numeric Data

- Encode the data
    - Binary (1,0)
    - label encoding
    - one-hot encoding
- Non-binary characterizations
- how about unavailable data?
    - 0 value not always the answer

## k-NN variations

- Value of k
    - larger k means more confidence in prediction
    - if k is too large, decision may be skewed
- Weighted evaluation of nearest neighbors
- Other distance measures

### Choosing k

- increase - kNN less sensitive to noise
- decrease - allows capturing finer structure of space

## Curse-of-dimensionality

- Prediction accuracy goes down with more attributes
- Remedy
    - remove irrelevant attributes
    - Increase k (but not too much)
    - weight attributes differently - features selection - information gain

## Good + Bad Use Cases for k-NN

- Advantages
    - Little tuning
    - Performs well
    - Easy to code
- Disadvantages
    - number of attributes makes k-NN inaccurate

## Implementing Confidence Score

- Usually k-NN can also output confidence scores along with the prediction

# Naive Bayes Classification

## Overview

### Uses

- Spam classification
- medical diagnosis
- Weather

### Problem Statement

- Given features, predict a label

## Bayes Rule

- To classify, computer probabilities and predict based on which is greater

![Untitled](LESSONS/Untitled%2021.png)

- Explicit modeling is a problem when there are too many features - images

## Naive Bayes Model

- All features are independent.  Easier to calculate
- Calculations:
    - regular bayes: 2(2^n-1)
    - naive bayes: 2n

### Training

- easy
- HOW:
    - calculate as fraction of records
    - Out of all rows of a features how many have that value

### Example

- Pivot table, then multiply fractions

![Untitled](LESSONS/Untitled%2022.png)

![Untitled](LESSONS/Untitled%2023.png)

### Assumptions, pros, cons

- all features are independent
- Naive Bayes assumption is almost never true
- PROS:
    - Fast even on large datasets
    - discrete & continuous features
    - multi-class prediction
    - Performs well on text classification
- CONS:
    - Zero probability/Frequency problem

## Difference on Algorithms so far

- Decision vs knn vs Naive Bayes
    - knn relies on neighbors
    - Decision relies on condition
    - naive bayes independent

# Unsupervised Learning Algorithms (1)

# Clustering

## K-Means

- Centroid-based

### How-To

- Features are very important
    - do not use all of the columns
- PREPROCESS
    - before clustering or classification

### Disadvantages

- You must determine the number of clusters
    - use elbow points
- Sensitive to outliers.
    - Should you remove th outliers though? - depends
        - for network traffic, outliers are important, but for something it might not be
- Can require a lot of memory
    - you have to load everything to be able to actually analyze the complete cluster

### Caveats during Clustering

- Make sure values of attributes are equal in range so that one attribute doesn’t dominate

### WSS Curve

- Gives you the elbow points

# Association Rule Mining (1)

## Overview

- relationships are represented as rules
- not predicting something
- discovering patterns

### Questions Rule Mining can answer

- which products tend to be purchased together
- co-occurences
- correlation

## Association Rule Definition

X → Y (Correlation / Co-occurence)

- Support - fraction of transactions that contain both X and Y
- Confidence - how often out of all occurences of X does Y also occur

### Goal of Association Rule

- find rules X→Y that have
    - support ≥ minsup threshold
    - confidence ≥ minconf threshold

### Apriori Principle

![Untitled](LESSONS/Untitled%2024.png)

- If an itemset (”A, B, C”) is frequent, then its subsets must also be frequent
- support of an itemset never exceeds support of its subsets
    - anti-montone property

## Caveats

- low or high thresholds can cause too many or not enough results
- 

# Natural Language Processing and Text Mining (1)

# basics

## Text analysis

- what does the actual text mean, represent, model, etc
- derive insights

## Text mining

- relationships and patterns
- component of text analysis

## Corpus

- large collection of text

# Text Mining Steps

- Pre-processing & Parsing
    - Text is unstructured
    - usually involves tokenizing
    - Some tech:
        - tokenization
        - POS tagging
        - Stemming

## Part of Speech (POS) Tagging and Dependency Tree

- Break up things into their linguistical pieces

![Untitled](LESSONS/Untitled%2025.png)

## Lemmatization & Stemming

- Lemmatization
    - Turn words into base form
- Stemming
    - No dictionary required
        - Breaking words down with patterns
        - EX; remove ‘s’

# Representing Text

## Tokenization

![Untitled](LESSONS/Untitled%2026.png)

## Case folding

![Untitled](LESSONS/Untitled%2027.png)

## Bag of Words Representation

- represent text as set of words
- Gets rid of the order of the words

### TFIDF

- TF - term frequency
    - get frequency of words in text
- Get rid of stopwords
- look at document frequency (DF)
    - how often it appears in text (corpus)

# Topic Modeling

Learn topics from set of documents.  

- Applies to a large document or a document set
- Learn number of topics and important terms or keywords for topics

## Categorizing Documents by Topics

Methods:

- Latent Semantic Analysis
    - older 1988
- Probabilistic Latent Semantic Analysis
- Latent Dirichlet Allocation
- Neural Network
    - Graph Model - Based + NN
    - Word Vectors
    - Semantic Analysis

## Visualizing Textual Data

- Word Clouds
    - Most common words
    - BE CAREFUL of stopword lists
        - Sometimes these are manually curated per use case
        - ask some knowledge engineers

# Hadoop (1)

# Divide and Conquer

![Untitled](LESSONS/Untitled%2028.png)

# Ecosystem

![Untitled](LESSONS/Untitled%2029.png)

## HDFS

### Nodes

- Name node (Master) - Manager
- Data node

### Features

- Replication for backups

### Replication

- Breaks files down into blocks
- replicates blocks across multiple systems

### Name Node

- Tracks locations of data nodes, their files, and other info for operation
- Manages data nodes

## Hadoop

- Learn Java
- Use the virtual image in VM workstation player

# HDFS Hadoop Map Reduce (1)

# MapReduce Architecture

## The idea

- Separate into groups which can all be analyzed in parallel

![Untitled](LESSONS/Untitled%2030.png)

## MapReduce Process

- Map → list(k2,v2)
- Reduce(k2,list(v2)) → list(k2,v3)

### Example

- Input - Occurences of something
- Split - Splitting up the data
- Map - Still not aggregating and counting.  Just KV pairs (Deer, 1)(Car,1)(Car,1)
- Shuttle/Sort - group up matching keys
- Reduce - count the values
- Output: Keys with Values as the amount of occurences

## Local Aggregation (Combiner)

- Combining at the Map task or phase

# Hadoop Map Reduce Commands

## Basic HDFS DFS Commands

Below are basic `hdfs dfs` or `hadoop fs` Commands.

| Command | Description |
| --- | --- |
| -ls | List files with permissions and other details |
| -mkdir | Creates a directory named path in HDFS |
| -rm | To Remove File or a Directory |
| -rmr | Removes the file that identified by path / Folder and subfolders |
| -rmdir | Delete a directory |
| -put | Upload a file / Folder from the local disk to HDFS |
| -cat | Display the contents for a file |
| -du | Shows the size of the file on hdfs. |
| -dus | Directory/file of total size |
| -get | Store file / Folder from HDFS to local file |
| -getmerge | Merge Multiple Files in an HDFS |
| -count | Count number of directory, number of files and file size |
| -setrep | Changes the replication factor of a file |
| -mv | HDFS Command to move files from source to destination |
| -moveFromLocal | Move file / Folder from local disk to HDFS |
| -moveToLocal | Move a File to HDFS from Local |
| -cp | Copy files from source to destination |
| -tail | Displays last kilobyte of the file |
| -touch | create, change and modify timestamps of a file |
| -touchz | Create a new file on HDFS with size 0 bytes |
| -appendToFile | Appends the content to the file which is present on HDF |
| -copyFromLocal | Copy file from local file system |
|  |  |
| -copyToLocal | Copy files from HDFS to local file system |
| -usage | Return the Help for Individual Command |
| -checksum | Returns the checksum information of a file |
| -chgrp | Change group association of files/change the group of a file or a path |
| -chmod | Change the permissions of a file |
| -chown | change the owner and group of a file |
| -df | Displays free space |
| -head | Displays first kilobyte of the file |
| -Create Snapshots | Create a snapshot of a snapshottable directory |
| -Delete Snapshots | Delete a snapshot of from a snapshottable directory |
| -Rename Snapshots | Rename a snapshot |
| -expunge | create new checkpoint |
| -Stat | Print statistics about the file/directory |
| -truncate | Truncate all files that match the specified file pattern to the specified length |
| -find | Find File Size in HDFS |

# NoSQL Overview (1)

# Relational Database

## Keys

- Primary - main key to differentiate rows
- Foreign - Primary key of another table to reference another row for lookups

## Limits of RDBMS

- Hard to scale vertically on one server
    - you can add more servers to “horizonally” scale
- Horizontal scaling
    - Master/slave
        - All writes written to master
        - reads performed against replicated slave databases
        
        ![Untitled](LESSONS/Untitled%2031.png)
        
    - Sharding
        - allow read and write to each partition
        - Issues:
            - no joins capability!

# NoSQL

- non-relational
- no schema
- horizontal scaling
- key-value access

![Untitled](LESSONS/Untitled%2032.png)

- Disadvantages:
    - no roll back
    - no standard query language
    - not full support of relational features
    - limits on: joins, group by, order by operations
    - relaxed integrity and consistency

# ACID vs CAP Theorem

- ACID - relational dbs
    - atomicity - committing process for roll-backs
    - consistency - valid data is only written
    - isolation - one operation at a time
    - durability - once committed, it stays that way
- CAP - non-relational dbs
    - consistency - all data on clusters have same copies
    - availability - cluster always accept reads and writes
    - partition tolerance - even if a few partitions fail or have errors, the data can be fixed easily.  Not corrupted because of logic.

## CAP

- Consistency
    - ACID - strong
    - BASE (basically available soft-state eventual consistency) - weak
    - CAP is not guaranteed consistency - or at least immediate consistency

# NoSQL Categories

- Key-value
    - redis, DynamoDB
- Document-based
    - MongoDB, CouchDB
    - JSON is a document
- Column-based
    - BigTable, Hbase
- Graph-based
    - Neo4j

# HBase (1)

# Overview

- HBase is a BigTable clone
- distributed, column-oriented database build atop HDFS

# Benefits then RDBMS

- No primary keys
- Automatic partitioning
- Scale linearly and automatically with new nodes
- Commodity hardware
- Fault tolerance
- Batch processing

# HBase Data Model

![Untitled](LESSONS/Untitled%2033.png)

![Untitled](LESSONS/Untitled%2034.png)

# HBase Use Cases

- Random inconsistent read and writes
- Fast operation on large datasets
- Access-patterns are simple
    - no huge complex join cases

# HBase Commands

- `hbase shell`
- `create ‘table name’, ‘column 1’, ‘column 2’`
- `alter ‘t1’, NAME⇒’f3’`
- `describe ‘t1’`
- `disable ‘t1’`  - before altering
- `alter ‘t1’, NAME⇒’f3’, METHOD=’delete’`
- `drop ‘t1’`

### Data Manipulation

- `create ‘emp’, ‘personal data’`
- `put ‘emp’,’1’,’personal data:name’,’nancy’`
- `put ‘emp’, ‘2’, ‘personaldata:name’,’erik’`
- `get ‘emp’, ‘1’`
- `delete ‘emp’, ‘1’, ‘personaldataLdept’`
- `deleteall ‘emp’,’1’`