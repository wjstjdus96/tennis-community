import { useEffect, useRef, useState } from "react";
import { FaCamera } from "@react-icons/all-files/fa/FaCamera";
import styled from "styled-components";
import { IImageInput } from "../../interfaces/IComponent";
import ErrorMsg from "./ErrorMsg";

export default function ImageInput({
  name,
  text,
  register,
  setValue,
  watch,
  getValues,
  errorMsg,
}: IImageInput) {
  console.log(getValues(name));
  const [imageNum, setImageNum] = useState(0);
  const [imageList, setImageList] = useState<string[]>([]);
  const { ref, ...rest } = register(name);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const currentImages = watch(name);
  const max_count = 5;

  const onClickUploadImages = () => {
    inputRef.current?.click();
  };

  const removeImage = (removeIdx: number) => {
    const images = Array.from(getValues(name));
    const value = images.filter((image: any, idx: number) => idx != removeIdx);
    setValue(name, value);
  };

  useEffect(() => {
    if (currentImages) {
      setImageList([]);
      if (currentImages.length > max_count) {
        setValue(name, []);
        window.alert("최대 가능 개수를 초과하였습니다");
        return;
      }
      setImageNum(currentImages.length);
      if (currentImages.length > 0) {
        if (typeof currentImages[0] == "string") {
          currentImages.map((image: string) =>
            setImageList((prev) => [...prev, image])
          );
        } else {
          for (const image of currentImages) {
            const convertToUrl = URL.createObjectURL(image);
            setImageList((prev) => [...prev, convertToUrl]);
          }
        }
      }
    }
  }, [currentImages]);

  return (
    <Wrapper>
      <label>{text}</label>

      <ImageList>
        <UploadImageBox onClick={onClickUploadImages}>
          <FaCamera size={40} />
          <div>{imageNum} / 5</div>
          <input
            {...rest}
            name={name}
            ref={(e) => {
              ref(e);
              inputRef.current = e;
            }}
            type="file"
            multiple
            accept="image/jpg, image/jpeg, image/png"
          />
        </UploadImageBox>
        {imageList.map((image: string, idx) => (
          <ImageBox>
            <img src={image} />
            <span onClick={() => removeImage(idx)}>&times;</span>
          </ImageBox>
        ))}
      </ImageList>
      {errorMsg && <ErrorMsg errorMsg={errorMsg} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  label {
    color: grey;
    font-size: 15px;
    margin-bottom: 15px;
  }
`;

const ImageList = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const UploadImageBox = styled.div`
  min-width: 8rem;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  box-shadow: 0 0 0 3px gray inset;
  cursor: pointer;
  font-size: 13px;
  color: gray;
  input {
    display: none;
  }
`;

const ImageBox = styled.div`
  position: relative;
  display: inline-block;
  img {
    width: 8rem;
    height: 8rem;
    object-fit: cover;
  }
  span {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(128, 128, 128, 0.5);
    border-radius: 50%;
    width: 15px;
    height: 15px;
    margin: 5px 5px 0 0;
    color: #fff;
    cursor: pointer;
    font-size: 12px;
  }
`;
