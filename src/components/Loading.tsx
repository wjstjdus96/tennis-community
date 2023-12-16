import styled from "styled-components";
import loading from "../assets/loading-spinner.gif";

export default function Loading() {
  return (
    <LoadingWrapper>
      <img src={loading} alt="로딩중" width="5%" />
    </LoadingWrapper>
  );
}

const LoadingWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffff75;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
