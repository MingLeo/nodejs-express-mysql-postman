const mysql = require("mysql");

//Connect to Local Development MySql details
// var mysqlConnection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "learner", //<-------local MySQL (DB schema)!
//   multipleStatements: true,
// });

//configure to connect to Production Heroku ClearDB Addon Service
// var mysqlConnection = mysql.createConnection({
var mysqlConnection = mysql.createPool({
  //for Production we want to create a pool of connections (connection Pooling) so that there will always be 1 thread avail to service sql query.  Won't drop/loss the DB connection!
  host: "us-cdbr-east-04.cleardb.com",
  user: "bb0af4d8b6fe5d",
  password: "7ec0d467",
  database: "heroku_dcee101247ad51a", //<-------Production MySQL (DB schema) hosted on Heroku ClearDB !!
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) console.log("Successfully connect to Database");
  else
    console.log(
      "Failed to connect to Database." + JSON.stringify(err, undefined, 2)
    );
});

module.exports = mysqlConnection;
