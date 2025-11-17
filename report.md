# Development of DugnadHub
For development of DugnadHub to be a success we have to consider the approach carefully.
With any decision we make there are technical, design and management considerations, which are essential to develop a stable product in a timely fashion. In this report, we will provide suggestions regarding these considerations.

## Platform
For development for cross platform, we recommend using React Native with Typescript as the client/frontend.
It is a cross platform framework with expands on the ubiquitous React framework, allowing for development on mobile platforms like iOS and Android without major technical difficulty.
Since it is an extension of React it also has access to the vast libraries of the framework.
The are some downsides to choosing this approach. One is performance: a native application will generally be a lot more efficient and stable for the platform. React Native is famous for being rather buggy and can lead to challenges on complicated applications. Another is that the GUI is generally more responsive and adapted tothe platform by default, leading to a smoother user experience.
The reason we recommend cross-platform development despite these weaknesses is agility. With a team size this small, developing the application for more than one platform is unrealistic, and will lead to very slow development. With cross platform development the developers mostly have to focus on building one codebase for the entire project, with considerably less time spent on a specific platform.

## Storage and data management
For storing data and authenticating users we recommend using Firebase. This is a software service provided by Google, which provides authentification and database storage through the cloud. The relationship between the client and Firebase will look as such:

Firebase allows developers for focus their efforts on app-specific functionality, without the overhead of creating and maintaining and scaling an internal backend service.
Scaling of the infrastructure is handled automatically through Firebase's and is billed by usage. Using this prebuilt service frees up the developers to focus on the client-side application, leading to a significantly faster time to market.

# Sources
https://www.salesforce.com/blog/benefits-of-saas-smbs
https://circleci.com/blog/native-vs-cross-platform-mobile-dev/
