import { useState } from "react";
import { Box, Flex, Grid, Paper, Title } from "@mantine/core";

import { User } from "@/Types/SharedTypes";
import { useAppSelector } from "@/Stores/Store";

import StreamHeader from "./Components/StreamHeader/StreamHeader";
import StreamBody from "./Components/StreamBody/StreamBody";
import SubjectDetails from "./Components/SubjectDetails/SubjectDetails";
import CreatePostForm from "./Components/CreatePostForm/CreatePostForm";
import ClassMeetLink from "./Components/ClassMeetLink/ClassMeetLink";
import AddMeetLinkFormModal from "./Components/AddMeetLinkFormModal/AddMeetLinkFormModal";
import AddMeetLinkButton from "./Components/AddMeetLinkButton/AddMeetLinkButton";
import { useFetchPosts } from "./Hooks/useFetchPosts";
import { useGlobalChatSubscription } from "./Hooks/useGlobalChatSubscription";
import { StreamParams } from "./StreamTypes";
import { PostType } from "./Components/Post/PostTypes";

const Stream: React.FC<StreamParams> = ({ classroom, cable }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isAddMeetLinkFormModalOpen, setIsAddMeetLinkFormModalOpen] =
    useState(false);

  const currentUser = useAppSelector((state) => state.auth.user) as User;

  useFetchPosts(classroom.id, setPosts);
  useGlobalChatSubscription(cable, classroom.id, setPosts);

  return (
    <Box
      mx={"auto"}
      py={"sm"}
      px={{ base: "", xs: "xs", sm: "md", md: "xl" }}
      mih={"100vh"}
      w="100%"
    >
      <StreamHeader classroom={classroom} />
      <Flex mt={"lg"} direction={{ base: "column", md: "row" }}>
        <Box hiddenFrom="md" mb={"md"}>
          {classroom.meet_link ? (
            <ClassMeetLink
              classroom={classroom}
              setIsAddMeetLinkFormModalOpen={setIsAddMeetLinkFormModalOpen}
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
              classroom={classroom}
              setIsAddMeetLinkFormModalOpen={setIsAddMeetLinkFormModalOpen}
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
          classroom={classroom}
          open={isAddMeetLinkFormModalOpen}
          close={() => setIsAddMeetLinkFormModalOpen(false)}
        />
      ) : null}
    </Box>
  );
};

export default Stream;
