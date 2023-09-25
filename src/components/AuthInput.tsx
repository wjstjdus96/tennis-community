import styled from "styled-components";

interface IAuthInput {
  id: string;
  name: string;
  value?: string;
}

export default function AuthInput({ id, name, value }: IAuthInput) {
  return (
    <Wrapper>
      <label htmlFor={id}>{id.toUpperCase()}</label>
      <input id={id} placeholder={`${name}을 입력하십시오`} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  label {
    color: #aaa;
    font-size: 18px;
  }
  input {
    display: block;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 1);
  }
`;
