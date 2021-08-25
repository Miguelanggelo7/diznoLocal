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
      loading.hidden = false;
      await registration(user);
    }catch(err){
      if (err === 'error-same-email') {
        // There's a same email registered
        console.log(err)
      }else if (err === 'empty-values') { 
        console.log(err)
      }else if (err === 'error-different-passwords') {
        // Password and confirm passwords are differents
        console.log(err)
      } else if (err.code === 'auth/invalid-email') {
        console.log(err)
      }
    }finally{
      loading.hidden = true;
    }
  })
}