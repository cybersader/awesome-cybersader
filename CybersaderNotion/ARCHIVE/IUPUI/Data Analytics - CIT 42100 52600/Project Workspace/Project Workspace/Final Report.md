# Final Report

- Layout
    - Title, Author
    - Abstract
    - Introductions
    - Literature Summary
    - System Design
    - Methodologies
    - Use Cases
    - Conclusion
    - References

# Report Outline

## “Targeted Password Cracking with OSINT Data”

> Benjamin Rader - B.S CSCI University of Indianapolis
> 

## Abstract

Password convenience stems from how humans choose passwords out of memorability. Moreover, passwords can closely relate to publicly available information connected to the person that creates them. Therefore, OSINT (Open Source Intelligence) techniques can be used to curate memorable and publicly available points of data around that entity. The substantive parts of the data and unique keywords can then be used to build wordlists for targeted password-guessing attacks against a particular user's password hash. Traditionally this involves combing keywords into massive combinations while appending other common words, patterns, or characters based on assumptions about password choice. However, many passwords are memorable because they form readable phrases, involve a human understanding of entities, or the password uses content words like pronouns in ways that are unique to human thinking. I propose that the security of these types of memorable passwords hinges on the ability of AI models to generate these sorts of targeted wordlists and on the availability of such models to mal-intent individuals. I conducted targeted wordlist generation using a traditional manual permutative approach with 2 public tools (Cordiale and Mentalist) along with an AI and machine learning approach using 2 more public tools (GPT3 and OMEN+). All methods utilize a custom wordlist composed of data that can be obtained through social media and sometimes compromised plaintext password datasets are used to train models. The author's social media page is used as an example, and generated wordlists are compared to an old password using string similarity algorithms such as Damerau-Levenshtein and the Jaccard Index. Results show that GPT-3 and OMEN+ wordlist generation underperforms when compared to even the more naive Cordiale program. I hypothesize that AI and ML-based implementations are more useful for cracking large compromised sets of password hashes and that manual permutative methods are more performant in targeted attacks.

## Introduction

There are three types of factors of authentication.  That is, there are three general categories to ponder when looking at how to validate an identity.  One can authenticate someone's identity by looking at what they know, what they are, or what they have. ([https://consumer.ftc.gov/articles/use-two-factor-authentication-protect-your-accounts](https://consumer.ftc.gov/articles/use-two-factor-authentication-protect-your-accounts)) What one may have could be some form of a key, maybe an item that no one else knows about except the entity that is validating your identity, or even some sort of key.  Locks authenticate people because they have a key that has notches which match the configuration of the pins in the lock core. What you are could be hidden in your DNA, your fingerprints, your eyes, or even your voice. Although it could be argued these are a form of what you have, these generally refer to biometric-related keys. Lastly, what you know refers to information or data stored in your brain. The most common manifestation of “what you know” authentication are passwords.

Passwords are still the dominant method for authentication. 9 out of 10 data breaches involve password attacks at some step of the attack chain. Data shows that using MFA (multi-factor authentication) can stop 99.9% of attacks. However, it is unrealistic to think that every person and organization has the knowledge or the will to execute such a task. Therefore, we must look at the root issues with passwords, considering that most things are secured with them in some form. 

### Basics of Password Cracking

A login form that utilizes an email address and password input are self-explanatory. A caveat arrives when one focuses on the comparison step where the password given is compared with the password stored by the authenticator. An insecure implementation will directly compare the given password input with the plaintext password that is associated with the email address. The attacker will immediately have the information needed to login as long as they can see this data in transit or in storage. These leaves for a much easier attack. In a secure implementation, the password is not stored in plaintext but rather as a “hash.” A hash is simply the output of a hash function, and in this case, the input for the hash function was a password. A hash function uses a “trapdoor” or one-way function. If given an input, say a string, then that string input will always generate the exact same outputted hash. In other words, it must be deterministic. Additionally, there are other characteristics that make up hash functions: it should be very unlikely that two different inputs produce the same output, should be easily computed, and accept all input lengths. Most importantly, the one-way function must be that - one way. Another word for this is preimage-resistance. If an attacker has the outputted hash, then it should be impossible to find the input of that hash without implementing a brute-force attack or by trying inputs. There cannot be a guaranteed way to find the input of the hash which is faster than just trying inputs and comparing them to the known hash. This is how password cracking is done. The attacker will simply try inputs with the same known hash function till they obtain the same hash output. There could be collisions or chances of finding a different input for the same output but this is unlikely.

