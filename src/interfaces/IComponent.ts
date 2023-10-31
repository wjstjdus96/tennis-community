import { Path, UseFormRegister } from "react-hook-form";
import { IComment, ICommunityWritingValue, ISignupValue } from "./IValue";

export interface IBoard {
  title: string;
  collectionName: string;
}

export interface IAuthInput {
  name: Path<ISignupValue>;
  text?: string;
  inputType?: string;
  register: UseFormRegister<ISignupValue>;
  errorMsg?: string;
}

export interface IBoardFilter {
  filterType: string[];
  setFilterType: React.Dispatch<React.SetStateAction<string[]>>;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IBookmarkBtn {
  bookmarkNum: number;
  collectionName: string;
  docId: string;
}

export interface ICommentCard {
  comment: IComment;
}

export interface IPagination {
  totalPage: number;
  limit: number;
  page: number;
  setPage: any;
}

export interface IWritingInput {
  name: Path<ICommunityWritingValue>;
  text?: string;
  inputType?: string;
  register: UseFormRegister<ICommunityWritingValue>;
  errorMsg?: string;
}
