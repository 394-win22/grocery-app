import { useState, useEffect } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { wait } from "@testing-library/user-event/dist/utils";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6ZcnDxn9w3RNr0yBRD_S1j1ojwmhJP_Y",
  authDomain: "shared-grocery-61ed7.firebaseapp.com",
  databaseURL: "https://shared-grocery-61ed7-default-rtdb.firebaseio.com",
  projectId: "shared-grocery-61ed7",
  storageBucket: "shared-grocery-61ed7.appspot.com",
  messagingSenderId: "737373362660",
  appId: "1:737373362660:web:605abec84fd0e2db274ff1",
  measurementId: "G-SX3RKCQKBD",
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

const storeUserInfo = (user) => {
  if (!user) {
    return;
  }
  const userInfo = {
    email: user.email,
    display_name: user.displayName,
    photo_url: user.photoURL,
  };

  setData(`users/${user.uid}`, userInfo);
};

export const useUserState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    onIdTokenChanged(getAuth(firebase), (user) => {
      setUser(user);
      wait(100).then((r) => storeUserInfo(user));
    });
  }, []);
  return [user];
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const setData = (path, value) => set(ref(database, path), value);

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    const devMode =
      !process.env.NODE_ENV || process.env.NODE_ENV === "development";
    if (devMode) {
      console.log(`loading ${path}`);
    }
    return onValue(
      dbRef,
      (snapshot) => {
        const val = snapshot.val();
        if (devMode) {
          console.log(val);
        }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      }
    );
  }, [path, transform]);

  return [data, loading, error];
};
