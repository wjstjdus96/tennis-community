import { atom } from "recoil";

interface IUserState {
  email: string;
  displayName: string;
  photo: string;
  id: string;
}

interface IUserActivityState {
  writing: any[];
  comment: any[];
  bookmark: any[];
}

export const userState = atom<IUserState>({
  key: "userState",
  default: { email: "", displayName: "", photo: "", id: "" },
});

export const userActivityState = atom<IUserActivityState>({
  key: "userActivity",
  default: { writing: [], comment: [], bookmark: [] },
});
