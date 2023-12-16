import styled from "styled-components";

export default function EmptyPosts() {
  return <Wrapper>게시글이 없습니다</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15rem;
`;
