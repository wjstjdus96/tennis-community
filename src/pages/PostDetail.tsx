import styled from "styled-components";
import { HomeAfterLoginLayout } from "../layouts/HomeLayout";
import { useLocation } from "react-router-dom";
import { IPost } from "../components/home/Board";
import { useEffect } from "react";
import { getElapsedTime } from "../utils/getElapsedTime";
import { getComments } from "../firebase/getComments";
import { useState } from "react";
import CommentCard, { IComment } from "../components/CommentCard";
import { useForm, SubmitHandler } from "react-hook-form";
import { db } from "../firebase/firebase";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";

interface RouteState {
  state: IPost;
}

interface ISetComment {
  comment: string;
}

export default function PostDetail() {
  const state = (useLocation() as RouteState).state;
  const [comments, setComments] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISetComment>();

  const onClickCommentWriting: SubmitHandler<ISetComment> = async (data) => {
    try {
      let commentData = {
        comment: data.comment,
        createdAt: serverTimestamp(),
        creatorId: "임시id",
        creatorName: "댓글 임시 닉넴",
        creatorPhotoURL: "",
      };
      const commentRef = doc(collection(db, "community", state.id, "comments"));
      await setDoc(commentRef, commentData);
      setComments([]);
      getComments({
        collectionName: "community",
        docId: state.id,
        setComments: setComments,
      });
    } catch (error) {
      alert("댓글 작성을 실패하였습니다");
    }
  };

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
        <div>
          <div>{state.commentNum}개의 댓글</div>
          <WritingComment onSubmit={handleSubmit(onClickCommentWriting)}>
            <div>
              <img src={state.creatorImage} />
              <textarea
                id="comment"
                {...register("comment")}
                placeholder={"댓글을 입력해주세요"}
              />
            </div>
            <div>
              <button>작성</button>
            </div>
          </WritingComment>
          <CommentWrapper>
            {comments.map((comment) => (
              <CommentCard comment={comment} />
            ))}
          </CommentWrapper>
        </div>
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

const CommentWrapper = styled.div`
  & > div:last-child {
    border: none;
  }
`;

const WritingComment = styled.form`
  margin-top: 30px;
  & > div:first-child {
    margin-bottom: 20px;
  }
  & > div {
    display: flex;
    gap: 20px;
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
    margin-bottom: 0;
    padding: 8px 13px;
    border-radius: 10px;
    border: none;
    background-color: #9bc940;
    font-family: "Noto Sans KR", sans-serif;
    &:hover {
      box-shadow: 100px 0 0 0 rgba(0, 0, 0, 0.1) inset;
      cursor: pointer;
    }
  }
`;
