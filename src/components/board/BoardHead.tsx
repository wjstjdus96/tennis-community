import styled from "styled-components";
import { IBoardHead } from "../../interfaces/IComponent";

export function BoardHead({ title, summary }: IBoardHead) {
  return (
    <Head>
      <div>{title}</div>
      <div>{summary}</div>
    </Head>
  );
}

const Head = styled.div`
  background-color: #cde4a0;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 15px;
  & > div:last-child {
    font-size: 12px;
    color: grey;
    margin-top: 5px;
  }
`;
