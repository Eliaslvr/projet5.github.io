const articlId = getArticleId()
const articl = getArticle()

function getArticleId() {
  return new URL(location.href).searchParams.get("id")
}


function getArticle() {
  return fetch(`http://localhost:3000/api/products/${articlId}`)
    .then(data => data.json())
    .then(afficheArticleUni => {
      console.log(afficheArticleUni)
      document.getElementById("price").textContent = afficheArticleUni.price
      document.getElementById("title").textContent = afficheArticleUni.name
      document.querySelector(".item__img").innerHTML = `<img src=${afficheArticleUni.imageUrl} alt=${afficheArticleUni.altTxt}>`
      document.getElementById("description").textContent = afficheArticleUni.description
      document.querySelector("#colors").innerHTML = `<option>--SVP, choisissez une couleur --</option>
                                                      ${afficheArticleUni.colors.map(color => `<option value="${color}">${color}</option>`)})`;
        }                                    
      )
      
    }

  const button = document.querySelector("#addToCart")
  button.addEventListener("click", (e) => {
    e.preventDefault();//annulation de tout les comportements par defaut
    let id = articlId
    let couleur = document.querySelector('#colors').value
    let quantite = document.querySelector('#quantity').value
    let tableData = [];
    let getLocalStorageData = localStorage.getItem('obj')

    if (quantite < 1 || quantite > 99 || couleur == null || couleur == "" || couleur == '--SVP, choisissez une couleur --') {
      alert("Séléctionner une couleur ainsi qu'un article compris entre 1 et 99")
    } else {
        /*if (getLocalStorageData) {
          let objKanap = {
            id,
            couleur,
            quantite,
          }
          tableData = JSON.parse(localStorage.getItem('obj'))//Pouvoir recuprer l'objet dans le localStorage
          tableData.forEach(element => {
          if (element.id === objKanap.id && element.couleur === objKanap.couleur) {
              //element.quantite = quantite
              objKanap
              let newQuantite = element.quantite += objKanap.quantite
             // element.quantite = newQuantite
              console.log(newQuantite);

              localStorage.setItem("obj", JSON.stringify(tableData));
          } else {
            tableData.push(objKanap);//Ajoute element dans le tableau
            localStorage.setItem("obj", JSON.stringify(tableData));//Pouvoir ajouter l'objet au localStorage
          }
    }
          )}}})*/




    if(!getLocalStorageData) {
          let objKanap = {
            id,
            couleur,
            quantite,
          }
          tableData.push(objKanap);//Ajoute element dans le tableau
          localStorage.setItem("obj", JSON.stringify(tableData));//Pouvoir ajouter l'objet au localStorage
        } else {
          tableData = JSON.parse(localStorage.getItem('obj'))//Pouvoir recuprer l'objet dans le localStorage
          tableData.forEach(element => {
            if (element.id === id && element.couleur === couleur) {
              let objKanap = {
                id,
                couleur,
                quantite,
              }
              /*document.getElementById("quantity").innerHTML =
              element.quantite += Number(quantite.value);
              //search = true*/

              Number(element.quantite) = Number(quantite);
              const newQuantite = [Number(element.quantite), Number(objKanap.quantite)]//La Number()méthode convertit une valeur en nombre.
              const sumNote = newQuantite.reduce(
                (accumulator, currentValue) => {
                  return accumulator += currentValue
                }, 
              )
              console.log(sumNote);
              
            /*const array = [element.quantite];
            let sum = quantite;

            for (let i = 0; i < array.length; i++) {
                sum += array[i];
            }
            console.log(sum);*/
              
              localStorage.setItem("obj", JSON.stringify(tableData));

            } else {
              //console.log(id, couleur, quantite);
              let objKanap = {
                id,
                couleur,
                quantite,
              }
              tableData.push(objKanap);//Ajoute element dans le tableau
              localStorage.setItem("obj", JSON.stringify(tableData))
            }
          });
        }}})





    /*tableData = JSON.parse(localStorage.getItem('obj'))//Pouvoir recuprer l'objet dans le localStorage
          tableData.forEach(element => {
            if (element.id == id && element.couleurs == couleurs) {
              element.quantite = quantite
              localStorage.setItem("obj", JSON.stringify(tableData));

            } else {
              objKanap = {
                id,
                couleurs,
                quantite,
              }
              tableData.push(objKanap); 
              localStorage.setItem("obj", JSON.stringify(tableData));    
              return false;
            }
          })*/

    /*let objKanap = {
      id,
      //name: product.name,
      //img: product.imageUrl,
      couleurs,
      quantité,
    }
    if (getLocalStorageAffiche) {
      let item = getLocalStorageAffiche.find(
        (item) => item.id == objKanap.id && item.couleurs == objKanap.couleurs
      )
      if (item) {
        const newQuantity = item.quantité + objKanap.quantité;
        //console.log(newQuantity)
        item.quantité = newQuantity;

        localStorage.setItem("obj", JSON.stringify(getLocalStorageAffiche));
      } else {
        getLocalStorageAffiche.push(objKanap);
        localStorage.setItem("obj", JSON.stringify(tableData))
      }*/



/*getLocalStorageAffiche
      if (getLocalStorageAffiche) {
        getLocalStorageAffiche.reduce(objKanap)
        function getSum(total, num) {
          return total + Math.round(num)
        }
        tableData = getLocalStorageAffiche
      }else{
        tableData.push(objKanap);
      }*/








      /*const product = findProductByColor(objKanap.couleurs);
      tableData = getProductsFromLocalStorage();

      if (product) {
        tableData = updateProduct(objKanap)
      } else {
        tableData.push(objKanap);
      }

      publishToLocalStorage(tableData)
      //window.location = "http://127.0.0.1:5502/front/html/cart.html"
    }
});*/














/*function incrementProductQuantity(product) {
  product.quantité++;
}

function findProductByColor(color) {
  return getProductsFromLocalStorage().find(selectedProduct => selectedProduct.couleurs === color);
}

const getProductsFromLocalStorage = () => JSON.parse(localStorage.getItem('obj')) || [];

const findProductByColor = (color) => getProductsFromLocalStorage().find(selectedProduct => selectedProduct.couleurs === color);

const publishToLocalStorage = (data) => localStorage.setItem("obj", JSON.stringify(data));

const updateProduct = (product) => getProductsFromLocalStorage().map(productInBasket => {
  if (productInBasket.couleurs == product.couleurs) {
    productInBasket.quantité = product.quantité;
  }

  return productInBasket;
});*/

const notes = [1, 2, 3, 4]
const sumNote = notes.reduce(
  (sum, currentNote) => {
    return sum += currentNote
  }, 100
)
console.log(sumNote);
