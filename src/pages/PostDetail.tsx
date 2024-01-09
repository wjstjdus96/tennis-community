import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import CommentCard from "../components/comment/CommentCard";
import { WritingComment } from "../components/comment/WritingComment";
import { PostBody } from "../components/post/PostBody";
import { PostHead } from "../components/post/PostHead";
import { getComments, getOnePost } from "../firebase/getData";
import { RouteState } from "../interfaces/IFunction";
import { IPostDetail } from "../interfaces/IValue";
import { HomeLayout } from "../layouts/HomeLayout";

export default function PostDetail() {
  const state = (useLocation() as RouteState).state;
  const [postData, setPostData] = useState<IPostDetail>();
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
            writerId={postData.creatorId}
            createdAt={postData.createdAt.seconds}
          />
          <PostBody postData={postData} />
          <div>
            <div>{postData.commentNum}개의 댓글</div>
            <WritingComment
              collectionName={state.field}
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
