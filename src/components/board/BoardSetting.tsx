import styled from "styled-components";
import { BoardWritingBtn } from "./BoardWritinBtn";
import { BoardSearch } from "./BoardSearch";
import BoardFilter from "./BoardFilter";

export interface IBoardSetting {
  boardField: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  filterType: string[];
  setFilterType: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function BoardSetting({
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
