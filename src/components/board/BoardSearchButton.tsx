import { IoSearch } from "@react-icons/all-files/io5/IoSearch";
import styled from "styled-components";

export default function BoardSearchButton({
  toggleDropdown,
}: {
  toggleDropdown: () => void;
}) {
  return (
    <Wrapper>
      <ButtonBox>
        <IoSearch onClick={toggleDropdown} />
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
