const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const sqlite3 = require('sqlite3');

app.get('/', (req, res) => {
    res.send('Hello Simplon!');
});

const db = new sqlite3.Database('main.db');

db.serialize(function() {
  db.run(`CREATE TABLE magasin (
    Magasin_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    Ville TEXT,
    Nb_salarie INTEGER 
  )`);

  db.run(`CREATE TABLE produit (
    Produit_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    Nom TEXT,
    Prix FLOAT,
    Stock INTEGER
  )`);

  db.run(`CREATE TABLE vendre (
    Vente_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    Date TEXT,
    Magasin_id INTEGER,
    Produit_id INTEGER,
    Quantite INTEGER,
    FOREIGN KEY(Magasin_id) REFERENCES magasin(Magasin_id),
    FOREIGN KEY(Produit_id) REFERENCES produit(Produit_id)

  )`)
});

const importData = (async() => {
  try {
    const produitUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSawI56WBC64foMT9pKCiY594fBZk9Lyj8_bxfgmq-8ck_jw1Z49qDeMatCWqBxehEVoM6U1zdYx73V/pub?gid=0&single=true&output=csv';
    const magasinUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSawI56WBC64foMT9pKCiY594fBZk9Lyj8_bxfgmq-8ck_jw1Z49qDeMatCWqBxehEVoM6U1zdYx73V/pub?gid=714623615&single=true&output=csv';
    const venteUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSawI56WBC64foMT9pKCiY594fBZk9Lyj8_bxfgmq-8ck_jw1Z49qDeMatCWqBxehEVoM6U1zdYx73V/pub?gid=760830694&single=true&output=csv';

    const produitData = await fetchAllProduits(produitUrl);
    const magasinData = await fetchAllMagasins(magasinUrl);
    const
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

