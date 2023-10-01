import styled, { keyframes } from "styled-components";
import { BiSolidTennisBall } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { auth } from "../firebase/firebase";
import { AuthContext } from "../contexts/authContext";
import { checkIsLogin } from "../utils/checkIsLogin";
import {
  HomeAfterLoginLayout,
  HomeBeforeLoginLayout,
} from "../layouts/HomeLayout";
import Board from "../components/home/Board";

export default function Home() {
  const isLogin = checkIsLogin();

  return (
    <>
      {isLogin ? (
        <HomeAfterLoginLayout>
          <Row>
            <Board />
            <Board />
            <Board />
          </Row>
        </HomeAfterLoginLayout>
      ) : (
        <HomeBeforeLoginLayout>
          <Logo>
            <LogoText>Tenning </LogoText>
            <LogoIcon />
          </Logo>
          <Link to="/login" className="links">
            <Button>시작하기</Button>
          </Link>
        </HomeBeforeLoginLayout>
      )}
    </>
  );
}

const fadeIn = keyframes`
    from {
		opacity: 0;
		transform: translate3d(0, -20%, 0);
	}
	to {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}
`;

const bounce = keyframes`
  0% {
    top: -60px;
  }
  to {
    top:10px;
  } 
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoText = styled.div`
  /* @media (max-width: 767px) {
  }
  @media (min-width: 768px) and (max-width: 991px) {
  }

  @media (min-width: 992px) and (max-width: 1199px) {
  }

  @media (min-width: 1200px) {
  } */
  font-size: 150px;
  font-family: "Allan", cursive;
  letter-spacing: 20px;
  animation: ${fadeIn} 1s ease-in both;
`;

const LogoIcon = styled(BiSolidTennisBall)`
  position: relative;
  font-size: 100px;
  color: #9bc940;
  animation: ${bounce} 1s ease-in Infinite Alternate;
`;

const Button = styled.button`
  margin-top: 20px;
  box-sizing: border-box;
  appearance: none;
  background-color: transparent;
  padding: 0.8em 2em;
  border-radius: 20px;
  text-decoration: none;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  border: 2px solid #9bc940;
  transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
  &:hover {
    box-shadow: 0 0 40px 40px #9bc940 inset;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  & > :nth-child(3) {
    grid-column: 1/3;
  }
`;
