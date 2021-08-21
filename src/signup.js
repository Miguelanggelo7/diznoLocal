const { ipcRenderer } = require('electron')

window.onload = () => { 
  const email = document.getElementById("register-email")
  const password = document.getElementById("register-password" )
  const confirmPass = document.getElementById('confirm-password')
  const btnSignup = document.getElementById('signup')

  if(password !== confirmPass){
    //TODO son diferentes
  }

  btnSignup.onclick = () => {
    
    const user = { email, password };

    ipcRenderer.invoke('signup', user);
  }
}