// Function to generate OTP
let otp = null;
function generateOTP() {
  document.getElementById("otpBox").style.display = "block";
  otp = Math.floor(1000 + Math.random() * 9000);
  alert("Your OTP is: " + otp);
  return otp;
}

// Function to proceed with payment
function proceedPayment() {
  var enteredOTP = document.getElementById("otp").value;
  var generatedOTP = otp;

  if (!enteredOTP) {
    alert("Please enter OTP first");
    return;
  }

  if (enteredOTP == generatedOTP) {
    alert("Payment completed successfully!");
    document.getElementById("otpBox").style.display = "none";
    window.location.href = "./thankyou.html";
  } else {
    alert("Incorrect OTP. Please enter the correct OTP.");
  }
}

document.getElementById("submitOtp").addEventListener("click", proceedPayment);
