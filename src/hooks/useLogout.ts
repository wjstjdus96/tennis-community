import { useResetRecoilState } from "recoil";
import { userBookmarkState, userState } from "../recoil/atom";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const resetUserState = useResetRecoilState(userState);
  const resetUserBookmarkState = useResetRecoilState(userBookmarkState);
  const navigate = useNavigate();

  const clickLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      resetUserState();
      resetUserBookmarkState();
      sessionStorage.clear();

      navigate("/");
    }
  };

  return clickLogout;
};
