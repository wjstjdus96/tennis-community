import styled from "styled-components";
import SettingProfileImage from "./SettingProfileImage";
import SettingInput from "./SettingInput";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../recoil/atom";
import { getAuth, updateProfile } from "firebase/auth";
import { updateUserInfo } from "../../../firebase/updateData";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { IUserInfoEdit } from "../../../interfaces/IComponent";
import defaultProfile from "../../../assets/defaultProfile.png";

export function Setting() {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IUserInfoEdit>({
    mode: "onSubmit",
  });

  const onSubmitEditForm: SubmitHandler<IUserInfoEdit> = async (data) => {
    const auth = getAuth();
    try {
      if (typeof data.profileImage == "string") {
        updateProfile(auth.currentUser!, {
          displayName: data.displayName,
          photoURL: data.profileImage,
        });
        updateUserInfo({
          userId: userInfo.id,
          data: data,
        });
        setUserInfo({
          ...userInfo,
          displayName: data.displayName,
          photo: data.profileImage,
        });
      } else {
        const storage = getStorage();
        const imageRef = ref(storage, `users/${data.profileImage[0].name}`);
        await uploadBytes(imageRef, data.profileImage[0]).then((snapshot) =>
          getDownloadURL(snapshot.ref).then((url) => {
            updateProfile(auth.currentUser!, {
              displayName: data.displayName,
              photoURL: url,
            });
            updateUserInfo({
              userId: userInfo.id,
              data: { ...data, profileImage: url },
            });
            setUserInfo({
              ...userInfo,
              displayName: data.displayName,
              photo: url,
            });
          })
        );
      }
      alert("정보가 수정되었습니다");
    } catch (error) {
      alert("정보수정에 실패하였습니다." + error);
    }
  };

  useEffect(() => {
    setValue("profileImage", userInfo.photo ? userInfo.photo : defaultProfile);
    setValue("displayName", userInfo.displayName);
  }, [userInfo]);

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmitEditForm)}>
        <SettingProfileImage
          name="profileImage"
          register={register}
          watch={watch}
          setValue={setValue}
          label="프로필이미지"
        />
        <SettingInput name="displayName" register={register} label="닉네임" />
        <EditInfoButton>정보 수정</EditInfoButton>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media all and (min-width: 360px) and (max-width: 767px) {
      padding: 20px 10px;
    }

    @media all and (min-width: 768px) {
      margin-top: 50px;
    }
    gap: 30px;
  }
`;

const EditInfoButton = styled.button`
  background-color: ${(props) => props.theme.green[1]};
  border: none;
  color: ${(props) => props.theme.green[3]};
  padding: 8px 10px;
  border-radius: 5px;
  font-weight: 700;
  font-size: 13px;
  font-family: "Noto Sans KR", sans-serif;
  cursor: pointer;
`;
