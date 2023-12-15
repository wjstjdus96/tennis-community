import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useLogout } from "../../hooks/useLogout";
import { userState } from "../../recoil/atom";
import defaultProfile from "../../assets/defaultProfile.png";

export function MyPageSideBar() {
  const userInfo = useRecoilValue(userState);
  const clickLogout = useLogout();

  return (
    <Wrapper>
      <img src={userInfo.photo || defaultProfile} />
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
        <div onClick={() => clickLogout()}>로그아웃</div>
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
    object-fit: cover;
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
