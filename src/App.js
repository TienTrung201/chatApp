import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //npm i react-router-dom
import { publicRoutes } from "@/routes";
import { DefaultLayout } from "@/components/Layout";
import { Fragment } from "react";
import MyProfile from "./pages/Profile/MyProfile";
import EditProfile from "./pages/Profile/EditProfile";
import MyMusic from "./pages/Profile/MyMusic";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;

            let Layout = DefaultLayout;

            // if (route.layout) {
            //   Layout = route.layout;
            // } else if (route.layout === null) {
            //   Layout = Fragment;
            // }
            if (route.path === "/profile") {
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
