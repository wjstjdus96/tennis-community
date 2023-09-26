import styled from "styled-components";
import { BiSolidTennisBall } from "react-icons/bi";

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
  min-height: 400px;
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
