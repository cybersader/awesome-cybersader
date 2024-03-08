# Supervised Learning Algorithms 1

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