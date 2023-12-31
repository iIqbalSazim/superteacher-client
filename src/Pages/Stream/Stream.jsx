import { useEffect, useState } from "react";
import { Box, Flex, Grid, Paper, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import ActionCable from "actioncable";

import StreamHeader from "./Components/StreamHeader/StreamHeader";
import SubjectDetails from "./Components/SubjectDetails/SubjectDetails";
import Upcoming from "./Components/Upcoming/Upcoming";
import StreamBody from "./Components/StreamBody/StreamBody";
import CreatePostForm from "./Components/CreatePostForm/CreatePostForm";
import { getStreamPosts } from "./Api/StreamMethods";

const Stream = ({ classroom, setClassroom }) => {
  const [posts, setPosts] = useState([]);

  const cable = ActionCable.createConsumer("ws://localhost:3000/cable");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStreamPosts(classroom.id);

        const postsInLatestFirstOrder = response.data.messages
          ? response.data.messages.reverse()
          : [];

        setPosts(postsInLatestFirstOrder);
      } catch (error) {
        let message;
        if (error.data) {
          message = error.data.message;
        } else {
          message = error.message;
        }

        if (message) {
          notifications.show({
            color: "red",
            title: "Error",
            message: message,
          });
        }
      }
    };

    fetchData();
  }, [classroom.id]);

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
    <Box mx={"auto"} py={"sm"} px={"xl"} mih={"100vh"} width={"100%"}>
      <StreamHeader classroom={classroom} setClassroom={setClassroom} />
      <Flex mt={"xl"}>
        <Flex direction={"column"} gap={"xl"}>
          <SubjectDetails classroom={classroom} />
          <Upcoming />
        </Flex>
        <Paper pt={"xl"} p={"lg"} w={"100%"} radius={"md"}>
          <Grid h={"100%"}>
            <Grid.Col span={12}>
              <CreatePostForm classroom={classroom} />
            </Grid.Col>
            <Grid.Col span={12} h={"100%"}>
              {posts.length !== 0 ? (
                <StreamBody posts={posts} />
              ) : (
                <Flex justify={"center"} align={"center"} h={"100%"}>
                  <Title order={2} c={"sazim-blue"} mt={"xl"} pt={"xl"}>
                    This is where you share things with the class.
                  </Title>
                </Flex>
              )}
            </Grid.Col>
          </Grid>
        </Paper>
      </Flex>
    </Box>
  );
};

export default Stream;
