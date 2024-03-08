# GPT outline

## Intro

The introduction to the Sphinx paper presents the main motivation and key contributions of the system. It highlights the challenges associated with providing privacy-preserving online learning services on deep neural networks, as existing solutions either focus on the inference or the training procedure and often make unrealistic assumptions about the threat model. The main goal of Sphinx is to provide an efficient and privacy-preserving online deep learning system that offers both efficient training and real-time inference services without relying on trusted third parties.

Sphinx protects both the model and input data, allowing users to delegate training and inference tasks to cloud servers without exposing their data privacy. The system uses differential privacy to bridge the privacy-preserving training and private inference solutions, and introduces new hybrid privacy-preserving protocols for each phase according to their specific characteristics and requirements.

To achieve these goals, Sphinx divides each linear layer in deep neural networks into two parts: the linear component W and the bias component b. It encrypts all the bias components with homomorphic encryption (HE) and perturbs the linear components with differential privacy (DP). This design enables high throughput training and low latency inference protocols.

Sphinx also makes several system optimizations, including designing the homomorphic arithmetic operation behaviors between features, gradients, and model parameters to avoid expensive rescaling and relinearization operations, and accelerating encryption operations and reducing ciphertext size to lower communication time between the client and server.

In the experimental section, the authors show that Sphinx significantly outperforms pure HE methods in terms of training time, communication cost, and inference speed. Sphinx also demonstrates robust privacy protection against current reconstruction attacks from gradients.

In summary, Sphinx is an innovative privacy-preserving online deep learning system that addresses the challenges of providing efficient and private training and inference services on deep neural networks. It combines homomorphic encryption and differential privacy in a novel way to achieve a balance between privacy, accuracy, and efficiency.

## Related Work

Section II of the paper discusses related work in the field of privacy-preserving deep learning, focusing on privacy-preserving inference and privacy-preserving training.

Privacy-preserving inference solutions concentrate on the inference procedure, where the server holds a well-trained model and provides predictions for clients. In this setting, the model is stored and evaluated as plaintext, and optimizations have been proposed for matrix multiplications between encrypted input data and unencrypted model parameters. Examples include Gazelle and Delphi, which provide secure inference algorithms. However, these solutions do not address online learning settings that require privacy-preserving training.

Privacy-preserving training solutions can be divided into centralized and distributed methods. Centralized training methods include those that use homomorphic encryption (HE) to encrypt both model weights and user data. However, these methods are significantly slower than plaintext operations and do not consider efficient inference. In contrast, Sphinx provides a specific inference protocol that enables real-time responses.

Another category of centralized training solutions involves differential privacy (DP)-based algorithms, which protect privacy through randomization. However, these solutions often require a trusted data aggregator and may not provide sufficient privacy protection in practice. Distributed training solutions typically rely on multi-party computation (MPC) algorithms, which distribute computations across multiple servers. However, these solutions assume multiple non-colluding servers or an honest majority, making them impractical for machine-learning-as-a-service (MLaaS) settings.

Federated learning approaches involve multiple data owners collaboratively learning local models without exposing user privacy. In these settings, clients maintain their data and update the model locally. While these works are relevant to privacy-preserving deep learning, they are beyond the scope of the Sphinx paper, which focuses on MLaaS settings where clients outsource computations to service providers with large computational resources.

In summary, existing privacy-preserving deep learning solutions either focus on privacy-preserving inference or privacy-preserving training but not both, motivating the design of Sphinx. Sphinx offers a system that provides efficient and privacy-preserving online learning, covering both training and real-time inference services without the need for trusted third parties.

## Preliminaries

Section III of the paper presents the preliminaries for the Sphinx system, covering the threat model, deep neural networks (DNNs), and privacy-preserving techniques like homomorphic encryption (HE) and differential privacy (DP).

A. Threat Model:
The paper considers a client-server model with two parties: client A and server B. Client A owns the data and server B provides training and inference services. Server B should not obtain sensitive information during the training and inference procedures. A semi-honest server is assumed, which adheres to the protocol but is curious about inferring privacy information from client A.

B. DNN Training and Inference:
DNNs consist of stacked artificial neural network layers that extract features from raw data. A typical convolutional neural network (CNN) processes a batch of input images through a sequence of linear and non-linear layers. Linear layers include convolutional (Conv) layers and fully-connected (FC) layers, both offering affine transformations. Non-linear layers perform non-linear transformations, such as max-pooling and activation functions.

C. Homomorphic Encryption:
The paper focuses on the CKKS HE scheme, which is a leveled homomorphic encryption scheme that supports a limited number of additions and multiplications on ciphertexts. CKKS supports addition and multiplication between ciphertexts, as well as operations between ciphertexts and plaintexts. It also involves rescaling and relinearization techniques to manage scaling factors and ciphertext sizes.

