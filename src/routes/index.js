import Home from "@/pages/Profile";
import Chat from "@/pages/Chat";
// import Music from "@/pages/Music";
import Login from "@/pages/Login";
import LayoutLogin from "@/components/Layout/DefaultLayout/LoginLayout";

// Public routes
// const publicRoutes = [
//   { path: "/profile", component: Home, active: "profile" },
//   { path: "/", component: Chat, active: "Chat" },
//   { path: "/music", component: Music, active: "Music" },
//   { path: "/login", component: Login, layout: LayoutLogin },
// ];
const publicRoutes = [
  { path: "/", component: Home, active: "profile" },
  { path: "/chat", component: Chat, active: "Chat" },
  { path: "/music", component: Chat, active: "Music" },
  { path: "/login", component: Login, layout: LayoutLogin },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
