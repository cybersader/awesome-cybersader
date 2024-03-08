# Feature Selection, Data Visualization

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