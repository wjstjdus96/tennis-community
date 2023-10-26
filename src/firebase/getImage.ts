import { getDownloadURL, getStorage, ref } from "firebase/storage";
import defaultProfile from "../assets/defaultProfile.png";

interface IGetImage {
  imageURL: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

const storage = getStorage();

export const getImage = ({ imageURL, setImage }: IGetImage) => {
  if (imageURL) {
    const imageRef = ref(storage, `${imageURL}`);
    getDownloadURL(imageRef).then((url) => {
      setImage(url);
    });
  } else {
    setImage(defaultProfile);
  }
};
