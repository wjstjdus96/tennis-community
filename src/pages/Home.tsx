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

const Button = styled.button`
  margin-top: 20px;
  box-sizing: border-box;
  appearance: none;
  background-color: transparent;
  padding: 0.8em 2em;
  border-radius: 20px;
  text-decoration: none;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  border: 2px solid #9bc940;
  transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
  &:hover {
    box-shadow: 0 0 40px 40px #9bc940 inset;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  & > :nth-child(3) {
    grid-column: 1/3;
  }
`;
