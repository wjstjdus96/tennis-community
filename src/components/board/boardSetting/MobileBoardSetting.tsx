import styled from "styled-components";
import { useDropDown } from "../../../hooks/useDropdown";
import BoardFilter from "../BoardFilter";
import BoardSearchButton from "../BoardSearchButton";
import { BoardWritingBtn } from "../BoardWritinBtn";
import { BoardSearch } from "../BoardSearch";
import { IBoardSetting } from "./BoardSetting";

export default function MobileBoardSetting({
  boardField,
  setSearchKeyword,
  filterType,
  setFilterType,
}: IBoardSetting) {
  const { isExpanded, isExpandedVisibility, toggleDropdown } = useDropDown();

  return (
    <Wrapper>
      <SettingWrapper>
        <BoardWritingBtn boardField={boardField} />
        <BoardSearchButton toggleDropdown={toggleDropdown} />
        <BoardFilter filterType={filterType} setFilterType={setFilterType} />
      </SettingWrapper>
      {isExpanded && (
        <BoardSearchBox>
          <BoardSearch
            boardField={boardField}
            setSearchKeyword={setSearchKeyword}
          />
        </BoardSearchBox>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SettingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const BoardSearchBox = styled.div`
  & > div {
    display: flex;
    align-self: center;
    padding: 0 5px;
    margin-top: 20px;
    input {
      width: 100%;
    }
  }
`;
