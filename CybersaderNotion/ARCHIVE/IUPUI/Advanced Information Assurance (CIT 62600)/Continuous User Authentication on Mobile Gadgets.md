# Continuous User Authentication on Mobile Gadgets

# Background & Overview

- Traditional Authentication
    - Static - uses a piece of what you know initially before the session
- The gist
    - Authenticate during the session rather than just initially

# Continuous AuthN Methods on Mobile

- Behavioral heuristics or biometrics
    - Uses movement patterns
    - Ex: typing speed, touchscreen gestures, and mouse movements
    - Use NN models - lots of benefits
        - doesn’t require lots of training, fast, and doesn’t need updated
    - Why not simply require MFA when the confidence gets lower enough to a certain threshold
    - Type of NN:
        - Few-shot learning - make accurate predictions with few predictions
        - Siamese networks
- Biometric Authentication
    - Device fingerprinting with peripheral timestamps

# Behavioral Biometrics

- “What you are” - haha that’s a pretty deep rabbit hole to go down to define
- Relate NN learning:
    - Few Shot Learning
        - learn only from inputs?
- In this case, “AuthentiSense”
- Uses 3 inputs:
    - accelerometer
    - gyroscope
    - magnetometer
- Literature Overview
    
    
    - Other paper - using machine learning instead of deep learning
    - Motion and touch based approaches
    - Pros and Cons
        - not super accurate - con
        - non-intrusive - pros
- Did combinations of activities:
    - reading, sitting, walking- combinations of them
- used 20 frame windows - probably differs between the sensors
    - classification methods:
        - logistic regression
        - naive bayes
        - SVM RBF - seemed to be the best
        - Random Forest

# Overview

- Authentisense -fee shot learning
    - Uses movement and orientation
    - Accel, gyro, magneto
    - 
- Deep features based
    - Movement, orientation, touch, gesture, causality
    - Reading, writing, map nav
    - Sitting and walking
    - 
- Enhanced unimodel
    - Behavioral patterns on all apps
    - Combinations of reading, sitting, writing, walking
    - 
- Multibiometric
    - 

- They could use other biometrics to supervise the learning
- Which are most effective at recognizing separate entities/users
- Are these supervised or unsupervised?
- Svm - support vector machine?
- User agnostic - if not then you need time training for certain users?
-