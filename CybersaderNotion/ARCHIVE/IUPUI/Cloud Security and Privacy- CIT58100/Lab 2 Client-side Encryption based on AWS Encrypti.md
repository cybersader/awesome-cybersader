# Lab 2: Client-side Encryption based on AWS Encryption SDK

March 13, 2023 

> BY: Benjamin Rader
> 

# Installation and Pre-reqs

- Made sure Python was installed using Powershell for my CLI
    
    ![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled.png)
    
- Looked at pip version
    
    ![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%201.png)
    

## IAM User in AWS

- Make an IAM user

![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%202.png)

- Create an user group

![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%203.png)

## Download and Setup AWS CLI Tool

- Download the msi file to setup the AWS CLI

![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%204.png)

- Check the version of it after installing

![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%205.png)

- Setup an access key for the CLI

![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%206.png)

- Run `aws configure` to setup a connection to AWS using the key from the previous step

![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%207.png)

## Installing AWS Encryption CLI

`pip install aws-encryption-sdk-cli`

![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%208.png)

`aws-encryption-cli.exe –-version`

![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%209.png)

## Create a KMS Key

- Go to the KMS dashboard in AWS and configure a customer managed key

![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2010.png)

- Use symmetric

![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2011.png)

- Add an alias

![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2012.png)

- Set up permissions

![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2013.png)

- Key Usage Permissions

![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2014.png)

# Encrypting and Decrypting Documents with AWS Key

## Prepare Document

- Open a text doc and fill in some dummy info

![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2015.png)

![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2016.png)

![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2017.png)

## Encrypting the Document

- `cd` ’d to the directory where my plaintext.txt file was
- I need to use the ARN from the AWS CMK console, so I go to the “Customer managed keys” section and look at the details page to find the ARN listed in the format “`arn:aws:kms:region:account-id:key/key-id`”
    - All I need is the ARN value though 😃
        
        ![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2018.png)
        
- Used the following command from docs:
    - `aws-encryption-cli -e --input plaintext.txt --wrapping-keys key=arn:aws:kms:region:account-id:key/key-id --metadata-output ./metadata.txt --commitment-policy require-encrypt-require-decrypt --encryption-context purpose=test --output encrypted.txt`
- Run the encryption command
    
    ![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2019.png)
    
- Encrypted Text
    
    ![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2020.png)
    
- Use command to check if it worked
    
    ![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2021.png)
    

## Decrypting the Document

- Run the decryption command to decrypt it
- `aws-encryption-cli -d --input encrypted.txt --wrapping-keys key=arn:aws:kms:region:account-id:key/key-id --metadata-output ./metadata2.txt --commitment-policy require-encrypt-require-decrypt -max-encrypted-data-keys 1 --buffer --encryption-context purpose=test --output decrypted.txt`
    
    ![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2022.png)
    
- Decrypted document
    
    ![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2023.png)
    

## Encrypt a Whole Folder

- Generate a bunch of dummy files using Powershell
    
    ![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2024.png)
    
- Encrypt all of the files
    - `aws-encryption-cli --encrypt --input .\testdir --recursive --wrapping-keys key=arn:aws:kms:us-east-2:555183575312:key/3b5f16d3-ef44-4bbd-ae8a-232f9dbeae19 --encryption-context dept=IT --metadata-output $home\Metadata.txt --commitment-policy require-encrypt-require-decrypt --output .\testenc`
    - Made sure to create destination directories too
        
        ![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2025.png)
        
- Check the encrypted files
    - Run: `Get-ChildItem .\testenc`
    - Run: `Get-ChildItem .\testenc\* | ForEach-Object {Get-Content $_.FullName}`
        
        ![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2026.png)
        

## Decrypt a Whole Folder

- Decrypt the encoded folder
    - `mkdir testdecode`
    - `aws-encryption-cli --decrypt --input .\testenc --recursive --wrapping-keys key=arn:aws:kms:us-east-2:555183575312:key/3b5f16d3-ef44-4bbd-ae8a-232f9dbeae19 --encryption-context dept=IT --metadata-output metadata4.txt --commitment-policy require-encrypt-require-decrypt --max-encrypted-data-keys 1 --buffer --output ./testdecode`
- Look the results
    - `Get-ChildItem .\testdecode\* | ForEach-Object {Get-Content $_.FullName}`
        
        ![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2027.png)
        

# Questions

1. Does the client need to contact AWS KMS for every encryption and decryption? Why?
    - Yes. Because AWS has the wrapping key/master key. During decryption, this also must be done.
2. Can the attackers recover the plaintext message just based on the encrypted message?
    - No. I don’t think so. Considering that the true plaintext message is the result of wrapping the plaintext with two separate keys using a specific algorithm, I don’t think it is remotely possible for an attacker to recover the plaintext without the keys. This however, could depend. Not to mention, AWS KMS uses up-to-date algorithms for confidentiality, key derivation, and key commitment methods.
3. What would happen if the encrypted message was modified by attackers? Please modify the encrypted message and try to decrypt it.
    - The algorithms that the AWS KMS SDK uses include integrity protocols, so I assume that it will tell the user that the data was tampered with or corrupted.
    - Deleted some characters (only like 4)
        
        ![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2028.png)
        
    - Tested decryption again
        - `aws-encryption-cli -d --input encrypted.txt --wrapping-keys key=arn:aws:kms:region:account-id:key/key-id --metadata-output ./metadata2.txt --commitment-policy require-encrypt-require-decrypt -max-encrypted-data-keys 1 --buffer --encryption-context purpose=test --output decrypted2.txt`
        - `aws-encryption-cli -d --input encrypted.txt --wrapping-keys key=arn:aws:kms:us-east-2:555183575312:key/3b5f16d3-ef44-4bbd-ae8a-232f9dbeae19 --metadata-output ./metadata5.txt --commitment-policy require-encrypt-require-decrypt -max-encrypted-data-keys 1 --buffer --encryption-context purpose=test --output decrypted2.txt`
        - Somehow it still worked?!?!?
            
            ![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2029.png)
            
        - Tried it again after deleting more and got a Serialization error. So it detected corruption.
            
            ![Untitled](Lab%202%20Client-side%20Encryption%20based%20on%20AWS%20Encrypti/Untitled%2030.png)