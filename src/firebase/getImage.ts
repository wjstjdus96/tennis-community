import { getDownloadURL, getStorage, ref } from "firebase/storage";
import defaultProfile from "../assets/defaultProfile.png";
import { IGetImage } from "../interfaces/IFunction";

export const getImage = ({ imageURL, setImage }: IGetImage) => {
  const storage = getStorage();
  if (imageURL) {
    const imageRef = ref(storage, `${imageURL}`);
    getDownloadURL(imageRef).then((url) => {
      setImage(url);
    });
  } else {
    setImage(defaultProfile);
  }
};
