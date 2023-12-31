import { IoEllipsisHorizontalOutline } from "@react-icons/all-files/io5/IoEllipsisHorizontalOutline";
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
      <UserProfileBox>
        <img src={userInfo.photo || defaultProfile} />
        <UserInfo>
          <div>{userInfo.displayName} 님</div>
          <div>{userInfo.email}</div>
        </UserInfo>
      </UserProfileBox>
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

  @media all and (min-width: 360px) and (max-width: 767px) {
    gap: 20px;
  }

  @media all and (min-width: 768px) {
    gap: 30px;
  }
`;

const MyPageMenus = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: 700;
  & > div:hover {
    color: ${(props) => props.theme.green[2]};
    cursor: pointer;
  }

  @media all and (min-width: 768px) {
    flex-direction: column;
  }
`;

const UserProfileBox = styled.div`
  img {
    width: 80px;
    height: 80px;
    margin-bottom: 30px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  @media all and (min-width: 360px) and (max-width: 767px) {
    display: flex;
    align-items: center;
    gap: 20px;
    img {
      width: 70px;
      height: 70px;
      margin-bottom: 0;
    }
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
