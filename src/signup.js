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
      if (err === 'empty-values') {
        // There's any blank space
        document.getElementById("blank-space").style.display = "flex";

      }else if (err === 'different-passwords') {
        // Password and confirm passwords are differents
        document.getElementById("different-pass").style.display = "flex";

      } else if (err.code === 'auth/email-already-in-use') {
        // There's a same email registered
        document.getElementById("email-registered").style.display = "flex";

      } else if (err.code === 'auth/invalid-email') {
        // Email entered is invalid
        document.getElementById("invalid-email").style.display = "flex";

      } else {
        // When any other error happens
        document.getElementById("any-error").style.display = "flex";
      }
    }finally{
      loading.style.display = "none";
    }
  })
}