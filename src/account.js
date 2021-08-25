window.onload = () => {
  const logoutBtn = document.getElementById('logout');
  const emailInput = document.getElementById('email-user');

  emailInput.value = localStorage.getItem('currentEmail');
  
  logoutBtn.addEventListener('click', () => {
    const { logout } = require('./firebase/functions');
    logout();
  })
  
}