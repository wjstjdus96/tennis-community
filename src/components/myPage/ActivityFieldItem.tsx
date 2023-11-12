import { useEffect, useState } from "react";
import { getPost } from "../../firebase/getData";
import Post from "../home/Post";

interface IActivityFieldItem {
  collectionName: string;
  itemId: string;
}

export function ActivityFieldItem({
  itemId,
  collectionName,
}: IActivityFieldItem) {
  const [post, setPost] = useState<any>();

  useEffect(() => {
    getPost({ collectionName: collectionName, docId: itemId }).then((res) => {
      setPost(res);
    });
  }, []);

  return <div>{post && <Post post={post} isHome={true} />}</div>;
}
