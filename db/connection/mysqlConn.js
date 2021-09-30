const mysql = require("mysql");

//MySql details
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "learner", //<-------nd to specify the database(schema) that you gonna use!
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) console.log("Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});

module.exports = mysqlConnection;
