const getLocalStorageCart = JSON.parse(localStorage.getItem('obj'));
const afficheElement = document.querySelector('#cart__items');

// function removeItem() {
//   console.log("Item test");
// }

if (!getLocalStorageCart) {
  const panierVide = `
    <div id="cart__items">
        <div>Le panier est vide</div>
    </div>
    `
  afficheElement.innerHTML = panierVide
} else {
  getLocalStorageCart.forEach((element, index) => { // index représente la position de l'élément dans le tableau
    fetch(`http://localhost:3000/api/products/${element.id}`)
      .then(data => data.json())
      .then(jsonAffiche => {
        const afficheElement = document.querySelector('#cart__items');
        afficheElement.innerHTML += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                                        <div class="cart__item__img">
                                          <img src=${jsonAffiche.imageUrl} alt=${jsonAffiche.altTxt}>
                                        </div>
                                        <div class="cart__item__content">
                                          <div class="cart__item__content__description">
                                            <h2>${jsonAffiche.name}</h2>
                                            <p>${element.couleur}</p>
                                            <p>${jsonAffiche.price * element.quantite} €</p>
                                          </div>
                                          <div class="cart__item__content__settings">
                                            <div class="cart__item__content__settings__quantity">
                                              <p>Qté :</p>
                                              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantite}">
                                            </div>
                                            <div id="cart_delete_item-${index}" class="cart__item__content__settings__delete">
                                              <p id="delete_item-${index}" class="deleteItem">Supprimer</p>
                                            </div>
                                          </div>
                                        </div>
                                      </article> `
      })
      .then(() => {
        Array.from(document.getElementsByClassName("deleteItem")).forEach(element => {//convertir tableau document.getElement.....
          element.addEventListener("click", (e) => {
            const local = localStorage.getItem("obj");
            const products = JSON.parse(local);
            products.splice(index, 1);
            localStorage.setItem("obj", JSON.stringify(products));
            location.reload();
          })
        });
      })

    .then(() => {
      const quantiy = Array.from(document.getElementsByClassName("itemQuantity"));
      quantiy.forEach((element, i) => {
        element.addEventListener("input", (e) => {
          const local = localStorage.getItem("obj");
          const products = JSON.parse(local);
          products[i - 1].quantite = e.target.value; //-1 car js compte a partir de 1 pour que ca commence a partir de 0
          localStorage.setItem("obj", JSON.stringify(products));
        })
        
      });
    })
  }
  )
}