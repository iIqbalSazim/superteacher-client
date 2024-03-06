import { useEffect } from "react";

import { handleErrorMessage } from "@/Shared/SharedHelpers";

import { getStreamPosts } from "../Api/StreamMethods";
import { PostType } from "../Components/Post/PostTypes";

export const useFetchPosts = (
  classroomId: number,
  setPosts: (value: React.SetStateAction<PostType[]>) => void
) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStreamPosts(classroomId);

        const postsInLatestFirstOrder = response.data.messages
          ? response.data.messages.reverse()
          : [];

        setPosts(postsInLatestFirstOrder);
      } catch (error) {
        handleErrorMessage(error);
      }
    };

    fetchData();
  }, [classroomId, setPosts]);
};
