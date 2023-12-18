import styled from "styled-components";
import { IAuthInput } from "../interfaces/IComponent";
import ErrorMsg from "./writing/ErrorMsg";

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
      {errorMsg && <ErrorMsg errorMsg={errorMsg} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  min-width: 300px;
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
  input:focus {
    outline: 2px solid ${(props) => props.theme.green[1]};
  }
  span {
    margin-top: 3px;
    color: red;
  }
`;
