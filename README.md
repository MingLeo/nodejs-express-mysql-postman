# Host B.E app on Heroku - expose api endpoints as json server for F.E to hit!

Deployed Production Heroku App:  https://node-express-mysql-be.herokuapp.com/


list of common commands to issue in git bash terminal!:
 $ heroku login -i				-- login via terminal shell
 $ heroku ps -a node-express-mysql-be		-- check how many free hours left for that month
 $ heroku addons --all				-- view clearDB database-as-a-service addon service
 $ heroku config | grep CLEARDB_DATABASE_URL    -- grab the clear db prod DB link!


EndPoints   (see 'routes\api\learners.js' for list of all exposed api endpoints by express server!)

/GET      /getAll    /:id (1)    / (range)

/DELETE              /:id (1) / (range)

/POST      / (1)

/PUT       / (1)


Created a static page indexAll.html to test these API endpoints.   endpoint path ('/')   (see 'app.js' file)
   OR
Test api endpoints with Postman!


Prod DB: MySQL - Hosted on Heroku's ClearDB database-as-a-service!
