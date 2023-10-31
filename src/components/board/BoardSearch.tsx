import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IBoardSearch } from "../../interfaces/IComponent";

export function BoardSearch({
  keyword,
  setKeyword,
  setSearchKeyword,
}: IBoardSearch) {
  const navigate = useNavigate();
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      setSearchKeyword(keyword);
      keyword
        ? navigate(`/community?search=${keyword}`)
        : navigate(`/community`);
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
    padding: 9px 20px 9px 28px;
  }
  input:focus {
    outline: 2px solid ${(props) => props.theme.green[2]};
  }
  .searchIcon {
    position: absolute;
    top: 10px;
    left: 8px;
  }
`;
