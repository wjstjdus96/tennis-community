import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

export function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <Header />
      <Body>
        <div></div>
        <div>{children}</div>
        <div></div>
      </Body>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  min-height: 100vh;
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Body = styled.div`
  padding-top: 95px;
  display: grid;

  @media all and (min-width: 360px) and (max-width: 767px) {
    grid-template-columns: 1fr 10fr 1fr;
  }

  @media all and (min-width: 768px) and (max-width: 1200px) {
    grid-template-columns: 1fr 6fr 1fr;
  }

  @media all and (min-width: 1201px) {
    grid-template-columns: 1fr 3fr 1fr;
  }

  & > div {
    overflow-x: auto;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
    min-height: 100%;
  }
`;
