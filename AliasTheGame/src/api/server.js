// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyD5e0erMOoSw8rzH4AwlWchAsge_AYfqcg",
  authDomain: "alias-the-game-32311.firebaseapp.com",
  projectId: "alias-the-game-32311",
  storageBucket: "alias-the-game-32311.appspot.com",
  messagingSenderId: "208287767948",
  appId: "1:208287767948:web:a0fb9d1eb361115885caa9",
  measurementId: "G-7B7LB30ZEV",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

connectAuthEmulator(auth, "http://localhost:9099");

export const loginEmailPassword = async () => {
  // const loginEmail = email.value;
  // const loginPassword = password.value;

  const loginEmail = "test@test.com";
  const loginPassword = "1234";

  const userCredentials = await signInWithEmailAndPassword(
    auth,
    loginEmail,
    loginPassword
  );
};
