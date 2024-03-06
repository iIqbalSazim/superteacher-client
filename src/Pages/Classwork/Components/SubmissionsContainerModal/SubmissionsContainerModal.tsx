import { useState } from "react";
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

import MyLoader from "@/Shared/Components/MyLoader/MyLoader";

import { useFetchSubmissions } from "../../Hooks/useFetchSubmissions";
import { SubmissionsContainerModalProps } from "./SubmissionsContainerModalTypes";
import { Submission } from "../../ClassworkTypes";

const SubmissionsContainerModal: React.FC<SubmissionsContainerModalProps> = ({
  open,
  close,
  resource,
  downloadSubmission,
}) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  if (resource.assignment_id) {
    useFetchSubmissions(
      resource.classroom_id,
      resource.assignment_id,
      setSubmissions,
      setIsLoading
    );
  }

  return (
    <Modal opened={open} onClose={close} size={"md"}>
      <Box mx={{ base: "xs", md: "md" }}>
        <Title order={3}>Submissions</Title>
        {submissions && submissions.length !== 0 ? (
          <>
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
                      onClick={() => downloadSubmission(submission)}
                      variant="subtle"
                      color="sazim-blue"
                    >
                      <IconDownload />
                    </ActionIcon>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </>
        ) : (
          <>
            {isLoading ? (
              <MyLoader />
            ) : (
              <Text mx={"md"} fw={"400"} ta="center">
                No Submissions available
              </Text>
            )}
          </>
        )}
      </Box>
    </Modal>
  );
};

export default SubmissionsContainerModal;
