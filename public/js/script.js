$(document).ready(function () {
  // document.getElementById('getText').addEventListener('click', getText);
  document.getElementById("getUsers").addEventListener("click", getAllUsers); //'click' event type,  listen on button id
  document
    .getElementById("display1User")
    .addEventListener("submit", display1User);
  document
    .getElementById("displayMultipleUsers")
    .addEventListener("submit", displayMultipleUsers);
  document
    .getElementById("delete1User")
    .addEventListener("submit", delete1User);
  document
    .getElementById("deleteMultipleUsers")
    .addEventListener("submit", deleteMultipleUsers);
  document
    .getElementById("submit1User")
    .addEventListener("submit", submit1User);
  document
    .getElementById("update1User")
    .addEventListener("submit", update1User); //'submit' event type,  listen on form id!
  // document.getElementById('getPosts').addEventListener('click', getPosts);
  // document.getElementById('addPost').addEventListener('submit', addPost);

  console.log("hi12");

  var t = $("#example").DataTable(); //Example from  https://datatables.net/examples/api/add_row.html
  var counter = 1;

  // $('#addRow').click();    // Automatically add a first row of data

  $("#addRow").on("click", function () {
    //listener for on button click event
    t.row
      .add([
        //append a new <tr>row into <tbody> section of 'example' datatable! w the individual respective <td> column for each ',' field!
        counter + ".1",
        counter + ".2",
        counter + ".3",
        counter + ".4",
        counter + ".5",
      ])
      .draw(false);

    counter++;
  });

  function getAllUsers() {
    $(".custom-table-style1").show(); //=D Yup this exactly what I want!
    // fetch("http://localhost:4000/learners/getAll") //fetch the api
    fetch("https://node-express-mysql-be.herokuapp.com/learners/getAll") //fetch the api
      .then((res) => res.json())
      .then((data) => {
        // let output = '<h2 class="mb-4">Users</h2>';          //return normal html. WORKs, but no WOW factor!
        // data.forEach(function (user) {
        //   output += `
        //   <ul class="list-group mb-3">
        //     <li class="list-group-item">ID: ${user.learner_id}</li>
        //     <li class="list-group-item">Name: ${user.learner_name}</li>
        //     <li class="list-group-item">Email: ${user.learner_email}</li>
        //     <li class="list-group-item">Course_id: ${user.course_id}</li>
        //   </ul>
        // `;
        // });
        // document.getElementById('output').innerHTML = output;

        // let output2 = '';
        // data.forEach(function (user) {     //now try load using bootstrap datatable!    DIV & TABLES are enemies!  Not allowed!   https://stackoverflow.com/questions/23440362/can-we-add-div-inside-table-above-every-tr
        //   output2 += `
        //     <tr>
        //       <td>ID: ${user.learner_id}</li>
        //       <td>Name: ${user.learner_name}</li>
        //       <td>Email: ${user.learner_email}</li>
        //       <td>Course_id: ${user.course_id}</li>
        //     </tr>
        //   `;
        // });
        // document.getElementById('output2').innerHTML = output2;

        const t = $("#UsersTable").DataTable(); //take it up a notch!  Write result to a table!   jQuery Datatables row.add() API   https://datatables.net/examples/api/add_row.html    =D  Works!
        $.each(data, function (i, user) {
          t.row
            .add([
              //auto appends into <tbody> section of 'Users' table, even though we never specfy.  Dun believe, Open f12 dev console & see for self!
              user.learner_id,
              user.learner_name,
              user.learner_email,
              user.course_id,
            ])
            .draw(false); //https://datatables.net/reference/api/draw()    draw( [paging: true|false] )  API   false-will not refresh,  true will refresh!
        });
      });
  }

  // function get1User() {    //DEFAULT BEHAVIOUS is to REFRESH PAGE, SO CANNOT SEE RETURNED OUTPUT!
  function display1User(e) {
    e.preventDefault(); //so that's why nd to prevent the default behaviour, so that page does not refresh!
    console.log("hi2");

    const paramId = $("#UserId1").val();
    console.log("paramId: ", paramId);

    // var url = "http://localhost:4000/learners/" + $.param({ id: paramId })   //jquery way of setting parameter in query string!
    // var url = "http://localhost:4000/learners/" + paramId;
    // const url = `http://localhost:4000/learners/${paramId}`;
    const url = `https://node-express-mysql-be.herokuapp.com/learners/${paramId}`;

    console.log("url: ", url); //url:  http://localhost:4000/learners/id=1

    if (paramId === "") {
      alert(`input fields blank! Please insert input field!`);
    } else {
      fetch(url)
        .then((res) => res.json()) //parse JSON, so no nd to do JSON.parse()
        .then((data) => {
          // Do something with response.
          console.log("data: ", data);
          console.log("data.length: ", data.length); // returns 0 / 1.  0 if no result, 1 if got result.

          let output = "";

          // if (data.code) {
          //   console.log(
          //     "err.code",
          //     data.code,
          //     "err.sql",
          //     data.sql,
          //     "err.sqlMessage",
          //     data.sqlMessage
          //   );
          if (data.Error_Msg) {
            alert("Error encountered, check console!");
            // const errMsg = `<li>err.code: ${data.code}, <li>err.sql: ${data.sql}, <li>err.sqlMessage: ${data.sqlMessage}`;
            // const errMsg = `err.code: ${data.code}, <br>err.sql: ${data.sql}, <br>err.sqlMessage: ${data.sqlMessage}`;
            // document.getElementById("deleteMultiple").innerHTML = errMsg;
          } else if (data.length === 0) {
            output += `${data.length} User found`;
          } else {
            output += '<h2 class="mb-4">Users</h2>'; //return normal html. WORKs, but no WOW factor!
            data.forEach(function (user) {
              output += `
                <ul class="list-group mb-3">
                <li class="list-group-item">ID: ${user.learner_id}</li>
                <li class="list-group-item">Name: ${user.learner_name}</li>
                <li class="list-group-item">Email: ${user.learner_email}</li>
                <li class="list-group-item">Course_id: ${user.course_id}</li>
                </ul>
                `; // using bootstrap list class
            });
          }
          document.getElementById("display1").innerHTML = output;
        });
    }
  }

  // function get1User() {    //DEFAULT BEHAVIOUS is to REFRESH PAGE, SO CANNOT SEE RETURNED OUTPUT!
  function displayMultipleUsers(e) {
    e.preventDefault(); //so that's why nd to prevent the default behaviour, so that page does not refresh!
    console.log("hi3");

    console.log($(".custom-table-style2").css("display")); //"none". correct I set the css style.display to "none"
    // $(".custom-table-style2").css("display", "block");
    // $(".custom-table-style2").css("display", "flex");
    $(".custom-table-style2").show(); //=D Yup this exactly what I want!
    console.log($(".custom-table-style2").css("display")); //"table"

    const paramId1 = document.getElementById("UserId7").value;
    console.log("paramId1: ", paramId1);
    const paramId2 = document.getElementById("UserId8").value;
    console.log("paramId2: ", paramId2);

    //F.E input fields sanitize check implementation
    if (paramId1 === "" && paramId2 === "") {
      alert(`input fields blank! Please insert input field!`);
    } else {
      // const url = `http://localhost:4000/learners/?id1=${paramId1}&id2=${paramId2}`;
      const url = `https://node-express-mysql-be.herokuapp.com/learners/?id1=${paramId1}&id2=${paramId2}`; //old fashion traditional hardcoded way to set parameter in HTTP URL request string!
      // const url1 =
      //   "http://localhost:4000/learners/?" +
      //   $.param({ id1: paramId1, id2: paramId2 });   //jquery way of setting parameter in query string!

      console.log("url: ", url);
      // console.log("url1: ", url1);

      fetch(url)
        .then((res) => res.json()) //parse JSON, so no nd to do JSON.parse()
        .then((data) => {
          // Do something with response.
          console.log("data: ", data);
          console.log("data.length: ", data.length);
          // console.log("data.split: ", data.split(" "));
          //   console.log("records found: ", data.split(" ")[0]); //0

          //   let val = data.split(" ")[0];
          //   console.log("val:", val);

          if (data.Error_Msg) {
            alert("Error encountered, check console!");
            // const errMsg = `<li>err.code: ${data.code}, <li>err.sql: ${data.sql}, <li>err.sqlMessage: ${data.sqlMessage}`;
            // const errMsg = `err.code: ${data.code}, <br>err.sql: ${data.sql}, <br>err.sqlMessage: ${data.sqlMessage}`;
            // document.getElementById("deleteMultiple").innerHTML = errMsg;
          }
          // else if (val == 0) {
          // if (val === 0) {
          // if (data.split(" ")[0] === 0) {
          else if (data.length === 0) {
            let output = "";
            // output += `${val} User found`;
            // console.log("output:", output);
            output += `${data.length} User found`;
            document.getElementById("displayMultiple").innerHTML = output;
          } else {
            // output += '<h2 class="mb-4">Users</h2>'; //return normal html. WORKs, but no WOW factor!
            // data.forEach(function (user) {
            //   output += `
            //       <ul class="list-group mb-3">
            //       <li class="list-group-item">ID: ${user.learner_id}</li>
            //       <li class="list-group-item">Name: ${user.learner_name}</li>
            //       <li class="list-group-item">Email: ${user.learner_email}</li>
            //       <li class="list-group-item">Course_id: ${user.course_id}</li>
            //       </ul>
            //       `; // using bootstrap list class
            //   document.getElementById("displayMultiple").innerHTML = output;
            // });

            const t = $("#UsersTable1").DataTable(); //take it up a notch!  Write result to a table!   jQuery Datatables row.add() API   https://datatables.net/examples/api/add_row.html    =D  Works!
            $.each(data, function (i, user) {
              t.row
                .add([
                  //auto appends into <tbody> section of 'Users' table, even though we never specfy.  Dun believe, Open f12 dev console & see for self!
                  user.learner_id,
                  user.learner_name,
                  user.learner_email,
                  user.course_id,
                ])
                .draw(false); //https://datatables.net/reference/api/draw()    draw( [paging: true|false] )  API   false-will not refresh,  true will refresh!
            });
          }
        });
      //   .catch((err) => {
      //     console.log(err); //if input param is null, sql Query will have error btwn '' and ''
      //   });
    }
  }

  function delete1User(e) {
    //DEFAULT BEHAVIOUS is to REFRESH PAGE, SO CANNOT SEE RETURNED OUTPUT!
    e.preventDefault(); //so that's why nd to prevent the default behaviour, so that page does not refresh!
    console.log("hi2");

    const paramId = document.getElementById("UserId2").value;
    console.log("paramId: ", paramId);

    //F.E input fields sanitize check implementation
    if (paramId === "") {
      alert(`input fields blank! Please insert input field!`);
    } else {
      // const url = "http://localhost:4000/learners/" + $.param({ id: paramId })   // jquery way of setting parameter in query string!   Cannot use parameterized, cos this Api & also the stored Proc doesnt handle/accept parameters!
      //                                                                            // =D yup const work. Const can concat, just dun allow reassignment! First time assign can concat.
      // const url = "http://localhost:4000/learners/" + paramId;
      // const url = `http://localhost:4000/learners/${paramId}`;
      const url = `https://node-express-mysql-be.herokuapp.com/learners/${paramId}`;

      console.log("url: ", url); //url:  http://localhost:4000/learners/id=1

      fetch(url, {
        //fetch API   https://medium.com/meta-box/how-to-send-get-and-post-requests-with-javascript-fetch-api-d0685b7ee6ed
        method: "DELETE", //Default is /GET, so if is /DEL /PUT nd to specify    https://stackoverflow.com/questions/40284338/javascript-fetch-delete-and-put-requests
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // Do something with response.
          console.log("data: ", data);

          if (data.Error_Msg) {
            alert("Error encountered, check console!");
            //   if (data.code) {
            //     console.log(
            //       "err.code",
            //       data.code,
            //       "err.sql",
            //       data.sql,
            //       "err.sqlMessage",
            //       data.sqlMessage
            //     );
            //     // const errMsg = `<li>err.code: ${data.code}, <li>err.sql: ${data.sql}, <li>err.sqlMessage: ${data.sqlMessage}`;
            //     const errMsg = `err.code: ${data.code}, <br>err.sql: ${data.sql}, <br>err.sqlMessage: ${data.sqlMessage}`;
            //     document.getElementById("delete1").innerHTML = errMsg;
          } else {
            document.getElementById("delete1").innerHTML = data;
          }
        });
      // .catch(err => {
      //   console.log('err: ', err);
      //   // let errMsg = `<li>err.${}`;
      //   document.getElementById('delete1').innerHTML = err;
      // });
    }
  }

  function deleteMultipleUsers(e) {
    //DEFAULT BEHAVIOUS is to REFRESH PAGE, SO CANNOT SEE RETURNED OUTPUT!
    e.preventDefault(); //so that's why nd to prevent the default behaviour, so that page does not refresh!
    console.log("hi2");

    const paramId1 = document.getElementById("UserId5").value;
    console.log("paramId1: ", paramId1);
    const paramId2 = document.getElementById("UserId6").value;
    console.log("paramId2: ", paramId2);

    //F.E input fields sanitize check implementation
    if (paramId1 === "" && paramId2 === "") {
      alert(`input fields blank! Please insert input field!`);
    } else {
      // const url = `http://localhost:4000/learners/?id1=${paramId1}&id2=${paramId2}`;
      const url = `https://node-express-mysql-be.herokuapp.com/learners/?id1=${paramId1}&id2=${paramId2}`;
      // const url1 =
      //   "http://localhost:4000/learners/?" +
      //   $.param({ id1: paramId1, id2: paramId2 });

      console.log("url: ", url); //url:  http://localhost:4000/learners/?id1=1&id2=3
      // console.log("url1: ", url1); //url1:  http://localhost:4000/learners/?id1=1&id2=3

      fetch(url, {
        //fetch API   https://medium.com/meta-box/how-to-send-get-and-post-requests-with-javascript-fetch-api-d0685b7ee6ed
        method: "DELETE", //Default is /GET, so if is /DEL /PUT nd to specify    https://stackoverflow.com/questions/40284338/javascript-fetch-delete-and-put-requests
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // Do something with response.

          if (data.Error_Msg) {
            alert("Error encountered, check console!");
            // console.log("data: ", data);
            // if (data.code) {
            //   console.log(
            //     "err.code",
            //     data.code,
            //     "err.sql",
            //     data.sql,
            //     "err.sqlMessage",
            //     data.sqlMessage
            //   );
            //   // const errMsg = `<li>err.code: ${data.code}, <li>err.sql: ${data.sql}, <li>err.sqlMessage: ${data.sqlMessage}`;
            //   const errMsg = `err.code: ${data.code}, <br>err.sql: ${data.sql}, <br>err.sqlMessage: ${data.sqlMessage}`;
            //   document.getElementById("deleteMultiple").innerHTML = errMsg;
          } else {
            document.getElementById("deleteMultiple").innerHTML = data;
          }
        });

      // .catch(err => {
      //   console.log('err: ', err);
      //   // let errMsg = `<li>err.${}`;
      //   document.getElementById('delete1').innerHTML = err;
      // });
    }
  }

  function submit1User(e) {
    e.preventDefault();
    console.log("hi2");

    const id = document.getElementById("UserId3").value; //$('#Id').val();
    const name = document.getElementById("name1").value;
    const email = document.getElementById("email1").value;
    const courseId = document.getElementById("courseId1").value;

    console.log(
      "id:",
      id,
      "name:",
      name,
      "email:",
      email,
      "courseId:",
      courseId
    );

    if (name === "" && email === "" && courseId === "") {
      alert(`input fields blank! Please insert input field!`);
    } else {
      // fetch("http://localhost:4000/learners/", {
      fetch("https://node-express-mysql-be.herokuapp.com/learners/", {
        //fetch API   https://medium.com/meta-box/how-to-send-get-and-post-requests-with-javascript-fetch-api-d0685b7ee6ed
        method: "POST",
        headers: {
          //Nd to add this if response send from server api is json data format res.json() returned,  else will have error https://stackoverflow.com/questions/37269808/react-js-uncaught-in-promise-syntaxerror-unexpected-token-in-json-at-posit
          "Content-type": "application/json",
          Accept: "application/json, text/plain, */*",
        },
        body: JSON.stringify({
          learner_id: id,
          learner_name: name,
          learner_email: email,
          course_Id: courseId,
        }),
      })
        .then((res) => res.json()) //Hmm alrdy parse leh
        .then((data) => {
          console.log("data:", data); //data: New Learner: [object Object]

          if (data.Error_Msg) {
            alert("Error encountered, check console!");
          } else {
            document.getElementById("submit1").innerHTML = data;
          }

          // console.log('data:', data[0].learner_id);  //data: undefined
          // console.log('data:', data[0].learner_name);  //data: undefined
          // console.log('data:', data[0].learner_email);  //data: undefined
          // console.log('data:', data[0].course_Id);  //data: undefined

          // let output = '';
          // output += `
          //   <ul class="list-group mb-3">
          //     <li class="list-group-item">ID: ${data.learner_id}</li>
          //     <li class="list-group-item">Name: ${data.learner_name}</li>
          //     <li class="list-group-item">Email: ${data.learner_email}</li>
          //     <li class="list-group-item">Course_id: ${data.course_Id}</li>
          //   </ul>
          // `;// using bootstrap list class
          // document.getElementById('display1').innerHTML = output;
        });
    }
  }

  function update1User(e) {
    e.preventDefault();
    console.log("hi2");

    const id = document.getElementById("UserId4").value; //$('#Id').val();
    const name = document.getElementById("name2").value;
    const email = document.getElementById("email2").value;
    const courseId = document.getElementById("courseId2").value;

    console.log(
      "id:",
      id,
      "name:",
      name,
      "email:",
      email,
      "courseId:",
      courseId
    );

    if (name === "" && email === "" && courseId === "") {
      alert(`input fields blank! Please insert input field!`);
    } else {
      // fetch("http://localhost:4000/learners/", {
      fetch("https://node-express-mysql-be.herokuapp.com/learners/", {
        //fetch API   https://medium.com/meta-box/how-to-send-get-and-post-requests-with-javascript-fetch-api-d0685b7ee6ed
        method: "PUT",
        headers: {
          //Nd to add this if response send from server api is json data format res.json() returned,  else will have error https://stackoverflow.com/questions/37269808/react-js-uncaught-in-promise-syntaxerror-unexpected-token-in-json-at-posit
          Accept: "application/json, text/plain, */*",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          learner_id: id,
          learner_name: name,
          learner_email: email,
          course_Id: courseId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data:", data); //console.log(data)  -- log data to the browser's console =D

          if (data.Error_Msg) {
            alert("Error encountered, check console!");
          } else {
            document.getElementById("update1").innerHTML = data;
          }
        });
    }
  }

  //   function getPosts() {
  //     fetch('https://jsonplaceholder.typicode.com/posts')     //fetch data from jsonplaceholder API !
  //       .then((res) => res.json())
  //       .then((data) => {
  //         let output = '<h2 class="mb-4">Posts</h2>';
  //         data.forEach(function (post) {
  //           output += `
  //         <div class="card card-body mb-3">
  //           <h3>${post.title}</h3>
  //           <p>${post.body}</p>
  //         </div>
  //       `;
  //         });
  //         document.getElementById('output').innerHTML = output;
  //       })
  //   }

  // function addPost(e) {
  //   e.preventDefault();
  //   console.log('hi2');

  //   let title = document.getElementById('title').value;    //$('#Id').val();
  //   let body = document.getElementById('body').value;

  //   fetch('https://jsonplaceholder.typicode.com/posts', {    //fetch API   https://medium.com/meta-box/how-to-send-get-and-post-requests-with-javascript-fetch-api-d0685b7ee6ed
  //     method: 'POST',
  //     headers: {     //Nd to add this if response send from server api is json data format res.json() returned,  else will have error https://stackoverflow.com/questions/37269808/react-js-uncaught-in-promise-syntaxerror-unexpected-token-in-json-at-posit
  //       'Accept': 'application/json, text/plain, */*',
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify({ title: title, body: body })
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));    //console.log(data)  -- log data to the browser's console =D
  // }
});
