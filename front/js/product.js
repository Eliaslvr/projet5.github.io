//const articlId = getArticleId()
// cont articl = getArticle()

/*function getArticleId() {
  return new URL(location.href).searchParams.get("id")
}*/
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => afficheArticleUni(res))

/*fetch(`http://localhost:3000/api/products/${articlId}`)
.then (data => data.json())
.then ((res) => afficheArticleUni(res))*/

function afficheArticleUni(choice) {
  const imageUrl = choice.imageUrl
  const altTxt = choice.altTxt
  const price = choice.price
  const name = choice.name
  affichImage(imageUrl, altTxt)
  afficheName(name)
}

function affichImage(imageUrl, altTxt) {
  /*const image = document.createElement("img")
  image.src = imageUrl
  image.altTxt = altTxt
  const parent = document.querySelector(".item__img")
  if (parent != null) parent.appendChild(image)*/
  const newImage = document.createElement("img")
  newImage.id = "newImage"
  //image.src = imageUrl
  //image.altTxt = altTxt
  newImage.appendChild(image.src, image.altTxt)
  const image2 = document.querySelector(".item__img")
  const parentDiv = image2.parentNode
  parentDiv.replaceChild(newImage, image2)
}

function afficheName(name) {
  const h1 = document.querySelector("#title")
  if(h1 != null) h1.textContent = name
}


/*function getArticle() {
  return fetch(`http://localhost:3000/api/products/${articlId}`)
    .then(data => data.json())
    .then(afficheArticleUni => {
      console.log(afficheArticleUni)
      document.getElementById("price").textContent = afficheArticleUni.price
      document.getElementById("title").textContent = afficheArticleUni.name
      document.querySelector(".item__img").innerHTML = `<img src=${afficheArticleUni.imageUrl} alt=${afficheArticleUni.altTxt}>`
      document.getElementById("description").textContent = afficheArticleUni.description
      /*document.querySelector("#colors").innerHTML = `<option value="">--SVP, choisissez une couleur --</option>
                                                      <option value="">${afficheArticleUni.colors[0]}</option>
                                                      <option value="">${afficheArticleUni.colors[1]}</option>
                                                      <option value="">${afficheArticleUni.colors[2]}</option> `*/
    
        /*let couleurOption = document.querySelector("#colors");

        for (let choix of afficheArticleUni) {
            for (let couleur of choix.colors) {
              couleurOption.innerHTML += `<option value="${couleur}">${couleur}</option>`;
            }
          }
        }                                    
      )
      
  }

/*const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => handleData(res))

function handleData (duck) {
  const altTxt = duck.altTxt
  const colors = duck.colors
  const description = duck.descriptoin 
  const imageUrl = duck.imageUrl
  const name = duck.name
  const price = duck.price
  const _id = duck._id
  //makeColors(colors)
}

function makeColors(colors) {
  const select = document.querySelector('#colors')
  if (select != null) {
    colors.forEach((color) => {
    const option = document.createElement("option")
    option.value = color
    option.textContent = color
    select.appendChild(option)
  })
  }
}*/

 
const button = document.querySelector("#addToCart")
if (button != null) {
  button.addEventListener("click", (e) => {
    const color = document.querySelector("#colors").value 
    const quantity = document.querySelector("#quantity").value
    if (color == null || color === "" ||quantity == null || quantity == "0") {
      alert("Please select a color and quantity")
    }
    localStorage.setItem(articlId, color)
  })
}
