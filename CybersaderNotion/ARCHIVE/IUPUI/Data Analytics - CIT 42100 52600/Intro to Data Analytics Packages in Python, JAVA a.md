# Intro to Data Analytics Packages in Python, JAVA and Weka, Data Preprocessing

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