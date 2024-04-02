const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const sqlite3 = require('sqlite3');
const axios = require('axios');
const csv = require('csv-parser');
const fs = require('fs');

app.get('/', (req, res) => {
    res.send('Hello Simplon!');
});

const db = new sqlite3.Database('./db.sqlite');

// create tables
db.serialize(function() {
  db.run(`CREATE TABLE magasin (
    "ID Magasin" INTEGER PRIMARY KEY,
    Ville TEXT,
    "Nombre de salariés" INTEGER 
  )`);

  db.run(`CREATE TABLE produit (
    Nom TEXT,
    "ID Référence produit" TEXT PRIMARY KEY,
    Prix REAL,
    Stock INTEGER
  )`);

  db.run(`CREATE TABLE vente (
    Date TEXT,
    "ID Référence produit" TEXT,
    Quantité INTEGER,
    "ID Magasin" INTEGER,
    FOREIGN KEY("ID Magasin") REFERENCES magasin("ID Magasin"),
    FOREIGN KEY("ID Référence produit") REFERENCES produit("ID Référence produit")
  )`);
});

// import data
const produitUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSawI56WBC64foMT9pKCiY594fBZk9Lyj8_bxfgmq-8ck_jw1Z49qDeMatCWqBxehEVoM6U1zdYx73V/pub?gid=0&single=true&output=csv';
const magasinUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSawI56WBC64foMT9pKCiY594fBZk9Lyj8_bxfgmq-8ck_jw1Z49qDeMatCWqBxehEVoM6U1zdYx73V/pub?gid=714623615&single=true&output=csv';
const venteUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSawI56WBC64foMT9pKCiY594fBZk9Lyj8_bxfgmq-8ck_jw1Z49qDeMatCWqBxehEVoM6U1zdYx73V/pub?gid=760830694&single=true&output=csv';


//insérer les données dans les tables créées
axios.get(magasinUrl)
    .then(response => { 
      fs.writeFileSync('temp.csv', response.data);
      fs.createReadStream('temp.csv')
        .pipe(csv())
        .on('data', (row) => {
          db.run(`INSERT INTO magasin ("ID Magasin", Ville, "Nombre de salariés") VALUES (?, ?, ?)`, [row["ID Magasin"], row.Ville, row["Nombre de salariés"]]);
        })
        .on('end', () => {
          console.log(`Données importées correctement dans la table magasin`);
          fs.unlinkSync('temp.csv');
        })
    });

axios.get(produitUrl)
    .then(response => { 
      fs.writeFileSync('temp.csv', response.data);
      fs.createReadStream('temp.csv')
        .pipe(csv())
        .on('data', (row) => {
          db.run(`INSERT INTO produit (Nom, "ID Référence produit", Prix, Stock) VALUES (?, ?, ?, ?)`, [row.Nom, row["ID Référence produit"], row.Prix, row.Stock]);
        })
        .on('end', () => {
          console.log(`Données importées correctement dans la table produit`);
          fs.unlinkSync('temp.csv');
        })
    });

axios.get(venteUrl)
    .then(response => { 
      fs.writeFileSync('temp.csv', response.data);
      fs.createReadStream('temp.csv')
        .pipe(csv())
        .on('data', (row) => {
          db.run(`INSERT INTO vente (Date, "ID Référence produit", Quantité, "ID Magasin") VALUES (?, ?, ?, ?)`, [row.Date, row["ID Référence produit"], row.Quantité, row["ID Magasin"]]);
        })
        .on('end', () => {
          console.log(`Données importées correctement dans la table vente`);
          fs.unlinkSync('temp.csv');
        })
    });

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

