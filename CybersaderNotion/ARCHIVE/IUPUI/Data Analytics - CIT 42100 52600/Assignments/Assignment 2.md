# Assignment 2

> *Name: Benjamin Rader*
> 

*Given the county ranking data set (2017CHR_CSV_Analytic_Data.csv) and its description (2017CountyHealthRankingsData.xls), please finish the following tasks by providing the results, explanation and code.*

## Task 1

Normalize any three the features to range (0,1). Please include results and code. (refer the code in my slides) (10 points)

![Untitled](Assignment%202/Untitled.png)

![carbon.png](Assignment%202/carbon.png)

## Task 2

Create four bins based on the diabetes value and label the bins. Please include results, explanation and code.  (refer the code in my slides)  ****(20 points)

### Comparing Diabetes Value with Premature Death

- As seen below in the scatter plot, more premature death is associated with a high diabetes value
- This means that a larger value is likely associated with a bad outcome

![Untitled](Assignment%202/Untitled%201.png)

### Binning the Diabetes Values

- We can use pd.cut to bin the Diabetes Values into equal-width groups.  This means that from the minimum to the maximum value there are 4 bins that span 1/4 of the total range of values. These 4 bins are given labels (Good, Normal, Unsafe, High-Risk).

![Untitled](Assignment%202/Untitled%202.png)

![Untitled](Assignment%202/Untitled%203.png)

## Questions I have

- What to use to visually look at the .CSV?
    - I still have to open the .csv file to find features or to get a basic understanding of some of the attributes. I can do this in Python, but it still seems more efficient to just double-click the file and open it up visually.  What do you suggest as an alternative to Excel for understanding the data in the .CSV file?
- Should I be needing to convert back and forth between different data types (numpy array vs pandas dataframe)?
- What sort of cleaning should I do to the data before using it?

---

## Relevant Libraries

- pandas
- sklearn (scikit-learn)

## Other Resources

- [https://pbpython.com/pandas-qcut-cut.html](https://pbpython.com/pandas-qcut-cut.html)