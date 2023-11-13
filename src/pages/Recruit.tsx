import styled from "styled-components";
import { BoardHead } from "../components/board/BoardHead";
import { HomeLayout } from "../layouts/HomeLayout";

export default function Recruit() {
  return (
    <HomeLayout>
      <BoardHead
        title="사람모집"
        summary="다양한 사람들과 함께 테니스를 즐겨보세요"
      />
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
