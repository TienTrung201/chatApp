import { db } from "@/firebase/config";
import {
  collection,
  //   getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
export const UseFireStore = async (collectionName, condition) => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    let collectionRef = collection(db, collectionName);
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        //neu k co kết thúc
        // reset documents data
        setDocuments([]);
        return;
      }
      // collectionRef = collectionRef.where('fieldName','==','uid')
      collectionRef = query(
        collectionRef,
        where(
          condition.fieldName, //Đường dẫn để so sánh
          condition.operator, // kiểu so sánh
          condition.compareValue //Giá trị để so sánh
        ), // trả về  các id  đó,
        orderBy("createdAt")
      );
    }

    const unsub = onSnapshot(collectionRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(documents);
    });

    return unsub; // clear
  }, [collectionName, condition]);
  return documents; // mảng đối tượng rooms
};
