import styled from "styled-components";
import BookmarkBtn from "./BookmarkBtn";
import { IPostBody } from "../../interfaces/IComponent";
import { useState } from "react";
import { deletePost } from "../../firebase/deleteData";
import { useNavigate } from "react-router-dom";

export function PostBody({
  postTitle,
  postBody,
  bookmarkNum,
  docState,
}: IPostBody) {
  const [isWriter, setIsWriter] = useState(true);
  const navigate = useNavigate();

  const clickDeletePost = () => {
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      deletePost({ collectionName: docState.field, docId: docState.id });
      navigate(`/${docState.field}`);
    }
  };

  const clickEditPost = () => {};

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
      {isWriter && (
        <ButtonsWrapper>
          <Button usage="edit">수정</Button>
          <Button usage="delete" onClick={clickDeletePost}>
            삭제
          </Button>
        </ButtonsWrapper>
      )}
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
  & > div:nth-child(3) {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
  margin-top: 30px;
`;

const Button = styled.button<{ usage: string }>`
  border: none;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: ${(props) => (props.usage == "edit" ? "lightgrey" : "red")};
  color: ${(props) => (props.usage == "edit" ? "black" : "white")};
  font-family: "Noto Sans KR", sans-serif;
  &:hover {
    cursor: pointer;
    box-shadow: 100px 0 0 0 rgba(0, 0, 0, 0.1) inset;
  }
`;
