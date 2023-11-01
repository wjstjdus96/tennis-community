import { useEffect, useState } from "react";
import styled from "styled-components";
import { getImage } from "../../firebase/getImage";
import { getElapsedTime } from "../../utils/getElapsedTime";
import { ICommentCard } from "../../interfaces/IComponent";
import { EditDeleteBtn } from "../post/EditDeleteBtns";

export default function CommentCard({ comment }: ICommentCard) {
  const [profileImg, setProfileImg] = useState("");
  const [isWriter, setIsWriter] = useState(false);

  useEffect(() => {
    getImage({ imageURL: comment.creatorPhotoURL, setImage: setProfileImg });
  }, []);

  return (
    <Wrapper>
      <InfoWrapper>
        <div>
          <img src={profileImg} />
          <div>{comment.creatorName}</div>
        </div>
        <div>
          <div>{getElapsedTime(comment.createdAt.seconds)}</div>
          {isWriter && (
            <EditDeleteBtn
              clickDelelteBtn={() => console.log("삭제")}
              clickEditBtn={() => console.log("수정")}
            />
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
