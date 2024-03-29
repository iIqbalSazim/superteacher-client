import { useContext, useState } from "react";
import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { ClassworkContext } from "@/Providers/ClassworkProvider/ClassworkProvider";

import { deleteResource } from "../../Api/ClassworkMethods";
import { ConfirmDeleteResourceModal } from "./ConfirmDeleteResourceModalTypes";

const ConfirmDeleteResourceModal: React.FC<ConfirmDeleteResourceModal> = ({
  open,
  close,
  resource,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { setUploadedAssignments, setUploadedMaterials } =
    useContext(ClassworkContext);

  const confirmDelete = async () => {
    try {
      setIsLoading(true);

      await deleteResource(resource.classroom_id, resource.id);

      let deleteMessage;

      if (resource.resource_type === "assignment") {
        setUploadedAssignments((prevState) =>
          prevState.filter((assignment) => assignment.id !== resource.id)
        );
        deleteMessage = "Assignment deleted";
      } else {
        setUploadedMaterials((prevState) =>
          prevState.filter((material) => material.id !== resource.id)
        );

        deleteMessage = "Material deleted";
      }

      notifications.show({
        color: "sazim-purple.5",
        title: "Success",
        message: deleteMessage,
      });

      setIsLoading(false);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <Modal opened={open} onClose={close} size={"md"} centered>
      <Box mx={{ base: "xs", sm: "md", md: "xl" }} py={"md"}>
        <Text mb={20} fw={700} tt={"uppercase"} size="lg">
          Are you sure you want to delete this resource?
        </Text>
        <Group justify="flex-end" mt={"xl"} pt="md">
          <Button color="sazim-purple" onClick={close} size="sm">
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            color="sazim-purple"
            size="sm"
            loading={isLoading}
          >
            Confirm Delete
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteResourceModal;
