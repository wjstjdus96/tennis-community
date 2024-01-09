import styled from "styled-components";
import { HiOutlineMenu } from "@react-icons/all-files/hi/HiOutlineMenu";
import { useDropDown } from "../../hooks/useDropdown";
import MobileSideBar from "./MobileSideBar";

export default function MobileHeaderMenu() {
  const {
    isExpanded,
    setIsExpanded,
    isExpandedVisibility,
    toggleDropdown,
    clickOutside,
  } = useDropDown();

  return (
    <>
      <Wrapper>
        <HiOutlineMenu onClick={toggleDropdown} />
      </Wrapper>
      {isExpandedVisibility && (
        <MobileSideBar isExpanded={isExpanded} closeSideBar={clickOutside} />
      )}
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  & > svg {
    padding-right: 1rem;
    font-size: 30px;
    &:hover {
      color: ${(props) => props.theme.green[2]};
      cursor: pointer;
    }
  }
`;
