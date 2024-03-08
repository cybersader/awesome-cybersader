# Lab 3: Big Data Analytics on Cloud

April 5, 2023

> BY: Benjamin Rader
> 

# Instructions

We will learn how to process and analyze data on cloud. We will use a popular big data processing tool **Apache Spark** to process the movie rating data on **Databricks** platform. Please provide screenshots for each of the following steps in the report. You should finish a lab report that includes: 

(1) problem statement, 

(2) implementation (including each step and screenshots) and 

(3) recommendations (any other methods to solve the problem?, how to enhance the lab design?).

## **Create an account in Databricks Community Edition**

Databricks is a fast, easy, and collaborative Apache Spark-based big data analytics service designed for data science and data engineering.

Databricks is not a free platform, but it does provide a free edition, **Databricks Community Edition**. So the first step is to create an account in **Databricks Community Edition**. During the registration process, **you don’t need to provide any payment information**. Please follow the steps below.

Go to [https://community.cloud.databricks.com/](https://community.cloud.databricks.com/) , and then click sign up.

# Problem Statement

Set up a Databricks account and learn how to do simple data engineering and data analysis using a distributed workload system like Spark.  Python can be utilized in this case to work with the Spark system by using the provided wrapper.

# Implementation

Steps to execute on the problem statement.

## Signing Up

![Untitled](Lab%203%20Big%20Data%20Analytics%20on%20Cloud/Untitled.png)

## Configuration and Data Upload

- Create a table

![Untitled](Lab%203%20Big%20Data%20Analytics%20on%20Cloud/Untitled%201.png)

- Upload the files

![Untitled](Lab%203%20Big%20Data%20Analytics%20on%20Cloud/Untitled%202.png)

- Make a cluster

![Untitled](Lab%203%20Big%20Data%20Analytics%20on%20Cloud/Untitled%203.png)

- Start a notebook

![Untitled](Lab%203%20Big%20Data%20Analytics%20on%20Cloud/Untitled%204.png)

## Notebook and Analysis

### Creating Tables Spark Wrapper in Python

- Run code to read the CSV data and create two tables from it.  Schemas are also printed:

```python
From pyspark.sql.types import *

schema1 = StructType([
StructField(“movieId”, LongType(), True),
StructField(“title”, StringType(), True),
StructField(“genres”, StringType(), True)])

movies = spark.read.csv(“/FileStore/tables/movies.csv”, schema=schema1, header=True)

schema2 = StructType([
StructField(“userId”, LongType(), True),
StructField(“movieId”, LongType(), True),
StructField(“rating”, FloatType(), True),
StructField(“timestamp”, LongType(), True)])

ratings = spark.read.csv(“/FileStore/tables/ratings.csv”, schema=schema2, header=True)

temp_table_name = “movies_csv”
movies.createOrReplaceTempView(temp_table_name)

temp_table_name = “ratings_csv”
ratings.createOrReplaceTempView(temp_table_name)

ratings.printSchema()
movies.printSchema()
```

- Results

![Untitled](Lab%203%20Big%20Data%20Analytics%20on%20Cloud/Untitled%205.png)

### Querying the tables (SQL)

- Run some basic queries
    - For `ratings_csv`
        
        ```sql
        %sql
        select * from `ratings_csv`
        ```
        
        - Results
            - Shows the fields/attributes/columns that were created in the first step along with their entities or rows
            
            ![Untitled](Lab%203%20Big%20Data%20Analytics%20on%20Cloud/Untitled%206.png)
            
    - For `movies_csv`
        - Results
            - Same columns and rows as defined in step 1
            
            ![Untitled](Lab%203%20Big%20Data%20Analytics%20on%20Cloud/Untitled%207.png)
            

### SQL Queries Questions

1. Find the average rating of each movie and show the top 10 movies with highest ratings. You need to show the movie title and its average rating. If the movie has the same average rating, please rank them using title.
    
    ```sql
    %sql
    /*
      calculate the average rating for each movie
      and display the top 10 movies with the highest ratings
    */
    select
      m.title,     -- select the movie title
      avg(r.rating) as average_rating   -- calculate average rating for each movie
    from
      movies_csv m   -- reference the movies_csv table with the alias 'm'
      join ratings_csv r on m.movieid = r.movieid  -- join the ratings_csv table with the alias 'r' on the movieid column (left join)
    group by
      m.title -- group results by movie title
    order by
      average_rating desc, m.title asc  -- order results by the average rating (descending) and movie title (ascending)
    limit 10; -- only display only the top 10 results
    ```
    
    ![Untitled](Lab%203%20Big%20Data%20Analytics%20on%20Cloud/Untitled%208.png)
    
2. Find the 10 movies with largest number of user ratings. You need to show the movie title and its number of ratings. If the movie has the same number of ratings, please rank them using title.
    
    ```sql
    %sql
    /*
      finds the 10 movies with the largest number of user ratings
    */
    select
      m.title, -- select the movie title
      count(r.rating) as number_of_ratings -- count the number of ratings for each movie
    from
      movies_csv m -- reference the movies_csv table with the alias 'm'
      join ratings_csv r on m.movieid = r.movieid  -- left join the ratings_csv table using the 'r' alias on the movieid column
    group by
      m.title -- group results by movie title
    order by
      number_of_ratings desc, m.title asc  -- order results by the number of ratings (descending) and movie title (ascending)
    limit 10;  -- display top 10 results
    ```
    
    ![Untitled](Lab%203%20Big%20Data%20Analytics%20on%20Cloud/Untitled%209.png)
    
3. Find the titles of all movies that have no ratings
    
    ```sql
    %sql
    /*
      finds the titles of all movies that have no ratings
    */
    select
      m.title  --select the movie title
    from
      movies_csv m  -- Reference the movies_csv table with the alias 'm'
      left join ratings_csv r on m.movieid = r.movieid  -- left join on the ratings_csv table using the r alias on the movieid column
    where
      r.rating is null or r.rating==0 -- filter results to include only movies without ratings
    group by
      m.title -- group results by movie title
    order by
      m.title asc; -- order results by movie title (ascending)
    ```
    
    ![Untitled](Lab%203%20Big%20Data%20Analytics%20on%20Cloud/Untitled%2010.png)
    

### **Movie Rating Prediction (Recommendation) based on Collaborative Filtering**

- Prepare training and test sets
    
    ```python
    (training, test) = ratings.randomSplit([0.9, 0.1]) # split into training and test sets
    
    #delete the timestamp column
    training = training.drop("timestamp") 
    
    #create the training table
    training.createOrReplaceTempView("training")
    ```
    
    ![Untitled](Lab%203%20Big%20Data%20Analytics%20on%20Cloud/Untitled%2011.png)
    
- Query `training` table
    
    ```sql
    %sql
    
    select * from `training`
    ```
    
    ![Untitled](Lab%203%20Big%20Data%20Analytics%20on%20Cloud/Untitled%2012.png)
    

### **Model training using Alternating Least Squares (ALS)**

- Train an ML model with ALS
    
    ```python
    from pyspark.ml.recommendation import ALS
    
    # Run ALS collaborative filtering
    als = ALS(maxIter=5, regParam=0.01, userCol="userId", itemCol="movieId", ratingCol="rating", coldStartStrategy="drop")
    
    # Run training model 
    model = als.fit(training)
    ```
    
    ![Untitled](Lab%203%20Big%20Data%20Analytics%20on%20Cloud/Untitled%2013.png)
    

### **Review ALS Model Predictions Using Test Dataset**

- Look at some predictions with test dataset
    
    ```python
    from pyspark.sql.functions import when
    
    predictions = model.transform(test).dropna()
    
    predictions.show()
    
    #Remove the predictions greater than 5
    predictions=predictions.withColumn("prediction", when(predictions.prediction > 5, 5).otherwise(predictions.prediction))
    
    predictions.createOrReplaceTempView("predictions")
    ```
    
    ![Untitled](Lab%203%20Big%20Data%20Analytics%20on%20Cloud/Untitled%2014.png)
    

### **Evaluate the Model**

- Evaluate the model for it’s effectiveness
    
    ```python
    # Evaluate the model
    from pyspark.ml.evaluation import RegressionEvaluator
    evaluator = RegressionEvaluator(metricName="rmse", labelCol="rating", predictionCol="prediction")
    rmse = evaluator.evaluate(predictions)
    
    # Display using `displayHTML`
    displayHTML("<span style='font-size:14pt;color:purple'>The Root Mean Square Error is %s</span>" % str(rmse))
    ```
    
    ![Untitled](Lab%203%20Big%20Data%20Analytics%20on%20Cloud/Untitled%2015.png)
    
- I assume this result is pretty good. The average error will only be off by about 20%, which is definitely better than a random guess.

# Recommendations

- I recommended trying to encompass some workloads that are common to security practitioners. For instance, one of thee most common issues for security engineers is integrations and doing ETL jobs with various security tools. Having a SSOT (single source of truth) is pretty important for having a solid basis for good visibility of understanding of systems.  A lot of money could be saved by security teams if their engineers understood data engineering enough to do ETL jobs in the cloud and not have to run weird cron jobs on Python servers.  This is me recommendation.