import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAuth } from "firebase/auth";
import { IWriterInfoC } from "../interfaces/IComponent";
import { IWriterInfo } from "../interfaces/IValue";
import { getWriterInfo } from "../firebase/getData";
import defaultProfile from "../../assets/defaultProfile.png";

export default function WriterInfo({ writerId, isPostDetail }: IWriterInfoC) {
  const [writerInfo, setWriterInfo] = useState<IWriterInfo>({
    id: "",
    name: "",
    profileImg: "",
  });

  useEffect(() => {
    getWriterInfo({ userId: writerId, setWriterInfo: setWriterInfo });
  }, []);

  return (
    <>
      {isPostDetail ? (
        <PostDetailWriterInfoWrapper>
          <img src={writerInfo.profileImg} />
          <div>{writerInfo.name}</div>
        </PostDetailWriterInfoWrapper>
      ) : (
        <PostWriterInfoWrapper>
          <img src={writerInfo.profileImg} />
          <div>{writerInfo.name}</div>
        </PostWriterInfoWrapper>
      )}
    </>
  );
}

const PostWriterInfoWrapper = styled.div`
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

const PostDetailWriterInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  img {
    width: 45px;
    height: 45px;
    background-color: white;
    border-radius: 50%;
  }
`;
