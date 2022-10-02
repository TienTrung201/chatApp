import { auth } from "@/firebase/config";
import { useFireStore, useFireStoreGetAllData } from "@/hooks/useFirestor";
import chatSlice from "@/pages/Chat/ChatSlice";
import userSlice from "@/pages/Login/UserSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AppCheckLofgin({ children }) {
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const [countCheckUser, setCountCheckUser] = useState(0);
  const conditionUser = useMemo(() => {
    return {
      fieldName: "displayName",
      operator: "!=",
      compareValue: "getAll",
    };
  }, []);

  const users = useFireStore("users", conditionUser);
  useEffect(() => {
    if (countCheckUser > 1) {
      return;
    }
    const unsubscibed = auth.onAuthStateChanged((user) => {
      if (user) {
        setCountCheckUser((prev) => prev + 1);
        const { displayName, email, uid, photoURL } = user;
        console.log("Dispatch user");
        Dispatch(
          userSlice.actions.setUser({
            displayName,
            email,
            uid,
            photoURL,
          })
        );
        return;
      } else {
        Dispatch(userSlice.actions.setUser({}));
        // setTimeout(() => {
        navigate("/login");
        // }, 1500);
        console.log({ user });
      }
      return () => {
        unsubscibed();
      };
    });
  }, [Dispatch, countCheckUser, navigate]);
  useEffect(() => {
    Dispatch(userSlice.actions.setUsers(users));
    console.log("Dispatch users");
  }, [users, Dispatch]);
  const conditionChats = useMemo(() => {
    return {
      fieldName: "messages",
      operator: "not-in",
      compareValue: ["nothing:))"],
    };
  }, []);
  const message = useFireStoreGetAllData("chats", conditionChats);
  useEffect(() => {
    if (message.length === 1) {
      Dispatch(chatSlice.actions.addMessage(message[0]));
      console.log("Dispatch add messages");
    } else {
      Dispatch(chatSlice.actions.setAllMessage(message));
      console.log("Dispatch all messages");
    }
  }, [message, Dispatch]);
  return children;
}

export default AppCheckLofgin;
