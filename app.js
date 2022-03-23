const express = require("express");
//const bodyParser = require("body-parser");
const app = express();
var cors = require("cors");
const mysql = require("mysql");
const port = process.env.PORT || 7000;
app.use(cors());
/*----parse application/json-*/
//app.use(bodyParser.json());

/*-DB Connection--*/
const conn = mysql.createConnection({
  host: "db4free.net",
  user: "dzvapatsva" /* MySQL User */,
  password: "Tendai2011!" /* MySQL Password */,
  database: "personalblog2022" /* MySQL Database */,
});

/*----Shows Mysql Connect--*/
conn.connect((err) => {
  if (err) throw err;
  console.log("Connection to the database working");
});

/**
 * Get All Items
 *
 * @return response()
 */
app.get("/mybeers/items", (req, res) => {
  let sqlQuery = "SELECT * FROM beers";

  let sel_result = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

/**
 * Get Single Item
 *
 * @return response()
 */
app.get("/mybeers/items/:id", (req, res) => {
  let sqlQuery = "SELECT * FROM beers WHERE id=" + req.params.id;

  let sel_result = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(/*apiResponse*/ results);
  });
});

/**
 * Create New Item
 *
 * @return response()
 */
app.post("/mybeers/items", (req, res) => {
  let data = { title: req.body.title, body: req.body.body };

  let sqlQuery = "INSERT INTO beers SET ?";

  let insert_result = conn.query(sqlQuery, data, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * Update Item
 *
 * @return response()
 */
app.put("/mybeers/items/:id", (req, res) => {
  let sqlQuery =
    "UPDATE beers SET title='" +
    req.body.title +
    "', body='" +
    req.body.body +
    "' WHERE id=" +
    req.params.id;

  let update_result = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * Delete Item
 *
 * @return response()
 */
app.delete("/mybeers/items/delete/:id", (req, res) => {
  let sqlQuery = "DELETE FROM beers WHERE id=" + req.params.id + "";

  let del_result = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results) {
  return JSON.stringify({ status: 200, error: null, response: results });
}

/*-----Server listening----------------------------*/
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
