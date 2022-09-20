import Home from "@/pages/Home";
import Chat from "@/pages/Chat";
import Music from "@/pages/Music";

// Public routes
const publicRoutes = [
  { path: "/", component: Home, active: "Home" },
  { path: "/Chat", component: Chat, active: "Chat" },
  { path: "/Music", component: Music, active: "Music" },
  // { path: "/upload", component: Upload, layout: HeaderOnly },
  // { path: "/search", component: Search, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
