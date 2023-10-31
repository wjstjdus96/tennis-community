import styled from "styled-components";
import { IAuthInput } from "../interfaces/IComponent";

export default function AuthInput({
  name,
  text = "",
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
        placeholder={
          name == "passwordConfirm"
            ? "비밀번호를 한 번 더 입력하십시오"
            : `${text}`
        }
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
    color: grey;
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
