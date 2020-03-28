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

# API Documentation
The API follows the described structure below. Its root URL is:
```
/api/v1
```

## Game Data
This endpoint returns game data for a provided game identifier. Game data includes general information like location and teams as well as player and team statistics.
```
GET /games/data/:gameId
```

| Url Param | Type   | Required | Description                                                  |   |
|-----------|--------|----------|--------------------------------------------------------------|---|
| :gameId   | String | YES      | The identifier for the game for which data is being requestd |   |

### Specifing Resources
The endpoint can continue with scoping and return more specific resources. 

The general details such as location, teams, official, etc. can be scoped to:
```
GET /games/data/:gameId/details
```

The game and players statistics (boxscore) can be scoped to: 
```
GET /games/data/:gameId/boxscore
```