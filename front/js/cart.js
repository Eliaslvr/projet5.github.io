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
  firstNameError = document.getElementById('firstNameErrorMsg');

  let prenom = form.firstName.value;


  if(RegExpFirstName.test(prenom)) {
    firstNameError.innerHTML = "Prénom Validé";
    firstNameError.style.color = "rgb(25, 230, 29)";
  } else if (RegExpFirstName.test(prenom) == false) {
    firstNameError.innerHTML = "Prénom Non Validé";
    firstNameError.style.color = "red";
  }
   
  if (!prenom){
    firstNameError.innerHTML = "";
  }
});

form.lastName.addEventListener('input', function() {
  // let RegExpLastName = new RegExp('^[A-Z][A-Za-z\é\è\ê\-]+$', 'g');
  let RegExpLastName = new RegExp('^[A-Z]+$', 'g');

  let nom = form.lastName.value;
  const lastNameError = document.getElementById('lastNameErrorMsg');

  if(RegExpLastName.test(nom)) {
    lastNameError.innerHTML = "Nom Validé";
    lastNameError.style.color = "rgb(25, 230, 29)";
  } else {
    lastNameError.innerHTML = "Nom Non Validé"
    lastNameError.style.color = "red";
  }
  if (!nom){
    lastNameError.innerHTML = "";
  }
});

form.address.addEventListener('input', function() {
  // let RegExpAddress = new RegExp('/^[A-Za-z0-9]{5,50}$/', 'g');
  // ^.+
  let RegExpAddress = new RegExp('[A-Za-z0-9$]$');

  let adresse = form.address.value;
  const adressError = document.getElementById('addressErrorMsg');

  if(RegExpAddress.test(adresse)) {
    adressError.innerHTML = "Adresse Validé";
    adressError.style.color = "rgb(25, 230, 29)";
  } else {
    adressError.innerHTML = "Adresse Non Validé";
    adressError.style.color = "red";
  }
  if (!adresse){
    adressError.innerHTML = "";
  }
});

form.city.addEventListener('input', function() {
  // let RegExpCity = new RegExp('/^[A-Za-z0-9]{5,50}$/', 'g');
  // ^[A-Z][a-z]+([\s-][A-Z][a-z]+)*$
  let RegExpCity = new RegExp(`[A-Za-z]`, 'g');

  let city = form.city.value;
  const cityError = document.getElementById('cityErrorMsg');

  if(RegExpCity.test(city)) {
    cityError.innerHTML = "Ville Validé";
    cityError.style.color = "rgb(25, 230, 29)";
  } else {
    cityError.innerHTML = "Ville Non Validé";
    cityError.style.color = "red";
  }
  if (!city){
    cityError.innerHTML = "";
  }
});

form.email.addEventListener('input', function() {
  let RegExpEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

  let email = form.email.value;
  const emailError = document.getElementById('emailErrorMsg');

  if(RegExpEmail.test(email)) {
    emailError.innerHTML = "Email Validé";
    emailError.style.color = "rgb(25, 230, 29)";
  } else {
    emailError.innerHTML = "Email Non Validé"
    emailError.style.color = "red";
  }
  if (!email){
    emailError.innerHTML = "";
  }
});

// form.addEventListener('input', function() {
//     let valeurFormulaire = {
//       firstName: form.firstName.value,
//       lastName: form.lastName.value,
//       adress: form.address.value,
//       city: form.city.value,
//       email: form.email.value
//     }
//     console.log(valeurFormulaire);
//   })


document.getElementById('order').addEventListener("click", (event) => {
  event.preventDefault();
  let valeurForm = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    adress: form.address.value,
    city: form.city.value,
    email: form.email.value
  }
  if (valeurForm.firstName == "" || valeurForm.lastName == "" || valeurForm.adress == "" || valeurForm.city == "" || valeurForm.email == "") {
    alert("Veuillez replir tout le formulaire pour pouvoir validé votre commande")
   } else {
     fetch("https://jsonplaceholder.typicode.com/posts", {
       method: "POST",
       body: JSON.stringify({
         valeurForm
       }),
       headers: {
         "Content-type": "application/json; charset=UTF-8",
       },
     })
     .then((response) => response.json())
     .then((json) => console.log(json));
   }
})

  

// form.addEventListener('input', function(e) {
//   e.preventDefault();
//   const donneesFormulaire = new FormData(form);
//   fetch('http://localhost:3000/api/products/order ', {
//     method: 'POST',
//     body: JSON.stringify(donneesFormulaire)
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   })
// })
// form.addEventListener('input', function() {
//   let valeurFormulaire = {
//     firstName: form.firstName.value,
//     lastName: form.lastName.value,
//     adress: form.address.value,
//     city: form.city.value,
//     email: form.email.value
//   }
//   console.log(valeurFormulaire);
// })

// const sendForm = async (contact, products) => {
//   let order = {
//     firstName: form.firstName.value,
//     lastName: form.lastName.value,
//     adress: form.address.value,
//     city: form.city.value,
//     email: form.email.value
//   }
//   const response = await fetch(" http://localhost:3000/api/products/order ", {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(contact, products),
//   })
//   const dataRes = await response.json();
//   console.log(dataRes)
//   return dataRes;
// } 


// document.getElementById('order').addEventListener('input', function() {

//   const sendForm = async (contact, products) => {
//     const response = await fetch(" http://localhost:3000/api/products/order ", {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(contact, products),
//     })
//     const dataRes = await response.json();
//     console.log(dataRes)
//     return dataRes;
//   }
// })
