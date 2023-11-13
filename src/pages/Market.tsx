import styled from "styled-components";
import { BoardHead } from "../components/board/BoardHead";
import { HomeLayout } from "../layouts/HomeLayout";

export default function Market() {
  return (
    <HomeLayout>
      <BoardHead title="플리마켓" summary="여러가지 테니스 용품을 나눠보세요" />
      <TempDiv>준비 중인 서비스입니다😭</TempDiv>
    </HomeLayout>
  );
}

const TempDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  font-size: 20px;
`;
