import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDXcy19S2qWUH2058aHCMXQ9dR8uu3SLwg",
  authDomain: "business-directory-app-fc66e.firebaseapp.com",
  projectId: "business-directory-app-fc66e",
  storageBucket: "business-directory-app-fc66e.appspot.com",
  messagingSenderId: "672137211399",
  appId: "1:672137211399:web:935240b115277064ec04a2",
  measurementId: "G-LZL168LBEN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);