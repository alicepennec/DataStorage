const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello Simplon!');
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

/* const sqlite3 = require('sqlite3');
const dbname = 'main.db'

let db = new sqlite3.Database(dbname, err => {
  if(err)
    throw err
  console.log('Database stated on ' + dbname)

}) */
