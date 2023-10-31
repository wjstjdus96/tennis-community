import { useEffect, useState } from "react";
import styled from "styled-components";
import { getImage } from "../firebase/getImage";
import { getElapsedTime } from "../utils/getElapsedTime";

export interface IComment {
  comment: string;
  createdAt: any;
  creatorId: string;
  creatorName: string;
  creatorPhotoURL: string;
  id: string;
}

interface ICommentCard {
  comment: IComment;
}

export default function CommentCard({ comment }: ICommentCard) {
  const [profileImg, setProfileImg] = useState("");

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
        <div>{getElapsedTime(comment.createdAt.seconds)}</div>
      </InfoWrapper>
      <div>{comment.comment}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-bottom: 1px solid #9bc940;
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
  & > div:first-child {
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
