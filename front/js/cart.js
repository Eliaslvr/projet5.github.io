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
      async function fetchCart() {
        await fetch(`http://localhost:3000/api/products/${element.id}`) 
        .then(data => data.json())
        .then(jsonAffiche => {
          console.log(jsonAffiche)
          element;
          console.log(element);
          const afficheElement = document.querySelector('#cart__items')
          afficheElement.innerHTML += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                                        <div class="cart__item__img">
                                          <img src=${jsonAffiche.imageUrl} alt=${jsonAffiche.altTxt}>
                                        </div>
                                        <div class="cart__item__content">
                                          <div class="cart__item__content__description">
                                            <h2>${jsonAffiche.name}</h2>
                                            <p>${element.couleur}</p>
                                            <p>${jsonAffiche.price} €</p>
                                          </div>
                                          <div class="cart__item__content__settings">
                                            <div class="cart__item__content__settings__quantity">
                                              <p>Qté :</p>
                                              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantite}">
                                            </div>
                                            <div class="cart__item__content__settings__delete">
                                              <p class="deleteItem">Supprimer</p>
                                            </div>
                                          </div>
                                        </div>
                                      </article> `
        })
      }
       let aa = fetchCart();

       const afficheElement = document.querySelector('#cart__items');

       /*const cartAjout = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                            <div class="cart__item__img">
                              <!--<img src= alt=>-->
                            </div>
                            <div class="cart__item__content">
                              <div class="cart__item__content__description">
                                <h2>${aa.name}</h2>
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