import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { MyPageSideBar } from "../components/myPage/MyPageSideBar";
import { HomeLayout } from "../layouts/HomeLayout";

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
  @media all and (min-width: 360px) and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    & > div:first-child {
      border-bottom: 2px solid ${(props) => props.theme.green[1]};
    }
    min-height: 75vh;
  }

  @media all and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 3fr;
    & > div:first-child {
      border-right: 2px solid ${(props) => props.theme.green[1]};
    }
    min-height: 630px;
  }
  width: 100%;
  background-color: ${(props) => props.theme.myPageBgColor};
  border-radius: 20px;
`;

const MyPageBody = styled.div``;
