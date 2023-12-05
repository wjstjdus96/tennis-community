import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IBoardSearch } from "../../interfaces/IComponent";
import { useState } from "react";

export function BoardSearch({ boardField, setSearchKeyword }: IBoardSearch) {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      setSearchKeyword(keyword);
      keyword
        ? navigate(`/${boardField}?search=${keyword}`)
        : navigate(`/${boardField}`);
    }
  };

  return (
    <Search>
      <FiSearch className="searchIcon" />
      <input
        value={keyword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setKeyword(e.target.value);
        }}
        onKeyDown={handleKeyPress}
        placeholder="검색어를 정확하게 입력해주세요"
      />
    </Search>
  );
}

const Search = styled.div`
  position: relative;
  input {
    width: 350px;
    border: 2px solid ${(props) => props.theme.green[1]};
    border-radius: 18px;
    text-indent: 4px;
    padding: 10px 20px 9px 28px;
    &::placeholder {
      font-size: 12px;
    }
  }
  input:focus {
    outline: 2px solid ${(props) => props.theme.green[2]};
  }
  .searchIcon {
    position: absolute;
    top: 11px;
    left: 10px;
  }
`;
