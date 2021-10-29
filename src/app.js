const express = require("express");
const bodyParser = require("body-parser");
const visitors = require("./dataSample");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});

pool.connect(function (err) {
  if (err) console.log(err + " Ooops");
  else console.log("Server Connected!");
});

app.get("/", (_, res) => {
  res.send("Connected");
});
const createTable = () => {
  pool.query(
    "CREATE TABLE Visitors ( id SERIAL PRIMARY KEY, name VARCHAR(50), age INT, date  DATE, time TIME, assistor VARCHAR(50), comments VARCHAR(100))",
    (error, respond) => {
      console.log(error, respond);
    }
  );
};

app.get("/viewVisitors", (_, res) => {
  createTable();
  pool.query("SELECT DISTINCT ID, Name FROM Visitors", (error, respond) => {
    console.log(error, respond);
  });
});

app.get("/viewVisitor:id", (req, res) => {
  pool.query("SELECT * FROM Visitors WHERE id = ${id}", (error, respond) => {
    console.log(error, respond);
  });
});

app.post("/addNewVisitor", (req, res) => {
  pool.query(
    `INSERT INTO Visitors(name, age, date, time, assistor, comments) VALUES ($1, $2, $3, $4, $5, $6)`,
    [data.name, data.age, data.date, data.time, data.assistor, data.comments],
    (error, respond) => {
      console.log(error, respond);
    }
  );

});

app.delete("/deleteVisitor:id", (req, res) => {
  pool.query(`DELETE FROM Visitors WHERE id = ${id}`, (error, respond) => {
    console.log(error, respond);
  });
});

app.delete("/deleteAllVisitors", (req, res) => {
  pool.query(`DELETE FROM Visitors`, (error, respond) => {
    console.log(error, respond);
  });
});

app.put("/updateVisitor:id", (req, res) => {
  pool.query(
    "UPDATE Visitors SET name=($1), age=($2), date=($3), time=($4), assistor=($5), comments=($6) WHERE id=($7)",
    [
      data.name,
      data.age,
      data.date,
      data.time,
      data.assistant,
      data.comments,
      data.id,
    ],
    (error, results) => {
      console.log(error, results);
    }
  );
});

app.listen(port, () => {
  console.log("server is running");
});