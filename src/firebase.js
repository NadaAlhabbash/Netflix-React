import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword,
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxIAvcmT0NIOxcBH_r84uj9BGft4fYYFY",
  authDomain: "netflix-clone-c23cd.firebaseapp.com",
  projectId: "netflix-clone-c23cd",
  storageBucket: "netflix-clone-c23cd.firebasestorage.app",
  messagingSenderId: "616367578141",
  appId: "1:616367578141:web:8bfaa5005b161b18a77af4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const login = async(email, password) => {
    try {
        signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const logout = () => {
    signOut(auth)
}

export {auth, db, login, signup, logout};