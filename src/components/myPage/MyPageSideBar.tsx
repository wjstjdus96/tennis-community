import styled from "styled-components";
import defaultProfile from "../../assets/defaultProfile.png";
import { useLocation, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

export function MyPageSideBar() {
  return (
    <Wrapper>
      <img src={defaultProfile} />
      <NickName>닉네임 님</NickName>
      <MyPageMenus>
        <NavLinkStyle to="activities">나의 활동</NavLinkStyle>
        <NavLinkStyle to="setting">설정</NavLinkStyle>
        <div>로그아웃</div>
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
  gap: 40px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const MyPageMenus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  & > div:hover {
    font-weight: 700;
    color: ${(props) => props.theme.green[2]};
    cursor: pointer;
  }
`;

const NickName = styled.div`
  font-size: 20px;
  font-weight: 700;
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
