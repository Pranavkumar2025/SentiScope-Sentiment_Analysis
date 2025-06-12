// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC_gU0fHtCx8PDmn3zPKeFuDtae7tPTfYc",
//   authDomain: "sentisense-de7be.firebaseapp.com",
//   projectId: "sentisense-de7be",
//   storageBucket: "sentisense-de7be.firebasestorage.app",
//   messagingSenderId: "622916677990",
//   appId: "1:622916677990:web:06e7fb0e1da59bdda818a7",
//   measurementId: "G-SECJDHLR9X"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// 📁 firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_gU0fHtCx8PDmn3zPKeFuDtae7tPTfYc",
  authDomain: "sentisense-de7be.firebaseapp.com",
  projectId: "sentisense-de7be",
  storageBucket: "sentisense-de7be.firebasestorage.app",
  messagingSenderId: "622916677990",
  appId: "1:622916677990:web:06e7fb0e1da59bdda818a7",
  measurementId: "G-SECJDHLR9X"
};

export {signOut}
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { app };