/*const articlId = getArticleId()
const articl = getArticle(articlId)

function getArticleId() {
  return new URL(location.href).searchParams.get("id")
}

function getArticle() {
  return fetch(`http://localhost:3000/api/products/${articlId}`) 
    .then( data => data.json()) 
    .then(jsonListArticle => {
      for(let article of jsonListArticle) {
        document.getElementById("cart__items").innerHTML += `<article class="cart__item" data-id="${article._id}" data-color="{product-color}">
        <div class="cart__item__img"><img src="${article.imageUrl}" alt="${article.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${article.name}</h2>
            <p>Vert</p>
            <p>42,00 €</p>
          </div>`;
      }
      console.log(jsonListArticle)
    })
  }*/

