const { loginEmailAndPass } = require("./firebase/functions");
const { auth } = require("./firebase/config");
const { BrowserWindow } = require("electron");

auth.onAuthStateChanged(user => {
  if(user){
    if(localStorage.getItem('currentEmail') !== user.email) 
      localStorage.setItem('currentEmail', user.email);
    window.location.href = 'index.html';
  }
});

window.onload = () => { 
  const email = document.getElementById("login-email");
  const password = document.getElementById("login-password");
  const btnlogin = document.getElementById("login");
  const loading = document.getElementById('loading');

  btnlogin.addEventListener("click", async() => {
    const user = { 
      email: email.value, 
      pass: password.value
    };
    
    try {
      loading.style.display = "flex"
      loading.style.margin = "auto";
      loading.style.marginBottom = "30px";
      await loginEmailAndPass(user.email.trim(), user.pass);
    }catch (err) {
      if (err.code === "auth/invalid-email") {
        // Email entered is invalid
        document.getElementById("invalid-email").style.display = "flex";

      } else if (err.code === "auth/user-not-found") {
        // Email entered is not registered
        document.getElementById("user-not-found").style.display = "flex";

      } else if (err.code === "auth/wrong-password") {
        // The password is wrong
        document.getElementById("wrong-pswd").style.display = "flex";

      } else if (err === 'empty-values') {
        // There's an empty space
        document.getElementById("blank-space").style.display = "flex";

      } else {
        // When any other error happens
        document.getElementById("any-error").style.display = "flex";

      }
    } finally{
      loading.style.display = "none";
      
    }

  })
  
}