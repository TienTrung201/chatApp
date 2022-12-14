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
        let date;
        let lastActive;
        if (doc.data().lastActive) {
          lastActive = doc.data().lastActive;
        }
        if (doc.data().createdAt) {
          date = doc.data().createdAt;
        }

        let lastActiveDay;
        let lastActiveMonth;
        let lastActiveYear;
        let lastActiveHours;
        let lastActiveMinutes;
        let lastActiveSeconds;
        if (lastActive) {
          // console.log(lastActiveDay);
          lastActiveDay =
            lastActive.toDate().getDate() < 10
              ? `0${lastActive.toDate().getDate()}`
              : lastActive.toDate().getDate();
          lastActiveMonth =
            lastActive.toDate().getMonth() < 10
              ? `0${lastActive.toDate().getMonth()}`
              : lastActive.toDate().getMonth();
          lastActiveYear = lastActive.toDate().getFullYear();
          lastActiveHours =
            lastActive.toDate().getHours() < 10
              ? `0${lastActive.toDate().getHours()}`
              : lastActive.toDate().getHours();
          lastActiveMinutes =
            lastActive.toDate().getMinutes() < 10
              ? `0${lastActive.toDate().getMinutes()}`
              : lastActive.toDate().getMinutes();
          lastActiveSeconds =
            lastActive.toDate().getSeconds() < 10
              ? `0${lastActive.toDate().getSeconds()}`
              : lastActive.toDate().getSeconds();
        }

        let getDay;
        let getMonth;
        let getYear;
        let getHours;
        let getMinutes;

        if (date) {
          getDay =
            date.toDate().getDate() < 10
              ? `0${date.toDate().getDate()}`
              : date.toDate().getDate();
          getMonth =
            date.toDate().getMonth() < 10
              ? `0${date.toDate().getMonth()}`
              : date.toDate().getMonth();
          getYear = date.toDate().getFullYear();
          getHours =
            date.toDate().getHours() < 10
              ? `0${date.toDate().getHours()}`
              : date.toDate().getHours();
          getMinutes =
            date.toDate().getMinutes() < 10
              ? `0${date.toDate().getMinutes()}`
              : date.toDate().getMinutes();
        }
        return {
          ...doc.data(),
          id: doc.id,
          createdAt: `${getDay}/${getMonth}/${getYear} and ${getHours}:${getMinutes}`,
          lastActive: `${lastActiveDay}/${lastActiveMonth}/${lastActiveYear} and ${lastActiveHours}:${lastActiveMinutes}:${lastActiveSeconds}`,
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
      if (collectionName === "users") {
        unsub = onSnapshot(doc(db, collectionName, userId), (doc) => {
          setDocuments(doc.data());
        });
      } else {
        unsub = onSnapshot(doc(db, collectionName, userId), (doc) => {
          setDocuments(
            Object.entries(doc.data()).sort(
              (a, b) => b[1].createdAt - a[1].createdAt
            )
          );
        });
      }
    } catch (e) {
      // console.log(e);
    }
    return unsub; // clear
  }, [collectionName, userId]);
  return documents;
};
export const useFireStoreGetAllData = (collectionName, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, collectionName),
      where(condition.fieldName, condition.operator, condition.compareValue)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const documents = snapshot.docChanges().map((change) => {
        const data = { messages: [] };
        const convertTime = change.doc.data().messages.map((message) => {
          const date = message.createdAt;

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
            ...message,
            createdAt: `${getDay}/${getMonth}/${getYear} and ${getHours}:${getMinutes}`,
          };
        });

        // console.log(change.doc.data());
        convertTime.forEach((dataConvert) => {
          data.messages.push(dataConvert);
        });
        return {
          id: change.doc.id,
          ...data,
        };
      });
      setDocuments(documents);
    });
    return unsubscribe; // clear
  }, [collectionName, condition]);
  return documents;
};
