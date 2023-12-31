import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import defaultProfile from "../../assets/defaultProfile.png";
import { db } from "../../firebase/firebase";
import { getComments } from "../../firebase/getData";
import { updateOneData, updateUserArrayData } from "../../firebase/updateData";
import { IWritingComment } from "../../interfaces/IComponent";
import { ISetComment } from "../../interfaces/IFunction";
import { userState } from "../../recoil/atom";
import { checkIsLogin } from "../../utils/checkIsLogin";

export function WritingComment({
  collectionName,
  docId,
  setComments,
}: IWritingComment) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISetComment>();
  const isLogin = checkIsLogin();
  const userInfo = useRecoilValue(userState);

  const onClickCommentWriting: SubmitHandler<ISetComment> = async (data) => {
    try {
      let commentData = {
        comment: data.comment,
        createdAt: serverTimestamp(),
        creatorId: userInfo.id,
      };
      const commentRef = collection(db, collectionName, docId, "comments");
      await addDoc(commentRef, commentData).then((docRef) => {
        updateUserArrayData({
          userId: userInfo.id,
          docField: collectionName + "Comment",
          changing: "add",
          arrayItem: docId + "+" + docRef.id,
        });
      });
      setComments([]);
      getComments({
        collectionName: collectionName,
        docId: docId,
        setComments: setComments,
      });
      updateOneData({
        collectionName: collectionName,
        docId: docId,
        docField: "commentNum",
        incrementNum: 1,
      });
      reset();
    } catch (error) {
      alert("댓글 작성을 실패하였습니다");
    }
  };

  return (
    <Wrapper onSubmit={handleSubmit(onClickCommentWriting)}>
      <div>
        <img src={userInfo.photo || defaultProfile} />
        {isLogin ? (
          <textarea
            id="comment"
            {...register("comment")}
            placeholder={"댓글을 입력해주세요"}
          />
        ) : (
          <textarea
            placeholder="로그인 후 작성 가능합니다."
            readOnly
          ></textarea>
        )}
      </div>
      <div>{isLogin ? <button>작성</button> : <div></div>}</div>
    </Wrapper>
  );
}

const Wrapper = styled.form`
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
    object-fit: cover;
  }
  textarea {
    width: 100%;
    height: 50px;
    resize: none;
    padding: 5px;
    font-family: "Noto Sans KR", sans-serif;
    white-space: pre-wrap;
  }
  button {
    margin-left: auto;
    margin-bottom: 0;
    padding: 8px 13px;
    border-radius: 10px;
    border: none;
    background-color: ${(props) => props.theme.green[2]};
    font-family: "Noto Sans KR", sans-serif;
    &:hover {
      box-shadow: 100px 0 0 0 rgba(0, 0, 0, 0.1) inset;
      cursor: pointer;
    }
  }
`;
