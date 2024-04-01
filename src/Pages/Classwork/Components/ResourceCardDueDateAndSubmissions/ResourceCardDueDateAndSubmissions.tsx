import { Button, Group, Menu, Text } from "@mantine/core";

import { useAppSelector } from "@/Shared/Redux/Store";
import { User } from "@/Types/SharedTypes";

import { formatDate } from "../../ClassworkHelpers";
import { ResourceCardDueDateAndSubmissionsProps } from "./ResourceCardDueDateAndSubmissionsTypes";

const ResourceCardDueDateAndSubmissions: React.FC<
  ResourceCardDueDateAndSubmissionsProps
> = ({
  resource,
  setIsSubmissionsContainerModalOpen,
  setIsSubmitAssignmentModalOpen,
  userSubmission,
  downloadSubmission,
  setIsDeleteSubmissionModalOpen,
}) => {
  const currentUser = useAppSelector((state) => state.auth.user) as User;

  return (
    <Group justify="flex-end" mt={"md"} align="center">
      {resource.resource_type === "assignment" && resource.due_date ? (
        <>
          <Text
            c={
              formatDate(Date.now()) > formatDate(resource.due_date)
                ? "red.8"
                : "sazim-blue"
            }
          >
            Due date: {formatDate(resource.due_date)}
          </Text>
          {currentUser.role === "teacher" ? (
            <>
              {resource.submissions && resource.submissions.length !== 0 ? (
                <>
                  <Button
                    variant="outline"
                    color="sazim-blue"
                    onClick={() => setIsSubmissionsContainerModalOpen(true)}
                  >
                    Submissions
                  </Button>
                </>
              ) : null}
            </>
          ) : null}
          {currentUser.role === "student" ? (
            <>
              {!userSubmission ? (
                <Button
                  onClick={() => setIsSubmitAssignmentModalOpen(true)}
                  color="sazim-green"
                  size="compact-sm"
                >
                  Submit
                </Button>
              ) : (
                <Menu shadow="xl" withArrow offset={-3} position="bottom-end">
                  <Menu.Target>
                    <Button
                      variant="outline"
                      size="compact-sm"
                      color="sazim-blue"
                    >
                      Submitted
                    </Button>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() => downloadSubmission(userSubmission)}
                    >
                      Download
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => setIsDeleteSubmissionModalOpen(true)}
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </>
          ) : null}
        </>
      ) : null}
    </Group>
  );
};

export default ResourceCardDueDateAndSubmissions;
