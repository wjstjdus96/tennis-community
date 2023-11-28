import styled from "styled-components";
import { getDateTime, getElapsedTime } from "../../utils/getTime";
import { IPostHead } from "../../interfaces/IComponent";
import PostWriter from "../home/PostWriter";

export function PostHead({ writerId, createdAt }: IPostHead) {
  return (
    <Wrapper>
      <PostWriter writerId={writerId} isPostDetail={true} />
      <div>{getDateTime(createdAt)}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div:last-child {
    font-size: 13px;
  }
`;
