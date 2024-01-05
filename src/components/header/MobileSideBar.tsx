import styled, { keyframes } from "styled-components";
import { IoClose } from "@react-icons/all-files/io5/IoClose";
import { header_menu_list } from "../../consts/const";
import { NavLinkStyle } from "./DeskTopHeaderMenu";

export interface IMobileSideBar {
  isExpanded: boolean;
  closeSideBar: () => void;
}

export default function MobileSideBar({
  isExpanded,
  closeSideBar,
}: IMobileSideBar) {
  return (
    <>
      <BackgroundWrapper onClick={closeSideBar}>
        <Wrapper isExpanded={isExpanded}>
          <IoClose onClick={closeSideBar} />
          {header_menu_list.map((menu, idx) => (
            <MenuBox key={idx}>
              <NavLinkStyle to={menu.src}> {menu.name}</NavLinkStyle>
            </MenuBox>
          ))}
        </Wrapper>
      </BackgroundWrapper>
    </>
  );
}

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
`;

const sideBarAnimation = (isExpanded: boolean) => keyframes`
    0% {
        transform: translateX(${isExpanded ? "100%" : "0"});
    }
    100%{
        transform: translateX(${isExpanded ? "0" : "100%"});
    }

`;

const Wrapper = styled.div<{ isExpanded: boolean }>`
  position: absolute;
  right: 0;
  width: 20vw;
  height: 96vh;
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2vh 5vw;
  font-weight: 700;

  & > svg {
    font-size: 20px;
  }

  animation: 0.2s linear ${(props) => sideBarAnimation(props.isExpanded)}
    forwards;
`;

const MenuBox = styled.div`
  align-self: end;
`;
