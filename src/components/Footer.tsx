import styled from "styled-components";
import { BiCopyright } from "@react-icons/all-files/bi/BiCopyright";

export default function Footer() {
  return (
    <Wrapper>
      <div>
        <BiCopyright className="icon" />
      </div>
      copyright
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 13px;
  color: grey;
  padding: 40px 0;
  & > div {
    width: 20px;
    height: 16px;
  }
  .icon {
    width: 20px;
    height: 20px;
  }
`;