### Stats on Password-Related Attacks

First off, password reuse is a rampant issue especially for attack vectors like password sprays and the more targeted hacks. A password manager is a quick fix to this issue, however it does not address the iceberg in the water. Password strength is an issue already. Data shows that most people still use short passwords that can be cracked in a fraction of a second and websites still allow this. Some websites have forced a change or forced the use of MFA. However, even this cannot completely mitigate future issues.  That is, once artificial intelligence is leveraged more for password cracking, then memorized passwords could become obsolete.

### Are Passwords Secure?

Passwords that are long enough and with enough entropy are indeed, at the moment, secure. This is especially true for the average person which is likely not the target of a nation-state level threat with the means to crack very long passwords. This doesn't take into account other attack vectors. However, there are cases where it is reasonable to assume that nation-state level threats are “brute-forcing” longer passwords. This could be the case for internal passwords such as one for root access or admin rights where MFA maybe isn't used. Such attacks are not well-known because of their nature, but the possibility is not unreasonable. However, these types of brute force attacks are easier to quantify and much harder to pull off, unless you have tons of money for computing infrastructure. The real problem is AI-based attacks that can crack memorable passwords.

## Literature Review

### Passwords and Memory

Considering passwords are a form of “what you know” authentication, then the definition implies that you need to have the ability to remember it. This is the case, even for most password managers, where you need to know the password to the password manager. The generated passwords from those various tools themselves might not be feasibly memorable or at least not cost effective for using the password managing tool. Still, the main password is, and most people don't even use password managers for a number of reasons: suspicious of the security, inconvenient, or didn't know about them. Therefore, one can assume that most passwords are memorable ones.

Evidently, memorable passwords have quite of few inherent flaws. If someone knows you enough, then they can probably guess your password. Unfortunately or not so unfortunately, language is complex and people can remember all sorts of things or simply not share memorable things with others or publicly online. Nonetheless, the nature of social media and the lack of infrastructure on the Internet that cultivates privacy practices with personal data creates opportunities for cracking memorable passwords. 

### Untargeted vs Targeted

With password memorability in mind, there two ways that threat actors can take advantage of this weakness. Firstly, attackers can learn the general nature of memorable passwords and use the learnt patterns to guess other passwords. With these patterns, they can go for a wide-nozzle type of attack and attempt to crack a list of password hashes - hoping to exploit the low hanging fruit. Such an attack doesn't focus on the individual characteristics of the victims who created the passwords. The wide-nozzle or password spray relies on the general patterns. On the contrary, a second extension of this attack can combine the macro-social characteristics of password memorability with the individual components: personal data, open source intelligence, and even personal acquaintance. In other words, we can combine peoples’ password patterns with the data points of a specific person to pull off a targeted attack.

### Wordlist Generation

As explained in the introduction, password cracking generally refers to hashing inputs till the desired hash function output is obtained. In which case, this means that the password has been found. Password cracking and especially brute-force approaches, rely on computational efficiency when working with larger passwords. Lists are simply the most efficient way to try inputs for hash functions. Most password cracking software or scripts work with the GPU or even specialized processors which can crack passwords at ludicrous speeds. These tools maximize the computational efficiency and leave the guessing methods up to the user who is doing the actual cracking. The name of the game isn't password cracking but rather wordlist generation. The best generated wordlist should include strings that are close in mathematical proximity or even semantics to the actual password or passphrase. 

I am defining two approaches to generating wordlists (targeted or untargeted):

