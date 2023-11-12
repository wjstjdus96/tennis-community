import AuthInput from "../components/AuthInput";
import AuthLayout from "../layouts/AuthLayout";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  setPersistence,
  inMemoryPersistence,
  createUserWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { ISignupValue } from "../interfaces/IValue";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  const formSchema = yup.object({
    email: yup
      .string()
      .required("이메일을 입력해주세요")
      .email("이메일 형식이 아닙니다"),
    password: yup
      .string()
      .required("영문, 숫자포함 8자리를 입력해주세요.")
      .min(8, "최소 8자 이상 가능합니다")
      .max(15, "최대 15자 까지만 가능합니다")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
        "영문 숫자포함 8자리를 입력해주세요."
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 다릅니다."),
    nickname: yup
      .string()
      .required("닉네임을 입력해주세요")
      .max(8, "최대 8자 까지만 가능합니다"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupValue>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
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
          communityWriting: [],
          communityBookmark: [],
          communityComment: [],
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
