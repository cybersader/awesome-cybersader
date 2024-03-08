# Theoretical Architectures

# Open Source (OSS) - Serverless & Decentralized Client with Tokens, Configs, and Cookies

My idea to implement a system that doesn’t require any central servers or annoying manual setup, but rather uses a serverless CORS Header Proxy, the user’s choice of a database or storage option to store their data, and a simple frontend UI for the client. 

This would also allow the user to customize parts of the architecture as they need to make it more performant, scale horizontally or vertically, and/or integrate more functionality into the system.

## Serverless CORS Header Proxy

Most APIs (application programming interfaces) require to user to be on a server to interact with them. This demotivates developers from creating highly vulnerable client-side code where API keys are exposed, etc. This also encourages lots of companies to hide the functionality and create their own APIs to interact with their backend code. 

Without getting too deep into the subject, CORS (cross origin resource sharing) headers are used to let services know that they’re interacting with a client/browser. It’s like a flag that tells servers, “Hey...I’m a browser by the way.” This is great for security in lots of circumstances. Interacting with an API from the client generally means that there is an exposed API token. There are a lot of problems when using API tokens from the client. However, what about the case where the user inputs the API token manually into, let’s say, an input box. This could still present security issues. However, there are a lots of benefits to this approach. For instance, the creator of such a solution doesn’t have to host anything themselves.

A CORS header proxy sits in between the client code and the API, and it simply gets rid of those “I’m a browser” flags or puts headers in that say “I’m good.” Then it simply forwards the request to whatever API, and also responds back to the client with responses. 

This means that the user who wants to train a specialized knowledgebase/chat model will simply put in the API token for OpenAI and the CORS header proxy URL to interact directly with the OpenAI API right from within the client.

The good part about this is that the provider of the client and CORS header proxy code doesn’t have to actually run the infrastructure themselves. Users can simply reuse the code to do it themselves. This makes it low risk for the creator of the whole architecture because they won’t have to give out architecture or use security methods to hand out CORS header proxies or server-side code to anyone.

## Storing the Chats, Configs, etc.

Storing these tokens and training configs or user inputs is very important to making use of the chatbots easy, viable, and efficient to problem-solving. 

Storing objects of chats and configurations could be a bit more difficult. This would require some research into database paradigms, how chats would be stored, etc.

## User Setup and Authentication

If the creator of this architecture wanted to have a hosted version, then they could create a user authentication process that automatically procures a serverless CORS header proxy, OpenAI API, and manages storage of their data for them using their own data storage. When it comes down to it, this would mean charging a multiplier of the data storage, serverless, and authentication service costs.

User authentication could require MFA for Email Verification and Logins.

## User Interface & Client Code

In practice, this may be the most cumbersome part of the process. Likely, a modular JS framework would need to be used. 

In terms of backend service and API functionality, the client-side code would have to programmatically access the stored data, authentication, and OpenAI API.

In terms of front-end rendering, it would need to perform well with quick load speeds on page renders, and be able to programmatically render chats. It’s likely that this would need to be able to export conversations, along with switching between conversations via the data storage and user authentication systems.

## Serverless Training and Topic Expansion Code

This would be the most difficult piece, probably by far.

This would take calls from the client-side code and use it to quickly expand and train the OpenAI model. 

Calls would also need to programmatically made between it and the client to show the status of the training.

## UI or Client-Side Code separation from Training and Prompting

User prompting or chatting would need to be separated on the client-side code. These would be totally different screens.