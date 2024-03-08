# Unsupervised Learning Algorithms

# Clustering

## K-Means

- Centroid-based

### How-To

- Features are very important
    - do not use all of the columns
- PREPROCESS
    - before clustering or classification

### Disadvantages

- You must determine the number of clusters
    - use elbow points
- Sensitive to outliers.
    - Should you remove th outliers though? - depends
        - for network traffic, outliers are important, but for something it might not be
- Can require a lot of memory
    - you have to load everything to be able to actually analyze the complete cluster

### Caveats during Clustering

- Make sure values of attributes are equal in range so that one attribute doesn’t dominate

### WSS Curve

- Gives you the elbow points