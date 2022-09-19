import Home from "@/pages/Home";
import Chat from "@/pages/Chat";
import Music from "@/pages/Music";

// Public routes
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/Chat", component: Chat },
  { path: "/Music", component: Music },
  // { path: "/upload", component: Upload, layout: HeaderOnly },
  // { path: "/search", component: Search, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
