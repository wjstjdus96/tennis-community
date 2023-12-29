import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useDropDown } from "../../hooks/useDropdown";

export default function BoardSearchButton() {
  const {} = useDropDown();

  return (
    <Wrapper>
      <ButtonBox>
        <IoSearch />
      </ButtonBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 15px;
  padding: 7px 13px;
  border-radius: 10px;
  background-color: white;
  font-size: 20px;
  margin-right: 10px;
  border: 1px solid ${(props) => props.theme.green[2]};
  &:hover {
    outline: 1px solid ${(props) => props.theme.green[2]};
  }
`;
