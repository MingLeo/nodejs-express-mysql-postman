//https://www.edureka.co/blog/node-js-mysql-tutorial/
//**--\---->  BEST TUTORIAL  =D   mySql Stored Proc!    Postman  ,   mySqlConnection string   &  req.params  =D  --  Node.js MySQL Tutorial - How to Build a CRUD Application? Edureka
//CRUD application   /GET /POST /PUT /DELETE

const express = require("express");
const path = require("path");
var cors = require("cors"); //use this

// const logger = require('./middleware/logger')
// const morgan = require("morgan"); //logging library for http requests :0  :D
//moment vs mysql's datatime()
//maybe extract out DB folder? / DB connection to another file?

var app = express();
app.use(cors()); //and this

// app.use(express.static("public")); //Server serve static files - html, css, js files   res.redirect  vs  res.render(tempalte view engine like hbs)
app.use(express.static(path.join(__dirname, "/public"))); //Server serve static files - html, css, js files   res.redirect  vs  res.render(tempalte view engine like hbs)
// app.use("/html", express.static(path.join(__dirname, "/public"))); //Server serve static files - html, css, js files   res.redirect  vs  res.render(tempalte view engine like hbs)
// app.use("/html/redirect", express.static(path.join(__dirname, "/public"))); //Server serve static files - html, css, js files   res.redirect  vs  res.render(tempalte view engine like hbs)

//configure express server
// const bodyparser = require("body-parser");   //no need  app.use(bodyParser.json()) anymore, now we use app.use(express.json())  https://stackoverflow.com/questions/47232187/express-json-vs-bodyparser-json/47232318
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Testing page for our B.E endpoint, instead of POSTMAN.    move public folder to a F.E app & host on heroku so that can a href redirect correctly!   Express JS dont allow href btwn pages, will interpret as endpoint!   Can only server static page!
app.get("/", (req, res) => {
  // res.send("<h1>welcome</h1>");
  // res.render("index");     //render nd view engine
  //if just want to load a page, use res.sendFile()
  res.sendFile(path.join(__dirname, "./public/html/indexAll.html")); //=D work
  // res.sendFile(path.join(__dirname, "./public/html/redirect/indexNew.html")); //=D work
});

// app.get("/new", (req, res) => {          //express only allows serve static page, does not allow F.E to href to another, will mistake a href URL as a endpoint  /GET /POST /PU /DEL, nd to host seperately, try Traversy Media MERN Course see how they host seperately?
//   // res.send("<h1>welcome</h1>");
//   // res.render("index");     //render nd view engine
//   //if just want to load a page, use res.sendFile()
//   res.sendFile(path.join(__dirname, "./public/html/redirect/indexNew.html")); //=D work
//   // res.sendFile(path.join(__dirname, "./public/html/redirect/indexNew.html")); //=D work
// });

//learners router middleware!  --  see "./routes/api/learners.js" for router implementation!
app.use("/learners", require("./routes/api/learners.js"));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
