const loginBtn = document.querySelector("#login");
const registerBtn = document.querySelector("#register");
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const forgotPassLink = document.querySelector(".forgot-pass a");
const forgotPassForm = document.querySelector(".forgot-password-form");
const backToLogin = document.querySelector("#back-to-login");

loginBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "#21264D";
    registerBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    
    // Show login form
    loginForm.style.left = "50%";
    registerForm.style.left = "-50%";
    forgotPassForm.style.left = "150%";

    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;
    forgotPassForm.style.opacity = 0;

    document.querySelector(".col-1").style.borderRadius = "0 30% 20% 0";
});

registerBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    registerBtn.style.backgroundColor = "#21264D";
    
    // Show register form
    loginForm.style.left = "150%";
    registerForm.style.left = "50%";
    forgotPassForm.style.left = "150%";

    loginForm.style.opacity = 0;
    registerForm.style.opacity = 1;
    forgotPassForm.style.opacity = 0;

    document.querySelector(".col-1").style.borderRadius = "0 20% 30% 0";
});

forgotPassLink.addEventListener('click', () => {
    // Show forgot password form
    loginForm.style.left = "150%";
    registerForm.style.left = "150%";
    forgotPassForm.style.left = "50%";

    loginForm.style.opacity = 0;
    registerForm.style.opacity = 0;
    forgotPassForm.style.opacity = 1;
});

backToLogin.addEventListener('click', () => {
    // Back to login form from forgot password
    forgotPassForm.style.left = "150%";
    loginForm.style.left = "50%";

    forgotPassForm.style.opacity = 0;
    loginForm.style.opacity = 1;
});

