import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Community from "../pages/Community";
import { Writing } from "../pages/Writing";
import PostDetail from "../pages/PostDetail";
import PrivateRoute from "./PrivateRoute";
import MyPage from "../pages/MyPage";
import { Setting } from "../components/myPage/Setting";
import { MyActivities } from "../components/myPage/MyActivities";
import Recruit from "../pages/Recruit";
import Market from "../pages/Market";

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
          <Route path="/my-page" element={<MyPage />}>
            <Route path="setting" element={<Setting />} />
            <Route path="activities" element={<MyActivities />} />
          </Route>
          <Route path="/community/write" element={<Writing />} />
          <Route path="/community/edit/:postId" element={<Writing />} />
        </Route>
        <Route path="/community" element={<Community />} />
        <Route path="/community/:id" element={<PostDetail />} />
        <Route path="/recruit" element={<Recruit />}>
          <Route path=":id" element={<Recruit />} />
        </Route>
        <Route path="/market" element={<Market />}>
          <Route path=":id" element={<Market />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
