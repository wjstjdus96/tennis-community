import styled from "styled-components";
import BookmarkBtn from "./BookmarkBtn";
import { IPostBody } from "../../interfaces/IComponent";

export function PostBody({
  postTitle,
  postBody,
  bookmarkNum,
  docState,
}: IPostBody) {
  return (
    <Wrapper>
      <div>{postTitle}</div>
      <div>{postBody}</div>
      <div>
        <BookmarkBtn
          bookmarkNum={bookmarkNum}
          collectionName={docState.field}
          docId={docState.id}
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  white-space: pre-wrap;
  & > div:first-child {
    font-size: 30px;
    margin-bottom: 20px;
    font-weight: 700;
  }
  & > div:last-child {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
`;
