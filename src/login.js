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
      loading.hidden = false;
      await loginEmailAndPass(user.email.trim(), user.pass);
    }catch (err) {
      if (err.code === "auth/invalid-email") {

      } else if (err.code === "auth/user-not-found") {

      } else if (err.code === "auth/wrong-password") {

      } else if (err === 'empty-values') {
        console.log('empty-values')
      }
    } finally{
      loading.hidden = true;
    }

  })
  
}