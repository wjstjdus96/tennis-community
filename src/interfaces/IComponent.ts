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

export interface IBoardSearch {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
}

export interface IBoardHead {
  title: string;
  summary: string;
}

export interface IWritingComment {
  writerImage: string;
  collectionName: string;
  docId: string;
  setComments: React.Dispatch<React.SetStateAction<any>>;
}

export interface IPostBody {
  postTitle: string;
  postBody: string;
  bookmarkNum: number;
  docState: any;
}

export interface IPostHead {
  writerImage: string;
  writerName: string;
  createdAt: number;
}
