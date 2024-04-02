import db from './db.sqlite'

// Requête pour obtenir le chiffre d'affaires total
db.get('SELECT SUM(vente.Quantité * produit.Prix) AS chiffre_affaires FROM vente JOIN produit ON vente."ID Référence produit" = produit."ID Référence produit"')

// Requête pour obtenir les ventes par produit
db.get('SELECT produit.Nom, SUM(vente.Quantité) AS total_ventes_produit FROM vente JOIN produit ON vente."ID Référence produit" = produit."ID Référence produit" GROUP BY produit."ID Référence produit"')

// Requête pour obtenir les ventes par région
db.get('SELECT magasin.Ville, SUM(vente.Quantité) AS total_ventes_region FROM vente JOIN magasin ON vente."ID Magasin" = magasin."ID Magasin" GROUP BY magasin.Ville')
