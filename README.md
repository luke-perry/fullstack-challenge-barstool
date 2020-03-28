# Overview
This repo is the backend repo that is apart of the solution for: [https://github.com/BarstoolSports/fullstack-challenge](https://github.com/BarstoolSports/fullstack-challenge)

There is also a front end for this solution. It can be found here: [https://github.com/luke-perry/fullstack-challenge-barstool-fe](https://github.com/luke-perry/fullstack-challenge-barstool-fe)

# Running the Application
To run the app, you must start the database, install dependencies, and run the server. These 3 commands are all you need to do.

1 Setup Database
```
docker-compose up
```

2 Install Dependencies
```
npm install
```

3 Start the Server
```
npm run dev
```

# Testing
The application has unit testing and integration testing. If you would like to execute them, run the following commands:

Run unit tests
```
npm run test-cov
```

Run integration tests
```
npm run end2end
```
