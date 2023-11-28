import { Path, UseFormRegister } from "react-hook-form";
import {
  IComment,
  ICommunityWritingValue,
  IPost,
  ISignupValue,
} from "./IValue";

export interface IBoard {
  title: string;
  collectionName: string;
}

export interface IAuthInput {
  name: Path<any>;
  text?: string;
  inputType?: string;
  register: UseFormRegister<any>;
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
  collectionName: string;
  docId: string;
  getComments: any;
}

export interface IPagination {
  totalPage: number;
  limit: number;
  page: number;
  setPage: any;
}

export interface IWritingInput {
  name: Path<any>;
  text?: string;
  inputType?: string;
  register: UseFormRegister<any>;
  errorMsg?: string;
}

export interface IBoardSearch {
  boardField: string;
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
  postData: IPost;
}

export interface IPostHead {
  writerId: string;
  createdAt: number;
}

export interface IWriterInfoC {
  writerId: string;
  isPostDetail?: boolean;
}
