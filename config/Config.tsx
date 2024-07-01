// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJCtzX4a8dA-jv6_hNYSQT7_Jhj8Fp41Q",
  authDomain: "app-1-cd8e0.firebaseapp.com",
  databaseURL: "https://app-1-cd8e0-default-rtdb.firebaseio.com",
  projectId: "app-1-cd8e0",
  storageBucket: "app-1-cd8e0.appspot.com",
  messagingSenderId: "375713672021",
  appId: "1:375713672021:web:85ccfa9dfa9d86c882dddc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);