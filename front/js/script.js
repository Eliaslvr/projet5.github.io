fetch("http://localhost:3000/api/products/") 
    .then(function (reponse) {
        return reponse.json()
    })
    .then(function (afficheKanap) {
        console.log(afficheKanap);
    Kanap(afficheKanap);
    })
    .catch(function (error) {
        console.log(error)
    })


function Kanap(affiche) {
    let articles = document.getElementById("items");
    for (let article of affiche) {
        articles.innerHTML += `<a href="./product.html?id=${article._id}">
        <article>
          <img src="${article.imageUrl}" alt="${article.altTxt}">
          <h3 class="productName">${article.name}</h3>
          <p class="productDescription">${article.description}</p>
        </article>
      </a> `;
    }
}


