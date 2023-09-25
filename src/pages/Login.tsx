import styled from "styled-components";
import { BiSolidTennisBall } from "react-icons/bi";
import { Link } from "react-router-dom";
import AuthInput from "../components/AuthInput";

export default function Login() {
  return (
    <Wrapper>
      <Logo>
        TENNING
        <BiSolidTennisBall />
      </Logo>
      <Box>
        <Title>로그인</Title>
        <div>
          <AuthInput id="id" name="아이디" />
          <AuthInput id="password" name="비밀번호" />
          <SubmitBtn>로그인</SubmitBtn>
        </div>
        <hr />
        <Others>
          <div>아직 회원이 아니신가요?</div>
          <Link to="/signup">회원가입</Link>
        </Others>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: linear-gradient(-45deg, #eff6e0 50%, #cde4a0 50%);
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  font-size: 50px;
  font-family: "Allan", cursive;
  margin-bottom: 20px;
  letter-spacing: 20px;
  svg {
    color: #9bc940;
  }
`;

const Box = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  border-radius: 30px;
  padding: 30px 70px;
  background-color: rgb(255, 255, 255, 0.5);
  font-family: "Do Hyeon", sans-serif;
`;

const Title = styled.div`
  font-size: 30px;
  text-align: center;
  margin-bottom: 10px;
`;

const SubmitBtn = styled.div`
  margin: 30px 0px;
  box-sizing: border-box;
  appearance: none;
  background-color: #9bc940;
  padding: 0.8em 2em;
  border-radius: 20px;
  text-decoration: none;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  border: 2px solid #9bc940;
  transition: background-color 300ms ease-in-out, color 300ms ease-in-out;
  &:hover {
    background-color: transparent;
  }
`;

const Others = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  div {
    margin-right: 10px;
  }
  a {
    text-underline-offset: 2px;
  }
`;
