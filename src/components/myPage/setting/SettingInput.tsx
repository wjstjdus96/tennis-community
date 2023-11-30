import styled from "styled-components";

interface ISettingInput {
  label: string;
}

export default function SettingInput({ label }: ISettingInput) {
  return (
    <Wrapper>
      <label htmlFor={label}>{label}</label>
      <input />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  label {
    font-weight: 700;
    color: ${(props) => props.theme.green[3]};
  }

  input {
    border: none;
    background-color: transparent;
    border-bottom: 2px solid ${(props) => props.theme.green[1]};
  }
`;
