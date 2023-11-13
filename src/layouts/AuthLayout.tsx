import styled from "styled-components";
import { BiSolidTennisBall } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function AuthLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Wrapper>
      <Logo>
        TENNING
        <BiSolidTennisBall />
      </Logo>
      <Box>
        <Title>{title}</Title>
        {children}
        <hr />
        <Others>
          {title == "로그인" && (
            <>
              <div>아직 회원이 아니신가요?</div>
              <Link to="/signup">회원가입</Link>
            </>
          )}
          {title == "회원가입" && (
            <>
              <div>이미 회원이신가요?</div>
              <Link to="/login">로그인</Link>
            </>
          )}
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
  font-family: "Noto Sans KR", sans-serif;
  min-height: 100vh;
  background: linear-gradient(
    -45deg,
    ${(props) => props.theme.bgColor} 50%,
    ${(props) => props.theme.green[1]} 50%
  );
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  font-size: 50px;
  font-family: "Allan", cursive;
  margin-bottom: 20px;
  letter-spacing: 20px;
  svg {
    color: ${(props) => props.theme.green[2]};
  }
`;

const Box = styled.div`
  position: relative;
  min-width: 400px;
  min-height: 400px;
  border-radius: 30px;
  padding: 30px 70px;
  background-color: rgb(255, 255, 255, 0.5);
  & > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  hr {
    width: 100%;
  }
`;

const Title = styled.div`
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
`;

const Others = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  font-weight: 700;
  font-size: 15px;
  div {
    margin-right: 10px;
  }
  a {
    text-underline-offset: 2px;
  }
`;