import styled from "styled-components";

interface IComment {
  comment: string;
  createdAt: any;
  creatorId: string;
  creatorName: string;
  creatorURL: string;
  id: string;
}

interface ICommentCard {
  comment: IComment;
}

export default function CommentCard({ comment }: ICommentCard) {
  return <InfoWrapper>{comment.comment}</InfoWrapper>;
}

const InfoWrapper = styled.div``;
