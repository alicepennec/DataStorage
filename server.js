const express = require("express");
const app = express();
const sqlite3 = require('sqlite3');
const dbname = 'main.db'

let db = new sqlite3.Database(dbname, err => {
  if(err)
    throw err
  console.log('Database stated on ' + dbname)

})

app.get('/', (req, res) => {
    res.send('<h1>Hello Simplon!</h1>');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});