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


  /*export*/ const button = document.querySelector("#addToCart")
  button.addEventListener("click", (e) => {
    let id = articlId
    let couleurs = document.querySelector('#colors').value
    let quantité = document.querySelector('#quantity').value

    if (quantité < 1 || quantité > 99 || couleurs == null || couleurs == "" || couleurs == '--SVP, choisissez une couleur --') {
      alert("Séléctionner une couleur ainsi qu'un article compris entre 1 et 99")
    } else {
      window.location = "http://127.0.0.1:5502/front/html/cart.html"
    }

    let objKanap = {
      id,
      couleurs,
      quantité
    }

    localStorage.setItem("obj", JSON.stringify(objKanap))

    //window.location = "http://127.0.0.1:5502/front/html/cart.html"
})

//export { getArticleId, getArticle };

