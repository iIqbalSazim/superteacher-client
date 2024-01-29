import { ActionIcon, Anchor, Flex, Group, Paper, Title } from "@mantine/core";
import { IconEditCircle } from "@tabler/icons-react";

const ClassMeetLink = ({
  setIsAddMeetLinkFormModalOpen,
  classroom,
  currentUser,
}) => {
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
            <ActionIcon
              variant="light"
              color="sazim-blue"
              size={"xs"}
              onClick={() => setIsAddMeetLinkFormModalOpen(true)}
            >
              <IconEditCircle />
            </ActionIcon>
          ) : null}
        </Group>
      </Flex>
    </Paper>
  );
};

export default ClassMeetLink;
