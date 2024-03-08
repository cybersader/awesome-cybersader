# Association Rule Mining

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