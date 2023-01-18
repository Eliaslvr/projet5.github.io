let getLocalStorageAffiche = JSON.parse(localStorage.getItem('obj'))

const afficheElement = document.querySelector('#cart__items')

if (getLocalStorageAffiche === null) {
    const panierVide = `
    <div id="cart__items">
        <div>Le panier est vide</div>
    </div>
    `
    afficheElement.innerHTML = panierVide
} else {
    let structureProduitPanier = []

    for(i = 0; i < getLocalStorageAffiche.lenght; i++) {

    structureProduitPanier = structureProduitPanier + `
    <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <!--<img src=${getLocalStorageAffiche[i]} alt=${getLocalStorageAffiche[i]}>-->
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${getLocalStorageAffiche[i]}</h2>
                    <p>${getLocalStorageAffiche[i].couleurs}</p>
                    <p>${getLocalStorageAffiche[i]} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${getLocalStorageAffiche.quantité}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> `
}
    if(i == getLocalStorageAffiche.lenght ) {
        afficheElement.innerHTML = structureProduitPanier;
    }
}