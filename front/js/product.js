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
      document.querySelector("#colors").innerHTML = `<option value="">--SVP, choisissez une couleur --</option>
                                                      <option value="">${afficheArticleUni.colors[0]}</option>
                                                      <option value="">${afficheArticleUni.colors[1]}</option>
                                                      <option value="">${afficheArticleUni.colors[2]}</option> `
        /*let colorsSelect = document.querySelector("#colors")
        let colorsChoice = afficheArticleUni.colors*/
        }                                    
      )
      
    }
    /*let colorsSelect = document.querySelector("#colors")
    //let colorsFetch = 
    let colorsId = `http://localhost:3000/api/products/${articlId}` 
    console.log(colorsId)
    let colorsChoice = colorsId.colors
    console.log(colorsChoice)*/
/*
let idArray = articlId
let colorsArray = document.querySelector('#colors').value
let quantityArray = document.querySelector('#quantity').value

const array = [idArray, colorsArray, quantityArray]

let objKanap = {
  id : idArray ,
  couleurs : colorsArray ,
  quantité : quantityArray
}
let objLinea = JSON.stringify(objKanap)
localStorage.setItem("obj", objLinea)


let objLine = localStorage.getItem("obj"); 
JSON.parse(objLine);



const button = document.querySelector("#addToCart")
if (button != null) {
  button.addEventListener("click", (e) => {
    const color = document.querySelector("#colors").value 
    const quantity = document.querySelector("#quantity").value
    if (color == null || color === "" ||quantity == null || quantity == "0") {
      alert("Please select a color and quantity")
    }
    localStorage.setItem(articlId, color)
})}
*/

const button = document.querySelector("#addToCart")
  button.addEventListener("click", (e) => {
    let idArray = articlId
    let colorsArray = document.querySelector('#colors').value
    let quantityArray = document.querySelector('#quantity').value
    const array = [idArray, colorsArray, quantityArray]

    let objKanap = {
      id : idArray ,
      couleurs : colorsArray ,
      quantité : quantityArray
    }
    let objLinea = JSON.stringify(objKanap)
    localStorage.setItem("obj", objLinea)
    
    
    let objLine = localStorage.getItem("obj"); 
    JSON.parse(objLine);
})

