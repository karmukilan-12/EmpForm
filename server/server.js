const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kar@db04',
  database: 'employees',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');
});


app.use(bodyParser.json());

app.use(cors({
    option:['http://localhost:3000']
}))

app.post('/submit-form', (req, res) => {
  const {employeeId, name, department, dob, gender, designation, salary, email, phone_no } = req.body;


  const sql = 'INSERT INTO emp (employeeId, name, department, dob, gender, designation, salary, email, phone_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [employeeId, name, department, dob, gender, designation, salary, email, phone_no], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error occurred while saving data');
    } else {
      console.log('Data inserted:', result);
      res.status(200).send('Data saved successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
