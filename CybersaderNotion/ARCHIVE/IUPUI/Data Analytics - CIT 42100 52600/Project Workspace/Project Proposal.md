# Project Proposal

# Are Passwords Still Secure with AI?

Objectives/Hypothesis:

Passwords are still the primary authentication method. It is apparent that cracking passwords with a brute force approach still has limits where the password is long enough. However, with the growing popularity of deep learning, neural networks, natural language processing, and other forms of artificial intelligence, the question becomes whether our passwords are safe simply because of password length. The choice of a password depends on numerous factors: language, context, understanding of password security, and many other variables. The way people choose passwords has patterns because they usually rely on specific methods and some of these other factors. My question about future password security will revolve around a particular set of constraints and approaches to cracking passwords modernly. I hypothesize that modern natural language processing allows us to crack passwords that were previously seen as unbreakable. 

Additionally, I propose that these methods can be drastically more successful when OSINT (open-source intelligence) data is used in tandem with natural language processing models. For example, an attacker might automatically scrape every social media account associated with a user’s email, feed the textual data from their posts and account pages into an NLP model, and then utilize the model to generate large lists of potential passwords (wordlists). These wordlists can be used in subsequent chains of the attack to retrieve passwords from password hashes. I will first investigate if this method currently exists or if it has been successfully implemented in attacks. Suppose this sort of attack has been proposed, demonstrated, or talked about in literature. In that case, I will use this information and any open-source tools to analyze the attacks and their efficacy. If this attack has not been proposed, I will attempt to form a theoretical architecture for such an attack. Should either of these prove not to be feasible undertakings, I will look at the current attack landscape for NLP-based attacks on passwords and analyze these attacks with the available datasets.

# Data Sets

- [https://haveibeenpwned.com/Passwords](https://haveibeenpwned.com/Passwords)
    - Hundreds of millions of real passwords aggregated from data breaches by
- [https://figshare.com/articles/dataset/Yahoo_Password_Frequency_Corpus/2057937](https://figshare.com/articles/dataset/Yahoo_Password_Frequency_Corpus/2057937)
    - Sanitized passwords frequency list from Yahoo in May 2011.
- [https://www.kaggle.com/datasets/wjburns/common-password-list-rockyoutxt](https://www.kaggle.com/datasets/wjburns/common-password-list-rockyoutxt)
    - [https://www.tensorflow.org/datasets/catalog/rock_you](https://www.tensorflow.org/datasets/catalog/rock_you)
    - txt is one of the most used wordlists for password cracking, which was generated from a 2009 breach of the company “RockYou”.
- [https://github.com/danielmiessler/SecLists/tree/master/Passwords/Leaked-Databases](https://github.com/danielmiessler/SecLists/tree/master/Passwords/Leaked-Databases)
    - Numerous password lists from breaches:
        - Ashley-Madison, Lizard-Squad, NordVPN, Adobe, 000webhost, Fortinet, Hak5, Hotmail, MySpace, phpbb, etc.