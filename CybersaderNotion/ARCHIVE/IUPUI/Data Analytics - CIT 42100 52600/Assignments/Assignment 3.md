# Assignment 3

> *Name: Benjamin Rader*
> 

Given the county ranking data set (2017CHR_CSV_Analytic_Data.csv) and its description (2017CountyHealthRankingsData.xls), please finish the following tasks by providing the results, explanation and code.

## Task 2

Please use information gain to select top 10 features that are related to the diabetes value (after you created the bin (categories) in assignment 2. Then you can run the python code or load into weka), please given explanation and/or literature references why the features are selected

(20 points)

### Top 10 Information Gain Attributes from my Python Code

![Untitled](Assignment%203/Untitled.png)

1. FIPS Code 
    1. FIPS Code is related to geographic areas.  This can definitely be a determinate of diabetes, because certain demographics of people cluster in geographic areas.  Diets and genetics are more alike in demographic groups, so it is probably correlated with the diabetes value.
2. Population living in a rural area 
    1. This has the same reasoning for being related to the diabetes value just as the FIPS code. People and their cultures (diet, fitness, etc) group up.
3. Dentists Denominator
    1. Gum disease is legitimately recognized as a complication of type 2 diabetes. Gum disease can also cause blood sugar to rise.  These two relations between dental care and diabetes make dentists a factor in determining diabetes risk.
4. Mental Health Providers
    1. This isn’t a cause of diabetes but it is correlated. People with diabetes have to undergo extensive life changes to function normally.  Therefore, this can bring a lot of mental stresses into their lives.  This makes diabetes and mental health easily correlated.
5. Primary Care Providers & Physicians
    1. This is an obvious factor. Diabetes can cause a lot of major health complications and therefore health providers are going to be related.
6. Obesity
    1. Having a high BMI means more fatty acids and more inflammation, which leads to insulin resistance. This can lead to non-insulin dependent diabetes (type 2). This is related to high blood sugar, as mentioned earlier.
7. Population that is not English proficient and populations that are non-Hispanic white (attributes)
    1. These are related to diabetes because of a combination of genetics, lifestyle from culture, and resources to fight causes of the disease. The culture you come from and your genetics are very much related to diabetes, so it comes as no surprise that these would be related to the diabetes value.