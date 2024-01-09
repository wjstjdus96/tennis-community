import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MyActivities } from "../components/myPage/activities/MyActivities";
import { Setting } from "../components/myPage/setting/Setting";
import PrivateRoute from "./PrivateRoute";
import Loading from "../components/Loading";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const MyPage = lazy(() => import("../pages/MyPage"));
const PostDetail = lazy(() => import("../pages/PostDetail"));
const Signup = lazy(() => import("../pages/Signup"));
const Community = lazy(() => import("../pages/community/Community"));
const CommunityWriting = lazy(
  () => import("../pages/community/CommunityWriting")
);
const Market = lazy(() => import("../pages/market/Market"));
const MarketWriting = lazy(() => import("../pages/market/MarketWriting"));
const Recruit = lazy(() => import("../pages/recruit/Recruit"));
const RecruitWriting = lazy(() => import("../pages/recruit/RecruitWriting"));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
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
            <Route path="/market/edit/:postId" element={<MarketWriting />} />
          </Route>
          <Route path="/community" element={<Community />} />
          <Route path="/recruit" element={<Recruit />} />
          <Route path="/market" element={<Market />} />
          <Route path="/:boardField/:id" element={<PostDetail />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
