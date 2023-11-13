import { authSessionKey } from "./../firebase/firebase";

export function checkIsLogin() {
  return window.sessionStorage.getItem(authSessionKey) ? true : false;
}
