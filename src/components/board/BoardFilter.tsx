import styled, { css } from "styled-components";
import { HiOutlineSortDescending, HiPencil } from "react-icons/hi";
import { IBoardFilter } from "../../interfaces/IComponent";
import { useEffect, useState } from "react";
import { board_filter_type_list } from "../../consts/const";
import { useDropDown } from "../../hooks/useDropdown";
import { keyframes } from "styled-components";

export default function BoardFilter({
  filterType,
  setFilterType,
}: IBoardFilter) {
  const {
    isExpanded,
    isExpandedVisibility,
    setIsExpanded,
    toggleDropdown,
    clickOutside,
  } = useDropDown();

  const changeFilterType = (type: string[]) => {
    setFilterType(type);
    setIsExpanded(false);
  };

  return (
    <Wrapper isBookMarkSort={filterType[0] == "북마크순"}>
      <SelectedType onClick={toggleDropdown} onBlur={clickOutside} tabIndex={0}>
        <HiOutlineSortDescending className="filterIcon" size="18" />
        <div>{filterType[0]}</div>
      </SelectedType>
      {isExpandedVisibility && (
        <Dropdown isExpanded={isExpanded}>
          <div>
            {board_filter_type_list.map((filterType: string[]) => (
              <DropdownItem onMouseDown={() => changeFilterType(filterType)}>
                {filterType[0]}
              </DropdownItem>
            ))}
          </div>
        </Dropdown>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ isBookMarkSort?: boolean }>`
  min-width: ${(props) => (props.isBookMarkSort ? "110px" : "90px")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  position: relative;
`;

const dropdownInAnimation = keyframes`
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
  }
`;

const dropdownOutAnimation = keyframes`
   0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-100%);
  }
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

const Dropdown = styled.div<{ isExpanded: boolean }>`
  position: absolute;
  top: 45px;
  z-index: 1;
  overflow-y: hidden;
  border-radius: 10px;
  & > div {
    ${(props) => {
      return props.isExpanded
        ? css`
            animation: ${dropdownInAnimation} 0.2s ease;
          `
        : css`
            animation: ${dropdownOutAnimation} 0.4s ease;
            animation-fill-mode: forwards;
          `;
    }}
  }
`;

const DropdownItem = styled.div`
  border-radius: inherit;
  padding: 8px 19px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  background-color: white;
  &:hover {
    color: ${(props) => props.theme.green[2]};
  }
`;
