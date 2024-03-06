import { Card, Flex, Paper, Text } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useAppSelector } from "@/Stores/Store";
import { User } from "@/Types/SharedTypes";

import { PostParams } from "./PostTypes";

dayjs.extend(relativeTime);

const Post: React.FC<PostParams> = ({ post }) => {
  const currentUser = useAppSelector((state) => state.auth.user) as User;

  const relativeTimestamp = dayjs(post.created_at).fromNow();

  return (
    <Card key={post.id} shadow="xs" p={"lg"} withBorder my={"lg"} radius={"md"}>
      <Flex direction={"column"}>
        <Text
          fw={700}
          size="lg"
          c={post.user.role === "teacher" ? "sazim-green.7" : "sazim-blue"}
        >
          {post.user.first_name} {post.user.last_name}{" "}
          {post.user.email === currentUser.email ? "(you)" : null}
        </Text>
        <Text size="md" c={"dimmed"}>
          {relativeTimestamp}
        </Text>
      </Flex>
      <Paper shadow="0" py={"md"} mt={"sm"} style={{ whiteSpace: "pre-line" }}>
        <Text c={"sazim-blue"}>{post.text}</Text>
      </Paper>
    </Card>
  );
};

export default Post;
