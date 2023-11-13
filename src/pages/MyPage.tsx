import styled from "styled-components";
import { MyPageSideBar } from "../components/myPage/MyPageSideBar";
import { HomeLayout } from "../layouts/HomeLayout";
import { Outlet } from "react-router-dom";

export default function MyPage() {
  return (
    <HomeLayout>
      <Wrapper>
        <MyPageSideBar />
        <MyPageBody>
          <Outlet />
        </MyPageBody>
      </Wrapper>
    </HomeLayout>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 100%;
  /* box-shadow: 0 0 10px; */
  background-color: ${(props) => props.theme.myPageBgColor};
  border-radius: 20px;
  & > div:first-child {
    border-right: 2px solid ${(props) => props.theme.green[1]};
  }
`;

const MyPageBody = styled.div``;
