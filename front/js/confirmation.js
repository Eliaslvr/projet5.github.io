let numeroCommande = new URLSearchParams(document.location.search).get("commande");
document.getElementById('orderId').innerHTML = numeroCommande;
