import { useState } from "react";
import { ActionIcon, Anchor, Flex, Group, Paper, Title } from "@mantine/core";
import { IconEditCircle, IconTrash } from "@tabler/icons-react";

import { User } from "@/Types/SharedTypes";
import { useAppSelector } from "@/Stores/Store";

import ConfirmDeleteMeetLinkModal from "../ConfirmDeleteMeetLinkModal/ConfirmDeleteMeetLinkModal";
import { MeetLinkProps } from "./ClassMeetLinkTypes";

const ClassMeetLink: React.FC<MeetLinkProps> = ({
  setIsAddMeetLinkFormModalOpen,
  classroom,
}) => {
  const [isDeleteMeetLinkFormModalOpen, setIsDeleteMeetLinkFormModalOpen] =
    useState(false);

  const currentUser = useAppSelector((state) => state.auth.user) as User;

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
      />
    </Paper>
  );
};

export default ClassMeetLink;
