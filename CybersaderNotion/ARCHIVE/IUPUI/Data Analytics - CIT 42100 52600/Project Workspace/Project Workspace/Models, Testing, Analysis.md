# Models, Testing, Analysis

---

---

# Testing Frameworks

## Public Ones

- https://github.com/RUB-SysSec/Password-Guessing-Framework

## My Testing Framework

- Generate wordlists from various AI tools
- 

---

# OSINT Tools to Gather Keywords

## Gather Data from URL

- https://github.com/OWASP/D4N155 - generates wordlist from URL
- https://github.com/edermi/skweez - also generates wordlists from URLs
- https://github.com/ameenmaali/wordlistgen
- https://github.com/Zarcolio/wwwordlist

## Instagram OSINT

- Takes up to 14 days to manually export all of your own data
- [Instaloctrack - An Instagram OSINT Tool To Collect All The Geotagged Locations Available On An Instagram Profile In Order To Plot Them On A Map, And Dump Them In A JSON](https://www.kitploit.com/2022/02/instaloctrack-instagram-osint-tool-to.html)
    - https://github.com/bernsteining/instaloctrack
- https://github.com/tnychn/instascrape
- https://github.com/rist0/InstagramDownloaderV2
- https://github.com/vintagesucks/instagram-export
- https://github.com/vinay20045/json-to-csv
- https://github.com/RishiTiku/InstagramJSONToReadableText
- https://github.com/huaying/instagram-crawler
- https://github.com/bernsteining/instaloctrack
- https://github.com/xadhrit/terra
- https://github.com/Datalux/Osintgram

## Manual

Do it yourself.  Go to their page and put in words.

## Wide-Nozzle Methods

- KG-based crawlers
- Wikipedia based crawler
    - https://github.com/bxs9775/Wiki-Wordlist-Generator
- Word similarity search crawlers

# Targeted Wordlist Generators

## AI Model-Based

- https://github.com/RUB-SysSec/OMEN - OMEN+ → can use basic personal info to try cracking passwords. Markov model-based.
- https://github.com/o4ugDF54PlqU/PPPNN - RNNs used to train, then LSTM text generator with TF-IDF, Gensim and NLTK.
- https://github.com/ACM-Research/targeted-password-guesses - GPT-3-based generator that takes random input data to generate potential passwords.
- https://github.com/Hollow667/PassHemorrhage - Uses a GAN, Discriminator, and CUPP
- 

## Explicitly Defined Generation (No Datasets Required)

- https://github.com/sc0tfree/mentalist - GUI based tool that uses modules to sequentially mangle wordlists
- https://github.com/cycurity/wister - didn’t run
- https://github.com/ALEHACKsp/cordialie
- https://github.com/shmuelamar/cracken

# Untargeted Wordlist Generators

## AI Model-Based

- https://github.com/lakiw/py_omen
- https://github.com/pasquini-dario/PLR

## Explicitly Defined Generation (No Datasets Required)

- More manglers with smart keywords and patterns

---

# String (Comparison, Similarity, Mapping, Distance) Algorithms

- [strsimpy · PyPI](https://pypi.org/project/strsimpy/)
    - Comes from GitHub - https://github.com/tdebatty/java-string-similarity
- https://github.com/ywu94/python-text-distance
- https://github.com/luozhouyang/python-string-similarity
- Potential Extra Visualization - https://github.com/scarletcho/runWord2vec