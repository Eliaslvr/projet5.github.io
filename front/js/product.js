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

    //const incrementQuantity = (quantity) => quantity++;

//function addToCart(product){
  const button = document.querySelector("#addToCart")
  button.addEventListener("click", (e) => {
    e.preventDefault();//annulation de tout les comportements par defaut
    let id = articlId
    let couleurs = document.querySelector('#colors').value
    let quantite = document.querySelector('#quantity').value
    let tableData = [];
    let getLocalStorageData = localStorage.getItem('obj')

    if (quantite < 1 || quantite > 99 || couleurs == null || couleurs == "" || couleurs == '--SVP, choisissez une couleur --') {
      alert("Séléctionner une couleur ainsi qu'un article compris entre 1 et 99")
    } else {
        if(!getLocalStorageData) {
          let objKanap = {
            id,
            couleurs,
            quantite,
          }
          tableData.push(objKanap);//Ajoute element dans le tableau
          localStorage.setItem("obj", JSON.stringify(tableData));//Pouvoir ajouter l'objet au localStorage
        } else {
          tableData = JSON.parse(localStorage.getItem('obj'))//Pouvoir recuprer l'objet dans le localStorage
          tableData.forEach(element => {
            if (element.id == id && element.couleurs == couleurs) {
              element.quantite = quantite
              localStorage.setItem("obj", JSON.stringify(tableData));

            } else {
              console.log(id, couleurs, quantite);
            }
          });
        }

    }})





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
