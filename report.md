# Development of DugnadHub
For development of DugnadHub to be a success we have to consider the approach carefully.
With any decision we make there are technical, design and management considerations, which are essential to get the right product and in a timely fashion. In this report, we will provide suggestions regarding these decisions.

## Platform
For development for cross platform, we recommend using React Native with Typescript as the client/frontend.
It is a cross platform framework with expands on the ubiquitous React framework, allowing for development on mobile platforms like iOS and Android without major technical difficulty.
Since it is an extension of React it also has access to the vast libraries of the framework.

For storing data and authenticating users we recommend using Firebase. This is a software service provided by Google, which provides authentification and database storage through the cloud.
This allows developers for focus their efforts on app-specific functionality, without the overhead of creating and maintaining and scaling an internal backend service.
Scaling of the infrastructure is handled through Firebase's subscription model as well.

In terms of the user experience 

# Sources
https://www.salesforce.com/blog/benefits-of-saas-smb/
