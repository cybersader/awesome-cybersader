# Sphinx: Enabling Privacy-Preserving Online Learning over the Cloud

---

# FILE PDF

[Sphinx- Enabling Privacy-Preserving Online Learning over the Cloud.pdf](Sphinx%20Enabling%20Privacy-Preserving%20Online%20Learning/Sphinx-_Enabling_Privacy-Preserving.pdf)

---

---

# Paper Text

[text](Sphinx%20Enabling%20Privacy-Preserving%20Online%20Learning/text.md)

# Paper Outline

[GPT outline](Sphinx%20Enabling%20Privacy-Preserving%20Online%20Learning/GPT%20outline.md)

[outline](Sphinx%20Enabling%20Privacy-Preserving%20Online%20Learning/outline.md)

# Slides Outline

1. Title
2. Privacy Philosophy
    1. Why is privacy actually important
    2. What is privacy
        1. people often conflate privacy with liberty
        2. a good alternative is data protection which has been codified into laws like the general data protection regulation (GDPR)
        3. I would say privacy is limiting the viewing and processing of information about you…simple as that
    3. Whether certain means or ends (goals) are right or wrong is a whole other debate and conversation. 
3. Risk: Where Privacy and Security Meet
    1. Reducing user data can reduce the risk because threat actors cannot leverage encrypted data for their interests.
    2. A lot of the same visibility and tasks done by both complement each other
    3. Cybersecurity is about limiting and protecting IT-related systems because individuals can exploit weaknesses in them for their interests
    4. Privacy is about limiting and protecting data about entities because this data can be leveraged for arbitrary
4. Utilizing Public Cloud AI Services - The Privacy Dilemma
    1. The reason for this paper is that companies are using AI more and more and they are utilizing MLaaS because it’s cheaper to keep up with infrastructure
    2. Putting user data and computation in the hands of third parties
    3. "It's like giving your unique cookie recipe to a friend and trusting they won't start selling the cookies at their own bake sale." - GPT 4
5. Sphinx 
    1. What, How, Stats
    2. Control over “privacy budget” (really important)
    3. Efficient and fast when compared to systems trying to do the same thing
6. Homomorphic Encryption Explained
    1. History and how fast it used to run..the traditional issues
    2. Spray painted Glove box analogy
    3. Outsource computation to limit the utility of user data - users can be aware of how their data is used and provably ensure it is used only in that way
7. Differential Privacy
    1. 
8.  Related Work - Why Sphinx is better
    1. DP with inference
    2. DP with training
9. Neural networks explained
    1. origin
    2. linear and non linear components
10. How sphinx works
11. Their implementation of Sphinx
12. Sphinx Evaluation
13. Why this is essential to our future
    1. When you start to put programmatic logic alongside AI based on user data which in turn makes decisions on how some system should interact with you, then we get complex marketing mechanisms like social media preference engines
    2. Complex AI-based engines need changed in two ways:
        1. limit the inputs of user data
        2. moderate the operation of the engines in some way
    3. Privacy is essential to a future with AI
14. Future Architectures and Applications and Problems to Solve
    1. Oursourcing computation of cloud based apps in a privacy centric way
    2. Applying homomorphic encryption to various problems
    3. Applying differential privacy to problems
    4. User awareness through notices
    5. Monetization models - the biggest problem
        1. value comes from somewhere
        2. privacy centric applications will probably cost money and 

# Homomorphic Encryption Explained

- PKC
    - Slamming a door shut that locks (anyone can shut the door) (only the secret key can unlock it and open it)
    
    ![Untitled-2022-11-14-1842 (2).png](../NetSec%20-%20CIT%2055510/Hashing,%20Number%20Theory,%20Public%20Key%20Crypto%2012171b07eb714e939694493938dd6f07/Untitled-2022-11-14-1842_(2).png)
    
- Homomorphic
    - Math on encrypted data without decrypting it.  Outsourcing computation
    - Glove box - anyone can stick their hands inside the glove box to manipulate what’s inside, but they can’t take it out
    - only secret key can open it up
    - Types:
        - Additive
        - Multiplicative
        - Full

# Differential Privacy Explained