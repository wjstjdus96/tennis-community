import { auth } from "../firebase/firebase";
import { User } from "@firebase/auth";
import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((user) => {
      console.log("정보 받아옴");
      setUser(user);
    });
    return subscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
