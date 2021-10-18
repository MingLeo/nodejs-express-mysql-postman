# Host B.E app on Heroku - expose api endpoints as json server for F.E to hit!

Deployed to Heroku:   https://node-express-mysql-be.herokuapp.com/    
    
    
list of common commands to issue in git bash terminal!:    
 $ heroku login -i				-- login via terminal shell    
 $ heroku ps -a node-express-mysql-be		-- check how many free hours left for that month    
 $ heroku addons --all				-- view clearDB database-as-a-service addon service    
 $ heroku config | grep CLEARDB_DATABASE_URL    -- grab the clear db prod DB link!    
    
    
Public EndPoints   (see 'routes\api\learners.js' for list of all exposed api endpoints by express server!)
    
/GET      /getAll    
/GET      /:id=__ (1)    
/GET      /:id1=___&amp;id2=___   (range)    
    
/DELETE   /:id=___  (1)    
/DELETE   /:id=___&amp;id2=___ (range)    
    
    
/POST      / (1)    

/PUT       / (1)    
    
    
Created a static Boostraped page indexAll.html for a visual GUI to test ALL the REST endpoints above!   (visit link: https://node-express-mysql-be.herokuapp.com/ to try it out!    
   OR    
Alternatively, Test endpoints with Postman!    
    
    
Prod DB: MySQL - Hosted on Heroku's ClearDB database-as-a-service!