- Explitcly Defined Generation
- AI Defined Generation

### Explicitly Defined Generation

One can view the process of creating wordlists as always involving a neural network of sorts. For the case of explicitly defined generation, wordlist creation is manully guided and defined by the user or person. To an extent, the password cracker's mental model becomes a tool for generating wordlists. However, it is absurd to think that a person can output enough guesses to crack any passwords. Most passwords will take unreds of thousands of guesse, even with smart guessing strategies.  It is more pragmatic to take an automated password mangling approach which utilizes human chosen keywords that are related to the victim and how passwords are creating. Password mangling has two parts. First, various patterns and common password structures are programmatically defined. Second, these patterns and structures are combined with keywords or any data points that are applicable to the victim. The password mangler uses patterns, assumptions, keywords to create combinations of points of data and common password components to generate wordlists of likely passwords. This is a programmatic and manual approach to creating wordlists, but can still be very powerful and effective.

### AI Defined Generation

AI defined generation uses AI models instead of human thinking to structure, define, and create wordlists. AI models can guess those which password manglers can't.  The difference is that AI models can, to an extent, learn these patterns and apply them. This can manifest itself in the form of supervised or unsupervised learning, but the main point is that the AI model is applied instead of human thinking to generate the wordlists. 

Some of these AI models rely on phonetic patterns, some on key path biases, some on semantic patterns, and even some of knowledge and ontology relations. It seems that most of these AI models are not flexible in the types of password patterns which they exploit. Nonetheless, many of them are quite performant in cracking. 

Password mangling can be directly applied to both targeted and untargeted attacks and so can AI models. However, in terms of targeted vs. untargeted approaches, the cost-effectiveness of various attack vectors and strategies will noticeably differ across password guessing AI models. For instance, most of the AI password cracking models focus on the characteristics of large datasets of compromised passwords, but do not focus on targeted password components such as date of birth, family member names, or other points of personal data. In other words, most existing models cannot be fed OSINT data to generate passwords for profiled or investigated individuals. Evidently, these models would be more useful in cracking larger portions of compromised password datasets rather than targeted attacks on specific individuals. Fortunately for the public but not for this study, there are only a few publicly available data models which can utilize personal data with AI models to craft better password guesses. Just as with any AI model, these targeted attacks require a lot of personal data.

### How easy is OSINT?

