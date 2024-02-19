import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Flex,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

const SubmissionsContainerModal = ({
  open,
  close,
  submissions,
  downloadResource,
}) => {
  return (
    <Modal opened={open} onClose={close} size={"md"}>
      <Box mx={{ base: "xs", md: "md" }}>
        <Title order={3}>Submissions</Title>
        {submissions.map((submission) => (
          <Card key={submission.id} shadow="xl" my={"md"}>
            <Flex justify="space-between" align={"center"}>
              <Text>{submission.student_name} </Text>
              <Flex align={"center"} justify={"space-between"} gap={"sm"}>
                {submission.submission_status === "late" && (
                  <Badge color="red.7" variant="light" radius={"xs"}>
                    Late
                  </Badge>
                )}
                <ActionIcon
                  onClick={() => downloadResource(submission.url)}
                  variant="subtle"
                  color="sazim-blue"
                >
                  <IconDownload />
                </ActionIcon>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Box>
    </Modal>
  );
};

export default SubmissionsContainerModal;
