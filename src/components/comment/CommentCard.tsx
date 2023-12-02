import styled from "styled-components";
import { getElapsedTime } from "../../utils/getTime";
import { ICommentCard } from "../../interfaces/IComponent";
import { EditDeleteBtn } from "../post/EditDeleteBtns";
import { deleteComment } from "../../firebase/deleteData";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atom";
import { updateUserArrayData } from "../../firebase/updateData";
import WriterInfo from "../WriterInfo";

export default function CommentCard({
  comment,
  collectionName,
  docId,
  getComments,
}: ICommentCard) {
  const userInfo = useRecoilValue(userState);

  const clickDeleteComment = async () => {
    await deleteComment({
      collectionName: collectionName,
      docId: docId,
      commentId: comment.id,
    }).then(() => {
      updateUserArrayData({
        userId: userInfo.id,
        docField: collectionName + "Comment",
        changing: "remove",
        arrayItem: docId + "+" + comment.id,
      });
    });
    await getComments();
  };

  return (
    <Wrapper>
      <InfoWrapper>
        <WriterInfo writerId={comment.creatorId} />
        <div>
          <div>{getElapsedTime(comment.createdAt.seconds)}</div>
          {userInfo.id == comment.creatorId && (
            <EditDeleteBtn clickDelelteBtn={clickDeleteComment} />
          )}
        </div>
      </InfoWrapper>
      <div>{comment.comment}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.green[2]};
  padding: 20px 0;
  & > div:last-child {
    font-size: 15px;
    white-space: pre-wrap;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 13px;
  & > div {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  img {
    width: 30px;
    height: 30px;
    background-color: white;
    border-radius: 50%;
  }
`;
