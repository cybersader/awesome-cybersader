# Assignment 6

> *Name: Benjamin Rader*
> 

# Instructions

Given the bakery data set (Bakery.csv). please use association rule mining to identify the most

valuable frequent item sets/item association rules that can help the business to create better

business plans (20 points).

Please explain the criteria that are used to choose the valuable rules (20 points).

This data set is built from bakery chain has a menu of about 40 pastry items and 10 coffee

drinks. It has a number of locations in West Coast states (California, Oregon, Arizona, Nevada).

**If you use python code, please make sure you convert the data to the format that python**

**program takes.  If you use Weka, please make sure you convert the data to the format that**

**Weka takes.**

# Task - Association Rule Mining

## Criteria for Choosing Rules

- Lift shows that there is a correlation between the antecedent (left side or ‘A’) and the consequences (right side or ‘B’)
- Confidence simply means how often out of all cases of the antecedent (A) does the consequence (B) occur

## Results & Basic Analysis

![Top 10 Rules by Lift with max length of 3 - produced with mlxtend.frequent_patterns functions & the tabulate package in Python.  ](Assignment%206/Untitled.png)

Top 10 Rules by Lift with max length of 3 - produced with mlxtend.frequent_patterns functions & the tabulate package in Python.  

### Results Explanation

I’m not sure why the results are the way that they are. However, it is apparent that the correlation if not extreme.  It seems that a customer is only ~6-7% more likely to buy the consequential items based on the antecedent items.

### Getting the Results

Here are some things to note with this Python Implementation:

- I had to slice the data into 50% of its original data to not run out of memory or time
    - using a different method or function may work better
- **Apriori Function - Settings**
    - max length: 3
    - minimum support: 0.7
    - minimum confidence: 0.9
    - sorted by lift