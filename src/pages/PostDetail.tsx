import styled from "styled-components";
import { HomeAfterLoginLayout } from "../layouts/HomeLayout";
import { useLocation } from "react-router-dom";
import { IPost } from "../components/home/Board";
import { useEffect } from "react";
import { getElapsedTime } from "../utils/getElapsedTime";
import { getComments } from "../firebase/getComments";
import { useState } from "react";
import CommentCard from "../components/CommentCard";

interface RouteState {
  state: IPost;
}

export default function PostDetail() {
  const state = (useLocation() as RouteState).state;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments({
      collectionName: "community",
      docId: state.id,
      setComments: setComments,
    });
  }, []);

  return (
    <HomeAfterLoginLayout>
      <Wrapper>
        <InfoWrapper>
          <WriterInfos>
            <img src={state.creatorImage} />
            <div>{state.creatorName}</div>
          </WriterInfos>
          <div>{getElapsedTime(state.createdAt.seconds)}</div>
        </InfoWrapper>
        <DetailWrapper>
          <div>{state.title}</div>
          <div>{state.body}</div>
          <div>
            <button>북마크</button>
          </div>
        </DetailWrapper>
        <CommentWrapper>
          <div>{state.commentNum}개의 댓글</div>
          <WritingComment>
            <div>
              <img src={state.creatorImage} />
              <textarea />
            </div>
            <div>
              <button>작성</button>
            </div>
          </WritingComment>
          {comments.map((comment) => (
            <CommentCard comment={comment} />
          ))}
        </CommentWrapper>
      </Wrapper>
    </HomeAfterLoginLayout>
  );
}

const Wrapper = styled.div`
  & > div {
    margin-bottom: 30px;
  }
`;

const InfoWrapper = styled.div`
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

const DetailWrapper = styled.div`
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
    button {
    }
  }
`;

const CommentWrapper = styled.div``;

const WritingComment = styled.div`
  margin-top: 20px;
  & > div {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
  img {
    width: 30px;
    height: 30px;
    background-color: white;
    border-radius: 50%;
  }
  textarea {
    width: 100%;
    height: 60px;
    resize: none;
    font-family: "Noto Sans KR", sans-serif;
    white-space: pre-wrap;
  }
  button {
    margin-left: auto;
  }
`;
