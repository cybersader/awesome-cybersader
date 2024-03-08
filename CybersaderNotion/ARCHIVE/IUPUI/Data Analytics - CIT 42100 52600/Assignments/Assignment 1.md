# Assignment 1

> BY: Benjamin Rader
> 

# Task 1. Use the flights.csv file

(1) Remove the rows that have no value or “na” in dep_delay or arr_delay 

- Comparison of row counts with the uncleaned and cleaned respectively.

![Untitled](Assignment%201/Untitled.png)

(2) Calculate the mean dep_delay and arr_delay for each flight (defined as carrier and flight)

- The mean values of dep and arr delay by flight and carrier aggregated

![Untitled](Assignment%201/Untitled%201.png)

# Task 2.  Use the Wine.csv file

(1) Draw a boxplot using ‘quality’ and ‘alcohol’ column to see if the quality level hasany relationship with the alcohol amount

- Could’nt use “quality” as column as it was giving me “missing key” errors.  This is some issue with the csv file.  I tried changing the delimiter, separator, etc.  I tried switching completely to matplot lib.  Nothing would work.
- I managed to finally get this working properly with the simple boxplot function without specifying the column and by parameters.  Turns out, I was specifying them improperly.
- There is definitely a pattern showing that better wine has more alcohol in it. Although, there is still a wide range of values in all quality levels.
    
    ![Untitled](Assignment%201/Untitled%202.png)
    

(2) Draw a histogram plot using ‘total sulfur dioxide’, and explain what you learn from the figure

- Most of the data sits around the 30 range.  Most wine has some 30 (in some metric) total sulfur dioxide.

![Untitled](Assignment%201/Untitled%203.png)

(3) Draw a Scatter plot using `residual sugar’ and ‘quality’, and explain what you learn from the figure 

- The range of values tends to go up as the quality increases.  However, the residual sugar clusters in the 2-4 range at all qualities.

![Untitled](Assignment%201/Untitled%204.png)

(4) Draw a hexbin plot using `residual sugar’ and ‘alcohol’, and explain what you learn from the figure 

- The overwhelming majorities of wines from the dataset bunch up in the 9-10 (alcohol) and 1-3 (residual sugar). In these areas, most wines are the same or at least relatively consistent.

![Untitled](Assignment%201/Untitled%205.png)