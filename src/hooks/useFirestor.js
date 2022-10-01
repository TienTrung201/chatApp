import { db } from "@/firebase/config";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
export const useFireStore = (collectionName, condition) => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    let collectionRef = collection(db, collectionName);
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        //neu k co kết thúc
        // reset documents date
        setDocuments([]);
        return;
      }
      // collectionRef = collectionRef.where('fieldName','==','uid')
      if (condition.compareValue === "getAll") {
        collectionRef = query(
          collectionRef,
          where(
            condition.fieldName, //Đường dẫn để so sánh
            condition.operator, // kiểu so sánh
            condition.compareValue //Giá trị để so sánh
          ) // trả về  các id  đó
        );
      } else {
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
    }

    const unsub = onSnapshot(collectionRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => {
        const date = doc.data().createdAt;

        let getDay;
        let getMonth;
        let getYear;
        let getHours;
        let getMinutes;

        getDay =
          date.toDate().getDate() < 10
            ? `0${date.toDate().getDate()}`
            : date.toDate().getDate();
        getMonth =
          date.toDate().getMonth() < 10
            ? `0${date.toDate().getMonth()}`
            : date.toDate().getDate();
        getYear = date.toDate().getFullYear();
        getHours =
          date.toDate().getHours() < 10
            ? `0${date.toDate().getHours()}`
            : date.toDate().getHours();
        getMinutes =
          date.toDate().getMinutes() < 10
            ? `0${date.toDate().getMinutes()}`
            : date.toDate().getMinutes();
        return {
          ...doc.data(),
          id: doc.id,
          createdAt: `${getDay}/${getMonth}/${getYear} and ${getHours}:${getMinutes}`,
        };
      });
      setDocuments(documents);
    });

    return unsub; // clear
  }, [collectionName, condition]);
  return documents; // mảng đối tượng rooms
};
export const useFireStoreGetFields = (collectionName, userId) => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    let unsub;

    try {
      unsub = onSnapshot(doc(db, collectionName, userId), (doc) => {
        setDocuments(Object.entries(doc.data()));
      });
    } catch (e) {
      console.log(e);
    }
    return unsub; // clear
  }, [collectionName, userId]);
  return documents;
};
