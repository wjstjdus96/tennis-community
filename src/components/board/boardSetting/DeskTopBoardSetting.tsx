import styled from "styled-components";
import BoardFilter from "../BoardFilter";
import { BoardSearch } from "../BoardSearch";
import { BoardWritingBtn } from "../BoardWritinBtn";
import { IBoardSetting } from "./BoardSetting";

export default function DeskTopBoardSetting({
  boardField,
  setSearchKeyword,
  filterType,
  setFilterType,
}: IBoardSetting) {
  return (
    <Wrapper>
      <BoardWritingBtn boardField={boardField} />
      <BoardSearch
        boardField={boardField}
        setSearchKeyword={setSearchKeyword}
      />
      <BoardFilter filterType={filterType} setFilterType={setFilterType} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
