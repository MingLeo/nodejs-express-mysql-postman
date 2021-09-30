// route starts from relative url path of  /learners/......

const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../db/connection/mysqlConn.js");

//Creating GET Router to fetch all the learner details from the MySQL Database
// app.get("/learners", (req, res) => {
router.get("/getAll", (req, res) => {
  console.log(req.originalUrl);
  console.log("C");
  //oficially grabbed from db & expose it as a B.E endpoint  =D
  const sql = "SELECT * FROM learnerdetails order by learner_id desc";

  mysqlConnection.query(sql, (err, results) => {
    //result fetched is the rows!  so res.send(rows)  returns the list of results!   Hmm, no nd forEach loop?  Maybe rows is alrdy an iterator?
    //Nope, json object can be multi-array-object, yup rows is essentially result, the enire JSON array of result!  Is up to frontEnd to go any convert to JS Array object & forEach loop through to display each one individually, maybe like to a Bootstrap datatable or something...

    if (!err) {
      console.log("get successful, retrieving ALL users.");
      return res.json(results);
    } else res.send(err);
    res.end();
  });
});

//Router to GET specific learner detail from the MySQL database  --  working w req params!
// app.get("/learners/:id", (req, res) => {
router.get("/:id", (req, res) => {
  console.log("D");
  console.log("req.originalUrl:", req.originalUrl);
  console.log("req.params.id:", req.params.id);

  //B.E input fields sanitize check implementation
  if (req.params.id === "") {
    console.log({ Error_Msg: "input fields blank" });
    res.json({ Error_Msg: "input fields blank" }); //custom error message send back to F.E.
  } else {
    const sql = "SELECT * FROM learnerdetails WHERE learner_id = ?";
    mysqlConnection.query(sql, [req.params.id], (err, rows, fields) => {
      if (!err) {
        console.log("get successful, retrieving 1 result");
        return res.json(rows);
      } else {
        console.log(err);
        return res.json(err);
      }
    });
  }
});

//Maybe can have 1 more Delete endpoint that receives parametrized enpoints?   /?A=X&B=Y?   so that delete a range of records?
router.get("/", (req, res) => {
  console.log("E");

  console.log("req.originalUrl:", req.originalUrl); // /learners/?id1=3&id2=8
  //   console.log("req.baseUrl:", req.baseUrl); // /learners
  //   console.log("req.url:", req.url); // /?id1=3&id2=8

  //   console.log("req.params:", req.params); // /learner/:id
  console.log("req.query:", req.query); // learners/?id=__    //{ id1: '3', id2: '8' }
  //   console.log("req.body:", req.body);

  const { id1, id2 } = req.query;
  console.log("id1:", id1);
  console.log("id2:", id2);

  //B.E input fields sanitize check implementation
  if ((id1 === "" && id2 === "") || (id1 === undefined && id2 === undefined)) {
    console.log({ Error_Msg: "input fields blank" });
    res.json({ Error_Msg: "input fields blank" }); //custom error message send back to F.E.
    //not sure what to return, returning anything also wrong!  F.E nd more handling edge cases.
  } else {
    const sql = `SELECT * FROM learnerdetails WHERE learner_id between ${id1} and  ${id2}`;

    console.log("sql:", sql);

    mysqlConnection.query(sql, (err, rows, fields) => {
      if (!err) {
        //Logic flaw, what abt case where by result is null?  Like id that does not exist, shld handle this case, try query in DB & see what result is returned! Nd to handle this! Else just blindly return this message!
        //If id does not exist,    DB: 'Query OK, 0 rows affected (0.01 sec)' /  mySqlConn: "OkPacket { affectedRows: 0};"
        //If if exists,            DB: 'Query OK, 2 rows affected (0.01 sec)'  /  mySqlConn: "OkPacket { affectedRows: 2};"
        console.log("rows:", rows);
        console.log("rows.length:", rows.length);

        //   console.log(rows.affectedRows); //0
        //   console.log(rows["affectedRows"]); //0

        //   let NumRows = rows.affectedRows;

        //Implemented Logic to handle whether any record found & thus deleted.  =D
        if (rows.length === 0) {
          // console.log(`Number of rows affected 0`);
          console.log("0 Records found");
          //   return res.json("0 Learner Record found, 0 rows returned");
          return res.json(rows);
        } else {
          console.log(`Number of rows affected ${rows.length}`);
          console.log(`select successful, ${rows.length} records selected`);
          return res.json(rows);
          // return res.json(`${rows.length} Learner Record result returned.`);
          // return res.json(`11 Learner Records result returned.`);
        }
      } else {
        //wrong api endpoint format
        console.log(err);
        //   const { code, errno, index, sql, sqlMessage, sqlState } = err;
        //   console.log('code:', code, 'errno:', errno, 'index:', index, 'sql:', sql, 'sqlMessage:', sqlMessage, 'sqlState:', sqlState);
        return res.json(err); //since I return res.json(error), will be pass back as data to fetch also! Wont fall under catch(err) block!
      }
    });
  }
});

