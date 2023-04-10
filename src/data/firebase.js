import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDc-bPEg0kncFXDUZYWjOj7_6Qn_8cdANo",
  authDomain: "cosoria-cocktailapp.firebaseapp.com",
  projectId: "cosoria-cocktailapp",
  storageBucket: "cosoria-cocktailapp.appspot.com",
  messagingSenderId: "751307687495",
  appId: "1:751307687495:web:c938df0abe1bf3224cd362"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);