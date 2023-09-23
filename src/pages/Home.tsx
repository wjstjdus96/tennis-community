import styled, { keyframes } from "styled-components";
import { BiSolidTennisBall } from "react-icons/bi";

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    margin-top: 10px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
  }

  @media (min-width: 992px) and (max-width: 1199px) {
  }

  @media (min-width: 1200px) {
    margin-top: 150px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10vh;
`;

const LogoText = styled.div`
  font-size: 150px;
  font-family: "Allan", cursive;
  letter-spacing: 20px;
  animation: ${fadeIn} 1s ease-in both;
`;

const LogoIcon = styled(BiSolidTennisBall)`
  position: relative;
  font-size: 100px;
  animation: ${bounce} 1s ease-in Infinite Alternate;
`;

const Button = styled.div``;

export default function Home() {
  return (
    <Wrapper>
      <Logo>
        <LogoText>Tenning </LogoText>
        <LogoIcon />
      </Logo>
      <button>로그인</button>
      <div>
        <p>이미 회원이신가요?</p>
        <button>회원가입</button>
      </div>
    </Wrapper>
  );
}
