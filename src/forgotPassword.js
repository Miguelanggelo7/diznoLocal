const { forgotPassword } = require("./firebase/functions");

const email = document.getElementById("forgot-email");
const emailNext = document.getElementById('send-email');

const IM = document.getElementById('invalid-email-forgot');
const closeIM = document.getElementById('invalid-email-close-forgot');

const UNF = document.getElementById('not-found-forgot');
const closeUNF = document.getElementById('not-found-close-forgot');

const AE = document.getElementById('any-error-forgot');
const closeAE = document.getElementById('any-error-close-forgot');

closeIM.addEventListener('click', () => {
  IM.style.display = 'none';
});

closeUNF.addEventListener('click', () => {
  UNF.style.display = 'none';
});

closeAE.addEventListener('click', () => {
  AE.style.display = 'none';
});

emailNext.addEventListener('click', async () => {
  try {
    // Firebase is going to try to send an email to the email address
    await forgotPassword(email.value);
  } catch (err) {
    console.log(err.code)
    if (err.code === 'auth/invalid-email') {
      IM.style.display = 'flex';

    } else if (err.code === 'auth/user-not-found') {
      UNF.style.display = 'flex';

    } else {
      AE.style.display = 'flex';
    }
  } 
});

