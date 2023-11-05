import { useParams } from "react-router-dom";
import styled from "styled-components";

export function MyActivities() {
  return (
    <Wrapper>
      <BoxWrapper>
        <Box>
          <div>작성한 게시글 </div>
          <div>3 개</div>
        </Box>
        <Box>
          <div>작성한 댓글</div>
          <div>3 개</div>
        </Box>
        <Box>
          <div>나의 북마크</div>
          <div>3 개</div>
        </Box>
      </BoxWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 40px;
`;

const BoxWrapper = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  min-width: 40px;
  & > div:first-child {
    font-size: 12px;
    &:hover {
      font-weight: 700;
      cursor: pointer;
    }
  }
`;
