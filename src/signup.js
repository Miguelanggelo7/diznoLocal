const { registration } = require("./firebase/functions");


window.onload = () => { 
  const email = document.getElementById("register-email");
  const password = document.getElementById("register-password" );
  const confirmPassword = document.getElementById('confirm-password');
  const btnSignup = document.getElementById('signup');
  const loading = document.getElementById('loading');
  const AE = document.getElementById("any-error");
  const closeAE = document.getElementById("any-error-close");
  const BS = document.getElementById('blank-space');
  const closeBS = document.getElementById('blank-space-close');
  const IM = document.getElementById("invalid-email");
  const closeIM = document.getElementById("invalid-email-close");
  const DP = document.getElementById("different-pass")
  const closeDP = document.getElementById("different-pass-close")
  const ER = document.getElementById("email-registered")
  const closeER = document.getElementById("email-registered-close")

  closeDP.addEventListener("click", async() => {
    DP.style.display = "none"
  });

  closeER.addEventListener("click", async() => {
    ER.style.display = "none"
  });

  closeAE.addEventListener("click", async() => {
    AE.style.display = "none"
  });

  closeBS.addEventListener("click", async() => {
    BS.style.display = "none"
  });

  closeIM.addEventListener("click", async() => {
    IM.style.display = "none"
  });


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
        BS.style.display = "flex";

      }else if (err === 'different-passwords') {
        // Password and confirm passwords are differents
        DP.style.display = "flex";

      } else if (err.code === 'auth/email-already-in-use') {
        // There's a same email registered
        ER.style.display = "flex";

      } else if (err.code === 'auth/invalid-email') {
        // Email entered is invalid
        IM.style.display = "flex";

      } else {
        // When any other error happens
        AE.style.display = "flex";
      }
    }finally{
      loading.style.display = "none";
    }
  })
}