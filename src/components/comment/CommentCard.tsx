import { useEffect, useState } from "react";
import styled from "styled-components";
import { getElapsedTime } from "../../utils/getElapsedTime";
import { ICommentCard } from "../../interfaces/IComponent";
import { EditDeleteBtn } from "../post/EditDeleteBtns";
import { getImage } from "../../firebase/getData";
import { deleteComment } from "../../firebase/deleteData";

export default function CommentCard({
  comment,
  collectionName,
  docId,
  getComments,
}: ICommentCard) {
  const [profileImg, setProfileImg] = useState("");
  const [isWriter, setIsWriter] = useState(true);

  useEffect(() => {
    getImage({ imageURL: comment.creatorPhotoURL, setImage: setProfileImg });
  }, []);

  const clickDeleteComment = async () => {
    await deleteComment({
      collectionName: collectionName,
      docId: docId,
      commentId: comment.id,
    });
    await getComments();
  };

  return (
    <Wrapper>
      <InfoWrapper>
        <div>
          <img src={profileImg} />
          <div>{comment.creatorName}</div>
        </div>
        <div>
          <div>{getElapsedTime(comment.createdAt.seconds)}</div>
          {isWriter && <EditDeleteBtn clickDelelteBtn={clickDeleteComment} />}
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
