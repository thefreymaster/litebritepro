import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import theme from "./theme.ts";

// Import the functions you need from the SDKs you need
import { ChakraProvider } from "@chakra-ui/react";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
// @ts-ignore
const analytics = getAnalytics(app);

const [html] = document.getElementsByTagName("html");

html.style.backgroundColor = "#000";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
