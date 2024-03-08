# Results & Testing

# OSINT

- GO is required a lot of the times in Kali and Windows - [How to install Golang (latest version) on Kali Linux | by Noureldin Ehab | Creeper.exe | Medium](https://noureldinehab.medium.com/how-to-install-golang-latest-version-on-kali-linux-1afa2bd64ace)

## General Process

- Find the instagram page of the user whos password we are trying to crack
- Pull textual data from the account
- Get rid of stop words
- Put in a wordlist format for later steps

## Instagram Target…Me

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled.png)

## URL OSINT

Turns out a lot of tools are not great at this task. Most of them need work and don’t extract basic details from the URL

## Instagram OSINT tools

This would take too long to script and use for this project. However, it should be noted that there are a myriad of tools, lots of motivation, and potential to automate every part of the targeted password cracking process.

## Custom Wordlist

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%201.png)

# Dataset Dictionary Aggregation

## Tools

- [Mal's Free Download Page](http://www.maliska.net/mal/) - text merge
- https://github.com/k4m4/dymerge - completely runs out of memory.  Terrible on large datasets.

## Dymerge - fail

- The datasets have to be combined so I’m using a tool from GitHub called “Dymerge” to merge the text files.
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%202.png)
    
    - The process uses up a lot of memory (most of it)
    - The datasets were so large that it actually ran out of memory

## Text_Merge.exe

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%203.png)

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%204.png)

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%205.png)

Text_Merge is not maxing out memory, but it is quite slow and not utilizing GPU at all, then again maybe the GPU is not made for these types of operations.

## Merge Script

- Script took a long time to run
- `for %f in (*.txt) do type “%f” >> wordlist.txt`

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%206.png)

## Merged Password Data - Uncleaned

- Merge Script - somehow came out to 73 GB
- Text_Merge.exe - came out to around 50 GB

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%207.png)

## Deduplicating Lines

### Tools

- [Unified List Manager - ULM](https://unifiedlm.com/Home)
- https://github.com/google-research/deduplicate-text-datasets
- [[Solved] How Does One Remove Duplicate Text Lines From | 9to5Answer](https://9to5answer.com/how-does-one-remove-duplicate-text-lines-from-files-larger-than-4gb)
    - Cygwin - file,sort,uniq
- C++ - Memory Map
    - [Most memory efficient way to remove duplicate lines in a text file using C++ - Stack Overflow](https://stackoverflow.com/questions/73379136/most-memory-efficient-way-to-remove-duplicate-lines-in-a-text-file-using-c)
- C++ - Sparsepp

### Running C++

- [MSYS2](https://www.msys2.org/)
- Running minimalist C++ compiler - [How To setup and use Cygwin and MinGW](https://www3.ntu.edu.sg/home/ehchua/programming/howto/Cygwin_HowTo.html)
- Using sparsepp:
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%208.png)
    
    - using lots of memory
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%209.png)
    
- Using memory map (mmap):

### ULM - Unified List Manager

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2010.png)

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2011.png)

### C++ Program  - Memory Map

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2012.png)

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2013.png)

Doesn’t seem to run completely. This will need more tuning and fixing.

ULM still seems to work the best

## Large Text File Viewer

- https://github.com/variar/klogg

Turns out I made a fatal mistake.  Almost all of the passwords were just hashes from the HIBP dataset.

## Combining Plaintext Datasets…again

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2014.png)

## Deduplicating the Passwords…again

`sort64lm -i "merged_plaintext_passwords.txt" -T TEMP -t 4 -u`

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2015.png)

# Targeted Wordlist Generation

## AI Model-Based

### PassHemorrhage

- Takes tensorflow and GPU usage on Windows
- Getting libraries
    - [Install TensorFlow with pip](https://www.tensorflow.org/install/pip)
- Turns out tensorflow requires WSL2 in Windows now (which is broke on my PC)
- I can try opening this in a Kali or Linux VM, but then I won’t have GPU access unless I pay a bunch of money for pro versions.

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2016.png)

- Opened in Kali Linux and had less issues, but NO GPU
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2017.png)
    
