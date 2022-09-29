import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAUKdbc1zfIoU901Oa0KG__f27HVa_YREQ",
  authDomain: "chatapp-trung.firebaseapp.com",
  projectId: "chatapp-trung",
  storageBucket: "chatapp-trung.appspot.com",
  messagingSenderId: "945548829384",
  appId: "1:945548829384:web:4fefc54aae5357adf57bfd",
  measurementId: "G-FRT9KHC37G",
};
// import { getAuth } from "firebase/auth";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  // connectStorageEmulatot(storage, "localhost", 9199);
}
export { auth, db };
