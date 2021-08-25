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

  btnlogin.addEventListener("click", async() => {
    const user = { 
      email: email.value, 
      pass: password.value
    };
    
    try {
      await loginEmailAndPass(user.email.trim(), user.pass);
    }catch (err) {
      if (err.code === "auth/invalid-email") {
        document.getElementById("invalid-email").style.display = "flex";
      } else if (err.code === "auth/user-not-found") {
        document.getElementById("user-not-found").style.display = "flex";
      } else if (err.code === "auth/wrong-password") {
        document.getElementById("wrong-pswd").style.display = "flex";
      } else if (err === 'empty-values') {
        document.getElementById("blank-space").style.display = "flex";
      }
    }

  })
  
}