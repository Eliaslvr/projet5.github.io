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
      fetch(`http://localhost:3000/api/products/${element.id}`) 
        .then(data => data.json())
        .then(jsonAffiche => {
          element;
          const afficheElement = document.querySelector('#cart__items')
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
                                            <div class="cart__item__content__settings__delete">
                                              <p class="deleteItem">Supprimer</p>
                                            </div>
                                          </div>
                                        </div>
                                      </article> `
        })
      }
    )
}
  


// const deleteButton = document.querySelector(".deleteItem");
// const quantityValue = document.querySelector(".itemQuantity");

// getLocalStorageCart.forEach(btn => {
//   deleteButton.addEventListener("change", (e) => {
//     e.preventDefault();//annulation de tout les comportements par defaut
//     //getLocalStorageCart.splice()
//     quantityValue.textContent = this.value;
    
//   })
// })


// getLocalStorageCart;
// const deleteButton = document.querySelector(".deleteItem");
// const touchBoutton = deleteButton.addEventListener("click", (e) => {
//   e.preventDefault();//annulation de tout les comportements par defaut
//   if (touchBoutton) {
//     afficheElement.innerHTML += `<article><article/>`
//     getLocalStorageCart.splice(0)
//   }
// });


// if (touchBoutton) {
//   getLocalStorageCart.splice(0)
// }

const boutton = document.querySelector(".deleteItem");

getLocalStorageCart.findIndex(element => {
    boutton.addEventListener("click", function (event) {
      console.log(event);
    })
  })

console.log(boutton);

  // boutton.addEventListener('click', function (event) {
  //   console.log(event)
  // })


