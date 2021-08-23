const { auth, db } = require("./config.js");

// Log in with email and password
const loginEmailAndPass = (email, pass) => {
  const promise = auth.signInWithEmailAndPassword(email, pass);
  return promise;
};

// Logout
const logout = () => {
  auth.signOut();
};

// Get all users 
const getUsers = async () => {
  const users = await db.collection("users").get();
  return users.docs.map((user) => user.data());
}

// User Registration
const registration = async(user) => {
  if(user.pass !== user.confirmPass) throw 'error-different-passwords';

  const users = await getUsers();

  // Verify that the user exists
  if(users.some(a => a.email === user.email)) throw 'error-same-email';

  const response = await auth.createUserWithEmailAndPassword(
    user.email,
    user.pass
  );

  const uid = response.user.uid;

  const data = {
    uid,
    email: user.email
  }

  return db.collection('users').doc(uid).set(data);
}

const updateUser = async (user, newUser) => {
  const promise = db
    .collection('users') 
    .doc(user.uid)
    .update(newUser);
  return promise;
};

module.exports = {
  loginEmailAndPass,
  logout,
  getUsers,
  registration,
  updateUser,
}