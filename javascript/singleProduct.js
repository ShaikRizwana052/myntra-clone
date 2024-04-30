let stringData = localStorage.getItem("singleProduct");
let singleData = JSON.parse(stringData);

console.log("singleData", singleData);

document.querySelector(".anouk>h4").innerHTML = singleData?.productName;
document.querySelector("#para>h6").innerHTML = singleData?.productName;
document.querySelector(".purple").innerHTML = singleData?.description;
document.querySelector("#desc3").innerHTML = singleData?.categories?.description;
document.querySelector("#pricing").innerHTML = `₹ ${singleData?.price}`;
document.querySelector("#para>h6>span").innerHTML = `₹ ${singleData?.price}`;
// productImage
let allImg = document.querySelector(".saree");
for (let i = 0; i < 4; i++) {
  let img = document.createElement("img");
  img.setAttribute("src", `${singleData?.productImage}`);
  allImg.appendChild(img);
}

document.getElementById("types").innerText = ` ${(singleData?.type).toUpperCase()}`;
