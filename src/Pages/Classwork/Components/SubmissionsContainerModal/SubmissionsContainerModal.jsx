import { useEffect, useState } from "react";
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
import { notifications } from "@mantine/notifications";

import MyLoader from "@/Shared/Components/MyLoader/MyLoader";

import { getSubmissions } from "../../Api/ClassworkMethods";

const SubmissionsContainerModal = ({
  open,
  close,
  resource,
  downloadSubmission,
}) => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await getSubmissions(
          resource.classroom_id,
          resource.assignment_id
        );

        setSubmissions(response.data.submissions);
        setIsLoading(false);
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

        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, [resource.assignment_id, resource.classroom_id, setSubmissions]);

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
