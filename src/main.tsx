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
  apiKey: "AIzaSyCa1_NijEOfeNeSVfxhTkMnpAA0P_29bPo",
  authDomain: "litebritepro.firebaseapp.com",
  databaseURL: "https://litebritepro-default-rtdb.firebaseio.com",
  projectId: "litebritepro",
  storageBucket: "litebritepro.firebasestorage.app",
  messagingSenderId: "504582650378",
  appId: "1:504582650378:web:d3f8d73662fcf8f9c5fdf3",
  measurementId: "G-TG5EZ58K1Y"
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
