import styled from "styled-components";
import SettingProfileImage from "./SettingProfileImage";
import SettingInput from "./SettingInput";

export function Setting() {
  return (
    <Wrapper>
      <SettingProfileImage />
      <SettingInput label="닉네임" />
      <SettingInput label="이메일" />
      <SettingInput label="비밀번호" />
      <EditInfoButton>정보 수정</EditInfoButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  gap: 30px;
`;

const EditInfoButton = styled.button`
  background-color: ${(props) => props.theme.green[1]};
  border: none;
  color: ${(props) => props.theme.green[3]};
  padding: 8px 10px;
  border-radius: 5px;
  font-weight: 700;
  font-size: 13px;
  font-family: "Noto Sans KR", sans-serif;
`;
