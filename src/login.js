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
  const BS = document.getElementById('blank-space');
  const closeBS = document.getElementById('blank-space-close');
  const IM = document.getElementById("invalid-email");
  const closeIM = document.getElementById("invalid-email-close");
  const UNF = document.getElementById("user-not-found");
  const closeUNF = document.getElementById("user-not-found-close");
  const WP = document.getElementById("wrong-pswd");
  const closeWP = document.getElementById("wrong-pswd-close");
  const AE = document.getElementById("any-error");
  const closeAE = document.getElementById("any-error-close");

  closeAE.addEventListener("click", async() => {
    AE.style.display = "none"
  });


  closeWP.addEventListener("click", async() => {
    WP.style.display = "none"
  });

  closeBS.addEventListener("click", async() => {
    BS.style.display = "none"
  });

  closeIM.addEventListener("click", async() => {
    IM.style.display = "none"
  });

  closeUNF.addEventListener("click", async() => {
    UNF.style.display = "none"
  });

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
        IM.style.display = "flex";

      } else if (err.code === "auth/user-not-found") {
        // Email entered is not registered
        UNF.style.display = "flex";

      } else if (err.code === "auth/wrong-password") {
        // The password is wrong
        WP.style.display = "flex";

      } else if (err === 'empty-values') {
        // There's an empty space
        BS.style.display = "flex";

      } else {
        // When any other error happens
        AE.style.display = "flex";

      }
    } finally{
      loading.style.display = "none";
      
    }

  })
  
}