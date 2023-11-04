import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Community from "../pages/Community";
import { Writing } from "../pages/Writing";
import PostDetail from "../pages/PostDetail";
import PrivateRoute from "./PrivateRoute";
import MyPage from "../pages/MyPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route element={<PrivateRoute authentication={false} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<PrivateRoute authentication={true} />}>
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/community/write" element={<Writing />} />
          <Route path="/community/edit/:postId" element={<Writing />} />
        </Route>
        <Route path="/community" element={<Community />} />
        <Route path="/community/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
