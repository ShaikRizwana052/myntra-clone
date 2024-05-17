let stringData = localStorage.getItem("singleProduct");
let singleData = JSON.parse(stringData);
let token = JSON.parse(sessionStorage.getItem("authToken"));

console.log("singleData", singleData);

document.querySelector(".anouk>h4").innerHTML = singleData?.productName;
document.querySelector("#para>h6").innerHTML = singleData?.productName;
document.querySelector(".purple").innerHTML = singleData?.description;
document.querySelector("#desc3").innerHTML =
  singleData?.categories?.description;
document.querySelector("#pricing").innerHTML = `₹ ${singleData?.price}`;
document.querySelector("#para>h6>span").innerHTML = `₹ ${singleData?.price}`;
// productImage
let allImg = document.querySelector(".saree");
for (let i = 0; i < 4; i++) {
  let img = document.createElement("img");
  img.setAttribute("src", `${singleData?.productImage}`);
  allImg.appendChild(img);
}

document.getElementById(
  "types"
).innerText = ` ${(singleData?.type).toUpperCase()}`;

async function addProduct(productId, token) {
  try {
    const payload = { productId, quantity: 1 };

    const response = await fetch("http://localhost:9091/cart/create-cart", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
    });

    return response;
  } catch (error) {}
}
async function addToCart() {
  let cartres = null;

  if (token) {
    cartres = await addProduct(singleData?._id, token);

    if (cartres?.status) {
      alert("Product added to cart!");
    } else {
      alert("Some thing wrong");
    }
  } else {
    alert("Please login first !!!");
    window.location.href = "./login.html";
  }
}
