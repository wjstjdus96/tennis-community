import styled from "styled-components";
import Header from "../components/Header";

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
  height: 100%;
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
      {children}
    </AfterLoginWrapper>
  );
}

const AfterLoginWrapper = styled.div`
  background-color: #eff6e0;
  height: 100%;
`;
