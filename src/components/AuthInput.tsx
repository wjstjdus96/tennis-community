import styled from "styled-components";
import { Path, UseFormRegister } from "react-hook-form";
import { ILoginValue } from "../pages/Login";

interface IAuthInput {
  name: Path<ILoginValue>;
  text: string;
  inputType?: string;
  register: UseFormRegister<ILoginValue>;
  errorMsg?: string;
}

export default function AuthInput({
  name,
  text,
  inputType = "text",
  register,
  errorMsg,
}: IAuthInput) {
  return (
    <Wrapper>
      <label htmlFor={name}>{name.toUpperCase()}</label>
      <input
        id={name}
        type={inputType}
        {...register(name, { required: true })}
        placeholder={`${text}을 입력하십시오`}
      />
      {errorMsg && <span>{errorMsg}</span>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  label {
    color: #aaa;
    font-size: 15px;
    margin-bottom: 5px;
  }
  input {
    display: block;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 1);
  }
  span {
    margin-top: 3px;
    color: red;
  }
`;