//Router to DELETE a learner's detail
// app.delete("/learners/:id", (req, res) => {
router.delete("/:id", (req, res) => {
  console.log("A");

  const sql = "DELETE FROM learnerdetails WHERE learner_id = ?";

  mysqlConnection.query(sql, [req.params.id], (err, rows, fields) => {
    if (!err) {
      //Logic flaw, what abt case where by result is null?  Like id that does not exist, shld handle this case, try query in DB & see what result is returned! Nd to handle this! Else just blindly return this message!
      //If id does not exist,    DB: 'Query OK, 0 rows affected (0.01 sec)' /  mySqlConn: "OkPacket { affectedRows: 0};"
      //If if exists,            DB: 'Query OK, 1 row affected (0.01 sec)'  /  mySqlConn: "OkPacket { affectedRows: 1};"
      console.log(rows);
      console.log("affected Rows:", rows.affectedRows); //0
      console.log(rows["affectedRows"]); //0

      //   let NumRows = rows.affectedRows;

      //Implemented Logic to handle whether any record found & thus deleted.  =D
      if (rows.affectedRows === 0) {
        // console.log(`Number of rows affected 0`);
        console.log("Record not found / does not exist");
        return res.json("0 Learner Record found, 0 rows deleted");
      } else {
        console.log(`Number of rows affected ${rows.affectedRows}`);
        console.log(`delete successful, ${rows.affectedRows} records deleted`);
        return res.json(
          ` ${rows.affectedRows} Learner Record deleted successfully.`
        );
      }
    } else {
      //wrong api endpoint format
      console.log(err);
      //   const { code, errno, index, sql, sqlMessage, sqlState } = err;
      //   console.log('code:', code, 'errno:', errno, 'index:', index, 'sql:', sql, 'sqlMessage:', sqlMessage, 'sqlState:', sqlState);
      return res.json(err); //since I return res.json(error), will be pass back as data to fetch also! Wont fall under catch(err) block!
    }
  });
});

