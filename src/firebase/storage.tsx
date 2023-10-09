import { getStorage, ref } from "firebase/storage";

export const storage = getStorage();

const storageRef = ref(storage);
