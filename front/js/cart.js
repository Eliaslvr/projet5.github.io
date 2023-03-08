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
  getLocalStorageCart.forEach((element) => { 
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
                                              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantite}"  dataId="${element.id}"  dataColor="${element.couleur}">
                                            </div>
                                            <div class="cart__item__content__settings__delete">
                                              <p class="deleteItem" dataId="${element.id}"  dataColor="${element.couleur}">Supprimer</p>
                                            </div>
                                          </div>
                                        </div>
                                      </article> `
                              //////////////SUPPRESSION///////////////
          Array.from(document.getElementsByClassName("deleteItem")).forEach(element => {//convertir tableau document.getElement.....
            element.addEventListener("click", (e) => {
              const id = element.getAttribute('dataId');
              const color = element.getAttribute('dataColor');
              const local = localStorage.getItem("obj");
              const products = JSON.parse(local);
              console.log(id);
              console.log(color);
              const produitFind = products.findIndex(element => element.id === id && element.couleur === color); 
              console.log(produitFind);
              products.splice(produitFind, 1);
              localStorage.setItem("obj", JSON.stringify(products));
              location.reload();
            })
          });

                               //////////////AJOUT LOCAL STORAGE//////////////
            const quantiy = Array.from(document.getElementsByClassName("itemQuantity"));
            quantiy.forEach((element, i) => {
              element.addEventListener("input", (e) => { //input se declanche quand la valeur a été modifier
                const id = element.getAttribute('dataId');
                const color = element.getAttribute('dataColor');
                const local = localStorage.getItem("obj");
                const products = JSON.parse(local);
                const produitFind = products.find(element => element.id === id && element.couleur === color); 
                console.log(produitFind);
                produitFind.quantite = e.target.value;//target renvoie l'élément sur lequel l'événement s'est produit
                localStorage.setItem("obj", JSON.stringify(products));
              })
            });
                          ////////////QUANTITE FINAL///////////
            let totalQuantity = [];

              for (let i = 0; i < getLocalStorageCart.length; i++) {
                let quantiyAccum = getLocalStorageCart[i].quantite;
                parseQuantite = parseInt(quantiyAccum)
                totalQuantity.push(parseQuantite);

                const quantityFinal = totalQuantity.reduce(
                  (accumulator, currentValue) => accumulator + currentValue
                );

            

                //const getPrice = document.getElementById('totalPrice');
                const getQuantity = document.getElementById('totalQuantity');
    
                //getPrice.textContent = "1"
                getQuantity.textContent = quantityFinal;
              }
                         //////////////PRIX FINAL/////////////////////
            let totalPrice = [];

            for (let i in jsonAffiche) {
              //console.log(jsonAffiche[i]);
              let priceAccum = jsonAffiche.price;
              console.log(priceAccum);
              totalPrice.push(priceAccum);
              console.log(totalPrice);

              // const priceFinal = totalPrice.reduce(
              //   (accumulator, currentValue) => accumulator + currentValue
              // );
              // console.log(priceFinal);
            }
            // let totalPrice = [];
            // const abc = jsonAffiche;
              
            //   for (let i = 0; i < jsonAffiche.length; i++) {
            //     // let priceAccum = jsonAffiche[i].price;
            //     // console.log(jsonAffiche);
            //     // console.log(priceAccum);
            //     // parsePrice = parseInt(PriceAccum)
            //     // totalPrice.push(parsePrice);

            //     // const priceFinal = totalPrice.reduce(
            //     //   (accumulator, currentValue) => accumulator + currentValue
            //     // );

            

            //     // const getPrice = document.getElementById('totalPrice');
            //     // const getQuantity = document.getElementById('totalQuantity');
    
            //     // getPrice.textContent = "1"
            //     // getQuantity.textContent = quantityFinal;
            //   }
      })
  }
  )
  // const getPrice = document.getElementById('totalPrice');
  // const getQuantity = document.getElementById('totalQuantity');
  // console.log(getLocalStorageCart);
  // console.log(getPrice);
  // console.log(getQuantity);

  //  let totalQuantity = [];

  //  for (let i = 0; i < getLocalStorageCart.length; i++) {
  //   let totalQuantityPanier = getLocalStorageCart[i].quantite;

  //   totalQuantity.push(totalQuantityPanier)
  //   console.log(totalQuantity);

  //   const calcul = (accumulator, currentValue) => accumulator + currentValue;
  //   const quantityFinal = totalQuantity.reduce(calcul);

  //   console.log(quantityFinal);
  //  }
  /*let totalQuantity = [];

  for (let i = 0; i < getLocalStorageCart.length; i++) {
    let quantiyAccum = getLocalStorageCart[i].quantite;
    totalQuantity.push(quantiyAccum);
    console.log(totalQuantity);

    // const quantityFinal = totalQuantity.reduce(
    //   (accumulator, currentValue) => accumulator + currentValue
    // );
    // console.log(quantityFinal);
  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  console.log(reducer);
  console.log(totalQuantity.reduce(reducer));*/

   
   
    // getLocalStorageCart.forEach(element => {
    //   console.log(element.quantite)
    //   let totalQuant = [element.quantite]
    //   let totalQuantity = 0;
    //   for (let i = 0; i < totalQuant.length; i++) {
    //     totalQuantity += totalQuant[i];
    //   }
    //   console.log(totalQuantity);

    // });

  //getPrice.innerHTML = `<p>Total (<span id="totalQuantity"> ${element.quantite} </span> articles) : <span id="totalPrice"> ${element.quantite * jsonAffiche.price} </span> €</p>`
  // getPrice.textContent = "1"
  // getQuantity.textContent = "1"
  
}
// let totalQuantity = [];

//   for (let i = 0; i < getLocalStorageCart.length; i++) {
//     let quantiyAccum = getLocalStorageCart[i].quantite;
//     parseQuantite = parseInt(quantiyAccum)
//     //console.log(quantiyAccum);
//     totalQuantity.push(parseQuantite);
//     console.log(totalQuantity);
//     console.log(parseQuantite);

//     const quantityFinal = totalQuantity.reduce(
//       (accumulator, currentValue) => accumulator + currentValue
//     );
//     console.log(quantityFinal);
//   }



// function validation()
// {
// var expressionReguliere = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
// if (expressionReguliere.test(document.getElementById(email).value))
// {
// document.getElementById(email).innerHTML = `L'adresse mail est valide`;
// document.getElementById(email).style.color = green;
// }
// else
// {
// document.getElementById(email).innerHTML = `L'adresse mail n'est pas valide`;
// document.getElementById(email).style.color = red;
// }
// return false;
// }