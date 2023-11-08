import styled from "styled-components";
import BookmarkBtn from "./BookmarkBtn";
import { IPostBody } from "../../interfaces/IComponent";
import { useState } from "react";
import { deletePost } from "../../firebase/deleteData";
import { useNavigate } from "react-router-dom";
import { EditDeleteBtn } from "./EditDeleteBtns";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atom";

export function PostBody({ postData }: IPostBody) {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);

  const clickDeletePost = () => {
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      deletePost({ collectionName: postData.field, docId: postData.id });
      navigate(`/${postData.field}`);
    }
  };

  const clickEditPost = () => {
    navigate(`/${postData.field}/edit/${postData.id}`, {
      state: postData,
    });
  };

  return (
    <Wrapper>
      <div>{postData.title}</div>
      <div>{postData.body}</div>
      <div>
        <BookmarkBtn
          bookmarkNum={postData.bookmarkNum}
          collectionName={postData.field}
          docId={postData.id}
        />
      </div>
      {userInfo.id == postData.creatorId && (
        <EditDeleteBtn
          clickDelelteBtn={clickDeletePost}
          clickEditBtn={clickEditPost}
        />
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
    margin: 30px 0;
    display: flex;
    justify-content: center;
  }
`;
