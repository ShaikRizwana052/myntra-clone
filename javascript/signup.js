function getFormData() {
  var userObj = {};
  var inputs = document.querySelectorAll(
    '.easyway input[type="text"], .easyway input[type="tel"], .easyway input[type="password"]'
  );

  inputs.forEach(function (input) {
    userObj[input.getAttribute("name")] = input.value;
  });

  var checkbox = document.querySelector('.easyway input[type="checkbox"]');
  userObj["termsAccepted"] = checkbox.checked;

  return userObj;
}

async function signup(userData) {
  try {
    const response = await fetch("http://localhost:9091/user/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let responseData = await response.json();
    if (responseData.status) {
      alert(`${userData?.name} signup successfully`);
      window.location.href = "./login.html";
    } else {
      alert(`${userData?.name} error while signup!!!`);
    }
    // console.log(responseData);
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
}

document
  .querySelector(".easyway form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    let userObj = getFormData();
    await signup(userObj);
  });
