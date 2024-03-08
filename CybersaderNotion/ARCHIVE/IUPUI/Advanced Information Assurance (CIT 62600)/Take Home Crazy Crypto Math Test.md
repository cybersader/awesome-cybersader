# Take Home Crazy Crypto Math Test

# Problem 1:

```markdown
Secret sharing problem: evil dictator has access to the nuclear device which can only be set off using a 64 bit password K. The dictator has 56 not-so-trusted generals, conveniently named g1,1...,g1,8, g2,1,...,...,g7,1...,g7,8.  The dictator likes to attrnge his generals in a rectangle as follows

g1,1 - g1,2 .... g1,8
g2,1 ..... g2,8
....
g7,1 - g7,2... g7,8

The dictator wants to share K among the generals so that they can set off the nuclear device in case of the dictator's death. 
However, since he does not completely trust the generals, he wants to share K according to the following rules (where G is a subset of the generals:
- If G contains all generals in any row or contains all generals in any column of above arrangement, then the generals in G should be able to reconstruct K. 
For example, generals {g3,1,g3,2...,g3,8} should be able to reconstruct K as should generals {g1,3,g2,3,...,g7,3}.
- If G does not contain all generals in any row or all generals in any column, the generals in G should have no information about K. For example, {g,1,1,g2,2,...,g7,7,g7,8} should have no idea what K is.

Suggest a scheme for the dictator to distribute K. Prove the correctness of your scheme. This problem is challenging but when you find the solution you will exclaim "Aha!".
```

# Problem 2:

```markdown
Consider ElGamal public key cryptosystem: p is a big prime and g is the generator of Z*p, x is the private key and X = g^x (along with p and g) is the public key. The encryption of  a message M is C = (Y, X^y x M), i.e., C = (g^y, g^xy x M) where y is a random number and Y = g^y.

Design a Zero-Knowledge Proof (ZKP) protocol so that the message sender can prove to the verifier that he knows y without disclosing y given the public value Y=g^y. Besides an interactive ZKP protocol, you should also design a non-interactive ZKP protocol.
Design a ZKP protocol so that the message sender can prove to a verifier that he knows M without disclosing M given the public values X - g^x, Y = g^y and C =(g^y,g^xy x M)
```

# Problem 3:

```markdown
(Zero-Knowledge Proof) Assume a prover has three Pailler encryptions, c1 = En(x;r), c2 = En(y;s), c3 = En(z;t), and let these three encryptions be such that xy(mod n) = z. Let P be a prover who knows (x;r),(y;s),(z;t). Devise a zero-knowledge proof for P to convince a verifier V that the values hidden by c1;c2;c3 actually satisfy xy(mod n) = z.
In addition, is it possible to modify your interactive version of Zero-Knowledge Proof into a Non-Interactive Zero-Knowledge Proof? If yes, show it.

```

# Problem 5:

```markdown
(Multi-Party Computation, MPC) (The Professors' Salary Problem) Over lunch at the faculty club, ten professors are expressing their concerns over their salaries. They would each like to know how their salary compares to the average salary (among these ten professors), but of course no professor wants to divulge any information about her salary to the other nine.

Devise a scheme which will allow the professors to compute the average of their salaries, while preserving their privacy. You may assume that all professors will adhere to the rules of the protocol, although they will try to extract as much information from the protocol as possible. you may also assume that it is public knowledge that each professor's salary is an integer in a certain range such as in $1 to $1000 inclusive. Note that if nine professors collude, they can determine the remaining professor's salary (given the average salary), so no scheme can hope to defend against this attack. Your scheme, however, should be robust against attacks where at most eight professors collude.
```