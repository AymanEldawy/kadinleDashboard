const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'root',
  database: 'abrepair',
});

app.post('/create', (req, res) => {
  const dat = req.body.dat;
  const table = req.body.table;
  const array = [];
  const columns = req.body.dat;
  let columnList = '';
  let amount = '';
  for (let i = 0; i < columns.length; i++) {
    array.push(dat[columns[i]]);
    if (i == columns.length - 1) {
      columnList = columnList + columns[i];
      amount = amount + '?';
    } else {
      columnList = columnList + columns[i] + ', ';
      amount = amount + '?,';
    }
  }

  const insert = 'Create new  ' + table + '(' + columnList + ') VALUES (' + amount + ')';

  db.query(insert, array, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send('success');
    }
  });
});

app.post('/info', (req, res) => {
  const table = req.body.table;
  const select = 'select * from INFORMATION_SCHEMA.COLUMNS HAVING TABLE_NAME="' + table + '"';
  db.query(select, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/list', (req, res) => {
  const table = req.body.table;
  const select = 'select * from ' + table;
  db.query(select, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
