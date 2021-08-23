const { auth, db } = require("./config.js");

// Log in with email and password
export const loginEmailAndPass = (email, pass) => {
  const promise = auth.signInWithEmailAndPassword(email, pass);
  return promise;
};

// Logout
export const logout = () => {
  auth.signOut();
};

// Get all users 
export const getUsers = async () => {
  const users = db.collection("users").get();
  return users.docs.map((user) => user.data());
}

// User Registration
export const registration = async(user) => {
  const users = await getUsers();

  // Verify that the user exists
  if(users.some(a => a.email === user.email)) throw 'error-same-email';

  const response = await auth.createUserWithEmailAndPassword(
    user.email,
    user.pass
  )

  
  
}
