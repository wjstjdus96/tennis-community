import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAuth } from "firebase/auth";
import { IPostWriter } from "../../interfaces/IComponent";
import { IWriterInfo } from "../../interfaces/IValue";
import { getWriterInfo } from "../../firebase/getData";
import defaultProfile from "../../assets/defaultProfile.png";

export default function PostWriter({ writerId }: IPostWriter) {
  const [writerInfo, setWriterInfo] = useState<IWriterInfo>({
    id: "",
    name: "",
    profileImg: "",
  });

  useEffect(() => {
    getWriterInfo({ userId: writerId, setWriterInfo: setWriterInfo });
  }, []);

  return (
    <Wrapper>
      <img src={writerInfo.profileImg} />
      <div>{writerInfo.name}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  & > :first-child {
    margin-right: 5px;
  }
  img {
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
  }
`;
