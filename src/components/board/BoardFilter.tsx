import styled from "styled-components";
import { HiOutlineSortDescending, HiPencil } from "react-icons/hi";
import { IBoardFilter } from "../../interfaces/IComponent";
import { useState } from "react";
import { board_filter_type_list } from "../../consts/const";
import { useDropDown } from "../../hooks/useDropdown";

export default function BoardFilter({
  filterType,
  setFilterType,
}: IBoardFilter) {
  const { isExpanded, setIsExpanded, toggleDropdown, clickOutside } =
    useDropDown();

  const changeFilterType = (type: string[]) => {
    setFilterType(type);
    setIsExpanded(false);
  };

  return (
    <Wrapper>
      <SelectedType onClick={toggleDropdown} onBlur={clickOutside} tabIndex={0}>
        <HiOutlineSortDescending className="filterIcon" size="18" />
        <div>{filterType[0]}</div>
      </SelectedType>
      {isExpanded && (
        <Dropdown>
          {board_filter_type_list.map((filterType: string[]) => (
            <DropdownItem onMouseDown={() => changeFilterType(filterType)}>
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