//Maybe can have 1 more Delete endpoint that receives parametrized enpoints?   /?A=X&B=Y?   so that delete a range of records?
router.delete("/", (req, res) => {
  console.log("B");

  console.log("req.originalUrl:", req.originalUrl); // /learners/?id1=3&id2=8
  console.log("req.baseUrl:", req.baseUrl); // /learners
  console.log("req.url:", req.url); // /?id1=3&id2=8

  //   console.log("req.params:", req.params); // /learner/:id
  console.log("req.query:", req.query); // learners/?id=__    //{ id1: '3', id2: '8' }
  //   console.log("req.body:", req.body);

  const { id1, id2 } = req.query;
  console.log("id1:", id1);
  console.log("id2:", id2);

  //B.E input fields sanitize check implementation
  if ((id1 === "" && id2 === "") || (id1 === undefined && id2 === undefined)) {
    console.log({ Error_Msg: "input fields blank" });
    res.json({ Error_Msg: "input fields blank" }); //custom error message send back to F.E.
    //not sure what to return, returning anything also wrong!  F.E nd more handling edge cases.
  } else {
    const sql = `DELETE FROM learnerdetails WHERE learner_id between ${id1} and  ${id2}`;

    console.log("sql:", sql);

    mysqlConnection.query(sql, (err, rows, fields) => {
      if (!err) {
        //Logic flaw, what abt case where by result is null?  Like id that does not exist, shld handle this case, try query in DB & see what result is returned! Nd to handle this! Else just blindly return this message!
        //If id does not exist,    DB: 'Query OK, 0 rows affected (0.01 sec)' /  mySqlConn: "OkPacket { affectedRows: 0};"
        //If if exists,            DB: 'Query OK, 2 rows affected (0.01 sec)'  /  mySqlConn: "OkPacket { affectedRows: 2};"
        console.log(rows);
        console.log(rows.affectedRows); //0
        console.log(rows["affectedRows"]); //0

        //   let NumRows = rows.affectedRows;

        //Implemented Logic to handle whether any record found & thus deleted.  =D
        if (rows.affectedRows === 0) {
          // console.log(`Number of rows affected 0`);
          console.log("Record not found / does not exist");
          return res.json("0 Learner Record found, 0 rows deleted");
        } else {
          console.log(`Number of rows affected ${rows.affectedRows}`);
          console.log(
            `delete successful, ${rows.affectedRows} records deleted`
          );
          return res.json(
            ` ${rows.affectedRows} Learner Record deleted successfully.`
          );
        }
      } else {
        //wrong api endpoint format
        console.log(err);
        //   const { code, errno, index, sql, sqlMessage, sqlState } = err;
        //   console.log('code:', code, 'errno:', errno, 'index:', index, 'sql:', sql, 'sqlMessage:', sqlMessage, 'sqlState:', sqlState);
        return res.json(err); //since I return res.json(error), will be pass back as data to fetch also! Wont fall under catch(err) block!
      }
    });
  }
});

//Router to INSERT/POST a learner's detail  (via Stored Proc)
// app.post("/learners", (req, res) => {
router.post("/", (req, res) => {
  // console.log(req);
  console.log("req.url:", req.url); //  /learners/
  console.log("req.body:", req.body); //{ id: '0', name: 'leo', email: 'leo@gmail', courseId: '123' }     //ok so works, info did get submitted to B.E backend!
  // console.log('req.get("body"):', req.get("body")); //undefined
  let learner = req.body;
  console.log("learner:", learner); //{ id: '0', name: 'leo', email: 'leo@gmail', courseId: '123' }     //ok so is correct

  // JSON.parse(learner);
  // const { id, name, email, courseId } = learner;
  // console.log(id, name, email, courseId);

  console.log(typeof learner); //object
  console.log(typeof learner.learner_id); //string
  console.log(typeof learner.learner_name); //string
  console.log(typeof learner.learner_email); //string
  console.log(typeof learner.course_Id); //string

  if (
    learner.learner_name === "" &&
    learner.learner_email === "" &&
    learner.course_Id === ""
  ) {
    console.log({ Error_Msg: "input fields blank" });
    res.json({ Error_Msg: "input fields blank" }); //custom error message send back to F.E.
  } else {
    var sql =
      "SET @learner_id = ?;SET @learner_name = ?;SET @learner_email = ?;SET @course_Id = ?; CALL learnerAddOrEdit(@learner_id,@learner_name,@learner_email,@course_Id);"; //call stored proc (pass in params to stored proc!)
    mysqlConnection.query(
      sql,
      [
        learner.learner_id, //works also, even though string, hmm, yah, prev for get/id the id also string but works also, guess is the mysql library do some magical conversion bah, STILL WORKS even though nvr convert to Integer!  :0
        // parseInt(learner.learner_id),    //works definitely
        learner.learner_name,
        learner.learner_email,
        // parseInt(learner.course_Id),
        learner.course_Id,
      ],
      (err, rows, fields) => {
        if (!err) {
          //   console.log("AAAA");
          //   //   console.log("rows:", rows); //view the result returned from the stored proc!
          //   //   rows.forEach((element) => {
          //   console.log("BBBB");
          //   console.log("element:", rows[4]);
          //   //   console.log("element:", element[4]);
          //   //for each inserted element/record
          //   //   if (element.constructor == Array) {
          //   if (rows[4].affectedRows == 1) {
          //     console.log("CCCC");
          //     // console.log("element:", element); //element: [ RowDataPacket { learner_id: 27, learner_name: 'varsha', learner_email: 'varsha@gunnu', course_Id: 152626} ]
          //     console.log(
          //       "post successful, inserted new record, new record created."
          //     ); //<----- something is wrong, even if fail didnt insert into db, still prints this statement!
          //     // return res.json("New Learner: " + element); //New Learner ID : null   <---- Error here  "Uncaught (in promise) SyntaxError: Unexpected token N in JSON at position 0"
          //     return res.json("New Learner ID : " + learner.learner_id); //New Learner ID : null   <---- Error here  "Uncaught (in promise) SyntaxError: Unexpected token N in JSON at position 0"
          //   }
          //   //   });

          //   console.log(rows);
          console.log(rows[4]); //undefined
          console.log(rows[4][0].learner_id);

          //   rows.forEach((element) => {
          //     if (element.constructor == Array)
          //       res.json("New Learner ID : " + element[4][0].learner_id);
          //   });
          res.json("New Learner ID : " + rows[4][0].learner_id);
        } else {
          console.log("DDDD");
          console.log(err);
        }
      }
    );
  }
});

