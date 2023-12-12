import { useEffect, useState } from "react";
import { getPost } from "../../../firebase/getData";
import Post from "../../home/Post";
import { IActivityFieldItem } from "../../../interfaces/IComponent";
import MarketPost from "../../home/MarketPost";

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

  return (
    <>
      {post && (
        <div>
          {collectionName == "market" ? (
            <MarketPost post={post} isHome={true} />
          ) : (
            <Post post={post} isHome={true} />
          )}
        </div>
      )}
    </>
  );
}
