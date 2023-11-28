import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Community from "../pages/community/Community";
import CommunityWriting from "../pages/community/CommunityWriting";
import PostDetail from "../pages/community/PostDetail";
import PrivateRoute from "./PrivateRoute";
import MyPage from "../pages/MyPage";
import { Setting } from "../components/myPage/Setting";
import { MyActivities } from "../components/myPage/MyActivities";
import Recruit from "../pages/recruit/Recruit";
import Market from "../pages/market/Market";
import RecruitWriting from "../pages/recruit/RecruitWriting";

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
          <Route path="/community/write" element={<CommunityWriting />} />
          <Route path="/recruit/write" element={<RecruitWriting />} />
          <Route
            path="/community/edit/:postId"
            element={<CommunityWriting />}
          />
        </Route>
        <Route path="/community" element={<Community />} />
        <Route path="/:boardField/:id" element={<PostDetail />} />
        <Route path="/recruit" element={<Recruit />} />
        <Route path="/market" element={<Market />}>
          <Route path=":id" element={<Market />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
