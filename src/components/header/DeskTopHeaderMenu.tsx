import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { header_menu_list } from "../../consts/const";

export default function DeskTopHeaderMenu() {
  return (
    <Menu>
      {header_menu_list.map((menu, idx) => (
        <div key={idx}>
          <NavLinkStyle to={menu.src}>{menu.name}</NavLinkStyle>
        </div>
      ))}
    </Menu>
  );
}

const Menu = styled.div`
  display: flex;
  justify-content: baseline;
  font-weight: 700;

  @media all and (min-width: 768px) and (max-width: 1200px) {
    width: 80%;
    padding: 1.5rem;
  }

  div:nth-child(n + 2) {
    position: relative;
    margin-left: 20px;
    padding-left: 20px;
  }
  div:nth-child(n + 2)::after {
    position: absolute;
    left: 0;
    top: 3px;
    content: "";
    width: 1px;
    height: 15px;
    background-color: black;
  }
`;

export const NavLinkStyle = styled(NavLink)`
  text-decoration: none;
  color: black;
  &:hover {
    color: ${(props) => props.theme.green[2]};
    cursor: pointer;
  }
  &.active {
    color: ${(props) => props.theme.green[2]};
  }
`;
