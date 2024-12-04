import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import theme from "./theme.ts";

// Import the functions you need from the SDKs you need
import { ChakraProvider } from "@chakra-ui/react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// @ts-ignore
const analytics = getAnalytics(app);

const [html] = document.getElementsByTagName('html');

html.style.backgroundColor = "#000";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
