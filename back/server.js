const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
// var con = require('mssql');
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileupload());
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "192.168.2.8",
  user: "trainee",
  password: "trainee@123",
  database: "trainee",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected");
});

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server" });
});

//Screen
app.get("/user", (req, res) => {
  console.log(req.query);
  const code = req.query.code;
  const firstname = req.query.firstname;
  const lastname = req.query.lastname;
  const email = req.query.email;
  const gender = req.query.gender;
  const hobbies = req.query.hobbies;
  const file = req.query.file;
  const country = req.query.country;
  const dateadded = req.query.dateadded;

  con.query(`insert into users19(code, firstname, lastname, email, gender, hobbies,photo, country, dateadded) values("${code}","${firstname}","${lastname}","${email}","${gender}","${hobbies}","${file}","${country}","${dateadded}")`,
    function (err, result) {
      if (err) throw err;
      console.log(result);
      console.log(country);
      console.log(req.query);
      console.log("inserted");
    }
  );
});

app.post("/userimage", async (req, res) => {
  const file = req.files.file;
  const filename = file.name;
  console.log(filename);
  console.log("user img upload");
  file.mv(`./images/${filename}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send({ message: "File upload failed" });
    }
    return res.status(200).send({ message: `./images/${filename}`, code: 200 });
  });
});

//Listdata
app.get("/listdata", (req, res) => {
  // var request = new con.Request();
  con.query(`select * from users19 where isactive=1`, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/deletedata", async (req, res) => {
  con.connect(function (err, result) {
    console.log("hello");
    const eid = req.query.recid;
    console.log(eid);
    // var request = new con.Request();
    con.query(`update users19 set isactive='false' where recid="${eid}"`,
      function (err, result) {
        if (err) throw err;

        res.send(result);
        console.log(result);
      }
    );
  });
});

app.get("/getImage/:id", async (req, res) => {
  console.log(req.params);
  res.set("Content-Type", "image/png");
  const data = fs.readFileSync(`./images/${req.params.id}`);
  res.send(data);
});

  app.get('/sortnamea',(req,res)=>{
  console.log("sort by name   ")
  con.query(`select * from users19 order by firstname`,function(err,results){
  if (err) throw err;
  console.log(results)
   res.send(results) ;
  })})

   app.get('/sortnamed',(req,res)=>{
    con.query(`select * from users19 order by firstname DESC`,function(err,results){
       if (err) throw err;
        res.send(results)
       })})

  app.get('/sortdatea',(req,res)=>{
     con.query(`select * from users19 order by dateadded`,function(err,results){
       if (err) throw err;
        res.send(results) 
      })})

  app.get('/sortdated',(req,res)=>{
    con.query(`select * from users19 order by dateadded DESC`,function(err,results){
       if (err) throw err;
        res.send(results)
       })})

  app.get("/filterdata", async(req,res) => {
    try{
        const searchvalue = req.query.searchdata;
        const hobbies = req.query.hobbies;
        const gender = req.query.gender;
        console.log(req.query);
        const dispstatus = req.query.dispstatus;
        let sqlquery = ``;
        if(searchvalue != "" && searchvalue)
          { sqlquery = sqlquery + ` where code like "%${searchvalue}%" or firstname like "%${searchvalue}%" or lastname like "%${searchvalue}%" or email like "%${searchvalue}%"`}
        if(hobbies != "" && hobbies)
        {
          if(sqlquery=="")
          { sqlquery = sqlquery + ` where hobbies like "%${hobbies}%"` }
          else
          { sqlquery = sqlquery + ` and hobbies like "%${hobbies}%" ` }
        }
        if(gender != "" && gender)
        { 
          if(sqlquery=="")
          { sqlquery = sqlquery + ` where gender = "${gender}" `}
          else
          { sqlquery = sqlquery + ` and gender = "${gender}" ` } 
        } 
        if(dispstatus != "" && dispstatus) 
        {
          if(sqlquery=="")
          { sqlquery = sqlquery + ` where isactive = "${dispstatus}" `}
          else
          { sqlquery = sqlquery + ` and isactive = "${dispstatus}" ` } 
        }
        let sqlquery2 = `select * from users19 `+sqlquery;
         console.log(sqlquery2) 
        //  const ans = await queryRunner(sqlquery2); 
        //  res.status(200).send(ans); 
         console.log(sqlquery2);
         con.query(sqlquery2,(err,result)=>{
          if (err) throw err;
          res.json(result);
         })
      } 
      catch(err)
      {
        res.status(400).send(err); 
        console.log(err); 
      }
    } )

//Editdata
app.get("/userdata", async (req, res) => {
  con.connect(function (err, result) {
    const eid = req.query.eid;
    console.log(eid);
    // var request = new con.Request();
    con.query(`select * from users19 where recid="${eid}"`,
      function (err, result) {
        if (err) throw err;
        res.send(result);
        console.log(result);
      }
    );
  });
});

app.get("/updateuser", async (req, res) => {
  con.connect(function (err, result) {
    const eid = req.query.recid;
    console.log("bhavya", eid);
    const code = req.query.code;
    const firstname = req.query.firstname;
    const lastname = req.query.lastname;
    const email = req.query.email;
    const gender = req.query.gender;
    const hobbies = req.query.hobbies;
    // const file = req.query.file;
    const country = req.query.country;
    console.log("fetch id", eid);
    con.query(`update users19 set code="${code}",firstname="${firstname}", lastname="${lastname}", email="${email}", gender="${gender}", hobbies="${hobbies}", country="${country}" where recid="${eid}" `,
      function (err, result) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

app.get("/getimage/:id", async (req, res) => {
  res.set("Content-Type", "image/jpg");
  const data = fs.readFileSync(`./public/image/${req.params.id}`);
  res.send(data);
});

//View
// app.get("/getimage/:id", async (req, res) => {
//   res.set("Content-Type", "image/jpg");
//   const data = fs.readFileSync(`./public/image/${req.params.id}`);
//   res.send(data);
// });

app.get("/viewdata", async (req, res) => {
  con.connect(function (err, result) {
    const eid = req.query.eid;
    console.log(eid);
    con.query(`select * from users19 where recid="${eid}"`,
      function (err, result) {
        if (err) throw err;
        res.send(result);
        console.log(result);
      }
    );
  });
});

app.listen(8000, () => {
  console.log(`server is running on port 8000`);
});