- Used a tool online to convert txt file to delimited version

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2018.png)

- Copied into Kali Linux

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2019.png)

- Tons of weird errors

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2020.png)

### OMEN+

- Try installing on windows - [Installing OMEN on Windows 10 using Cygwin · Password-Guessing.org Blog](https://www.password-guessing.org/blog/post/omen-on-windows-using-cygwin/)
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2021.png)
    
- Tried on Kali Linux
    - Ran fine on Kali
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2022.png)
    
- Try to calculate NG probabilities to create model

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2023.png)

- UTF-8 Issues / Encoding errors

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2024.png)

- Looks like the passwords need cleaned.  The generated list has a bunch of weird characters

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2025.png)

- Cleaning the passwords
- `iconv -f utf-8 -t utf-8 -c merged_plaintext_passwords.txt > cleaned_merged_plaintext_passwords.txt`
- `cat cleaned_merged_plaintext_passwords.txt | sed -r 's/\s+//g' > cleaned_despaced_merged_plaintext_passwords.txt`
- Still errors with length and certain characters

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2026.png)

- Convert to only ASCII
    - `iconv -f utf8 -t ascii ASCII_merged_PT_PW.txt`
    - [https://linux.die.net/man/1/enca](https://linux.die.net/man/1/enca)
    - `enconv ASCII_merged_PW.txt -L none -x ascii`
    - `perl -pe 's/[[:^ascii:]]//g' ASCII_merged_PW.txt > only_ASCII_merged_PW.txt`
- Recreated alphabet

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2027.png)

- STILL ERRORS

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2028.png)

- STILL ERRORS - after using custom alphabet because of word length
    - this is good enough

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2029.png)

- GENERATED untargeted 10k!!!
- GENERATED TARGETING PASSWORDS
    - `./enumNG -m 10000 -H CUSTOM_WORDLIST_tab_delim.txt -a CUSTOM_WORDLIST_alpha-values.txt`
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2030.png)
    
- .

## Explicitly Defined Generation (No Datasets Required)

### Mentalist

> Modular way of mangling passwords
> 
- Open Kali in VMware
- Install from Source using Python
    - Check for Python 3:
        - `python3 --version`
    - Download setuptools and TK:
        - `sudo apt-get install python3-setuptools python3-tk`
    - Install Mentalist
        - `git clone [https://github.com/sc0tfree/mentalist.git](https://github.com/sc0tfree/mentalist.git)`
- Running mentalist:
    - `mentalist`
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2031.png)
        
- Generating Custom Permutations
    - Mentalist even gives you the resulting size of the file - 2.8GB
    - Did 12 different patterns of custom keywords, appends, substitutions, and uppercase transforms.
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2032.png)
    
- Combined all generated wordlists into one mentalist wordlist
    - `for %f in (*.txt) do type “%f” >> mentalist_wordlist.txt`
        - [How to Combine or Merge Multiple Text Files](https://www.online-tech-tips.com/free-software-downloads/combine-text-files/)
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2033.png)
        
- `sort64lm -i "merged_plaintext_passwords.txt" -T TEMP -t 4 -u`
    - got rid of duplicates and sorted everything
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2034.png)
        
- The problem is that there are keyword combinations that simply aren’t that realistic.  However, we still may be able to find something that is the real password
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2035.png)
    
- Combing again
    - `copy *.txt full_mentalist_wordlist.txt`
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2036.png)
    
- `sort64lm -i "full_mentalist_wordlist.txt" -T TEMP -t 4 -u`
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2037.png)
    

### Wister

- Install Wister
    - `git clone [https://github.com/cycurity/wister.git](https://github.com/cycurity/wister.git)`
    - `cd wister`
    - `pip install -r requirements.txt`
- Wouldn’t run

### Cordiale

- Not as permutative
- Had to paste in CUSTOM WORDLIST onto the command line
- Definitely not made to be exhaustive and more of a naive attempt
- Not the best for permutation, but maybe a good option for **keyword expansion**

### Cracken

