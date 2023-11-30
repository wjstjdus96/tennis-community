import { useCallback, useRef } from "react";
import styled from "styled-components";
import defaultProfile from "../../../assets/defaultProfile.png";

export default function SettingProfileImage() {
  //   const inputRef = useRef<HTMLInputElement | null>(null);

  //   const uploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (!e.target.files) {
  //       return;
  //     }
  //     console.log(e.target.files);
  //   }, []);

  //   const onClickUploadImageBtn = () => {};

  return (
    <Wrapper>
      <div>프로필 이미지</div>
      <img src={defaultProfile} />
      <ImageButtonBox>
        <input type="file"></input>
        <ImageButton>이미지 업로드</ImageButton>
        <ImageButton>이미지 삭제</ImageButton>
      </ImageButtonBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  & > img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  & > div:first-child {
    align-self: flex-start;
    font-weight: 700;
  }
`;

const ImageButtonBox = styled.div`
  display: flex;
  gap: 10px;
  & > input {
    display: none;
  }
`;

const ImageButton = styled.button`
  padding: 8px 10px;
  border: 2px solid ${(props) => props.theme.green[1]};
  background-color: transparent;
  border-radius: 8px;
  font-weight: 700;
  font-size: 10px;
  font-family: "Noto Sans KR", sans-serif;
`;
