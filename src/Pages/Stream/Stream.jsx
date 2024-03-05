import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Flex, Grid, Paper, Title } from "@mantine/core";

import StreamHeader from "./Components/StreamHeader/StreamHeader";
import SubjectDetails from "./Components/SubjectDetails/SubjectDetails";
import StreamBody from "./Components/StreamBody/StreamBody";
import CreatePostForm from "./Components/CreatePostForm/CreatePostForm";
import ClassMeetLink from "./Components/ClassMeetLink/ClassMeetLink";
import AddMeetLinkFormModal from "./Components/AddMeetLinkFormModal/AddMeetLinkFormModal";
import AddMeetLinkButton from "./Components/AddMeetLinkButton/AddMeetLinkButton";
import { useFetchPosts } from "./Hooks/useFetchPosts";
import { useGlobalChatSubscription } from "./Hooks/useGlobalChatSubscription";

const Stream = ({ classroom, setClassroom, cable }) => {
  const [posts, setPosts] = useState([]);

  const [isAddMeetLinkFormModalOpen, setIsAddMeetLinkFormModalOpen] =
    useState(false);

  const currentUser = useSelector((state) => state.auth.user);

  useFetchPosts(classroom.id, setPosts);
  useGlobalChatSubscription(cable, classroom.id, setPosts);

  return (
    <Box
      mx={"auto"}
      py={"sm"}
      px={{ base: "", xs: "xs", sm: "md", md: "xl" }}
      mih={"100vh"}
      width={"100%"}
    >
      <StreamHeader classroom={classroom} setClassroom={setClassroom} />
      <Flex mt={"lg"} direction={{ base: "column", md: "row" }}>
        <Box hiddenFrom="md" mb={"md"}>
          {classroom.meet_link ? (
            <ClassMeetLink
              setIsAddMeetLinkFormModalOpen={setIsAddMeetLinkFormModalOpen}
              classroom={classroom}
              setClassroom={setClassroom}
              currentUser={currentUser}
            />
          ) : (
            <>
              {currentUser.role === "teacher" ? (
                <AddMeetLinkButton
                  setIsAddMeetLinkFormModalOpen={setIsAddMeetLinkFormModalOpen}
                />
              ) : null}
            </>
          )}
        </Box>

        <Flex direction={"column"} gap={"lg"} visibleFrom="md" mr={"lg"}>
          {classroom.meet_link ? (
            <ClassMeetLink
              setIsAddMeetLinkFormModalOpen={setIsAddMeetLinkFormModalOpen}
              classroom={classroom}
              setClassroom={setClassroom}
              currentUser={currentUser}
            />
          ) : (
            <>
              {currentUser.role === "teacher" ? (
                <AddMeetLinkButton
                  setIsAddMeetLinkFormModalOpen={setIsAddMeetLinkFormModalOpen}
                />
              ) : null}
            </>
          )}
          <SubjectDetails classroom={classroom} />
        </Flex>
        <Paper pt={"xl"} p={"lg"} w={"100%"} radius={"md"} mih={"60vh"}>
          <Grid h={"100%"}>
            <Grid.Col span={12}>
              <CreatePostForm classroom={classroom} />
            </Grid.Col>
            <Grid.Col span={12} h={"100%"}>
              {posts.length > 0 ? (
                <StreamBody posts={posts} />
              ) : (
                <Flex justify={"center"} align={"center"} h={"100%"}>
                  <Title order={2} c={"sazim-blue"} my={"xl"} py={"xl"}>
                    This is where you share things with the class.
                  </Title>
                </Flex>
              )}
            </Grid.Col>
          </Grid>
        </Paper>
      </Flex>
      {isAddMeetLinkFormModalOpen ? (
        <AddMeetLinkFormModal
          open={isAddMeetLinkFormModalOpen}
          close={() => setIsAddMeetLinkFormModalOpen(false)}
          classroom={classroom}
          setClassroom={setClassroom}
        />
      ) : null}
    </Box>
  );
};

export default Stream;
