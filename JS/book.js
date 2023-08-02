window.onload = function () {

    fetch("http://localhost:8000/book/newly_arrived")
        .then((response) => response.json())
        .then((data) => data.forEach(item => {
            const container = document.createElement("div")
            container.setAttribute("class", "book-card magic-shadow-sm")
            container.innerHTML = `        <div class="book-image flex items-center justify-center">
      <img src=${item.image_url} alt="">

  </div>

  <!-- Books in slider -->

  <hr>
  <div>
      <h2 class="text-center">${item.name} </h2>
      <div class="stars flex justify-center items-center">
          <img src="./icons/start-filled.svg" alt="">
          <img src="./icons/start-filled.svg" alt="">
          <img src="./icons/start-filled.svg" alt="">
          <img src="./icons/star-grey.svg" alt="">
          <img src="./icons/star-grey.svg" alt="">
      </div>
      <div>
          <div class="price text-center ">
              ${item.price}
          </div>
          <div class="flex justify-center">
              <button class="AddToCart-btn">
                  <img src="./icons/cart-2.svg" alt="">
                  <span>
                      Add To Cart
                  </span>
              </button>
          </div>
      </div>
  </div>`
            document.getElementById("book-slider").appendChild(container)
        }))
        .catch((err) => {
            console.log("error" + err);
        })
}