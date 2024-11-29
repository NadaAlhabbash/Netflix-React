import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAxIAvcmT0NIOxcBH_r84uj9BGft4fYYFY",
  authDomain: "netflix-clone-c23cd.firebaseapp.com",
  projectId: "netflix-clone-c23cd",
  storageBucket: "netflix-clone-c23cd.firebasestorage.app",
  messagingSenderId: "616367578141",
  appId: "1:616367578141:web:8bfaa5005b161b18a77af4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup Function
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    alert("Signup successful!");
  } catch (error) {
    // console.error("Signup Error:", error);
    toast.error(error.code.split('/')[1].split('-').join(" ")); // Alert the error message directly
  }
};

// Login Function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login Error:", error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

// Logout Function
const logout = () => {
  try {
    signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

export { auth, db, login, signup, logout };