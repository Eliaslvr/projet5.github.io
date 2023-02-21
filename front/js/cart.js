const getLocalStorageCart = JSON.parse(localStorage.getItem('obj'));
const afficheElement = document.querySelector('#cart__items');

function removeItem() {
  console.log("Item test");
}

if (!getLocalStorageCart) {
  const panierVide = `
    <div id="cart__items">
        <div>Le panier est vide</div>
    </div>
    `
    afficheElement.innerHTML = panierVide
  } else {
    getLocalStorageCart.forEach((element, index) => {
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
                                              <button id="delete-item-${index}" class="deleteItem">Supprimer</button>
                                            </div>
                                          </div>
                                        </div>
                                      </article> `
                                      console.log(index)

                                      const deleteButton = document.createElement("button");
                                      deleteButton.addEventListener("click", function() {
                                        console.log(`delete-item-${index}`);
                                      });

                                      document.getElementById(`cart_delete_item-${index}`).appendChild(deleteButton)

                                    //   window.addEventListener('load',function(){    document.getElementById(`delete-item-${index}`).addEventListener("click", function() {
                                    //     console.log(`delete-item-${index}`);
                                    //     debugger;
                                    //   });
                                    // });
                                      
                                    //   document.getElementById(`delete-item-${index}`).addEventListener("click", function() {
                                    //     console.log(`delete-item-${index}`);
                                    //     debugger;
                                    //   });
        })
      }
    )
    console.log('end')
}

                                      window.addEventListener('load',function(){    
   
                                    });


                                    console.log('test');
                                    Array.from(document.getElementsByClassName("deleteItem")).forEach(element => {
                                      console.log(element);
                                      element.addEventListener("click", function() {
                                            console.log(`wsh`);
                                          });
                                    });
                                    console.log('test end');

  
// const x = afficheElement;
// const y = x.document.getElementsByClassName("cart__item");
// console.log(y);

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


// boutton = document.querySelector(".deleteItem");

// getLocalStorageCart.forEach(element => {
//   boutton.addEventListener("click" , (e) => {
//     alert('alerte')
//   })
// })
//  const yy = document.querySelector('#cart__items  .cart__item  .cart__item__content .cart__item__content__settings .cart__item__content__settings__delete .deleteItem')
// const yy = document.querySelector('#cart__items .cart__item .cart__item__content .cart__item__content__settings .cart__item__content__settings__delete .deleteItem')
//  yy.addEventListener('click' , (e) => {
//   alert('alerte')
//  })
// const uu = document.querySelector('.cart__item');
// uu.addEventListener('click' , (e) => {
//     alert('alerte')
//    })

// console.log (uu)
// console.log(yy);
// console.log(boutton);




