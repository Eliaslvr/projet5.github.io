/*fetch("http://localhost:3000/api/products")
.then(function(res) {
    if(res.ok) {
        return res.json();
    }
})
.then(function(value) {
    console.log(value)
})
.catch(function(err) {
    document.querySelector("body").innerHTML = "<body>erreur 404</body>"
    console.log("erreur " + err);
})
/*
fetch("http://localhost:3000/api/products")
    .then(result => result.json())
    .then(data => console.log(data))
    .then(err => console.log("Erreur 404"))*/

const getUser = async function() {
    let response = await fetch("/api/products")
    if (response.ok) {
        let data = await response.json()
        console.log(data)
    } else {
        console.error("Retour du serveur : ", response.status)
    }
}