import styled from "styled-components";

export function SubmitWritingButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Wrappper>{children}</Wrappper>;
}

const Wrappper = styled.button`
  display: flex;
  align-items: center;
  margin: 20px 0;
  padding: 8px 13px;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => props.theme.green[2]};
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  transition: background-color 300ms ease-in-out, color 300ms ease-in-out;
  &:hover {
    box-shadow: 100px 0 0 0 rgba(0, 0, 0, 0.1) inset;
    cursor: pointer;
  }
`;