D. Differential Privacy:
DP is a theoretical privacy guarantee for randomized algorithms, allowing data curators to release statistical results while still protecting individual information in the dataset. It involves injecting random noise into the original data or statistical results, with a trade-off between model performance and privacy level depending on the noise.

## Combining Differential Privacy and
Homomorphic Encryption

IV. Combining Differential Privacy and Homomorphic Encryption

This section highlights key observations that motivate the combination of DP and HE in the design of Sphinx.

1. Differential privacy improves efficiency: By using DP to protect model parameters as plaintexts, the computation overhead in the training procedure can be significantly reduced compared to pure HE methods. DP also enables lightweight techniques used in private inference works, reducing inference time in the online phase.
2. Secure computation improves privacy: DP preservation can be achieved without a trusted aggregator through secure computation schemes. The combination of the two privacy-preserving methods enables centralized differentially private training algorithms without the requirement of a trusted aggregator.
3. Masking defends attacks: Hiding the bias parameters/gradients can effectively lower the risk of an attacker reconstructing data under DP mechanisms. Sphinx defends against reconstruction attacks under the same privacy level.

Sphinx is a privacy-preserving online learning framework for DNNs that combines HE with DP. In this design, all linear layers in DNNs are divided into two parts: linear components and bias components. Sphinx encrypts the bias components with HE, and perturbs the linear components with DP. This design builds a reciprocal relation between DP and HE techniques, allowing for efficient, secure computation that defends against attacks while maintaining privacy.

## Design

This section describes the design of Sphinx in detail, focusing on the model architecture, training phase, and inference phase.

Model Architecture:
Sphinx separates the affine transformation in each layer of a DNN into the linear part (W) and the translation part (b). The linear components (W) are perturbed with DP, while the bias components (b) are encrypted with HE.

Training Phase:

1. The client encrypts the training data and sends it to the server.
2. The server trains the neural networks using the stochastic gradient descent (SGD) algorithm, iterating on mini-batches of the training dataset to update the model parameters.
3. The linear component (W) for each layer is perturbed with DP via introducing additive noise on their gradients.
4. For the bias components, the server aggregates and averages the gradients locally, and directly updates the model parameters [b].
5. For the linear components, the server sends their gradients [∇WL(xj)] back to the client for decryption. The client decrypts them, clips the gradients, adds Gaussian noise, and sends perturbed geW back to the server to update the model.

Inference Phase:

1. The client sends the encrypted samples to the service provider for prediction or classification requests.
2. Sphinx converts the linear components (W) into fixed-point representations and embeds them into a prime finite field (F).
3. In the preprocessing phase, secret shares are generated between the client and the server for each layer.
4. In the online phase, the client calculates x − ri and sends it to the server. The server calculates Wi(x − ri) + si, and the client adds it with the local share to obtain Wix + bi and performs non-linear operations on it.
5. The client repeats the same procedure for the next layer.

Sphinx's design enables efficient training and real-time prediction response while maintaining privacy.

## Privacy Analysis

This privacy analysis for Sphinx discusses the privacy preservation during both training and inference phases.

Training Phase:
Sphinx adopts differential privacy (DP) to provide theoretical privacy guarantees during the training phase. The training protocol protects user data in several ways:

1. The input data sent is protected by homomorphic encryption (HE), thus not exposed to the server.
2. The gradients calculated on the server side are encrypted, so individual gradients are not exposed to the server.
3. The noise-additive mechanism is applied to the aggregated gradients on the client side after decryption, preserving the random number generator against the server.

The moments accountant method estimates the privacy loss bound during training and converts it to the accumulated privacy cost, i.e., the current (, δ)-DP guarantee. The post-processing immunity property of DP ensures that calculations on the model in the inference phase will not leak any further information about the training data.

Inference Phase:
For the inference phase, Sphinx adopts a private inference technique based on secret sharing. The privacy guarantee states that the service provider cannot infer any useful information about the evaluated data. A simulator (Sim) proves that the server's view executing the inference protocol is computationally indistinguishable from the output of the simulator.

In conclusion, Sphinx provides privacy preservation for both training and inference phases. During the training phase, it uses differential privacy to protect user data, while in the inference phase, it relies on private inference techniques based on secret sharing. The combination of these methods ensures that Sphinx maintains privacy while enabling efficient and real-time prediction response.

## Optimizations

Sphinx implements several system optimizations to accelerate the encrypted model training procedure. These optimizations exploit the benefits of cryptographic tools and DP techniques.

