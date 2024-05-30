async function fetchData() {
  try {
    const response = await fetch("https://myntra-clone-backend-ursu.onrender.com/product/all-product");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await response.json();

    console.log("products", products?.data);
    return products?.data;
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
}

const display = async () => {
  const allProducts = await fetchData();
  const container = document.getElementById("productContainer");
  if (allProducts.length > 0) {
    container.innerHTML = null;
    allProducts.forEach((elem, idx) => {
      let cardDiv = document.createElement("div");
      cardDiv.setAttribute("class", "productCard");

      let img = document.createElement("img");
      img.setAttribute("src", `${elem?.productImage}`);

      let h6 = document.createElement("h6");
      h6.innerText = `${elem?.productName}`;

      let p = document.createElement("p");
      p.innerText = `${elem?.description}`;

      let price = document.createElement("p");
      price.innerText = `₹${elem?.price}`;

      let a = document.createElement("a");
      a.setAttribute("href", "/singleProduct.html");

      let button = document.createElement("button");
      button.innerText = "View Details";

      button.addEventListener("click", () => {
        storeSinglePrduct(elem);
      });
      a.appendChild(button);

      cardDiv.append(img, h6, p, price, a);

      container.append(cardDiv);
    });
  }
};

display();

function storeSinglePrduct(elem) {
  localStorage.setItem("singleProduct", JSON.stringify(elem));
}
