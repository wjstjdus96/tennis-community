import styled from "styled-components";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { updateOneData } from "../firebase/updateData";
import useDidMountEffect from "../hooks/useDidMountEffect";

interface IBookmarkBtn {
  bookmarkNum: number;
  collectionName: string;
  docId: string;
}

export default function BookmarkBtn({
  bookmarkNum,
  collectionName,
  docId,
}: IBookmarkBtn) {
  const [isChecked, setIsChecked] = useState(false);

  useDidMountEffect(() => {
    isChecked
      ? updateOneData({
          collectionName: collectionName,
          docId: docId,
          docField: "bookmarkNum",
          incrementNum: 1,
        })
      : updateOneData({
          collectionName: collectionName,
          docId: docId,
          docField: "bookmarkNum",
          incrementNum: -1,
        });
  }, [isChecked]);

  const toggleBookmark = async () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <Wrapper isChecked={isChecked} onClick={toggleBookmark}>
      {isChecked ? <FaBookmark /> : <FaRegBookmark />}
      <div>{bookmarkNum}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ isChecked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isChecked ? "rgba(155,201,64,0.9)" : "rgba(155,201,64,0.5)"};

  color: ${(props) => (props.isChecked ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.8)")};
  div {
    align-self: baseline;
  }
  &:hover {
    cursor: pointer;
  }
`;
