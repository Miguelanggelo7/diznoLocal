const { registration } = require("./firebase/functions");


window.onload = () => { 
  const email = document.getElementById("register-email")
  const password = document.getElementById("register-password" )
  const confirmPassword = document.getElementById('confirm-password')
  const btnSignup = document.getElementById('signup')

  btnSignup.addEventListener("click", async() => {
    
    const user = { 
      email: email.value, 
      pass: password.value,
      confirmPass: confirmPassword.value
    };

    try {
      await registration(user);
    }catch(err){
      if(err === 'error-same-email'){
        // There's a same email registered
        console.log(err)
      }
      if(err === 'error-different-passwords'){
        // Password and confirm passwords are differents
        console.log(err)
      }
    }
  })
}