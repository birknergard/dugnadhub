# Development of DugnadHub
For development of DugnadHub to be a success we have to consider the approach.
This is the case for development of any application, our priorities dictate the choices of framework to ensure we meet our criteria.
The main priority for this project is agility (time to market). The other consideration is resources. With a small team consisting of two fullstack developers,
its imperative to select the tech stack carefully. 
In this report, we will suggest a tech stack which will give the team the best chances of developing a successful product quickly.

## Platform
The aim of this application is to reach the most users in Norway to stimulate increased volunteership and engagement. Therefore it is crucial to know which platforms will reach out to the most people.
In Norway, the market share is skewed towards iOS, iOS holding about 67.5% market share, with android holding about 30.17% of the market. Although the difference is rather large, having the application
on Android in addition to iOS will cast the broadest net, and is the preferable outcome. 
Therefore the aim should be to create an application for both platforms, while prioritizing the functionality of the iOS application slightly.

## Approach for client-side application (Frontend)
Developing for both iOS and Android simulatenously comes with some very important considerations. There are a lot of ways to approach the problem, but there are essentially two options:
1. Develop for each platform natively
2. Develop for both platforms simulatenously using a cross-platform framework
Both of these approaches come with benefits and drawbacks which are important to consider. In the following section I will briefly describe each approach, then give a reccommendation afterwards.

### Native approach
The native approach means to develop for each OS separately, using their respective languages/frameworks. This has several benefits:
* Less prone to bugs, better suited for complex applications
* Better optimization and performance
* Simpler access to the devices features and functionalities
* Theoretically smoother developer experience, development is more streamlined to the platform

These are tempting benefits for our application. However there are major issues:
1. Development for both iOS and Android requires a team to be proficienct in both systems
2. Essentially have to develop two applications simulatenously, leading to vasly increased workload and complexity.
3. The code wont be reusable between platforms despite achieving the same thing, increasing workload for the team.
These downsides, in short, lead to more expensive, slower development, and therefore a slower time to market. 

### Cross platform approach
The cross-platform approach means to develop for both OS'es simulatenously, using a single framework. This comes with some serious benefits, which are essentially the inverse of the native downsides:
1. Shared codebase
2. Reusable code 
3. Requires proficiency in one client framework rather than two.
ALl these benefits lead to one major advantage: agility. 

However, there are some relevant downsides to take into account:
1. Generally less performative and efficient compared to native
2. More overhead

### Our recommendation of Frontend approach
Now that we have established each client-side development approach, we can make an informed decision on which to choose.
It is important to consider the resources and priorities. The team is small, consisting of only two fullstack developers with the priority being time to market.
Taking the native approach is ill-advised in this circumstance. With a team this small it is unlikely that both are equally proficient in both technologies.
Even if so, the two other downsides mentioned above are critical problems, as both actively impede the agility of the project.
The benefits of the native approach are irrelevant if the project doesn't come off the ground. 
These considerations, along with the main benefit of cross-platform being increased agility, leads us to recommend using the cross-platform approach.

Specifically, we recommend using the React Native framework for this project. React Native is an extension of Facebook's React framework, which is ubiquitous in modern Frontend development.
This means its highly likely that the developers are familiar with this framework. Also, since it is an extension of React it also has access to the vast open source libraries of the framework.
An alternative would be Flutter. Created by Google, it's another cross-platform framework which uses the Dart programming language. 
We only recommend this if the developers are proficient in the framework, given that it is more obscure, newer and less field tested than React Native.

## Approach for server-side application (Backend)
The application will require some service to store user data, provide authentification and registration, and store files.
Historically this was done through a self-hosted server-side application, where the developers were responsible for creating, securing and maintaining the service on themselves.
There is an alternative which many teams choose today, Cloud services.
Cloud services are SaaS (Software as a Service) applications which can be accessed over HTTP, and some provide ready made backend services for companies to use.
One of these services is Firebase. Firebase provides everything our project needs on the server side, from authentication to file and data storage. 
It's well documented, provides easy interfacing and the authentication is secure and widely use. The platform only requires some minimal setup , and is likely going to be more secure than a self-hosted server.
It scales depending on the needs of your application and the amount of traffic, and provides a reliable pricing plan.
Therefore, For rapid development and time to market we recommend using Firebase for the server-side application. 

## An example of client-server interfacing layout
Below we have provided a high level suggestion of how the client- and server-side applications should interface. 
<IMAGE GOES HERE>

## Summary
In conclusion, we recommend a cross-platform development approach using React Native, using Firebase for authentication and database and file storage operations.
The iOS implementation should be slightly favored in a macro sense, as iOS holds the largest market share at the moment.
We believe this will result in the fastest possible time to market based on the resources size available. 


# Sources
https://worldpopulationreview.com/country-rankings/iphone-market-share-by-country
https://www.salesforce.com/blog/benefits-of-saas-smbs
https://circleci.com/blog/native-vs-cross-platform-mobile-dev/
https://firebase.google.com/docs/auth/
