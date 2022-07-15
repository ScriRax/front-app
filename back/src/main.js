const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//const port = 3000;

const connection = mysql.createConnection({
  host: "mysql-cat-api.alwaysdata.net",
  user: "cat-api",
  password: "!cat-api59",
  database: "cat-api_base",
});

app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.get("/cat", (req, res) => {
  const query = "SELECT * from cats"
  connection.query(query, (error, results, fields) => {
    if (error){ 
      throw error
    };
    console.log("Résultat", results);
    res.json(results);
  });
});

app.delete("/delete", (req, res) => {
  const query = "DELETE FROM cats WHERE ?"
  const value = {
    id_cat: req.body.id,
  };
  connection.query(query, value, (error, results, fields) => {
    if (error){ 
      throw error
    };
    console.log("Résultat", results);
    res.sendStatus(200);
  });
});

app.get("/cat_from_race", (req, res) => {
  const query = "SELECT * from cats WHERE LOWER(race) LIKE LOWER( ? )"
  connection.query(query, req.query.race ,(error, results, fields) => {
    if (error){ 
      throw error
    };
    console.log("Résultat", results);
    res.json(results);
  });
});

app.post("/add_cat", (req, res) => {
  const query = "INSERT INTO cats SET ?";
  const value = {
    race: req.body.race,
    color: req.body.color,
    life: req.body.life,
    origin: req.body.origin,
    stat: req.body.stat,
    img: req.body.img,
  };
  connection.query(query, value, (error, results, fields) => {
    if (error){ 
      throw error
    };
    console.log("Résultat de l'insert", results);
    res.sendStatus(200);
  });
});

app.post("/register", (req, res) => {
  const query = "INSERT INTO users SET ?";
  const value = {
    name: req.body.name,
    surname: req.body.surname,
    email : req.body.email,
    password: req.body.password,
  };
  connection.query(query, value, (error, results, fields) => {
    if (error){ 
      throw error
    };
    console.log("Résultat de l'insert", results);
    res.sendStatus(200);
  });
});

app.get("/user_exist", (req, res) => {
  const query = "SELECT * from users WHERE email = ?";
  connection.query(query, req.query.email, (error, results, fields) => {
    if (error){ 
      throw error
    };
    console.log("Résultat", results);
    res.json(results);
  });
});

app.put("/edit_cat", (req, res) => {
  const query = "UPDATE cats SET ? WHERE id_cat = ?";
  console.log(req.body);
  const value = {
    race: req.body.data.race,
    color: req.body.data.color,
    life: req.body.data.life,
    origin: req.body.data.origin,
    stat: req.body.data.stat,
    img: req.body.data.img,
  };
  connection.query(query, [value,req.body.data.id], (error, results, fields) => {
    if (error){ 
      throw error
    };
    console.log("Résultat", results);
    res.json(results);
  });
});

app.get("/login", (req, res) => {
  const query = "SELECT * from users WHERE email = ? AND password = ?";
  connection.query(query, [req.query.email, req.query.password], (error, results, fields) => {
    if (error){ 
      throw error
    };
    console.log("Résultat", results);
    res.json(results);
  });
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Listening at ${process.env.PORT}`);
});