//Router to UPDATE a learner's detail  (via Stored Proc)
// app.put("/learners", (req, res) => {
router.put("/", (req, res) => {
  console.log("req.body:", req.body);
  let learner = req.body;
  //   console.log("req.query:", req.query);

  if (
    learner.learner_name === "" &&
    learner.learner_email === "" &&
    learner.course_Id === ""
  ) {
    console.log({ Error_Msg: "input fields blank" });
    res.json({ Error_Msg: "input fields blank" }); //custom error message send back to F.E.
  } else {
    var sql =
      "SET @learner_id = ?;SET @learner_name = ?;SET @learner_email = ?;SET @course_Id = ?;  CALL learnerAddOrEdit(@learner_id,@learner_name,@learner_email,@course_Id);"; //call stored proc (pass in params to stored proc!)
    mysqlConnection.query(
      sql,
      [
        learner.learner_id,
        learner.learner_name,
        learner.learner_email,
        learner.course_Id,
      ],
      // (err, result) => {
      (err, rows, fields) => {
        if (!err) {
          console.log("result: ", rows);
          console.log("fields: ", fields);
          console.log("learner_id: ", rows[4][0].learner_id); // =D Worked

          //If no match ~ DB: 'Query OK, 0 rows affected (0.01 sec)  Rows matched: 0  Changed: 0  Warnings: 0'
          //If no match ~ DB: 'Query OK, 1 row affected (0.01 sec)  Rows matched: 1  Changed: 1  Warnings: 0'

          //   console.log("result[0]: ", rows[0]);
          //   console.log(rows[0].affectedRows);       //always 0 even if successfully udpated, false negative.  So no way to sanitize check.

          //   if (rows[0].affectedRows === 0) {
          //     console.log("Record not found / does not exist");
          //     return res.json("0 records updated");
          //   } else {
          //     console.log(
          //       `put successful, record: ${learner.learner_id} updated.`
          //     ); //log in console.
          //     // return res.json("Learner Details Updated Successfully"); //response send back to F.E frontend.
          //     // console.log(rows); //view the result returned from the stored proc
          //     // return res.json(rows); //response send back to F.E frontend.
          //     return res.json(`Learner ID: ${learner.learner_id} updated`);
          //   }
          `put operation executed: ${learner.learner_id} updated.`;
          return res.json(`Learner ID: ${learner.learner_id} updated`);
        } else console.log(err);
      }
    );
  }
});

module.exports = router; // If nvr add this line, will result in  "TypeError: Router.use() requires a middleware function but got a Object.   TypeError('Router.use() requires a middleware function but got a ' + gettype(fn))"
