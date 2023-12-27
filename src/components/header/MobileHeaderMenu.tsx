import styled from "styled-components";
import { HiOutlineMenu } from "react-icons/hi";

export default function MobileHeaderMenu() {
  return (
    <Wrapper>
      <HiOutlineMenu />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;

  justify-content: end;
`;