- Download executable from GitHub
- `./cracken --help`
- Usage
    - Looking at how many we can generate with patterns
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2038.png)
        
- Generates really fast!

# Wordlist Evaluation

## Evaluation Method

- Similarity Distribution to Real Passwords

## Python Program

- Complex issues with running Python at the moment
    - Numpy and other packages not installing correctly
    - Tried completely reinstalling Python, adding env variables, venv implementation, pyreq, etc.
- Running Python in Kali to avoid issues

### Program

- Error with opening txt file in Pandas
    - tried using `chardet` to detect the encoding and open with the ascii encoding
- Still errors:
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2039.png)
    
    - Went to 8081 position in Bless hex editor
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2040.png)
        
        - The weird “o” letter is breaking everything
    - `perl -pe 's/[[:^ascii:]]//g' /home/kali/Desktop/targeted_pw_guesses.txt > only_ASCII_gpt3_wordlist.txt`

## String Similarity Algorithms

### ERRORS

- Had to get rid of words shorter than 8 characters from all wordlists:
    - `cat only_ASCII_gpt3_wordlist.txt | awk -v n=8 '{ line = $0; gsub("[^[:graph:]]", "") } length >= n { print line }' > more_than_8_gpt3_wordlist.txt`

### Normalized Levenshtein Distance, Damerau-Levenshtein Distance, Jaro-Winkler, Jaccard Index, SIFT4, Cosine

- Works as long as guesses are more than 1 character

![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2041.png)

### Evaluation Results

**Evaluation command to run “wordlist_stats”:**

`python wordlist_stats.py -i more_than_8_gpt3_wordlist.txt -p "password_to _guess”`

- Passwords to test:
    - sept13 - less than 8 (brute forced easily)
    - Benlovesdiving99
    - Ilovegrace2016
- GPT3
    - EVALUATION:
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2042.png)
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2043.png)
    
    - Levenshtein Distance
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2044.png)
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2045.png)
    
    - Damerau-Levenshtein Distance
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2046.png)
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2047.png)
    
    - Jaro-Winkler String Edit Distance
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2048.png)
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2049.png)
    
    - SIFT4 String Distance
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2050.png)
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2051.png)
    
    - Jaccard String Similarity
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2052.png)
    
    ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2053.png)
    
- OMEN+
    - EVALUATION:
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2054.png)
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2055.png)
        
    - Levenshtein Distance
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2056.png)
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2057.png)
        
    - Damerau-Levenshtein Distance
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2058.png)
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2059.png)
        
    - Jaro-Winkler String Edit Distance
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2060.png)
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2061.png)
        
    - SIFT4 String Distance
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2062.png)
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2063.png)
        
    - Jaccard String Similarity
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2064.png)
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2065.png)
        
- Cordiale
    - EVALUATION:
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2066.png)
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2067.png)
        
    - Levenshtein Distance
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2068.png)
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2069.png)
        
    - Damerau-Levenshtein Distance
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2070.png)
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2071.png)
        
    - Jaro-Winkler String Edit Distance
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2072.png)
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2073.png)
        
    - SIFT4 String Distance
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2074.png)
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2075.png)
        
    - Jaccard String Similarity
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2076.png)
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2077.png)
        
- Cracken
    - EVALUATION:
        - 99% of the file was duplicates
    - Levenshtein Distance
    - Damerau-Levenshtein Distance
    - Jaro-Winkler String Edit Distance
    - SIFT4 String Distance
    - Jaccard String Similarity
- Mentalist
    - EVALUATION:
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2078.png)
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2079.png)
        
    - Levenshtein Distance
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2080.png)
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2081.png)
        
    - Damerau-Levenshtein Distance
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2082.png)
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2083.png)
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2084.png)
        
    - Jaro-Winkler String Edit Distance
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2085.png)
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2086.png)
        
    - SIFT4 String Distance
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2087.png)
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2088.png)
        
    - Jaccard String Similarity
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2089.png)
        
        ![Untitled](Results%20&%20Testing%207296d8321da84846b82388e3b69be2dc/Untitled%2090.png)