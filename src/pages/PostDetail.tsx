import styled from "styled-components";
import { HomeAfterLoginLayout } from "../layouts/HomeLayout";
import { useLocation } from "react-router-dom";
import { IPost } from "../components/home/Board";

interface RouteState {
  state: IPost;
}

export default function PostDetail() {
  const state = (useLocation() as RouteState).state;

  return (
    <HomeAfterLoginLayout>
      <Wrapper>
        <InfoWrapper></InfoWrapper>
        <DetailWrapper></DetailWrapper>
        <CommentWrapper></CommentWrapper>
      </Wrapper>
    </HomeAfterLoginLayout>
  );
}

const Wrapper = styled.div``;

const InfoWrapper = styled.div``;

const DetailWrapper = styled.div``;

const CommentWrapper = styled.div``;
