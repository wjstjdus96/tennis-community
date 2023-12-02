import { useState } from "react";
import TogglePostsItem from "./TogglePostsItem";
import styled from "styled-components";
import { IField, IFieldItemIds } from "../../../interfaces/IValue";
import { ITogglePostsList } from "../../../interfaces/IComponent";

const fields = [
  { kor: "커뮤니티", eng: "community" },
  { kor: "사람모집", eng: "recruit" },
  { kor: "플리마켓", eng: "market" },
];

export default function TogglePostsList({ fieldPostsIds }: ITogglePostsList) {
  return (
    <Wrapper>
      {fields.map((field: IField) => (
        <TogglePostsItem
          postsIds={fieldPostsIds[field.eng as keyof IFieldItemIds]}
          fieldEng={field.eng}
          fieldKor={field.kor}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 15px;
`;
