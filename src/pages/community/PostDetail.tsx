import styled from "styled-components";
import { HomeLayout } from "../../layouts/HomeLayout";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import CommentCard from "../../components/comment/CommentCard";
import { IPost } from "../../interfaces/IValue";
import { RouteState } from "../../interfaces/IFunction";
import { WritingComment } from "../../components/comment/WritingComment";
import { PostBody } from "../../components/post/PostBody";
import { PostHead } from "../../components/post/PostHead";
import { getComments, getOnePost } from "../../firebase/getData";

export default function PostDetail() {
  const state = (useLocation() as RouteState).state;
  const [postData, setPostData] = useState<IPost>();
  const [comments, setComments] = useState([]);

  const bringBackComments = () => {
    setComments([]);
    getComments({
      collectionName: state.field,
      docId: state.id,
      setComments: setComments,
    });
  };

  useEffect(() => {
    getOnePost({
      collectionName: state.field,
      docId: state.id,
      setPostData: setPostData,
    });
    getComments({
      collectionName: state.field,
      docId: state.id,
      setComments: setComments,
    });
  }, []);

  return (
    <HomeLayout>
      {postData && (
        <Wrapper>
          <PostHead
            writerImage={postData.creatorImage}
            writerName={postData.creatorName}
            createdAt={postData.createdAt.seconds}
          />
          <PostBody postData={postData} />
          <div>
            <div>{postData.commentNum}개의 댓글</div>
            <WritingComment
              writerImage={postData.creatorImage}
              collectionName="community"
              docId={state.id}
              setComments={setComments}
            />
            <CommentWrapper>
              {comments.map((comment) => (
                <CommentCard
                  comment={comment}
                  collectionName={postData.field}
                  docId={postData.id}
                  getComments={bringBackComments}
                />
              ))}
            </CommentWrapper>
          </div>
        </Wrapper>
      )}
    </HomeLayout>
  );
}

const Wrapper = styled.div`
  & > div {
    margin-bottom: 30px;
  }
`;

const CommentWrapper = styled.div`
  & > div:last-child {
    border: none;
  }
`;
