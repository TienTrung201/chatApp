import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "./config";
//  tạo id thủ công
export const setDocument = async (collectionName, data) => {
  try {
    console.log(data.uid);
    await setDoc(doc(db, collectionName, data.uid), {
      ...data,
      createdAt: serverTimestamp(),
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
//id tạo random
export const addDocument = async (collectionName, data) => {
  try {
    await addDoc(collection(db, collectionName), {
      ...data,
      day: serverTimestamp(),
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
