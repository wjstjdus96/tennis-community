import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

export function HomeBeforeLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BeforeLoginWrapper>{children}</BeforeLoginWrapper>;
}

const BeforeLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(-45deg, #eff6e0 50%, #cde4a0 50%);
`;

export function HomeAfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AfterLoginWrapper>
      <Header />
      <Body>
        <div></div>
        <div>{children}</div>
        <div></div>
      </Body>
      <Footer />
    </AfterLoginWrapper>
  );
}

const AfterLoginWrapper = styled.div`
  background-color: #eff6e0;
  min-height: 100vh;
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Body = styled.div`
  padding-top: 90px;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  & > div {
    overflow-x: auto;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
  }
`;
