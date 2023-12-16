export interface IPost {
  body: string;
  bookmarkNum: number;
  commentNum: number;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  creatorImage: string;
  creatorName: string;
  creatorId: string;
  id: string;
  title: string;
  type?: string;
  field: string;
}

export interface IMarketPost {
  title: string;
  bookmarkNum: number;
  commentNum: number;
  body: string;
  category: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  creatorId: string;
  images: string[];
  price: number;
  transactionMethod: string;
  field: string;
  id: string;
}

export interface IPostDetail {
  body: string;
  bookmarkNum: number;
  commentNum: number;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  creatorId: string;
  id: string;
  title: string;
  field: string;
  type?: string;
  category?: string;
  images?: string[];
  price?: number;
  transactionMethod?: string;
}

export interface IComment {
  comment: string;
  createdAt: any;
  creatorId: string;
  creatorName: string;
  creatorPhotoURL: string;
  id: string;
}

export interface ICommunityWritingValue {
  title: string;
  body: string;
}

export interface IRecruitWritingValue {
  title: string;
  body: string;
  type: string;
}

export interface IMarketWritingValue {
  title: string;
  body: string;
  category: string;
  images?: any;
  price: number;
  transactionMethod: string;
}

export interface ILoginValue {
  email: string;
  password: string;
}

export interface ISignupValue {
  email: string;
  password: string;
  passwordConfirm?: string;
  nickname: string;
}

export interface IWriterInfo {
  id: string;
  name: string;
  profileImg: string;
}

export interface IFieldItemIds {
  community: string[];
  recruit: string[];
  market: string[];
}

export interface IField {
  kor: string;
  eng: string;
}
