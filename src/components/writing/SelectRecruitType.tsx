import styled from "styled-components";
import { Controller } from "react-hook-form";
import { ISelectRecruitType } from "../../interfaces/IComponent";
import ErrorMsg from "./ErrorMsg";

export function SelectRecruitType({
  name,
  control,
  errorMsg,
}: ISelectRecruitType) {
  return (
    <Wrapper>
      <label htmlFor={name}>모집유형</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <select {...field}>
              <option value="" selected disabled hidden>
                ---선택---
              </option>
              <option value="회원">회원</option>
              <option value="게스트">게스트</option>
              <option value="기타">기타</option>
            </select>
            {errorMsg && <ErrorMsg errorMsg={errorMsg} />}
          </>
        )}
      ></Controller>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  width: 100%;
  label {
    color: grey;
    font-size: 15px;
    margin-bottom: 15px;
  }
  select {
    display: flex;
    width: 100px;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background: rgba(255, 255, 255, 1);
  }
  select:focus {
    border: 2px solid ${(props) => props.theme.green[1]};
  }
  option {
    background: ${(props) => props.theme.green[1]};
  }
`;
