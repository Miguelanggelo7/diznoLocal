const { registration } = require("./firebase/functions");


window.onload = () => { 
  const email = document.getElementById("register-email");
  const password = document.getElementById("register-password" );
  const confirmPassword = document.getElementById('confirm-password');
  const btnSignup = document.getElementById('signup');
  const loading = document.getElementById('loading');

  btnSignup.addEventListener("click", async() => {
    
    const user = { 
      email: email.value, 
      pass: password.value,
      confirmPass: confirmPassword.value
    };

    try {
      loading.style.display = "flex";
      loading.style.margin = "auto";
      loading.style.marginBottom = "30px";
      await registration(user);
    }catch(err){
      if (err === 'error-different-passwords') {
        // There's a same email registered
        document.getElementById("different-pass").style.display = "flex";
      } else if (err.code === '') {
        // Password and confirm passwords are differents
        console.log(err)
      } else if (err.code === 'auth/invalid-email') {
        console.log(err)
      }
    }finally{
      loading.style.display = "none";
    }
  })
}