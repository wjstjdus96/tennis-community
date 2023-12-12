import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import styled from "styled-components";
import { IImageInput } from "../../interfaces/IComponent";

export default function ImageInput({ name, text, register }: IImageInput) {
  const [imageNum, setImageNum] = useState(0);

  return (
    <Wrapper>
      <label>{text}</label>
      <ImageBox>
        <UploadImageBox>
          <FaCamera size={40} />
          <div>{imageNum} / 5</div>
        </UploadImageBox>
      </ImageBox>
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

const ImageBox = styled.div`
  display: flex;
`;

const UploadImageBox = styled.div`
  width: 8rem;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border: 2px solid gray;
  /* background-color: ${(props) => props.theme.green[0]}; */
  font-size: 13px;
  color: gray;
`;
