import { IoTennisballSharp } from "@react-icons/all-files/io5/IoTennisballSharp";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function AuthLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Logo onClick={() => navigate("/")}>
        TENNING
        <IoTennisballSharp />
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
  font-family: "Allan", cursive;
  svg {
    color: ${(props) => props.theme.green[2]};
  }
  cursor: pointer;

  @media all and (min-width: 360px) and (max-width: 767px) {
    margin: 40px 0 20px 0;
    font-size: 50px;
    letter-spacing: 2vw;
  }

  @media all and (min-width: 768px) {
    margin: 20px;
    font-size: 50px;
    letter-spacing: 20px;
  }
`;

const Box = styled.div`
  position: relative;
  border-radius: 30px;
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

  @media all and (min-width: 360px) and (max-width: 767px) {
    min-height: 400px;
    padding: 5vh 5vw;
    margin-bottom: 40px;
  }

  @media all and (min-width: 768px) {
    min-width: 400px;
    min-height: 400px;
    padding: 30px 70px;
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
    color: ${(props) => props.theme.green[2]};
  }
  a:hover {
    color: ${(props) => props.theme.green[3]};
  }
`;
