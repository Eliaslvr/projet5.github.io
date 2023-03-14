getTotalPrice();
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
                                            <p>${jsonAffiche.price} €</p>
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
            quantiy.forEach((element) => {
              element.addEventListener("input", (e) => { //input se declanche quand la valeur a été modifier 
                const id = element.getAttribute('dataId');
                const color = element.getAttribute('dataColor');
                const local = localStorage.getItem("obj");
                const products = JSON.parse(local);
                const produitFind = products.find(element => element.id === id && element.couleur === color); 
                if (e.target.value >= 1 && e.target.value<= 100){
                  produitFind.quantite = e.target.value;//target renvoie l'élément sur lequel l'événement s'est produit 
                } else {
                  alert("Saisir une quantité compris entre 1 et 100")
                  produitFind.quantite = 1;//On affecte 1 pour rénitialiser 
                  e.target.value = 1;
                }    
                localStorage.setItem("obj", JSON.stringify(products));
                getTotalPrice();       
              })
            });             
      })
  }
  )
}
                       //////////////QUANTITE ET PRIX FINAL////////////////////
function getTotalPrice() {
  const getLocalStorageCart = JSON.parse(localStorage.getItem('obj'));
  let sommeTotal = 0;
  let quantiyTotal = 0;
  getLocalStorageCart.forEach(element => {
    fetch(`http://localhost:3000/api/products/${element.id}`)
    .then(data => data.json())
    .then(jsonAffiche => {
      quantiyTotal += parseInt(element.quantite);
      sommeTotal += jsonAffiche.price*element.quantite;
      document.getElementById("totalPrice").textContent = sommeTotal;
      document.getElementById("totalQuantity").textContent = quantiyTotal;
        } 
        )
    });
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

//'.cart__order__form'
// document.querySelector('.cart__order__form').addEventListener("input", function(e) {
//   e.preventDefault();

//   let firstName = document.getElementById('firstName').value;
//   let lastName = document.getElementById('lastName').value;
//   let address = document.getElementById('address').value;
//   let city = document.getElementById('city').value;
//   let email = document.getElementById('email').value;
//   //let commander = document.getElementById('order').value;
  
//   const obj = {
//     firstName,
//     lastName,
//     address,
//     city,
//     email,
//   }
//   console.log(obj);

//   function isNumber(num) {
//     return (num.length > 0 && !isNaN(num))
//   }


  // if (firstName!=null) {
  //   document.getElementById('firstName').style.background ='rgb(0,128,0)'
  //   document.getElementById('firstNameErrorMsg').textContent = '';
  // } else {
  //   document.getElementById('firstNameErrorMsg').innerHTML = `Prénom invalide`;
  //   document.getElementById('firstName').style.background = 'rgb(255,0,0)';
  // }

  // fetch('http://localhost:3000/api/products/oder', {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json;charset=utf-8'
  //   },
  //   body: JSON.stringify(obj)
  // })
//})
