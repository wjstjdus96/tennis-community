import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import AuthInput from "../components/AuthInput";
import AuthLayout from "../layouts/AuthLayout";

import {
  createUserWithEmailAndPassword,
  inMemoryPersistence,
  setPersistence,
  updateProfile,
} from "@firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../assets/defaultProfile.png";
import { auth, db } from "../firebase/firebase";
import { ISignupValue } from "../interfaces/IValue";
import { signupSchema } from "../utils/schema";

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupValue>({
    mode: "onChange",
    resolver: yupResolver(signupSchema),
  });

  const onSubmitHandler: SubmitHandler<ISignupValue> = async (data) => {
    try {
      await setPersistence(auth, inMemoryPersistence);
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then((res) => {
        updateProfile(res.user, { displayName: data.nickname });
        setDoc(doc(db, "users", res.user.uid), {
          displayName: data.nickname,
          displayPhoto: defaultProfile,
          communityWriting: [],
          communityBookmark: [],
          communityComment: [],
          recruitWriting: [],
          recruitBookmark: [],
          recruitComment: [],
          marketWriting: [],
          marketBookmark: [],
          marketComment: [],
        });
      });

      alert("회원가입에 성공하였습니다");
      navigate("/login");
    } catch (error) {
      alert("회원가입에 실패하였습니다." + error);
    }
  };

  return (
    <AuthLayout title="회원가입">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <InputWrapper>
          <AuthInput
            name="email"
            text="이메일을 입력하십시오"
            inputType="email"
            register={register}
            errorMsg={errors.email && errors.email.message}
          />
          <AuthInput
            name="nickname"
            text="닉네임을 입력하십시오"
            inputType="text"
            register={register}
            errorMsg={errors.nickname && errors.nickname.message}
          />
          <AuthInput
            name="password"
            text="비밀번호를 입력하십시오"
            inputType="password"
            register={register}
            errorMsg={errors.password && errors.password.message}
          />
          <AuthInput
            name="passwordConfirm"
            inputType="password"
            register={register}
            errorMsg={errors.passwordConfirm && errors.passwordConfirm.message}
          />
        </InputWrapper>
        <SubmitBtn type="submit">회원가입</SubmitBtn>
      </form>
    </AuthLayout>
  );
}

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 40px;
  & > div {
    min-width: 300px;
  }
`;

const SubmitBtn = styled.button`
  width: 400px;
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
