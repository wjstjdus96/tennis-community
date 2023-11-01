import styled from "styled-components";
import { HomeLayout } from "../layouts/HomeLayout";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getComments } from "../firebase/getComments";
import { useState } from "react";
import CommentCard from "../components/comment/CommentCard";
import { getOnePost } from "../firebase/getPost";
import { IPost } from "../interfaces/IValue";
import { RouteState } from "../interfaces/IFunction";
import { WritingComment } from "../components/comment/WritingComment";
import { PostBody } from "../components/post/PostBody";
import { PostHead } from "../components/post/PostHead";
import { getImage } from "../firebase/getImage";

export default function PostDetail() {
  const state = (useLocation() as RouteState).state;
  const [postData, setPostData] = useState<IPost>();
  const [comments, setComments] = useState([]);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (postData) {
      getImage({ imageURL: postData.creatorImage, setImage: setProfileImage });
    }
  }, [postData]);

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
            writerImage={profileImage}
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
                <CommentCard comment={comment} />
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
