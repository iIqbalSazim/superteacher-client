import { useEffect } from "react";
import { Card, Flex, Paper, Text } from "@mantine/core";
import ActionCable from "actioncable";

const StreamBody = ({ classroom, posts, setPosts }) => {
  const cable = ActionCable.createConsumer("ws://localhost:3000/cable");

  useEffect(() => {
    const subscription = cable.subscriptions.create(
      {
        channel: "GlobalChatChannel",
        classroom_id: classroom.id,
      },
      {
        received: (data) => {
          setPosts([data, ...posts]);
        },
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [cable.subscriptions, classroom.id, posts, setPosts]);

  return (
    <Flex direction={"column"} gap={"md"} mt={"md"}>
      {posts.map((post) => (
        <Card
          key={post.id}
          shadow="xs"
          p={"lg"}
          withBorder
          my={"lg"}
          radius={"md"}
        >
          <Flex direction={"column"}>
            <Text
              fw={700}
              size="lg"
              c={post.user.role === "teacher" ? "sazim-green.7" : "sazim-blue"}
            >
              {post.user.first_name} {post.user.last_name}
            </Text>
            <Text size="md" c={"dimmed"}>
              {new Date(post.created_at).toLocaleDateString()}
            </Text>
          </Flex>
          <Paper
            shadow="0"
            py={"md"}
            mt={"sm"}
            style={{ whiteSpace: "pre-line" }}
          >
            <Text c={"sazim-blue"}>{post.text}</Text>
          </Paper>
        </Card>
      ))}
    </Flex>
  );
};

export default StreamBody;
