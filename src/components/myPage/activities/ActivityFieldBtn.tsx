import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IActivityFieldBtn } from "../../../interfaces/IComponent";

export function ActivityFieldBtn({
  field,
  fieldName,
  count,
  curField,
}: IActivityFieldBtn) {
  return (
    <Wrapper>
      <NavLink
        to={`?field=${field}`}
        className={({ isActive }) =>
          isActive && curField == field ? "active" : ""
        }
      >
        {fieldName}
      </NavLink>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  min-width: 40px;
  a {
    font-size: 13px;
    text-decoration: none;
    color: black;
    &:hover {
      font-weight: 700;
      cursor: pointer;
    }
  }
  a.active {
    font-weight: 700;
  }
`;
