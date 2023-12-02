import styled from "styled-components";
import { IUserInfoEdit } from "./Setting";
import { Path, UseFormRegister } from "react-hook-form";

interface ISettingInput {
  label: string;
  name: Path<IUserInfoEdit>;
  register: UseFormRegister<IUserInfoEdit>;
  disabled?: boolean;
}

export default function SettingInput({
  name,
  register,
  label,
  disabled,
}: ISettingInput) {
  return (
    <Wrapper>
      <label htmlFor={label}>{label}</label>
      <input {...register(name)} disabled={disabled || false} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  label {
    font-weight: 700;
  }

  input {
    border: none;
    background-color: transparent;
    border-bottom: 2px solid ${(props) => props.theme.green[1]};
  }
`;
