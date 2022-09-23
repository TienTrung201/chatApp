import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //npm i react-router-dom
import { publicRoutes } from "@/routes";
import { DefaultLayout } from "@/components/Layout";
import { Fragment, useEffect, useState } from "react";
import MyProfile from "./pages/Profile/MyProfile";
import EditProfile from "./pages/Profile/EditProfile";
import MyMusic from "./pages/Profile/MyMusic";
import LayoutLogin from "./components/Layout/DefaultLayout/LoginLayout";
import { auth } from "./firebase/config";
import { useDispatch } from "react-redux";
import userSlice from "./pages/Login/UserSlice";

function App() {
  const Dispatch = useDispatch();
  const [countCheckUser, setCountCheckUser] = useState(0);
  useEffect(() => {
    if (countCheckUser > 1) {
      return;
    }
    const unsubscibed = auth.onAuthStateChanged((user) => {
      if (user) {
        setCountCheckUser((prev) => prev + 1);
        console.log({ user });
        const { displayName, email, uid, photoURL } = user;
        Dispatch(
          userSlice.actions.setUser({
            displayName,
            email,
            uid,
            photoURL,
          })
        );
        return;
      }
      return () => {
        unsubscibed();
      };
    });
  }, [Dispatch, countCheckUser]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;

            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = LayoutLogin;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            if (route.path === "/") {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout active={route.active}>
                      <Page active={route.active} />
                    </Layout>
                  }
                >
                  <Route index element={<MyProfile />} />

                  <Route path="myprofile" element={<MyProfile />} />
                  <Route path="editprofile" element={<EditProfile />} />
                  <Route path="mymusic" element={<MyMusic />} />
                </Route>
              );
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout active={route.active}>
                    <Page active={route.active} />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
