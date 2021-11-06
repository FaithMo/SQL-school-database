const express = require("express");
const bodyParser = require("body-parser");
const pool = require('./config')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

pool.connect((_, err) => {
  if(err){
    throw new Error('Not connected')
  }
  console.log('Connected')
});

app.get("/", () => {
  res.send("Connected"),
  (_, err) => {
    if(err){
        throw new Error('Not connected')
    }}
});
const createTable = () => {
  pool.query(
    "CREATE TABLE Visitors ( id SERIAL PRIMARY KEY, name VARCHAR(50), age INT, date  DATE, time TIME, assistor VARCHAR(50), comments VARCHAR(100))",
    (_, err) => {
      if(err){
          throw new Error('Operation unsuccessful, table was not created')
      }
      console.table(res.rows[0])
  })
}

app.get("/viewVisitors", () => {
  createTable();
  pool.query("SELECT DISTINCT ID, Name FROM Visitors"),(_, err) => {
    if(err){
        throw new Error('Operation unsuccessful, cannot view visitors')
    }
    console.table(res.rows)
    console.log(res.rows)

    }
})

app.get("/viewVisitor:id", () => {
  pool.query("SELECT * FROM Visitors WHERE id = ${id}"), (_, err) => {
    if(err){
        throw new Error('Operation unsuccessful, cannot view visitors')
    }
    console.table(res.rows);
}
});

app.post("/addNewVisitor", () => {
  pool.query(
    `INSERT INTO Visitors(name, age, date, time, assistor, comments) VALUES ($1, $2, $3, $4, $5, $6)`,
    [data.name, data.age, data.date, data.time, data.assistor, data.comments],
    (_, err) => {
      if(err){
          throw new Error('Operation unsuccessful, cannot insert visitors')
      }
      console.table(res.rows);
    }
  )
})

app.delete("/deleteVisitor:id", () => {
  pool.query(`DELETE FROM Visitors WHERE id = ${id}`), (_, err) => {
    if(err){
        throw new Error('Operation unsuccessful, cannot delete visitor')
    }
    console.table(`Deleted: ${res.rows}`);
}
})

app.delete("/deleteAllVisitors", () => {
  pool.query(`DELETE FROM Visitors`), (_, err) => {
    if(err){
        throw new Error('Operation unsuccessful, cannot delete visitors')
    }
    console.table(`Deleted: ${res.rows}`);
}
});

app.put("/updateVisitor:id", () => {
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
    ], (_, err) => {
      if(err){
          throw new Error('Operation unsuccessful, cannot update visitors')
      }
      console.log('Data updated', res.rowCount);
  }
  )
});

app.listen(port, () => {
  console.log("server is running");
});