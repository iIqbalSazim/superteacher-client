import { Flex } from "@mantine/core";

import Post from "../Post/Post";
import { StreamBodyParams } from "./StreamBodyTypes";

const StreamBody: React.FC<StreamBodyParams> = ({ posts }) => {
  return (
    <Flex direction={"column"} gap={"md"} mt={"md"}>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </Flex>
  );
};

export default StreamBody;
