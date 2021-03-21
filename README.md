# Daily Gratitude - API

A daily gratitude journal.

Live version: (https://daily-gratitude-app-andrewrametta.vercel.app/)

## Introduction 

If you are in need of a convenient  way to practice gratitude daily. 

Create a profile and practice gratitude daily. Add a new entry each day with three things you are grateful for. Use the dashboard to look at all of your journal entries.

## Technologies

* Node and Express 
  * Authentication via JWT 
  * RESTful API 
* Testing 
  * Supertest (integration) 
  * Mocha and Chai (unit)
* Database 
  * Postgres
  * Knex.js 
  
## Production 

Deployed via Heroku

## API Endpoints

### Users Router
```
- /api/users 
- - GET - gets user that matches 
- - POST - creates a new user
```

### Days Router
```
- /api/days
- - GET - gets all days
- - POST - creates a new day 
```


### Auth Router
```
- /api/auth/login
- - POST - creates auth token
```
