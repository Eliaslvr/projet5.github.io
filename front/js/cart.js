const getLocalStorageCart = JSON.parse(localStorage.getItem('obj'));
const afficheElement = document.querySelector('#cart__items')

if (!getLocalStorageCart) {
  const panierVide = `
    <div id="cart__items">
        <div>Le panier est vide</div>
    </div>
    `
    afficheElement.innerHTML = panierVide
  } else {
    getLocalStorageCart.forEach(element => {
      function fetchCart() {
        return fetch(`http://localhost:3000/api/products/${element.id}`) 
        .then(data => data.json())
        .then(json => console.log(json))
       }
       const fetchAffiche = fetchCart;
       console.log(element.id);

       const afficheElement = document.querySelector('#cart__items')

       /*const cartAjout = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                            <div class="cart__item__img">
                              <!--<img src= alt=>-->
                            </div>
                            <div class="cart__item__content">
                              <div class="cart__item__content__description">
                                <h2>${fetchAffiche.name}</h2>
                                <p>${element.couleurs}</p>
                                <p>.price} €</p>
                              </div>
                              <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                  <p>Qté : ${element.quantité}</p>
                                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                  <p class="deleteItem">Supprimer</p>
                                </div>
                              </div>
                            </div>
                          </article> `
      afficheElement.innerHTML += cartAjout*/

    });
  }