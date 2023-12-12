import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MyActivities } from "../components/myPage/activities/MyActivities";
import { Setting } from "../components/myPage/setting/Setting";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import PostDetail from "../pages/PostDetail";
import Signup from "../pages/Signup";
import Community from "../pages/community/Community";
import CommunityWriting from "../pages/community/CommunityWriting";
import Market from "../pages/market/Market";
import MarketWriting from "../pages/market/MarketWriting";
import Recruit from "../pages/recruit/Recruit";
import RecruitWriting from "../pages/recruit/RecruitWriting";
import PrivateRoute from "./PrivateRoute";

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
          <Route path="/market/write" element={<MarketWriting />} />
          <Route
            path="/community/edit/:postId"
            element={<CommunityWriting />}
          />
          <Route path="/recruit/edit/:postId" element={<RecruitWriting />} />
        </Route>
        <Route path="/community" element={<Community />} />
        <Route path="/recruit" element={<Recruit />} />
        <Route path="/market" element={<Market />} />
        <Route path="/:boardField/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
