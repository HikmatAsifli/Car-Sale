document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("registerForm");
  const carContainer = document.getElementById("carContainer");
  const cars = JSON.parse(localStorage.getItem("cars")) || [];
  let carIdCounter = cars.length > 0 ? Math.max(...cars.map(car => car.id)) + 1 : 1;

  const saveCarsToLocalStorage = function(cars) {
      localStorage.setItem("cars", JSON.stringify(cars));
  };

  const renderCarsFromLocalStorage = function() {
      cars.forEach(function(car) {
          const carCard = createCarCard(car);
          carContainer.insertAdjacentHTML("beforeend", carCard);
      });
  };

  const createCarCard = function(car) {
      return `
        <div class= "col-3">
          <div id="car${car.id}" class="card border-0 rounded p-1" style="width: 18rem;" data-id="${car.id}" data-img="${car.image}" data-make="${car.mark}" data-model="${car.model}" data-price="${car.price}">
              <div class="card_header">
                  <div class="text">
                      <h5 class="card-title make">${car.mark}</h5>
                      <p class="card-text model">${car.model}</p>
                  </div>
                  <a href="#" onclick="addToWishlist(event)"><i class="fa-regular fa-heart"></i></a>
              </div>
              <div class="card-body">
                  <img src="${car.image}" class="card-img-top" alt="...">
              </div>
              <div class="car-details">
                  <img src="./assets/img/gas-station.png" alt=""><span>${car.fuel}L</span>
                  <img src="./assets/img/Car (6).png" alt=""><span>${car.transmission}</span>
                  <!-- Əlavə detallar əlavə edə bilərsiniz -->
              </div>
              <div class="card_footer">
                  <span class="price"><b>$${car.price}/</b>gün</span>
                  <button class="btn btn-primary" onclick="addToBasket(event)">İcarə Et</button>
              </div>
          </div>
        </div>
      `;
  };

renderCarsFromLocalStorage();

form.addEventListener("submit", function(event) {
      event.preventDefault();

      const mark = document.getElementById("mark").value;
      const model = document.getElementById("model").value;
      const image = "";
      const ban = document.getElementById("ban").value;
      const fuel = document.getElementById("litr").value;
      const transmission = document.getElementById("transmission").value;
      const price = document.getElementById("price").value;

      const newCar = {
          id: carIdCounter++,
          mark: mark,
          model: model,
          image: image,
          fuel: fuel,
          transmission: transmission,
          price: price
      };

      cars.push(newCar);
      saveCarsToLocalStorage(cars);

      const carCard = createCarCard(newCar);
      carContainer.insertAdjacentHTML("beforeend", carCard);

      form.reset();

      window.location.href = "./index.html";
  });
});

function addToWishlist(event) {
  const clickedCard = event.target.closest(".card");
  const carId = clickedCard.dataset.id;
  const carMake = clickedCard.dataset.make;
  const carModel = clickedCard.dataset.model;
  const carPrice = clickedCard.dataset.price;
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (!wishlist.find(item => item.id === carId)) {
      wishlist.push({ id: carId, make: carMake, model: carModel, price: carPrice });
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Car added to wishlist!");
      renderWishlistTable();
  } else {
      alert("This car is already in your wishlist!");
  }
}

function renderWishlistTable() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const wishlistBody = document.getElementById("wishlistBody");
  wishlistBody.innerHTML = "";
  wishlist.forEach(function(car) {
      wishlistBody.insertAdjacentHTML("beforeend", `
          <tr>
              <td>${car.id}</td>
              <td>${car.make}</td>
              <td>${car.model}</td>
              <td>$${car.price}</td>
              <td>
                  <button class="btn btn-danger" onclick="removeFromWishlist(event)">Remove</button>
              </td>
          </tr>
      `);
  });
}

renderWishlistTable();


function removeFromWishlist(event){
    let carId = event.target.closest("tr").firstElementChild.innerText;
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter(item => item.id !== carId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Car removed from wishlist!");
    renderWishlistTable();
}


function addToBasket(event) {
    const clickedCard = event.target.closest(".card");
    const carId = clickedCard.dataset.id;
    const carMake = clickedCard.dataset.make;
    const carModel = clickedCard.dataset.model;
    const carPrice = clickedCard.dataset.price;
    const basket = JSON.parse(localStorage.getItem("basket")) || [];

    if (!basket.find(item => item.id === carId)) {
        basket.push({ id: carId, make: carMake, model: carModel, price: carPrice });
        localStorage.setItem("basket", JSON.stringify(basket));
        alert("Car added to basket!");
    } else {
        alert("This car is already in your basket!");
    }
}

function renderBasketTable() {
    const basket = JSON.parse(localStorage.getItem("basket")) || [];
    const basketBody = document.getElementById("basketBody");
    basketBody.innerHTML = "";
    basket.forEach(function(car) {
        basketBody.insertAdjacentHTML("beforeend", `
            <tr>
                <td>${car.id}</td>
                <td>${car.make}</td>
                <td>${car.model}</td>
                <td>$${car.count}</td>
                <td>$${car.price}</td>
                <td>
                    <button class="btn btn-danger" onclick="removeFromBasket(event)">Remove</button>
                </td>
            </tr>
        `);
    });
  }

  renderBasketTable();