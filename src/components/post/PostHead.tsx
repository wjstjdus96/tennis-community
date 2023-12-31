import styled from "styled-components";
import { IPostHead } from "../../interfaces/IComponent";
import { getDateTime } from "../../utils/getTime";
import PostWriter from "../WriterInfo";

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
