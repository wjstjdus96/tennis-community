import {
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  UseFormGetValues,
  Control,
} from "react-hook-form";
import {
  IComment,
  ICommunityWritingValue,
  IFieldItemIds,
  IMarketPost,
  IMarketWritingValue,
  IPost,
  IPostDetail,
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

export interface ISelectMarketCategory {
  name: Path<IMarketWritingValue>;
  text: string;
  control: Control<any, any>;
  existing?: string;
  errorMsg?: string;
}

export interface IWritingInput {
  name: Path<any>;
  text?: string;
  inputType?: string;
  register: UseFormRegister<any>;
  errorMsg?: string;
}

export interface IImageInput {
  name: Path<IMarketWritingValue>;
  text?: string;
  register: UseFormRegister<IMarketWritingValue>;
  watch: UseFormWatch<IMarketWritingValue>;
  setValue: UseFormSetValue<IMarketWritingValue>;
  getValues: UseFormGetValues<IMarketWritingValue>;
  errorMsg?: string;
}

export interface IBoardSearch {
  boardField: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
}

export interface IBoardHead {
  title: string;
  summary: string;
}

export interface IWritingComment {
  collectionName: string;
  docId: string;
  setComments: React.Dispatch<React.SetStateAction<any>>;
}

export interface IPostBody {
  postData: IPostDetail;
}

export interface IPostHead {
  writerId: string;
  createdAt: number;
}

export interface IWriterInfoC {
  writerId: string;
  isPostDetail?: boolean;
}

export interface ITogglePostsList {
  fieldPostsIds: IFieldItemIds;
}

export interface IActivityFieldBtn {
  curField: string;
  field: string;
  fieldName: string;
  count: number;
}

export interface IActivityFieldItem {
  collectionName: string;
  itemId: string;
}

export interface ITogglePostsItem {
  postsIds: string[];
  fieldKor: string;
  fieldEng: string;
}

export interface IBoardRecruitFilter {
  recruitFilterType: string[] | (string | null)[];
  setRecruitFilterType: React.Dispatch<
    React.SetStateAction<string[] | (string | null)[]>
  >;
}

export interface IUserInfoEdit {
  profileImage: any;
  displayName: string;
}

export interface ISettingInput {
  label: string;
  name: Path<IUserInfoEdit>;
  register: UseFormRegister<IUserInfoEdit>;
  disabled?: boolean;
}

export interface ISettingProfileImage {
  name: Path<IUserInfoEdit>;
  register: UseFormRegister<IUserInfoEdit>;
  watch: UseFormWatch<IUserInfoEdit>;
  setValue: UseFormSetValue<IUserInfoEdit>;
  label: string;
}

export interface IEditDeleteBtn {
  clickEditBtn?: () => void;
  clickDelelteBtn: () => void;
}

export interface ISelectRecruitType {
  name: any;
  control: any;
  errorMsg?: string;
}
