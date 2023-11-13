import styled from "styled-components";
import { BiSolidTennisBall } from "react-icons/bi";
import defaultProfile from "../assets/defaultProfile.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { checkIsLogin } from "../utils/checkIsLogin";
import { userState } from "../recoil/atom";
import { useRecoilValue } from "recoil";

export default function Header() {
  const isLogin = checkIsLogin();
  const userInfo = useRecoilValue(userState);

  return (
    <Wrapper>
      <Link to="/">
        <Logo>
          <BiSolidTennisBall />
          <div>TENNING</div>
        </Logo>
      </Link>
      <Menu>
        <div>
          <NavLinkStyle to="/community">커뮤니티</NavLinkStyle>
        </div>
        <div>
          <NavLinkStyle to="/recruit">사람모집</NavLinkStyle>
        </div>
        <div>
          <NavLinkStyle to="/market">플리마켓</NavLinkStyle>
        </div>
      </Menu>
      {isLogin ? (
        <Profile>
          <div>
            <Link to="/my-page/activities?field=writing">
              <img src={userInfo.photo} />
            </Link>
          </div>
        </Profile>
      ) : (
        <Link to="/login" className="links">
          <LoginBtn>시작하기</LoginBtn>
        </Link>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  z-index: 5;
  position: fixed;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  height: 70px;
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};
  border-bottom: 2px solid ${(props) => props.theme.green[1]};
  a {
    margin: 0;
    text-decoration: none;
    color: #000;
  }
`;

const Logo = styled.div`
  display: flex;
  margin-left: 100px;
  padding-right: 10px;
  align-items: center;
  font-size: 23px;
  font-family: "Allan", cursive;
  letter-spacing: 8px;
  svg {
    color: ${(props) => props.theme.green[2]};
    margin-right: 8px;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: baseline;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 16px;
  font-weight: 700;
  div:nth-child(n + 2) {
    position: relative;
    margin-left: 25px;
    padding-left: 25px;
  }
  div:nth-child(n + 2)::after {
    position: absolute;
    left: 0;
    top: 3px;
    content: "";
    width: 1px;
    height: 15px;
    background-color: black;
  }
`;

const Profile = styled.div`
  display: flex;
  margin-right: 100px;
  justify-content: end;
  img {
    width: 24px;
    height: 24px;
    background-color: white;
    padding: 10px;
    border-radius: 50%;
  }
  div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const LoginBtn = styled.button`
  box-sizing: border-box;
  appearance: none;
  background-color: transparent;
  padding: 0.8em 2em;
  border-radius: 20px;
  text-decoration: none;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  font-family: "Noto Sans KR", sans-serif;
  cursor: pointer;
  border: 2px solid ${(props) => props.theme.green[2]};
  transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
  &:hover {
    box-shadow: 0 0 40px 40px ${(props) => props.theme.green[2]} inset;
  }
`;

const NavLinkStyle = styled(NavLink)`
  text-decoration: none;
  color: black;
  &:hover {
    color: ${(props) => props.theme.green[2]};
    cursor: pointer;
  }
  &.active {
    color: ${(props) => props.theme.green[2]};
  }
`;
