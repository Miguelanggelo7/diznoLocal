const { ipcRenderer } = require('electron')

window.onload = () => { 
  const email = document.getElementById("login-email")
  const password = document.getElementById("login-password")
  const btnlogin = document.getElementById("login")

  btnlogin.onclick = () => {
    
    const user = { email, password };

    ipcRenderer.invoke('login', user);
  }
}