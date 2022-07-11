// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore }  from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAVsufc7JSBe-eCP7Im7AdokBwV7ESErpU",
  authDomain: "chat-vuetify-vue3.firebaseapp.com",
  projectId: "chat-vuetify-vue3",
  storageBucket: "chat-vuetify-vue3.appspot.com",
  messagingSenderId: "162823242323",
  appId: "1:162823242323:web:ab34ada7b3b97830103ca6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = getFirestore(app)

export {auth, db};  