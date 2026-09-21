let productsDiv = document.querySelector("#products")
// inputProduct.addEventListener("input",function(e){
//   console.log(e.target.value);

// })

let searchBtn = document.querySelector("#searchBtn")
searchBtn.addEventListener("click",function(){
  let inputProduct = document.querySelector("#inputProduct")
  let searchLink = 'https://dummyjson.com/products/search?q=' + inputProduct.value  

  fetch(searchLink)
    .then(function(response){
      return response.json()
    })
    .then(
      function(data){

        // console.log(data);
        

        for(let product of data.products){
          
          appendProductToHolder(product)
          
        }
        
      }
    )
})

// fetch(`https://dummyjson.com/products?limit=20&sortBy=price&order=asc`)
//   .then(
//     function(response){
//       console.log(response);
      
//       return response.json()
//     }

//   )
//   .then(
//     function(data){
//       for(let product of data.products){
        
//         appendProductToHolder(product)
        
//       }
      
//     }
    
//   )

function appendProductToHolder(product){

  let singleProduct = document.createElement("div")
  let productTitle = document.createElement("h1")
  productTitle.innerText = product.title

  let productCategory = document.createElement("p")
  productCategory.innerText = product.category

  let productPrice = document.createElement("p")
  productPrice.innerText = product.price

  singleProduct.append(productTitle, productCategory,productPrice)
  productsDiv.append(singleProduct)
}



















