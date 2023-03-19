const express = require('express');
const app = express();
const sql = require('mssql');
const cors = require('cors');
const fs = require('fs');
app.use(cors());

const sqlConfig = {
  user: 'sa',
  password: '2002',
  database: 'Aq28',
  server: 'ONYX',
  options: {
    instanceName: 'SQLEXPRESS',
    trustServerCertificate: true,
  },
};

async function run() {
  console.log('App running');
  try {
    console.log('Connecting to config: \n', sqlConfig);
    await sql.connect(sqlConfig);
    console.log('Connected!');
    //  const insert = "Create new  dbo." + "account" + "(" + "Number" + ") VALUES (" + "'1001'" + ")";
    const insert = 'select * from INFORMATION_SCHEMA.COLUMNS';
    const result = await sql.query(insert);
    let obj = [];
    for (let i in result.recordset) {
      if (result.recordset[i].COLUMN_NAME == 'CostGuid') {
        if (!(result.recordset[i].TABLE_NAME in obj)) {
          obj.push(result.recordset[i].TABLE_NAME);
        }
      }
    }
    console.dir(obj);
  } catch (err) {
    console.log(err);
  }
}

app.listen(3001, () => {
  run();
});
