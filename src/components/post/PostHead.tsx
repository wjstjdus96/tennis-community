import styled from "styled-components";
import { getElapsedTime } from "../../utils/getElapsedTime";
import { IPostHead } from "../../interfaces/IComponent";

export function PostHead({ writerImage, writerName, createdAt }: IPostHead) {
  return (
    <Wrapper>
      <WriterInfos>
        <img src={writerImage} />
        <div>{writerName}</div>
      </WriterInfos>
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
