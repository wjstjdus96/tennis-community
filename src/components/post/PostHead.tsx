import styled from "styled-components";
import { getElapsedTime } from "../../utils/getElapsedTime";
import { IPostHead } from "../../interfaces/IComponent";
import PostWriter from "../home/PostWriter";

export function PostHead({ writerId, createdAt }: IPostHead) {
  return (
    <Wrapper>
      <PostWriter writerId={writerId} isPostDetail={true} />
      <div>{getElapsedTime(createdAt)}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WriterInfos = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  img {
    width: 45px;
    height: 45px;
    background-color: white;
    border-radius: 50%;
  }
`;
