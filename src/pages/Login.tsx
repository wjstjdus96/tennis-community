import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import AuthInput from "../components/AuthInput";
import { auth } from "../firebase/firebase";
import { getUserBookmark } from "../firebase/getData";
import { ILoginValue } from "../interfaces/IValue";
import AuthLayout from "../layouts/AuthLayout";
import { userBookmarkState, userState } from "../recoil/atom";
import { loginSchema } from "../utils/schema";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginValue>({
    mode: "onSubmit",
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userState);
  const setUserBookmarkState = useSetRecoilState(userBookmarkState);

  const onSubmitHandler: SubmitHandler<ILoginValue> = async (data) => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUserState({
            email: user.email || "",
            displayName: user.displayName || "",
            photo: user.photoURL || "",
            id: user.uid || "",
          });
          getUserBookmark({
            userId: user.uid,
            setUserState: setUserBookmarkState,
          });
        })
        .catch((error) => {
          alert(error);
        });

      navigate("/");
    } catch (error) {
      alert("로그인에 실패하였습니다. 다시 시도해주세요" + error);
      reset();
    }
  };

  return (
    <AuthLayout title="로그인">
      <LoginForm onSubmit={handleSubmit(onSubmitHandler)}>
        <AuthInput
          name="email"
          text="이메일을 입력하십시오"
          inputType="email"
          register={register}
          errorMsg={errors.email && errors.email.message}
        />
        <AuthInput
          name="password"
          text="비밀번호를 입력하십시오"
          inputType="password"
          register={register}
          errorMsg={errors.password && errors.password.message}
        />
        <SubmitBtn type="submit">로그인</SubmitBtn>
      </LoginForm>
    </AuthLayout>
  );
}

const SubmitBtn = styled.button`
  width: 100%;
  margin: 20px 0px 30px 0px;
  box-sizing: border-box;
  appearance: none;
  background-color: ${(props) => props.theme.green[2]};
  padding: 0.8em 2em;
  border-radius: 20px;
  text-decoration: none;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  border: 2px solid ${(props) => props.theme.green[2]};
  transition: background-color 300ms ease-in-out, color 300ms ease-in-out;
  &:hover {
    background-color: transparent;
  }
`;

const LoginForm = styled.form`
  & > div {
    @media all and (min-width: 360px) and (max-width: 767px) {
      width: 70vw;
    }
  }
`;
