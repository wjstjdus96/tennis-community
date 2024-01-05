import { IoLogInOutline } from "@react-icons/all-files/io5/IoLogInOutline";
import { IoTennisballSharp } from "@react-icons/all-files/io5/IoTennisballSharp";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import defaultProfile from "../../assets/defaultProfile.png";
import { useCheckIsMobile } from "../../hooks/useCheckIsMobile";
import { userState } from "../../recoil/atom";
import { checkIsLogin } from "../../utils/checkIsLogin";
import DeskTopHeaderMenu from "./DeskTopHeaderMenu";
import MobileHeaderMenu from "./MobileHeaderMenu";

export default function Header() {
  const isLogin = checkIsLogin();
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate();

  const onClickMyPageButton = () => {
    navigate("/my-page/activities?field=writing");
  };

  const onClickStartButton = () => {
    navigate("/login");
  };

  const { isMobile } = useCheckIsMobile();

  return (
    <Wrapper>
      <Logo>
        <Link to="/">
          <IoTennisballSharp />
          <div>TENNING</div>
        </Link>
      </Logo>
      {isMobile ? <MobileHeaderMenu /> : <DeskTopHeaderMenu />}
      {isLogin ? (
        <Profile>
          <ProfileBox
            onClick={() => onClickMyPageButton()}
            src={userInfo.photo || defaultProfile}
          />
        </Profile>
      ) : isMobile ? (
        <LoginIcon onClick={() => onClickStartButton()}>
          <IoLogInOutline />
        </LoginIcon>
      ) : (
        <LoginBtn onClick={() => onClickStartButton()}>시작하기</LoginBtn>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  z-index: 5;
  position: fixed;

  @media all and (max-width: 1200px) {
    display: flex;
    justify-content: space-between;
    & > div:first-child {
      margin-left: 1.5rem;
    }
    & > div:last-child {
      margin-right: 1.5rem;
    }
  }

  @media all and (min-width: 1201px) {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
  }

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
  justify-self: center;
  & > a {
    display: flex;
    align-items: center;
    font-family: "Allan", cursive;

    @media all and (max-width: 767px) {
      font-size: 23px;
      letter-spacing: 8px;
    }

    @media all and (min-width: 768px) and (max-width: 1200px) {
      font-size: 23px;
      letter-spacing: 8px;
    }

    @media all and (min-width: 1201px) {
      font-size: 23px;
      letter-spacing: 8px;
    }
  }
  svg {
    color: ${(props) => props.theme.green[2]};
    margin-right: 8px;
  }
`;

const Profile = styled.div`
  display: flex;
  justify-self: center;
  & > a {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ProfileBox = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  background-color: white;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 0 3px;
  }
`;

const LoginIcon = styled.div`
  font-size: 32px;
  display: flex;
  align-items: center;
  & > svg:hover {
    color: ${(props) => props.theme.green[2]};
    cursor: pointer;
  }
`;

const LoginBtn = styled.div`
  justify-self: center;
  width: 120px;
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
