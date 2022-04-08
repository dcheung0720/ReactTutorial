// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import React, { useState, useEffect } from 'react';
import{ getDatabase, onValue, ref} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoHbUDSAXEzaNOplMcd3SqieXKtKSHjDc",
  authDomain: "react-tutorial-861c7.firebaseapp.com",
  databaseURL: "https://react-tutorial-861c7-default-rtdb.firebaseio.com",
  projectId: "react-tutorial-861c7",
  storageBucket: "react-tutorial-861c7.appspot.com",
  messagingSenderId: "417103694726",
  appId: "1:417103694726:web:4dc4a51e4f1688b7a2ba07",
  measurementId: "G-ZZE8CNQZ16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };