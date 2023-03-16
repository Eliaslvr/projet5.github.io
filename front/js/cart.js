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
                if (e.target.value >= 1 && e.target.value <= 100){
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


let form = document.querySelector(".cart__order__form");

 /////PRENOM/////
form.firstName.addEventListener('input', function() {
  let RegExpFirstName = new RegExp('^[A-Z][A-Za-z\é\è\ê\-]+$', 'g');

  let prenom = form.firstName.value;
  console.log(prenom);

  if(RegExpFirstName.test(prenom)) {
    document.getElementById('firstNameErrorMsg').innerHTML = "Prénom Validé";
    //firstName.style.background = "green";
  } else if (prenom == null){
    document.getElementById('firstNameErrorMsg').innerHTML = "";
  } else if (RegExpFirstName.test(prenom) == false) {
    document.getElementById('firstNameErrorMsg').innerHTML = "Prénom Non Validé";
  }
});

form.lastName.addEventListener('input', function() {
  // let RegExpLastName = new RegExp('^[A-Z][A-Za-z\é\è\ê\-]+$', 'g');
  let RegExpLastName = new RegExp('^[a-zA-Z ]+$', 'g');

  let nom = form.lastName.value;

  if(RegExpLastName.test(nom)) {
    document.getElementById('lastNameErrorMsg').innerHTML = "Nom Validé";
  } else {
    document.getElementById('lastNameErrorMsg').innerHTML = "Nom Non Validé"
  }
});

form.address.addEventListener('input', function() {
  // let RegExpAddress = new RegExp('/^[A-Za-z0-9]{5,50}$/', 'g');
  let RegExpAddress = new RegExp('[A-Za-z0-9$]$');

  let adresse = form.address.value;

  if(RegExpAddress.test(adresse)) {
    document.getElementById('addressErrorMsg').innerHTML = "Adresse Validé";
  } else {
    document.getElementById('addressErrorMsg').innerHTML = "Adresse Non Validé"
  }
});

form.city.addEventListener('input', function() {
  // let RegExpCity = new RegExp('/^[A-Za-z0-9]{5,50}$/', 'g');
  let RegExpCity = new RegExp(`[A-Za-z]`, 'g');

  let city = form.city.value;

  if(RegExpCity.test(city)) {
    document.getElementById('cityErrorMsg').innerHTML = "Ville Validé";
  } else {
    document.getElementById('cityErrorMsg').innerHTML = "Ville Non Validé"
  }
});

form.email.addEventListener('input', function() {
  let RegExpEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

  let email = form.email.value;

  if(RegExpEmail.test(email)) {
    document.getElementById('emailErrorMsg').innerHTML = "Email Validé";
    let emailcolor = document.getElementById('email')
    //emailcolor.removeAttr("style")
    //emailcolor.style.background = "green";
  } else {
    document.getElementById('emailErrorMsg').innerHTML = "Email Non Validé"
    //emailcolor.removeAttr("style")
    //emailcolor.style.background = "red";
  }
});

// form.lastName.addEventListener('input', function() {
//   validEmail(this);
// });

// const validLastName = function(inputEmail) {
//   //Creation de la reg pour validation email
//   let emailRegExp = new RegExp(
//     '^[A-Z][A-Za-z\é\è\ê\-]+$', 'g'
//     );

//     //Recuperation de la base SMALL
//     let small = inputEmail.nextElementSibling; //Attrappe l'element qui suit

//     //On test l'expression reguliere
//     if(emailRegExp.test(inputEmail.value) == true){
//       small.innerHTML = "Adresse Valide";
//       // small.classList.remove('text-danger');//remove signifie retiré cette classe si elle est présente
//       // small.classList.add('text-success');
//     } else {
//       small.innerHTML = "Adresse Non Valide";
//       //document.getElementById('email').style.background = "red"
//       // small.classList.remove('text-success');
//       // small.classList.add('text-danger');
//     }
// };

// form.email.addEventListener('change', function() {
//   validEmail(this);
// });

// const validEmail = function(inputEmail) {
//   //Creation de la reg pour validation email
//   let emailRegExp = new RegExp(
//     '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
//     );

//     //Recuperation de la base SMALL
//     let small = inputEmail.nextElementSibling; //Attrappe l'element qui suit

//     //On test l'expression reguliere
//     if(emailRegExp.test(inputEmail.value) == true){
//       small.innerHTML = "Adresse Valide";
//       // small.classList.remove('text-danger');//remove signifie retiré cette classe si elle est présente
//       // small.classList.add('text-success');
//     } else {
//       small.innerHTML = "Adresse Non Valide";
//       //document.getElementById('email').style.background = "red"
//       // small.classList.remove('text-success');
//       // small.classList.add('text-danger');
//     }
// };



// let cartOrder = document.querySelector('.cart__order__form');

// cartOrder.addEventListener('input', function(e) {

//   let name = document.getElementById('lastName');
//   let regex = /^[a-zA-Z\s]+$/;

//   if (name.value == "") {
//     let error = document.getElementById('firstNameErrorMsg');
//     error.innerHTML = "Le champ est requis";
//     error.style.color = "red";
//     name.style.background = "red";
//     e.preventDefault();
//   } else if (regex.test(name.value) == false) {
//     let error = document.getElementById('firstNameErrorMsg');
//     error.innerHTML = "Le champ doit comporter des lettres uniquement";
//     error.style.color = "red";
//     name.style.background = "red";
//     e.preventDefault();
//   }
// })

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
