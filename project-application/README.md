## Table of Contents
* [Introduction](#introduction)
* [Stakeholder Needs](#stakeholder-needs)
* [System Requirements](#system-requirements)
* [Team Roles](#team-roles)
* [User Management Features](#user-management-features)
* [Resource Management Features](#resource-management-features)
* [Data Access Features](#data-access-features)
* [Tools and Approach](#tools-and-approach)
* [Deployed App](#deployed-app)
* [User Instructions](#user-instructions)
* [Scalability](#scalability)
* [Stakeholder Modifications](#stakeholder-modifications)
* [Other Features and Improvements](#other-features-and-improvements)
* [Sources](#sources)

## Introduction

In this project, we will implement a Proof-of-Concept (PoC) for a web application for a functioning Hardware-As-A-Service system (HAAS). This PoC app is inspired by the University of Utah POWDER program. This project will include both features based on stakeholder needs and additional features that exceed the stakeholders needs. We will create a Minimum Viable Product (MVP) for the PoC. 

## Stakeholder Needs

This PoC web application will satisfy the following stakeholder needs and system requirements:

SN0: Generally accepted quality and reliability metrics
SN1: Create and maintain secure user accounts and projects on the system 
SN2: View the status of all hardware resources in the system
SN3: Request available hardware resources and datasets from published sources
SN4: Once approved, checkout and manage these resources
SN5: Check-in the resources and get billing information
SN6: Deliver PoC within budget and schedule constraints, with features for efficient progression to the deployed app

## System Requirements

SR1: PoC shall be delivered within budget and schedule constraint, with periodic updates to stakeholders
SR2: PoC App shall have a front-end web application that allows users to enter inputs and views outputs
SR3: PoC App shall have a mechanism for encrypting user-id and password
SR4: PoC App shall have a mechanism for creating new project or accessing existing projects
SR5: PoC App shall have a database for maintaining user login credentials, project codes, project details, resource details
SR6: PoC App shall be hosted on cloud for easy accessibility
SR7: PoC App shall work reliably at all times
SR8: PoC shall provide capabilities for efficient progression to a deployed app
SR9: PoC App shall have a mechanism for requesting data from published data sources
SR10 PoC App shall a mechanism for retrieving information from the database

## Team Roles

We will split up our team into two pairs. Cathy and Chloe will work on the user stories associated with the User Management and User Interface features. Rithvik and Bharath will work on the user stories associated with the Resource Management and Data Access features.

## User Management Features

1.A sign-in area where users can sign in by providing their userid and password. If user clicks on New User, display a pop-up that allows them to enter a new userid and password.
2.An area where users can create new project, by providing project name, description, and projectID.
3.An area where users can choose to login to existing projects.
4.A database where you can save user information and project information.
5.An API to access information stored in the database.
6.Security features to encrypt the userid and password.

## Resource Management Features

1.A display area which shows the capacity of HWSet1 and HWSet2.
2.A display area which shows the availability of HWSet1 and HWSet2.
3.A database where the HW information can be stored and can be retrieved from.
4.A display area which shows how many units of HWSet1 and HWSet2 user wants to checkout and later checkin.

## Data Access Features

1.A display area (text) which shows a bulleted list of datasets available on the public dataset. Please note that physionet.org is provided as a suggested dataset. You can either use this dataset and/or recommend other datasets.
2.An option to download one of the datasets as a zip file.

## Tools and Approach

We will be using the MERN stack which consists of:

MongoDB : NoSQL Document-oriented database to store app data
Express.js : Node.js web framework, used to build backend
React.js : Client-side JavaScript framework, used to build UI components
Node.js : JavaScript runtime environment to run code on server outside browser

We will be using PhysioNet.org to get datasets from.
We will be using Heroku as a host for our proof-of-concept application.

## Deployed App

URL to deployed front-end application https://morning-gorge-01668.herokuapp.com/
URL to deployed back-end server https://dry-reaches-42443.herokuapp.com/

## User Instructions
The landing page for this app is the projects page. Here are some features to note about our app:

Clicking on the Log In tab of the navigation bar allows you to log in or create an account.
The Projects tab takes you to a page where you can view, edit, or delete existing projects.
On the projects page, clicking 'Create New Project' will navigate to a page where you can create a project.
Creating an account adds your username to a drop-down menu from the create project page.
The Hardware Sets tab takes you to a page where you can check-out/check-in hardware sets within an existing project.
Creating a project adds your project to the Hardware Sets page.
The Datasets tab takes you to a page where you can download zipped dataset files.
There is a video added in the EE461L_TeamProject directory that shows a step-by-step process of what the fully deployed application would look like.
Known Issues
The following are known issues that are still being worked out:

Existing projects are viewable by anyone, logged in or not.
Clicking the Log In button on the login page reroutes you to the project page whether your credentials were correct or not.
There is no difference in user experience for users logged in or not.
Checking out more hardware sets than available is possible.
The application isn't deployed along with the MongoDB database. There is a functional front end but the database could not be deployed along with it.

## Scalability

//demonstrate how the app is scalable to add more hardware resources
//discuuss from perspective of both database and web ui

## Stakeholder Modifications

Since the styling of the website comes from the Bootstrap template framework, the web UI can be personalized by editing the CSS files. This would include customizing colors, buttons, backfround, text fonts, forms, and other elements. 

The stakeholder can add more text by editing the files for the react components. In the HTML code, the structure of these components can be modified.

## Other Features and Improvements

A billing information feature was not implemented, but can be by keeping track of the user's checked-out hardware resources. A credit amount can be associated with this and then shown to the user. 

The login/register feature can be improved upon by implementing:
* Protected routes (pages only certain users can access based on their authentication)
* Authentication tokens to track logged in user sessions
* Keep a user logged in when they refresh or leave the page 
* Display errors from our backend in our login/register forms (input validation, incorrect usernames/passwords)

## Sources
To set up the foundation of our app using the MERN stack:
https://medium.com/@beaucarnes/learn-the-mern-stack-by-building-an-exercise-tracker-mern-tutorial-59c13c1237a1

To implement the login/register/authorization/authentication feature:
https://bezkoder.com/node-js-mongodb-auth-jwt/
https://bezkoder.com/react-jwt-auth/
https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-2-frontend-6eac4e38ee82
https://blog.bitsrc.io/build-a-login-auth-app-with-the-mern-stack-part-3-react-components-88190f8db718

Other:
https://medium.com/hackernoon/replacing-componentwillreceiveprops-with-getderivedstatefromprops-c3956f7ce607

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
