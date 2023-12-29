import styled from "styled-components";
import { useCheckIsMobile } from "../../hooks/useCheckIsMobile";
import BoardFilter from "./BoardFilter";
import { BoardSearch } from "./BoardSearch";
import { BoardWritingBtn } from "./BoardWritinBtn";
import { IoSearch } from "react-icons/io5";
import BoardSearchButton from "./BoardSearchButton";
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
  const { isMobile } = useCheckIsMobile();

  return (
    <Wrapper>
      <BoardWritingBtn boardField={boardField} />
      {isMobile ? (
        <BoardSearchButton />
      ) : (
        <BoardSearch
          boardField={boardField}
          setSearchKeyword={setSearchKeyword}
        />
      )}
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

const MobileWrapper = styled.div`
  margin-top: 20px;
  display: flex;
`;
