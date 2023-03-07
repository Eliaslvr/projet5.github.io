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
                                              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantite}"  dataId="${element.id}"  dataColor="${element.couleur}">
                                            </div>
                                            <div class="cart__item__content__settings__delete">
                                              <p class="deleteItem" dataId="${element.id}"  dataColor="${element.couleur}">Supprimer</p>
                                            </div>
                                          </div>
                                        </div>
                                      </article> `
      })
      .then(() => {
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
      })
    .then(() => {
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
    })
  }
  )
}


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