import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  connectFirestoreEmulator,
} from "firebase/firestore";
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

import "./dictionaries/dictionaryEasy.json";
import "./dictionaries/dictionaryMedium.json";
import "./dictionaries/dictionaryHard.json";

function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var data = JSON.parse(httpRequest.responseText);
        if (callback) callback(data);
      }
    }
  };
  httpRequest.open("GET", path);
  httpRequest.send();
}

let dictionaryEasy;
let dictionaryMedium;
let dictionaryHard;

const setDictionaryEasy = (newDict) => (dictionaryEasy = newDict);
const setDictionaryMedium = (newDict) => (dictionaryMedium = newDict);
const setDictionaryHard = (newDict) => (dictionaryHard = newDict);

fetchJSONFile(`./dictionaries/dictionaryEasy.json`, ({ dictionary }) => {
  setDictionaryEasy(dictionary);
});
fetchJSONFile(`./dictionaries/dictionaryMedium.json`, ({ dictionary }) => {
  setDictionaryMedium(dictionary);
});
fetchJSONFile(`./dictionaries/dictionaryHard.json`, ({ dictionary }) => {
  setDictionaryHard(dictionary);
});

const firebaseConfig = {
  apiKey: "AIzaSyD5e0erMOoSw8rzH4AwlWchAsge_AYfqcg",
  authDomain: "alias-the-game-32311.firebaseapp.com",
  projectId: "alias-the-game-32311",
  storageBucket: "alias-the-game-32311.appspot.com",
  messagingSenderId: "208287767948",
  appId: "1:208287767948:web:a0fb9d1eb361115885caa9",
  measurementId: "G-7B7LB30ZEV",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

// connectAuthEmulator(auth, "http://localhost:9099");
// connectFirestoreEmulator(db, "localhost", 8081);

export const signInWithEmail = async (loginEmail, loginPassword) => {
  await signInWithEmailAndPassword(auth, loginEmail, loginPassword).catch(
    (error) => {
      alert(error.message);
    }
  );
};

export const signUpWithEmail = async (loginEmail, loginPassword) => {
  if (!loginEmail.trim()) return;

  await createUserWithEmailAndPassword(auth, loginEmail, loginPassword).catch(
    (error) => {
      alert(error.message);
    }
  );
};

export const getIfLoggedIn = () => !!auth.currentUser;

export const monitorAuthState = async (callback) =>
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const docRef = doc(db, "users", user.uid);

      getDoc(docRef)
        .then((doc) => {
          if (!doc.data()) {
            setDoc(docRef, { savedGameData: null });
          }
        })
        .finally(() =>
          getDoc(docRef).then((doc) => {
            callback({
              hasSavedGame: !!doc.data().savedGameData,
              id: user.uid,
              isSignedIn: true,
              name: user.displayName,
            });
          })
        );
    } else {
      callback({});
    }
  });

export const redirectGoogleSignUp = async () =>
  signInWithRedirect(auth, provider).catch((error) => {
    alert(error.message);
  });

export const signOutFromApp = async () => {
  await signOut(auth);
};

export const fetchGameData = async (id, setData) => {
  const docRef = doc(db, "users", id);

  await getDoc(docRef).then((doc) => {
    if (doc.data()) {
      setData(doc.data().savedGameData);
    }
  });
};

export const backUpGameData = async ({ id }, gameData) => {
  const docRef = doc(db, "users", id);
  await setDoc(docRef, { savedGameData: gameData });
};

export const deleteSavedGame = async (userData) => {
  const docRef = doc(db, "users", userData.id);
  await setDoc(docRef, { savedGameData: null });
};

export const getDictionary = (difficulty) =>
  difficulty === 0
    ? dictionaryEasy
    : difficulty === 1
    ? dictionaryMedium
    : dictionaryHard;

export const getWords = (dictionary, count) => {
  const words = new Set();
  while (words.size !== count) {
    const word = dictionary[Math.floor(Math.random() * dictionary.length)];
    words.add(word);
  }
  return [...words];
};
