function getFormData() {
  var userRes = {};
  var inputs = document.querySelectorAll(
    '.smile input[type="email"], .smile input[type="password"]'
  );

  inputs.forEach(function (input) {
    userRes[input.getAttribute("name")] = input.value;
  });
  //   var button=document.querySelector('.smile input[type="button"]');
  //   userRes["submit"]=button.checked;

  return userRes;
}

async function login(userData) {
  try {
    const response = await fetch("http://localhost:9091/user/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();
    if (responseData.status) {
      sessionStorage.setItem("authToken", JSON.stringify(responseData?.Token));
      alert(`${responseData?.name} login successfully`);
      console.log("loginresp", responseData);

      window.location.href = "./index.html";
    } else {
      alert(`${responseData?.name} error while login!!!`);
    }
  } catch (error) {
    console.error("Error fetching login:", error.message);
  }
}

document
  .querySelector(".smile form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    let userRes = getFormData();
    console.log(userRes);
    await login(userRes);
  });
