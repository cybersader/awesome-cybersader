# Privacy Preserving Federated Learning via Verifiable Perturbations

- Federated learning - local and global gradients
    - Clients come to agreement
    - Clients encrypt their own data with personal keys, but they also have global keys for transforming the global gradients and data
- Attack can grab the dataset, but it takes more time to use the defenses
    - time increase is linear model or user size
- This has use cases when it is incredibly important to keep the model confidential

# Conclusion Presentation

- Scenarios
    - adversary corrupting
        - set of users and server
        - set of users
        - set of users and the aggregator
- Assumptions
    - no collusion between server and aggregator
    - semi-honest aggregator

- What is federated learning
    - aggregator sends anonymized data to server

- HybridAlpha - requires trusted 3rd party
- PROV-FL - efficient, but only small scale datasets
- PILE - high accuracy but slow because lots of communication and computation