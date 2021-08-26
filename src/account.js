window.onload = () => {
  const logoutBtn = document.getElementById('logout');
  const emailInput = document.getElementById('email-user');

  const oldPassword = document.getElementById('old-password');
  const newPassword = document.getElementById('new-password');
  const newPasswordBtn = document.getElementById('save-new-password');

  const emailModalInput = document.getElementById('new-email');
  const password = document.getElementById('password-new-email');

  const closeModalEmail = document.getElementById('close-newMail-modal');
  const newEmailBtn = document.getElementById('save-new-email');

  const IM = document.getElementById('invalid-newEmail');
  const closeIM = document.getElementById('invalid-newEmail-close');

  const FM = document.getElementById('found-email');
  const closeFM = document.getElementById('found-email-close');

  const AE = document.getElementById('any-error-newEmail');
  const closeAE = document.getElementById('any-error-newEmail-close');

  const SU = document.getElementById('success-update');
  const closeSU = document.getElementById('success-update-close');

  const WP = document.getElementById('wrong-pswd');
  const closeWP = document.getElementById('wrong-pswd-close');

  emailInput.value = localStorage.getItem('currentEmail');
  
  closeModalEmail.addEventListener('click', () => {
    emailModalInput.value = '';
    password.value = '';
  });

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
  });

  closeWP.addEventListener('click', () => {
    WP.style.display = 'none';
  });

  logoutBtn.addEventListener('click', () => {
    const { logout } = require('./firebase/functions');
    logout();
  });

  newEmailBtn.addEventListener('click', async() => {
    const { updateEmail } = require('./firebase/functions');
    
    try {
      await updateEmail(emailInput.value, password.value, emailModalInput.value);

      localStorage.setItem('currentEmail', emailModalInput.value);
      emailInput.value = emailModalInput.value;

      SU.style.display = 'flex';
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        IM.style.display = 'flex';

      } else if (err.code === 'auth/email-already-exists') {
        FM.style.display = 'flex';

      } else if (err.code === 'auth/user-not-found') {
        WP.style.display = 'flex';

      } else {
        AE.style.display = 'flex';
      }
    }
  });
  
  // newPasswordBtn.addEventListener('click', async () => {
  //   const { updatePass } = require('./firebase/functions');

  //   try {

  //   } catch (err) {

  //   }
  // });
}