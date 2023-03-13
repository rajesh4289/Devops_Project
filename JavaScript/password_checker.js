const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const passwordError = document.getElementById("password-error");

confirmPasswordInput.addEventListener("input", function() {
  if (passwordInput.value !== confirmPasswordInput.value) {
    passwordError.textContent = "Passwords do not match.";
  } else {
    temppasswordError.textContent = "";
  }
});
