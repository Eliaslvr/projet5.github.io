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
    let quantite = parseInt(document.querySelector('#quantity').value)//parseInt converti la chaine en entier
    let tableData = [];
    let getLocalStorageData = localStorage.getItem('obj')

    if (quantite < 1 || quantite > 99 || couleur == '--SVP, choisissez une couleur --') {
      alert("Séléctionner une couleur ainsi qu'un article compris entre 1 et 99")
    } else {

          let objKanap = {
            id,
            couleur,
            quantite,
          }

          if(!getLocalStorageData) {
          tableData.push(objKanap);//Ajoute element dans le tableau
          localStorage.setItem("obj", JSON.stringify(tableData));//Pouvoir ajouter l'objet au localStorage
          } else {
          tableData = JSON.parse(localStorage.getItem('obj'))//Pouvoir recuprer l'objet dans le localStorage
          const produitFind = tableData.find(element => element.id === id && element.couleur === couleur); 
          if(produitFind) {
            const newQuantite = produitFind.quantite + quantite
            produitFind.quantite = newQuantite
          } else {
            tableData.push(objKanap);
          }
          localStorage.setItem("obj", JSON.stringify(tableData));
        }}
      window.location.href = "cart.html"
      })






