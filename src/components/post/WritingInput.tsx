import styled from "styled-components";
import { Path, UseFormRegister } from "react-hook-form";
import { IWritingInput } from "../../interfaces/IComponent";

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
      {name == "body" ? (
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