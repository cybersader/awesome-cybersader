# Lab 4

**Lab Tasks**

*Please include the screenshots of the results for each of the following questions.*

## Task 1: Generating Message Digest and MAC (25 points)

In this task, we will play with various one-way hash algorithms. You can use the following `openssl dgst` command to generate the hash value for a file. To see the manuals, you can type  `man openssl` and  `man dgst`.

`% openssl dgst dgsttype filename`

Please replace the `dgsttype` with a specific one-way hash algorithm, such as `-md5`, `-sha1`, `-sha256`, etc. Please replace filename with the name of the file you want to process. In this task, you should try at least 3 different algorithms, and describe your observations. You can find the supported one-way hash algorithms by typing "man openssl".

![Untitled](Lab%204/Untitled.png)

![Untitled](Lab%204/Untitled%201.png)

## Task 2: Keyed Hash and HMAC (25 points)

In this task, we would like to generate a keyed hash (i.e. MAC) for a file. We can use the -hmac option

(this option is currently undocumented, but it is supported by openssl). The following example generates a keyed hash for a file using the HMAC-MD5 algorithm. The string following the `-hmac` option is the key.

`% openssl dgst -md5 -hmac "abcdefg" filename`

Please generate a keyed hash using HMAC-MD5, HMAC-SHA256, and HMAC-SHA1 for any file that

you choose. Please try several keys with different length. Do we have to use a key with a fixed size in

HMAC? If so, what is the key size? If not, why?

![Untitled](Lab%204/Untitled%202.png)

## Task 3: The Randomness of One-way Hash (20 points)

To understand the properties of one-way hash functions, we would like to do the following exercise for MD5 and SHA256:

1. Create a text file of any length.

1. Generate the hash value *H* for this file using a specific hash algorithm.
2. Flip one bit of the input file. You can achieve this modification using ghex or Bless.
3. Generate the hash value *H* for the modified file.
4. Please observe whether *H* and *H* are similar or not. Please describe your observations in the lab report.

![Untitled](Lab%204/Untitled%203.png)

![Untitled](Lab%204/Untitled%204.png)

![Untitled](Lab%204/Untitled%205.png)