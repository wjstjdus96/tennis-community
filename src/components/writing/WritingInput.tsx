import styled from "styled-components";
import { IWritingInput } from "../../interfaces/IComponent";
import ErrorMsg from "./ErrorMsg";

export default function WritingInput({
  name,
  text = "",
  inputType = "text",
  register,
  errorMsg,
}: IWritingInput) {
  return (
    <Wrapper isBody={name == "body"}>
      <label htmlFor={name}>{text}</label>
      {name == "body" || name == "detail" ? (
        <textarea
          id={name}
          {...register(name)}
          placeholder={`${text}을 입력하세요`}
        />
      ) : (
        <input
          id={name}
          type={inputType}
          {...register(name)}
          placeholder={`${text}을 입력하세요`}
        />
      )}
      {errorMsg && <ErrorMsg errorMsg={errorMsg} />}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ isBody: boolean }>`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  label {
    color: grey;
    font-size: 15px;
    margin-bottom: 15px;
  }
  input,
  textarea {
    display: block;
    font-family: "Noto Sans KR", sans-serif;
    border: none;
    padding: 15px 20px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 1);
  }
  textarea {
    height: 300px;
    resize: none;
    font-family: "Noto Sans KR", sans-serif;
    white-space: pre-wrap;
  }
`;
