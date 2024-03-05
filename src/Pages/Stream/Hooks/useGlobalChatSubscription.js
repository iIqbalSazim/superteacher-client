import { useEffect } from "react";

export const useGlobalChatSubscription = (cable, classroomId, setPosts) => {
  useEffect(() => {
    const subscription = cable.subscriptions.create(
      {
        channel: "GlobalChatChannel",
        classroom_id: classroomId,
      },
      {
        received: (data) => {
          setPosts((prevState) => [data, ...prevState]);
        },
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [cable.subscriptions, classroomId, setPosts]);
};
