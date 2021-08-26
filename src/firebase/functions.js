const { auth, db } = require("./config.js");


// Log in with email and password
const loginEmailAndPass = (email, pass) => {
  if(email === "" || pass === "") throw 'empty-values';
  const promise = auth.signInWithEmailAndPassword(email, pass);
  return promise;
};

// Logout
const logout = async() => {
  await auth.signOut();
  window.location = 'login.html';
};

// Get current user
const getUser = () => {
  return {email: auth.currentUser.email}
} 

// Get all users 
const getUsers = async () => {
  const users = await db.collection("users").get();
  return users.docs.map((user) => user.data());
}

// Update email
const updateEmail = async (email, password, newEmail) => {
  const login = await auth.signInWithEmailAndPassword(email, password);
  await login.user.updateEmail(newEmail);
  updateUser(auth.currentUser.uid, {
    uid: auth.currentUser.uid,
    email: newEmail,
  });
}

// Update password
const updatePass = async (email, password, newPass) => {
  const login = await auth.signInWithEmailAndPassword(email, password);
  login.user.updatePassword(newPass);
}

// Forgot Password
const forgotPassword = (email) => {
  return auth.sendPasswordResetEmail(email);
}

// User Registration
const registration = async(user) => {
  if(user.email === "" || user.pass === "" || user.confirmPass === "") throw 'empty-values';
  if(user.pass !== user.confirmPass) throw 'different-passwords';

  // Verify that the user exists
  const response = await auth.createUserWithEmailAndPassword(
    user.email,
    user.pass
  );

  const uid = response.user.uid;

  const data = {
    uid,
    email: user.email
  }

  await db.collection('users').doc(uid).set(data);
  localStorage.setItem('currentEmail', data.email);
  window.location = 'index.html';
}

const updateUser = async (uid, newUser) => {
  const promise = db
    .collection('users') 
    .doc(uid)
    .update(newUser);
  return promise;
};

module.exports = {
  getUser,
  loginEmailAndPass,
  logout,
  getUsers,
  registration,
  updateUser,
  forgotPassword,
  updateEmail,
  updatePass
}