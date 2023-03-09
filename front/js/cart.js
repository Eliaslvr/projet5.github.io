const getLocalStorageCart = JSON.parse(localStorage.getItem('obj'));
const afficheElement = document.querySelector('#cart__items');

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

                const getQuantity = document.getElementById('totalQuantity');

                getQuantity.textContent = quantityFinal;
                }
      })
  }
  )
}
                       //////////////PRIX FINAL////////////////////
getLocalStorageCart.forEach(element => {
  fetch(`http://localhost:3000/api/products/${element.id}`)
  .then(data => data.json())
  .then(jsonAffiche => {

    // let totalPrice = [];

      //  for (let i in jsonAffiche) {
      //   const priceJson = jsonAffiche.price
      //    console.log(priceJson);
      //    parsePrice = parseInt(priceJson)
      //   // let priceAccum = i;
      //   // console.log(priceAccum);
      //   // totalPrice.push(priceAccum);
      //   // console.log(totalPrice);
      //  }
      let totalPrice = [];

       if (jsonAffiche) {
        let priceJson = jsonAffiche.price;
        //console.log(priceJson);
        //parsePrice = parseInt(priceJson);
        //console.log(parsePrice);
        totalPrice.push(priceJson);
        console.log(totalPrice);

        const priceFinal = totalPrice.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        );

        const getPrice = document.getElementById('totalPrice');
    
        getPrice.textContent = priceFinal
       }
  });
})


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


