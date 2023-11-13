import styled from "styled-components";
import { HiOutlineSortDescending, HiPencil } from "react-icons/hi";
import { IBoardFilter } from "../../interfaces/IComponent";

export default function BoardFilter({
  filterType,
  setFilterType,
  isExpanded,
  setIsExpanded,
}: IBoardFilter) {
  const filterTypeList = [
    ["최신순", "createdAt"],
    ["북마크순", "bookmarkNum"],
    ["댓글순", "commentNum"],
  ];
  const handleClickFilter = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleBlurFilter = () => {
    setTimeout(() => {
      setIsExpanded(false);
    }, 200);
  };

  const changeFilterType = (type: string[]) => {
    setFilterType(type);
    setIsExpanded(false);
  };

  return (
    <Wrapper onBlur={handleBlurFilter}>
      <SelectedType onClick={handleClickFilter}>
        <HiOutlineSortDescending className="filterIcon" size="18" />
        <div>{filterType[0]}</div>
      </SelectedType>
      {isExpanded && (
        <Dropdown>
          {filterTypeList.map((filterType: string[]) => (
            <DropdownItem onClick={() => changeFilterType(filterType)}>
              {filterType[0]}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-width: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  position: relative;
`;

const SelectedType = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 7px 13px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.green[2]};
  font-size: 14px;
  &:hover {
    outline: 1px solid ${(props) => props.theme.green[2]};
  }
  .filterIcon {
    margin-right: 5px;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 45px;
  background-color: white;
  z-index: 1;
  border-radius: 10px;
`;
const DropdownItem = styled.div`
  padding: 8px 19px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.green[2]};
  }
`;
