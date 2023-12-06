import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import defaultProfile from "../../../assets/defaultProfile.png";
import { ISettingProfileImage } from "../../../interfaces/IComponent";

export default function SettingProfileImage({
  name,
  register,
  watch,
  label,
  setValue,
}: ISettingProfileImage) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register(name);
  const [imagePreview, setImagePreview] = useState("");
  const currentImage = watch(name);

  const onClickUploadImage = () => {
    inputRef.current?.click();
  };

  const onClickDeleteImage = () => {
    setValue(name, defaultProfile);
  };

  useEffect(() => {
    if (currentImage && currentImage.length > 0) {
      if (typeof currentImage == "string") setImagePreview(currentImage);
      else {
        setImagePreview(URL.createObjectURL(currentImage[0]));
      }
    }
  }, [currentImage]);

  return (
    <Wrapper>
      <div>{label}</div>
      <img src={imagePreview} />
      <ImageButtonBox>
        <input
          {...rest}
          name={name}
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
          type="file"
          accept="image/jpg, image/jpeg, image/png"
        ></input>
        <ImageButton onClick={onClickUploadImage}>이미지 업로드</ImageButton>
        <ImageButton onClick={onClickDeleteImage}>이미지 삭제</ImageButton>
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
    object-fit: cover;
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

const ImageButton = styled.div`
  padding: 8px 10px;
  border: 2px solid ${(props) => props.theme.green[1]};
  background-color: transparent;
  border-radius: 8px;
  font-weight: 700;
  font-size: 10px;
  font-family: "Noto Sans KR", sans-serif;
  cursor: pointer;
`;
