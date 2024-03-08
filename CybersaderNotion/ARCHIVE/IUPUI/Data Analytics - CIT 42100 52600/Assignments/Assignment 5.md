# Assignment 5

> *Name: Benjamin Rader*
> 

# Task 1

Given the Data Set (**adult-data-new.csv**) and its description as following. please use k-means clustering algorithms to see if you can find the clusters of persons who make over 50K or below 50K (20 points).

Please include the screen shots of the results from Weka or Python code in your report.

NOTE: You will need to do some data preprocessing steps, such as data encoder and data normalization.

## Preprocessing

- Display all of the data types of columns (dtypes)

![Untitled](Assignment%205/Untitled.png)

- Looks like a lot of these will have to be encoded and also mix-max scaled from 0 to 1
- At least, it looks like there aren’t any null values

![Untitled](Assignment%205/Untitled%201.png)

## Feature Selection

- We don’t need to use Elbow method here to figure out our k-value.  We already know it has to be 2 since we are looking for people below and above 50k.
- We need to select some attributes or columns that will potentially affect the salary, then evaluate them using KMeans.

## Normalization & Encoding

- Used min-max scaler for normalization
- Used label encoder with a loop over continuous and discrete values to ensure all were continuous for clustering

## Analysis & Results

### Attempt 1

- Features:
    
    ![Untitled](Assignment%205/Untitled%202.png)
    
- Results without normalization:
    
    ![Untitled](Assignment%205/Untitled%203.png)
    
- Results with normalization:
    
    ![Untitled](Assignment%205/Untitled%204.png)
    
- My analysis:
    - I’m very confused as to why the normalized attributes predicted less correct than the non-normalized attributes
    - The centroids make sense because of the min-max normalization step

### Attempt 2 (all attributes as features)

- Features:
    
    ![Untitled](Assignment%205/Untitled%205.png)
    
- Results without normalization:
    
    ![Untitled](Assignment%205/Untitled%206.png)
    
- Results with normalization:
    
    ![Untitled](Assignment%205/Untitled%207.png)
    
- My analysis:
    - The non-normalized clustering is, once again, performing much better than the normalized clustering.
    - I assume this means that there are some values that affect the salary more than other attributes and that those attributes also happen to have the largest numerical (continuous) values. When those values change, then instances are more likely to be put into their correct cluster because that dominant attribute causes the clusters to be more separated. This is merely my limited view on what the cause could be. However, I’m not confident this is the reason.