There is not a lot of statistics or data that specifically talk about personal data exposure, how much data the typical person has publicly available, or studies that detail the ease of it.  Generally, OSINT (open source intelligence) is straightforward and can be leveraged by the most amateur threat actors. OSINT refers to the procurement of publicly available data without violating laws or policies defined by data owners. OSINT curation on a target can be manual or automated, tool-based or native to the system they are scraping, and one can typically do so with little effort. Most users don’t utilize privacy settings on social media to their fullest either.  One study in 2018 showed data relevant to OSINT and specifically social media. In the study, 23% of participants shared personal information on social media, 46% used their real names, 45% used their real pictures for their profile, 54% did not attempt to read the privacy statement or terms, and 80% of the participants neither check the social media company practices nor know about the privacy settings of their own profile.  ([Future Internet | Free Full-Text | Privacy and Security Issues in Online Social Networks | HTML](https://www.mdpi.com/1999-5903/10/12/114/htm)). In a separate 2018 study with about 1400 respondents, about half of the respondents never checked their privacy or security settings for apps ([Why Users Ignore Privacy Policies – A Survey and Intention Model for Explaining User Privacy Behavior | SpringerLink](https://link.springer.com/chapter/10.1007/978-3-319-91238-7_45) ). There may not exist a lot of data to show exactly how much data is exposed on the internet that is leverageable in targeted attacks.  However, we can be sure with this data there is a motive to take advantage of the lack of awareness and minimizing of publicly available personally identifiable information (PII). Overall, it is rather elementary to obtain data about someone that can be used for cybercrime. 

## System Design

### Ideal Scenario for Cracking Passwords with OSINT

In an ideal scenario, we would have millions of points of data that include 1. Unstructured textual data scraped from social media accounts, and 2. Passwords of those social media accounts or other user-associated accounts. Problem being, that such datasets do not exist and cannot ethically or legally be created. Therefore, a more hypothetical and unorthodox approach must be taken. If there existed such a dataset, then we would merely train an AI model (take your pick) to generate potential passwords or wordlists based on the unstructured textual data. There are numerous models that could utilize this including but not limited to knowledge graph based implementations, generative adversarial network (GAN) models, recurrent neural networks (RNN), generative pretrained transformers (GPT), and many more. In this ideal scenario, the model could be unsupervised or supervised and learn patterns of personal data compared to the passwords that are used. However, as stated before, such datasets do not exist or are not available to the public.  Therefore, an alternative must be designed.

### Targeted Word Mangling for Wordlist Generation

Word mangling is a partly manual and partly automated process. s stated previously, word mangling requires an understanding of what makes passwords memorable or more likely to be used and also data about the target. This data can be obtained with a variety of OSINT techniques.  In this case, I utilize a URL scraper that creates wordlists from the stopwords and data at the URL. This part can be as manual or as automated as desired.  However, more data will require larger wordlist creation during the word mangling process. Therefore, the attacker should choose keywords wisely.

The process which I have designed for this case will pull keywords from a social media page.  I could look at the word2vec distance or semantic similarities with something like spacy to see if that social media textual data is similar to data that I will manually put down that pertains to my real password.  However, my knowledge of semantic models is limited, so no semantic analysis will be done for either password mangling or the subsequent AI model tests. The keywords from the social media page will be used to generate wordlists by using selected word mangling tools from GitHub. Steps will then be duplicated using manually inputted keywords that I provide to the mangler tools.  This will allow for a comparison between completely automated and partly-manual word mangling strategies.

### Targeted AI-Based Wordlist Generation

Targeted implementations of password-applicable AI models are far and few. In fact, utilization of the available models is often limited in wordlist generation speed and volume. Therefore, a targeted approach for AI-based wordlist generation will only utilize a small number of password guesses. Guesses will be on the scale of thousands rather than millions, billions, or trillions.

### Hardware Utilization

This project focuses on what is readily available to the average attacker and not advanced state nation-level threats. Most GitHub implementations do not compute using the GPU (graphical processing unit) which can lend to great cracking speeds, and some of the code is in programming languages that are not optimized for rapid operations (Python). herefore, speed will only be recorded if it lends to the cost effectiveness of the implementation.

## Methods & Analysis

### General Process

All models and implementations will utilize one or both of two potential inputs: a custom wordlist composed of data that can be obtained through social media or compromised plaintext password datasets.  The model or algorithm will then be used to generate wordlists.  Wordlists may have varying lengths.  However, they will all be given the same amount of effort as this experiment focuses on what the average attacker can do a benefit from. Lastly, the generated wordlists will be compared to several potential passwords chosen by the tester. Several string similarity functions will be used to quantitatively determine the performance of each wordlist in guessing or approximately guessing the actual password.  Due to lack of instances for social media OSINT data compared to actual passwords and absence of such a dataset, a combined average histogram for each similarity metric will be produced to show the effectiveness of each algorithm for targeted password guessing attempts.

### Processing Speed Caveats

### Naive Methods

- Available methods

### Training Models

### AI-Based Methods

- Available models

### Processing Strings from Wordlists Compared to Real Password

- String similarity
    - Jaccard
    - levenshtein

## Threat Model & Findings

### Relevant Threats & Attack Assumptions

AI masters vs script kiddies

Not using MFA. Can do mutiple guesses.  have access to hashes

### AI Models vs Sequential & Programmatic

Are password mangling attacks still more successful than AI-based targeted attacks

## Conclusion

## Memory & Passwords

## Self-Hypothesized Related Topics

- Keyword Expansion
- Knowledge-Graph Assisted Implementations
- Chunk-level Guessing