A. Fast Homomorphic Multiplication:
Sphinx is designed to eliminate most rescaling and relinearization operations during the training procedure. This allows for smaller encryption parameters with a shallower multiplicative depth, resulting in reduced computation time and communication cost. By carefully designing multiplication behaviors between model parameters, input features, and gradients in neural network layers, Sphinx can maintain the flags (Rx, Lx) on ciphertexts and avoid unnecessary rescaling and relinearization operations.

B. Accelerating Client-Server Communication:
Sphinx adopts an interactive protocol between the client and the cloud server. To reduce the communication cost between the two parties, several optimizations are implemented:

1. Forward propagation cache: During the training procedure, the client caches gradients of each non-linear layer locally as plaintexts in the forward propagation phase. This avoids duplicate computations and communications during the backpropagation phase.
2. Zero decryption and zero encryption: Sphinx reduces the level of ciphertexts to 0, resulting in smaller ciphertext sizes during communication. In the offline preprocessing phase, the client prepares a stream of zero ciphertexts that work as one-time pad ciphertexts. When the client needs to encrypt a message, it directly adds the plaintext with a zero ciphertext, shortening the encryption time in the online phase.

These optimizations allow Sphinx to further accelerate the encrypted model training procedure, making it more efficient and reducing the communication overhead between the client and server.

## System Implementation

Sphinx, the privacy-preserving online learning framework, is implemented in C++. It utilizes the SEAL 3.6 library for homomorphic encryption. The implementation is inspired by TenSEAL, a library that supports homomorphic encryption operations on high-dimensional tensors, enabling common neural network layer operations such as convolution, pooling, and dot-product to be performed.

Data and activation features are packed in the batch axis (batch-axis packing) during training, following the practices in [26] and [24]. This packing method is more efficient for training over mini-batches. Sphinx's deep learning framework implementation is based on KANN, a lightweight library that enables efficient inference and training on various neural networks, including MLP, CNN, and RNN.

The inference protocol of Sphinx is implemented based on Delphi [5]. Additionally, the moment accountant from [60] is adopted to monitor the privacy loss during the learning process.

## Evaluation

The performance of Sphinx is evaluated with respect to computation efficiency and privacy preservation. The evaluation results show:

1. Training: Sphinx achieves 35x less training time and 5x lower communication cost for neural networks on MNIST and CIFAR-10 datasets compared to pure HE methods (Section IX-B).
2. Inference: Sphinx achieves real-time inference in the online phase, significantly faster and with lower communication costs compared to pure HE methods (Section IX-C).
3. Privacy-utility trade-off: Sphinx achieves comparable model accuracy compared to the pure DP training algorithm DPSGD without a trusted server (Section IX-D).
4. Defense against attacks: Sphinx effectively defends against the reconstruction attack from exposed gradients by masking the bias components (Section IX-E).

The evaluation setup includes two physical machines with 40 Intel Xeon CPU E5-2683 v4 cores at 2.1GHz and 128GB memory each, connected via a 10Gbps link. Two image datasets, MNIST and CIFAR-10, are used for the evaluation.

During training, Sphinx is compared with pure homomorphic encryption (pure-HE) training methods, and the results show that Sphinx is more efficient in terms of both training time and communication cost. The main reason for this improvement is that Sphinx avoids most heavy homomorphic operations by protecting the linear components as plaintexts.

For inference, Sphinx's secret sharing-based inference protocol achieves significantly lower latency and communication costs compared to pure-HE methods. Sphinx also performs slightly better than Delphi due to less overhead from heavy MPC techniques for non-linear layers.

When evaluating the privacy cost, Sphinx achieves comparable model accuracy compared to the all-noisy algorithm across various privacy budgets and noise magnitudes without a trusted data aggregator. However, larger noise magnitudes can lead to a more unstable learning process and harm the convergence rate.

Lastly, Sphinx effectively defends against the gradient-matching attack, a type of reconstruction attack, by masking the bias components with the HE scheme. This makes it harder for attackers to infer both the hiding model parameters and input data simultaneously.

## Conclusion

In this paper, the authors presented Sphinx, a privacy-preserving online learning system designed to accelerate privacy-preserving training and inference, enabling online learning services on deep neural networks. Sphinx divides online learning into training and inference phases, combining different privacy-preserving techniques to achieve better efficiency and protection.

Sphinx is compatible with various differentially private training algorithms that protect aggregated gradients in mini-batches, allowing for flexibility in adapting to different application requirements and data characteristics. Future work could explore and evaluate the combinations between different DP mechanisms and HE schemes.

In the inference phase of Sphinx, the secret sharing technique is used in the preprocessing phase to accelerate the inference. However, the preprocessing phase must be rerun upon the updated model parameters, which can result in wasted computation resources. As future work, the authors propose exploring a privacy-preserving online learning approach that can align previous preprocessing results with new model parameters with minimal extra calculations once the model is updated, thus reducing the computational overhead.