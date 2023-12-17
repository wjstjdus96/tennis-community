import { IUserBookmarkState } from "../recoil/atom";
import { IUserInfoEdit } from "./IComponent";
import { IComment, IPost, IWriterInfo } from "./IValue";

export interface IGetOnePost {
  collectionName: string;
  docId: string;
  setPostData: React.Dispatch<any>;
}

export interface IGetTotalPosts {
  collectionName: string;
  keyword?: string;
  filterType: string[];
  recruitType?: string[] | (string | null)[];
  marketCategory?: string[] | (string | null)[];
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

export interface IGetTotalPostsByPage {
  offset: number;
  collectionName: string;
  keyword?: string;
  filterType: string[];
  recruitType?: string[] | (string | null)[];
  marketCategory?: string[] | (string | null)[];
  postsPerPage: number;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

export interface IMakingQuery {
  collectionName: string;
  keyword?: string;
  filterType: string[];
  recruitType?: string[] | (string | null)[];
  marketCategory?: string[] | (string | null)[];
}

export interface IGetComments {
  collectionName: string;
  docId: string;
  setComments: React.Dispatch<React.SetStateAction<any>>;
}

export interface IGetImage {
  imageURL: string;
  setImage?: React.Dispatch<React.SetStateAction<string>>;
}

export interface RouteState {
  state: IPost;
}

export interface ISetComment {
  comment: string;
}

export interface IGetUserBookmark {
  userId: string;
  setUserState: React.Dispatch<React.SetStateAction<IUserBookmarkState>>;
}

export interface IGetUserActivities {
  userId: string;
  field: string;
  setFieldItems: React.Dispatch<React.SetStateAction<any>>;
}

export interface IGetPost {
  collectionName: string;
  docId: string;
}

export interface IGetWriterInfo {
  userId: string;
  setWriterInfo: React.Dispatch<React.SetStateAction<IWriterInfo>>;
}

export interface IUseEditPost {
  state: any;
}

export interface IUseGetPosts {
  collectionName: string;
  page: number;
  searchKeyword: string;
  filterType: any;
  recruitType?: any;
  marketCategory?: any;
  postsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface IuseSetBookmark {
  postField: string;
  postId: string;
}

export interface IUpdateUserInfo {
  userId: string;
  data: IUserInfoEdit;
}

export interface IUpdateData {
  collectionName: string;
  docId: string;
  docField: string;
  incrementNum: number;
}

export interface IUpdateDocData {
  collectionName: string;
  docId: string;
  newData: any;
}

export interface IUpdateUserArrayData {
  userId: string;
  docField: string;
  changing: string;
  arrayItem: string;
}

export interface IUserWritingPost {
  collectionName: string;
}
