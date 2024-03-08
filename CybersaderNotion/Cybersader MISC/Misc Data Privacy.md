# Misc Data Privacy

# Personal

- .

# Enterprise & Commercial

Terms:

- data governance privacy
- privacy data lineage

## Misc

- [Repository search results](https://github.com/search?q=awesome+privacy&type=repositories&p=2)
- [pluja/awesome-privacy: Awesome Privacy - A curated list of services and alternatives that respect your privacy because PRIVACY MATTERS.](https://github.com/pluja/awesome-privacy#chatgpt)
- [Lissy93/awesome-privacy: 🦄 A curated list of privacy & security-focused software and services](https://github.com/Lissy93/awesome-privacy)
- [Guyanqi/Awesome-Privacy: Repository for collection of research papers on privacy.](https://github.com/Guyanqi/Awesome-Privacy)
- [yilmaztolga/awesome-data-privacy: A curated list of data privacy and security resources](https://github.com/yilmaztolga/awesome-data-privacy)

- [Data Security & Compliance Infrastructure for Modern Organizations | Very Good Security](https://www.verygoodsecurity.com/)
- [Data Security, Access Control, Privacy Compliance - Privacera](https://privacera.com/)
- [Stop Data Breaches and Leaks. Data Security Governance - Cyral](https://cyral.com/)
- [Cape Privacy | The Best AI Is the One You Trust](https://capeprivacy.com/)
- [Data Residency-as-a-Service - InCountry](https://incountry.com/)
- [Transcend | Data Privacy Infrastructure](https://transcend.io/)
- [Skyflow - What if privacy had an API?](https://www.skyflow.com/)
- [Duality Technologies - Secure Data Collaboration Products](https://dualitytech.com/)
- [Database Anonymization Software - Privacy Dynamics](https://www.privacydynamics.io/)
- [Ketch—Trust by Design](https://www.ketch.com/)

## Data Mapping & Lineage

- .

## Privacy Governance, Data Subject Requests, etc.

- [monoid-privacy/monoid: Open-source data privacy](https://github.com/monoid-privacy/monoid)
- 

## Data Analytics, Engineering, Storage

### Differential Privacy Resources

- [Differential Privacy](https://www.microsoft.com/en-us/ai/ai-lab-differential-privacy)
    - Retain data shape and utility but eliminate identity that can be resolved into individual entities like their original data owner
    - system that simultaneously enables researchers and analysts to extract useful insights from datasets containing personal information and offers stronger privacy protections. This is achieved by introducing "statistical noise"

**Articles:**

[Statistical Noise](https://news.microsoft.com/on-the-issues/2020/08/27/statistical-noise-data-differential-privacy/) is a process that small aletrations to masked datasets. The statistical noise hides identifiable characteristics of individuals, ensuring that the privacy of personal information is protected, but it's small enough to not materially impact the accuracy of the answers extracted by analysts and researchers.

[Laplacian Noise](https://en.wikipedia.org/wiki/Laplace_distribution) is a mechanism that adds Laplacian-distributed noise to a function.

[Differential Privacy Blog Series by the National Institute of Standards and Technology(NIST)](https://www.nist.gov/itl/applied-cybersecurity/privacy-engineering/collaboration-space/focus-areas/de-id/dp-blog)

[Apple's Differential Privacy Overview](https://www.apple.com/privacy/docs/Differential_Privacy_Overview.pdf)

[Learning with Privacy at Scale with Apple Machine Learning](https://machinelearning.apple.com/research/learning-with-privacy-at-scale)

[Microsoft Research Differential Privacy Overview](https://www.microsoft.com/en-us/research/publication/differential-privacy/)

[Responsible Machine Learning with Microsoft Azure](https://azure.microsoft.com/en-us/services/machine-learning/responsibleml/)

[Responsible AI Resources with Microsoft AI](https://www.microsoft.com/en-us/ai/responsible-ai-resources)

[Preserve data privacy by using differential privacy and the SmartNoise package](https://docs.microsoft.com/en-us/azure/machine-learning/concept-differential-privacy)

[Open Differential Privacy(OpenDP) Initiative by Microsoft and Harvard](https://projects.iq.harvard.edu/opendp)

[Google's Differential Privacy Library](https://github.com/google/differential-privacy)

[Computing Private Statistics with Privacy on Beam from Google Codelabs](https://codelabs.developers.google.com/codelabs/privacy-on-beam/#0)

[Introducing TensorFlow Privacy: Learning with Differential Privacy for Training Data](https://blog.tensorflow.org/2020/06/introducing-new-privacy-testing-library.html)

[TensorFlow Federated: Machine Learning on Decentralized Data](https://www.tensorflow.org/federated/)

[Federated Analytics: Collaborative Data Science without Data Collection](https://ai.googleblog.com/2020/05/federated-analytics-collaborative-data.html)

[Differentially-Private Stochastic Gradient Descent(DP-SGD)](https://github.com/tensorflow/privacy/blob/master/tutorials/walkthrough/README.md)

[Learning Differential Privacy from Harvard University Privacy Tools Project](https://privacytools.seas.harvard.edu/differential-privacy)

[Harvard University Privacy Tools Project Courses & Educational Materials](https://privacytools.seas.harvard.edu/courses-educational-materials)

[The Weaknesses of Differential Privacy course on Coursera](https://www.coursera.org/lecture/data-results/weaknesses-of-differential-privacy-50Y9k)

[The Differential Privacy of Bayesian Inference](https://privacytools.seas.harvard.edu/publications/differential-privacy-bayesian-inference)

[Simultaneous private learning of multiple concepts](https://privacytools.seas.harvard.edu/publications/simultaneous-private-learning-multiple-concepts)

[The Complexity of Computing the Optimal Composition of Differential Privacy](https://privacytools.seas.harvard.edu/publications/complexity-computing-optimal-composition-differential-privacy)

[Order revealing encryption and the hardness of private learning](https://privacytools.seas.harvard.edu/publications/order-revealing-encryption-and-hardness-private-learning)

[SAP HANA data anonymization using SAP Software Solutions](https://www.sap.com/cmp/dg/crm-xt17-ddm-data-anony/index.html)

[SAP HANA Security using their In-Memory Database](https://www.sap.com/products/hana/features/security.html)

[DEFCON Differential Privacy Training Launch](https://opensource.googleblog.com/2020/08/defcon-differential-privacy-training.html)

[Secure and Private AI course on Udacity](https://www.udacity.com/course/secure-and-private-ai--ud185)

[Differential Privacy - Security and Privacy for Big Data - Part 1 course on Coursera](https://www.coursera.org/learn/security-privacy-big-data)

[Differential Privacy - Security and Privacy for Big Data - Part 2 course on Coursera](https://www.coursera.org/learn/security-privacy-big-data-protection)

[Certified Ethical Emerging Technologist Professional Certificate course on Coursera](https://www.coursera.org/professional-certificates/certified-ethical-emerging-technologist)

### Differential Privacy Tools

- [PySyft](https://github.com/OpenMined/PySyft) is a Python library for secure and private Deep Learning. PySyft decouples private data from model training, using [Federated Learning](https://ai.googleblog.com/2017/04/federated-learning-collaborative.html), [Differential Privacy](https://www.microsoft.com/en-us/ai/ai-lab-differential-privacy), and Encrypted Computation (like [Multi-Party Computation (MPC)](https://multiparty.org/) and [Homomorphic Encryption (HE)](https://www.microsoft.com/en-us/research/project/homomorphic-encryption/) within the main Deep Learning frameworks like [PyTorch](https://pytorch.org/) and [TensorFlow](https://www.tensorflow.org/).
- [TensorFlow Privacy](https://github.com/tensorflow/privacy) is a Python library that includes implementations of TensorFlow optimizers for training machine learning models with differential privacy. The library comes with tutorials and analysis tools for computing the privacy guarantees provided.
- [TensorFlow Federated (TFF)](https://github.com/tensorflow/federated) is an open-source framework for machine learning and other computations on decentralized data. TFF has been developed to facilitate open research and experimentation with [Federated Learning (FL)](https://ai.googleblog.com/2017/04/federated-learning-collaborative.html), an approach to machine learning where a shared global model is trained across many participating clients that keep their training data locally.
- [Privacy on Beam](https://github.com/google/differential-privacy/tree/main/privacy-on-beam) is an end-to-end differential privacy solution built on [Apache Beam](https://beam.apache.org/documentation/). It is intended to be usable by all developers, regardless of their differential privacy expertise.
- [PyDP](https://github.com/OpenMined/PyDP) is a Python wrapper for Google's Differential Privacy project.
- [PennyLane](https://pennylane.ai/) is a cross-platform Python library for [differentiable programming](https://en.wikipedia.org/wiki/Differentiable_programming) of quantum computers. By training a quantum computer the same way as a neural network.
- [BoTorch](https://botorch.org/) is a library for Bayesian Optimization built on PyTorch.
- [PyTorch Geometric (PyG)](https://github.com/rusty1s/pytorch_geometric) is a geometric deep learning extension library for [PyTorch](https://pytorch.org/).
- [Skorch](https://github.com/skorch-dev/skorch) is a scikit-learn compatible neural network library that wraps PyTorch.
- [Diffprivlib](https://github.com/IBM/differential-privacy-library) is the IBM Differential Privacy Library for experimenting with, investigating and developing applications in, differential privacy.
- [Opacus](https://opacus.ai/) is a library that enables training PyTorch models with differential privacy. It supports training with minimal code changes required on the client, has little impact on training performance and allows the client to online track the privacy budget expended at any given moment.
- [Smart Noise](https://github.com/opendifferentialprivacy/smartnoise-sdk) is a toolkit that uses state-of-the-art differential privacy (DP) techniques to inject noise into data, to prevent disclosure of sensitive information and manage exposure risk.

# Data Quality & Observability

- [Kensu | Observe data where it counts](https://www.kensu.io/)
- [unionai-oss/pandera: A light-weight, flexible, and expressive statistical data testing library](https://github.com/unionai-oss/pandera)
- [GX: a proactive, collaborative data quality platform • Great Expectations](https://greatexpectations.io/)
- [Best Data Observability Platform For Data Teams | Metaplane](https://www.metaplane.dev/)
- [No-code Enterprise Data Quality Monitoring Tool: Lightup](https://lightup.ai/)
- [Soda Data Quality Platform](https://www.soda.io/)
- [Datafold - Automated testing for data engineers](https://www.datafold.com/)
- [Model Monitoring with the WhyLabs AI Observability Platform | WhyLabs](https://whylabs.ai/)
- [Bigeye](https://www.bigeye.com/)
- [Monte Carlo | Data Reliability Delivered](https://www.montecarlodata.com/)
- [Continuous Data Observability for Data Teams | Databand](https://databand.ai/)
- [unravel data - Brave Search](https://search.brave.com/search?q=unravel+data&source=desktop)
- [re-data/re-data: re_data - fix data issues before your users & CEO would discover them 😊](https://github.com/re-data/re-data)
- [Anomalo | Complete Data Quality Platform](https://www.anomalo.com/)
- [HoloClean - Home](http://www.holoclean.io/)
- [awslabs/deequ: Deequ is a library built on top of Apache Spark for defining "unit tests for data", which measure data quality in large datasets.](https://github.com/awslabs/deequ)
- [Elementary Data | dbt native data observability](https://www.elementary-data.com/)
- [Acceldata | Enterprise Data Observability Platform](https://www.acceldata.io/)
- [Timeseer](https://www.timeseer.ai/)