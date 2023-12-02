import styled from "styled-components";
import defaultProfile from "../../assets/defaultProfile.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  IoCaretDownOutline,
  IoEllipsisHorizontalOutline,
} from "react-icons/io5";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userBookmarkState, userState } from "../../recoil/atom";

export function MyPageSideBar() {
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate();
  const resetUserState = useResetRecoilState(userState);
  const resetUserBookmarkState = useResetRecoilState(userBookmarkState);
  const clickLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      resetUserState();
      resetUserBookmarkState();
      sessionStorage.clear();

      navigate("/");
    }
  };

  console.log(userInfo);

  return (
    <Wrapper>
      <img src={userInfo.photo} />
      <UserInfo>
        <div>{userInfo.displayName} 님</div>
        <div>{userInfo.email}</div>
      </UserInfo>
      <MiddleLine>
        <IoEllipsisHorizontalOutline />
      </MiddleLine>
      <MyPageMenus>
        <NavLinkStyle to="activities?field=writing">나의 활동</NavLinkStyle>
        <NavLinkStyle to="setting">설정</NavLinkStyle>
        <div onClick={clickLogout}>로그아웃</div>
      </MyPageMenus>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-width: 100px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
    border-radius: 50%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const MyPageMenus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-weight: 700;
  & > div:hover {
    color: ${(props) => props.theme.green[2]};
    cursor: pointer;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div:first-child {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  & > div:last-child {
    font-size: 12px;
    color: gray;
  }
`;

const NavLinkStyle = styled(NavLink)`
  text-decoration: none;
  color: black;
  &:hover {
    font-weight: 700;
    color: ${(props) => props.theme.green[2]};
    cursor: pointer;
  }
  &.active {
    color: ${(props) => props.theme.green[2]};
    font-weight: 700;
  }
`;

const MiddleLine = styled.div`
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;
