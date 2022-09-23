import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyAIF19sFBbrRVcYwQna2tmDZ2gHzgVqbzc",
  authDomain: "vue-practice-be951.firebaseapp.com",
  projectId: "vue-practice-be951",
  storageBucket: "vue-practice-be951.appspot.com",
  messagingSenderId: "584147724362",
  appId: "1:584147724362:web:6678de6f753934660a1eb3"
};


initializeApp(firebaseConfig);
const db=getFirestore()
const auth=getAuth()
export {auth,db}