import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_JYuuq6E1G_-lF5NB7sP7Lo7izwHkGCQ",
  authDomain: "litebrightpro.firebaseapp.com",
  databaseURL: "https://litebrightpro-default-rtdb.firebaseio.com",
  projectId: "litebrightpro",
  storageBucket: "litebrightpro.firebasestorage.app",
  messagingSenderId: "988263604830",
  appId: "1:988263604830:web:e707ce9388995075d18acf",
  measurementId: "G-1Z3SJXQ2LW",
};

// Initialize Firebase
initializeApp(firebaseConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
