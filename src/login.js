const { db } = require("./config");

window.onload = () => { 
  const email = document.getElementById("login-email");
  const password = document.getElementById("login-password");
  const btnlogin = document.getElementById("login")

  btnlogin.addEventListener("click", async() => {
    const user = { 
      email: email.value, 
      password: password.value
    };
    console.log(user)
    const response = await db.collection("users").doc().set(user);
    console.log("hecho")
  })
  
}