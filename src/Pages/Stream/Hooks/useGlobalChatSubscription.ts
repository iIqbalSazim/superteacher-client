import { useEffect } from "react";
import { Cable } from "actioncable";

import { PostType } from "../Components/Post/PostTypes";

export const useGlobalChatSubscription = (
  cable: Cable,
  classroomId: number,
  setPosts: (value: React.SetStateAction<PostType[]>) => void
) => {
  useEffect(() => {
    const subscription = cable.subscriptions.create(
      {
        channel: "GlobalChatChannel",
        classroom_id: classroomId,
      },
      {
        received: (data: PostType) => {
          setPosts((prevState) => [data, ...prevState]);
        },
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [cable.subscriptions, classroomId, setPosts]);
};
