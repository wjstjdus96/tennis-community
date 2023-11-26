import styled from "styled-components";
import { Controller } from "react-hook-form";

interface ISelectRecruitType {
  name: any;
  control: any;
}

export function SelectRecruitType({ name, control }: ISelectRecruitType) {
  return (
    <Wrapper>
      <label htmlFor={name}>모집유형</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select {...field}>
            <option value="" selected disabled hidden>
              ---선택---
            </option>
            <option value="회원">회원</option>
            <option value="게스트">게스트</option>
            <option value="기타">기타</option>
          </select>
        )}
      ></Controller>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  width: 100px;
  label {
    color: grey;
    font-size: 15px;
    margin-bottom: 15px;
  }
  select {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background: rgba(255, 255, 255, 1);
  }
`;
