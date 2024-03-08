# Adversarial Attacks - NNs

# Adversarial Attacks on NN Inputs

- Inputs that generate incorrect predictions on purpose
- GoogLeNet Model
    - If you add a certain type of noise to the input, then instead of detecting a panda, it detects a monkey

## How can attackers do this with precision?

- They find the loss function to get parameters or inputs that exploit the model

### White Box Attack

- Attack
    - Higher dimensions for input image make it easier to exploit.
    - Solve the maximization problem
        - Finding values that break parts of neural networks
- Defense
    - Train the model to classify the adversarial examples

### Black Box Attacks

- .

# Experiments with Adversarial Attacks

## Detection during inference using a adversarial filter

- Binary classification of attacks
    - Positive and negative to show confidence of being attacked
    - Overfeat fast network (pre-trained)
- Essentially, you can use hidden layers values to detect adversarial attack inputs
- Did you say it can detect adversarial examples as well as legitimate but “bad” inputs
- Use adversarial examples
- Could it be slow? - they didn’t mention it
- Is this applicable to most NNs? - any with hidden layers

## 2 Attack Methods and 1 Defense Method

- Attacks
    - Methods
        - multi-sample ensemble method (MSEM)
            - They samples modifications of an image and use result values to craft adversarial inputs
        - most likely ensemble method (MLEM)
    - Algorithms
        - adaptive norm attack
        - adversarial fast autoaugmentation (AFA)
            - same as MSEM?  Augment data to find augmentation policies for robust adversarial attacks

# Gradient Attacks

- Very powerful and applicable to large companies