# Assignment 7

> *Name: Benjamin Rader*
> 

# Instructions

Question 1 (40 pts)

Write a MapReduce JAVA program. Please include JAVA code and screenshots of the results

in the submission.

You will need to write a MapReduce job that reads in text input and computes the average length

of all words that start with each character. For any text input, the job should report the average

length of words that begin with ‘a’, ‘b’, and so forth. For example, for input:

![Untitled](Assignment%207/Untitled.png)

The output would be:

![Untitled](Assignment%207/Untitled%201.png)

For initial solution, your program should be case sensitive as shown in the example.

The frameworks of the java programs are given in your workspace directory:

`/home/training/training_materials/developer/exercises/averagewordlength/src/stubs`

Please fill in the TODO parts and compile the programs.

To test your program, please use the test file in folder:

`/home/training/training_materials/developer/data/shakespeare`

# Question 1

## Getting Hadoop FS Setup

![Untitled](Assignment%207/Untitled%202.png)

## Test Hadoop FS

- `hadoop fs -ls`
- Navigate and find WordCount.java
    - `cd /home/training/training_materials/developer/exercises/averagewordlength/src/stubs`
    - `ls`
        
        ![Untitled](Assignment%207/Untitled%203.png)
        

## AvgWordLength.java

### Found documentation -

[MapReduce Tutorial](https://hadoop.apache.org/docs/stable/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html#Job_Configuration)

### Configuring the Mapper and Reducer

- Mapper Example:
    
    ```
    // Create a new Job
         Job job = Job.getInstance();
         job.setJarByClass(MyJob.class);
    
         // Specify various job-specific parameters
         job.setJobName("myjob");
    
         job.setInputPath(new Path("in"));
         job.setOutputPath(new Path("out"));
    
         job.setMapperClass(MyJob.MyMapper.class);
         job.setReducerClass(MyJob.MyReducer.class);
    
         // Submit the job, then poll for progress until the job is complete
         job.waitForCompletion(true);
    ```
    
- Reducer Example
    
    ```
    // Create a new Job
         Job job = Job.getInstance();
         job.setJarByClass(MyJob.class);
    
         // Specify various job-specific parameters
         job.setJobName("myjob");
    
         job.setInputPath(new Path("in"));
         job.setOutputPath(new Path("out"));
    
         job.setMapperClass(MyJob.MyMapper.class);
         job.setReducerClass(MyJob.MyReducer.class);
    
         // Submit the job, then poll for progress until the job is complete
         job.waitForCompletion(true);
    ```
    

### Setting Input and Output Types for Mapper, Reducer, and Outputs

- `Type mismatch in key from map`
- Turns out I have to set my inputs and outputs for everything
    
    ```python
    (input) <k1, v1> ->
     **map**
     -> <k2, v2> ->
     **combine**
     -> <k2, v2> ->
     **reduce**
     -> <k3, v3>
     (output)
    ```
    
- Breakdown
    - Input (text) → Mapper (text: int) → Reducer (Text: Double)
        - The reducer needs double because it’s an average

```java
//This explicitly tells the mapper and reduce exactly what formats they are working with for inputs and    outputs
job.setMapOutputKeyClass(Text.class);
job.setMapOutputValueClass(IntWritable.class)

//Tells it what the final output formats are
job.setOutputKeyClass(Text.class);
job.setOutputValueClass(DoubleWritable.class);

```

## LetterMapper.java

- The java class tells us what it takes for parameters — `Mapper<LongWritable, Text, Text, IntWritable>`
- We need to split up the long string into words so that we can have tokenized data to work with (I think that’s the right word.)
- search "java split string into words”
    - [https://www.geeksforgeeks.org/split-string-java-examples/](https://www.geeksforgeeks.org/split-string-java-examples/)
- We can split by regex - `\w+`
- If it is actually a word longer than zero, then get the first character ad create a pair “character”:”length” with the context variable from the map method

## AverageReducer.java

- Range-based for loop over values `IntWritable character : values`
- obtaining the sum of lengths (value) for each key (character) `sum_word_length += character.get();`
- Get the average `double avg = sum_word_length/count;`
- Write it to the context variable for output `context.write(key, new DoubleWritable(avg));`

## Results

- Run it - `javac -classpath 'hadoop classpath' *.java`
- Error with regex - `LetterMapper.java:16: illegal escape character
for (String string:text.split("\w+")) {
^
1 error`
- TONS OF MORE ERRORS - 51
    - 2 hours of error debugging.  Didn’t put them all down.
- Finally got a jar file from the class files
    
    ![Untitled](Assignment%207/Untitled%204.png)
    
- Ran `hadoop jar avgwordlength.jar stubs.AvgWordLength shakespeare wordlengths`
- Ran mapreduce job over shakespeare dataset

![Untitled](Assignment%207/Untitled%205.png)

## Output

![Untitled](Assignment%207/Untitled%206.png)