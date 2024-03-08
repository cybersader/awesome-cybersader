# Assignment 4

> *Name: Benjamin Rader*
> 

# Fixing Assignment 3 - before Task 1

It is necessary to fix Assignment 3 and go over errors in my attempt to find attributes with the highest information gains. The critical error I made was including continuous values in my analysis. In order to calculate information gain, the values must be discrete and not continuos.

## Discrete vs Continuous in Health Data

### Discrete

- Finite number of values that you can count.
- Even if over a range, they cannot be broken up into smaller pieces or they represent a finite range
- Ex: Good, Bad. One, Two, or Three.

### Continuous

- Can be broken up into smaller metrics or pieces.
- Ex: Seconds can be broken up into milliseconds, etc.

### Obtaining All Continuous Columns

- 1st command to exclude category columns
- 2nd command to use regex to not allow any code, state, or county columns

```python
df_nums = county_ranks_df.select_dtypes(exclude='category')
df_nums = df_nums[df_nums.columns.drop(list(df_nums.filter(
    regex='([Cc]ode|[Ss]tate|[Cc]ounty)')))]
```

### Obtaining the discrete and string columns

We want to do this so we can encode those columns.

- Select_dtypes to find all of the string columns
- Exclude the ID columns using drop, filter, and regex

```python
df_disc = county_ranks_df.select_dtypes(include='object')
df_disc = df_disc[df_disc.columns.drop(list(df_disc.filter(
    regex='([Cc]ode)')))]
for (df_column, df_data) in df_disc.iteritems():
    df_disc[df_column] = Le.fit_transform(df_disc[df_column])
```

# Task 1

Please use select top 10 features of assignment 3 to predict diabetes values which you converted into bin values as string (which presents categories). Please use decision tree or kNN or Naïve Bayes or all for prediction. You can use the python code or Weka to generate the tree models and performance evaluation. Please given explanation of your results (40 points)

## kNN

I assume that this has such good metrics because it does really well with many instances. However, because I used a lot of dimensions the processing becomes a bit slower.  I have a lot of continuous values and data, so it has a lot to work with here.

![Untitled](Assignment%204/Untitled.png)

![Untitled](Assignment%204/Untitled%201.png)

## Naïve Bayes

Naive Bayes assumes independent features, and in this case, the features are probably not independent which is why it performs terribly.  On top of that, you need a lot more data.  A lot of medical-related things are interdependent or correlated.  Where you live can affect what you eat, your exercise options, culture, etc. As the name goes, Naive Bayes is not very performant here.

![Untitled](Assignment%204/Untitled%202.png)

![Untitled](Assignment%204/Untitled%203.png)

## Decision Tree

Decision Tree seems to perform very well on the dataset.  Although, this could likely be overfitting of the data, it seems that due to the interconnected nature of medical-related data that decision may do pretty well. Maybe this is because the different combinations of certain factors is almost guaranteed to fall right into the common class (bad/good). Decision trees are great for exploratory analysis like we are doing here, but I assume that adding in some other types of data could easily muddy the waters. Also, as I mentioned, this model is probably not great on newer data but really great for this dataset.

![Untitled](Assignment%204/Untitled%204.png)

![Untitled](Assignment%204/Untitled%205.png)

## Problems during assignment

- The largest issue was this “multiclass” issue with the ROC curve
    - When I did the binning from Assignment 3, I created 4 classes for the Diabetes Value as discrete representations of the previous continuous values
        - Good, Okay, Bad, Really Bad (something like this)
    - I could not display the ROC curve because there are four values, and no matter what I did I couldn’t get them to work right.
    - I changed them to just two bins (Good & Bad), and then everything immediately worked.