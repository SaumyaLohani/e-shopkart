import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCiv3KGEDCmBH1teBINVTWVXb0G40GqSe8",
    authDomain: "e-shopkart-c1aa4.firebaseapp.com",
    projectId: "e-shopkart-c1aa4",
    storageBucket: "e-shopkart-c1aa4.appspot.com",
    messagingSenderId: "543058318115",
    appId: "1:543058318115:web:135ba8cc5eadfa4f7ff296",
    measurementId: "G-KFGSG0ZSNM"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);