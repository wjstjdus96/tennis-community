import { useEffect, useState } from "react";
import { getPost } from "../../../firebase/getData";
import Post from "../../home/Post";
import { IActivityFieldItem } from "../../../interfaces/IComponent";

export function ActivityFieldItem({
  itemId,
  collectionName,
}: IActivityFieldItem) {
  const [post, setPost] = useState<any>();

  useEffect(() => {
    getPost({ collectionName: collectionName, docId: itemId }).then((res) => {
      setPost({ ...res, id: itemId });
    });
  }, []);

  return <div>{post && <Post post={post} isHome={true} />}</div>;
}
