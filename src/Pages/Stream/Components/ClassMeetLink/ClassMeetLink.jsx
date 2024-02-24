import { ActionIcon, Anchor, Flex, Group, Paper, Title } from "@mantine/core";
import { IconEditCircle, IconTrash } from "@tabler/icons-react";
import ConfirmDeleteMeetLinkModal from "../ConfirmDeleteMeetLinkModal/ConfirmDeleteMeetLinkModal";
import { useState } from "react";

const ClassMeetLink = ({
  setIsAddMeetLinkFormModalOpen,
  classroom,
  currentUser,
  setClassroom,
}) => {
  const [isDeleteMeetLinkFormModalOpen, setIsDeleteMeetLinkFormModalOpen] =
    useState(false);

  return (
    <Paper
      w={{ base: "auto" }}
      py={{ base: "xs", md: "xl" }}
      px={{ base: "md" }}
      ta={"center"}
      radius={"md"}
      withBorder
      shadow="xl"
    >
      <Flex direction={"column"} gap="sm" justify={"center"}>
        <Title order={3} c={"sazim-blue"} visibleFrom="md">
          Meet link
        </Title>
        <Group justify="center">
          <Anchor
            href={classroom.meet_link}
            target="_blank"
            underline="hover"
            size="sm"
          >
            {classroom.meet_link}
          </Anchor>
          {currentUser.role === "teacher" ? (
            <Flex gap={"xs"}>
              <ActionIcon
                variant="subtle"
                color="sazim-blue"
                size={"xs"}
                onClick={() => setIsAddMeetLinkFormModalOpen(true)}
              >
                <IconEditCircle />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                color="sazim-blue"
                size={"xs"}
                onClick={() => setIsDeleteMeetLinkFormModalOpen(true)}
              >
                <IconTrash />
              </ActionIcon>
            </Flex>
          ) : null}
        </Group>
      </Flex>
      <ConfirmDeleteMeetLinkModal
        open={isDeleteMeetLinkFormModalOpen}
        close={() => setIsDeleteMeetLinkFormModalOpen(false)}
        classroom={classroom}
        setClassroom={setClassroom}
      />
    </Paper>
  );
};

export default ClassMeetLink;
