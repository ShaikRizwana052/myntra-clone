let token = JSON.parse(sessionStorage.getItem("authToken"));
async function fetchCartData() {
  try {
    const response = await fetch("https://myntra-clone-backend-ursu.onrender.com/cart/getall-cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await response.json();

    console.log("products", products);
    return products?.data;
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
}

async function displayCart() {
  const cartData = await fetchCartData();
  const container = document.getElementById("productContainer");
  container.innerHTML = null;
  if (cartData && cartData.length > 0) {
    let totalQuantity = 0;
    cartData.forEach((elem, idx) => {
      totalQuantity += elem.quantity;
    });
    document.getElementById(
      "totalQuantity"
    ).innerText = `Total Quantity: ${totalQuantity}`;
  } else {
    container.innerHTML = "<p>Your cart is empty.</p>";
  }
}
displayCart();

async function displayCart() {
  const cartData = await fetchCartData();
  const container = document.getElementById("productContainer");
  container.innerHTML = null;
  if (cartData && cartData.length > 0) {
    let totalQuantity = 0;
    cartData.forEach((elem, idx) => {
      totalQuantity += elem.quantity;
    });
    document.getElementById(
      "totalQuantity"
    ).innerText = `Total Quantity: ${totalQuantity}`;
  } else {
    container.innerHTML = "<p>Your cart is empty.</p>";
  }
}
displayCart();

let totalAmount = 0; // Global variable to store total amount

const display = async () => {
  const allProducts = await fetchCartData();
  const container = document.getElementById("productContainer");
  container.innerHTML = null;
  totalAmount = 0;
  if (allProducts.length > 0) {
    allProducts.forEach((elem, idx) => {
      let cardDiv = document.createElement("div");
      cardDiv.setAttribute("class", "productCard");

      let img = document.createElement("img");
      img.setAttribute("src", `${elem?.product?.productImage}`);

      let h6 = document.createElement("h6");
      h6.innerText = `${elem?.product?.productName}`;

      let p = document.createElement("p");
      p.innerText = `${elem?.product?.description}`;

      let totalquantity = document.createElement("button");
      totalquantity.innerText = `${elem?.product?.totalQty}`;

      let price = document.createElement("p");
      let productPrice = elem?.product?.price * elem?.quantity;
      price.innerText = `₹${productPrice}`;
      totalAmount += productPrice;

      let quantity = document.createElement("h6");
      quantity.innerText = `Quantity: ${elem?.quantity}`;

      let buttonDiv = document.createElement("div");
      buttonDiv.setAttribute("class", "buttondiv");

      let button1 = document.createElement("button");
      button1.innerText = "+";

      button1.addEventListener("click", () => {
        increment(elem);
      });

      let button = document.createElement("button");
      button.innerText = "Remove Item";

      button.addEventListener("click", () => {
        removeCartItem(elem);
      });

      let button2 = document.createElement("button");
      button2.innerText = "-";

      button2.addEventListener("click", () => {
        decrement(elem);
      });

      buttonDiv.append(button1, button, button2);

      cardDiv.append(img, h6, p, price, quantity, buttonDiv);

      container.append(cardDiv);
    });
  }
  document.getElementById(
    "totalAmount"
  ).innerText = `Total Amount: ₹${totalAmount}`;
};

display();

async function removeItem(id) {
  try {
    const response = await fetch(
      `https://myntra-clone-backend-ursu.onrender.com/cart/delete-cart/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const result = await response.json();

    console.log("products", result);
    return result;
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
}

async function removeCartItem(elem) {
  let remove = await removeItem(elem._id);
  if (remove?.status) {
    alert("Item Remove successfully");
    display();
  } else {
    alert("Error in remove item");
  }
}

async function variateItemQty(id, qty) {
  try {
    const response = await fetch(
      `https://myntra-clone-backend-ursu.onrender.com/cart/update-cart/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
        },
        body: JSON.stringify({ quantity: qty }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update quantity");
    }
    const result = await response.json();

    console.log("products", result);
    return result;
  } catch (error) {
    console.error("Error Updating quntity:", error.message);
  }
}

async function increment(elem) {
  let qty = elem.quantity + 1;
  const result = await variateItemQty(elem._id, qty);
  if (result.status) {
    alert("Item QUantity updated successfully");
    display();
  }
}

async function decrement(elem) {
  let qty = elem.quantity - 1;
  const result = await variateItemQty(elem._id, qty);
  if (result.status) {
    alert("Item QUantity updated successfully");
    display();
  }
}

async function emptyCart() {
  try {
    const response = await fetch("https://myntra-clone-backend-ursu.onrender.com/cart/deleteAll-cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to empty cart");
    }
    const result = await response.json();
    console.log("Cart emptied:", result);
    return result;
  } catch (error) {
    console.error("Error emptying cart:", error.message);
  }
}

async function emptyCartAndUpdateDisplay() {
  const emptyResponse = await emptyCart();
  if (emptyResponse?.status) {
    alert("Cart emptied successfully");
    display();
  } else {
    alert("Error in emptying cart");
  }
}

document
  .getElementById("emptyCartButton")
  .addEventListener("click", emptyCartAndUpdateDisplay);
