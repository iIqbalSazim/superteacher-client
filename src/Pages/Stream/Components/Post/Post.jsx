import { useSelector } from "react-redux";
import { Card, Flex, Paper, Text } from "@mantine/core";

const Post = ({ post }) => {
  const currentUser = useSelector((state) => state.auth.user);

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
          {new Date(post.created_at).toLocaleDateString()}
        </Text>
      </Flex>
      <Paper shadow="0" py={"md"} mt={"sm"} style={{ whiteSpace: "pre-line" }}>
        <Text c={"sazim-blue"}>{post.text}</Text>
      </Paper>
    </Card>
  );
};

export default Post;
