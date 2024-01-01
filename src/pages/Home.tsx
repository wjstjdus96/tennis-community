import styled from "styled-components";
import { HomeLayout } from "../layouts/HomeLayout";
import Board from "../components/home/Board";

export default function Home() {
  return (
    <HomeLayout>
      <Row>
        <Board title="커뮤니티" collectionName="community" />
        <Board title="사람모집" collectionName="recruit" />
        <Board title="플리마켓" collectionName="market" />
      </Row>
    </HomeLayout>
  );
}

const Row = styled.div`
  display: grid;
  gap: 30px;

  @media all and (min-width: 360px) and (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media all and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    & > :nth-child(3) {
      grid-column: 1/3;
    }
  }
`;
