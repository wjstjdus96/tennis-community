import { useCheckIsMobile } from "../../../hooks/useCheckIsMobile";
import DeskTopBoardSetting from "./DeskTopBoardSetting";
import MobileBoardSetting from "./MobileBoardSetting";

export interface IBoardSetting {
  boardField: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  filterType: string[];
  setFilterType: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function BoardSetting({
  boardField,
  setSearchKeyword,
  filterType,
  setFilterType,
}: IBoardSetting) {
  const { isMobile } = useCheckIsMobile();
  const props = {
    boardField,
    setSearchKeyword,
    filterType,
    setFilterType,
  };

  return (
    <>
      {isMobile ? (
        <MobileBoardSetting {...props} />
      ) : (
        <DeskTopBoardSetting {...props} />
      )}
    </>
  );
}
