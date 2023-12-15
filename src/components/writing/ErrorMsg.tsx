import styled from "styled-components";

export default function ErrorMsg({ errorMsg }: { errorMsg: string }) {
  return <ErrorMsgWrapper>{errorMsg}</ErrorMsgWrapper>;
}

const ErrorMsgWrapper = styled.span`
  margin-top: 8px;
  color: red;
  font-size: 13px;
`;
