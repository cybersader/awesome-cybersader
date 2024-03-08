# Advanced Password Hashing for DB

# DB sec

- safeguarding info

# Password Hashing

- deterministic transformation
- fixed-length string generated
- Salting:
    - unique random value stored alongside hash (salt + password) to prevent offline attacks

## Bcrypt for hashing

- bcrypt uses adaptive hashing
- Uses slow and computationally expensive design
- makes brute forcing and rainbow tables difficult
- automatic salting and allows configurable work factors, making it resistant to hardware acceleration
-