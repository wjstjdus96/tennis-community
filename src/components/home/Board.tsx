import styled from "styled-components";
import Post from "./Post";

export default function Board() {
  return (
    <Wrapper>
      <Head>커뮤니티</Head>
      <Body>
        <Post />
        <Post />
      </Body>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow-x: auto;
`;

const Head = styled.div`
  height: 10px;
  background-color: #cde4a0;
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
`;

const Body = styled.div`
  & > div:last-child {
    border: none;
  }
`;
