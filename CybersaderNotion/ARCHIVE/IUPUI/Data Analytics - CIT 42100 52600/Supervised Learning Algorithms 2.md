# Supervised Learning Algorithms 2

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