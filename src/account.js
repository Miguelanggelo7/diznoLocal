window.onload = () => {
  const logoutBtn = document.getElementById('logout');
  const emailInput = document.getElementById('email-user');

  const newEmailBtn = document.getElementById('save-new-email');
  const emailModalInput = document.getElementById('new-email');

  const IM = document.getElementById('invalid-newEmail');
  const closeIM = document.getElementById('invalid-newEmail-close');

  const FM = document.getElementById('found-email');
  const closeFM = document.getElementById('found-email-close');

  const AE = document.getElementById('any-error-newEmail');
  const closeAE = document.getElementById('any-error-newEmail-close');

  const SU = document.getElementById('success-update');
  const closeSU = document.getElementById('success-update-close');


  emailInput.value = localStorage.getItem('currentEmail');
  
  closeAE.addEventListener('click', () => {
    AE.style.display = 'none';
  });

  closeFM.addEventListener('click', () => {
    FM.style.display = 'none';
  });

  closeIM.addEventListener('click', () => {
    IM.style.display = 'none';
  });

  closeSU.addEventListener('click', () => {
    SU.style.display = 'none';
  })

  logoutBtn.addEventListener('click', () => {
    const { logout } = require('./firebase/functions');
    logout();
  });

  newEmailBtn.addEventListener('click', async() => {
    const { updateEmail } = require('./firebase/functions');
    try {
      await updateEmail(emailModalInput.value);
      localStorage.setItem('currentEmail', emailModalInput.value);
      
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        IM.style.display = 'flex';

      } else if (err.code === 'auth/email-already-exists') {
        FM.style.display = 'flex';

      } else {
        AE.style.display = 'flex';

      }
    }
  });
  
}