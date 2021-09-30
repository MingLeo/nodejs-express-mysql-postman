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
var mysqlConnection = mysql.createConnection({
  host: "us-cdbr-east-04.cleardb.com",
  user: "bb0af4d8b6fe5d",
  password: "7ec0d467",
  database: "heroku_dcee101247ad51a", //<-------Production MySQL (DB schema) hosted on Heroku ClearDB !!
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) console.log("Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});

module.exports = mysqlConnection;
