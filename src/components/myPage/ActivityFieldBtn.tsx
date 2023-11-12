import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface IActivityFieldBtn {
  curField: string;
  field: string;
  fieldName: string;
  count: number;
}

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
      {/* <div>{count}</div> */}
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
    font-size: 12px;
    text-decoration: none;
    color: black;
    margin-bottom: 5px;
    &:hover {
      font-weight: 700;
      cursor: pointer;
    }
  }
  a.active {
    font-weight: 700;
  }
`;
