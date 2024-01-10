import {
  ActionIcon,
  Anchor,
  Group,
  Paper,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { IconEditCircle } from "@tabler/icons-react";

const ClassMeetLink = ({
  setIsAddMeetLinkFormModalOpen,
  classroom,
  currentUser,
}) => {
  return (
    <Paper
      w={"300"}
      py={"xl"}
      ta={"center"}
      radius={"md"}
      withBorder
      mr={"xl"}
      shadow="xl"
    >
      <SimpleGrid>
        <Title order={3} c={"sazim-blue"}>
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
      </SimpleGrid>
    </Paper>
  );
};

export default ClassMeetLink;
