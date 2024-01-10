import { useState } from "react";
import { Button, Group, Text } from "@mantine/core";
import {
  IconBook2,
  IconClipboardText,
  IconPlus,
  IconX,
} from "@tabler/icons-react";

import CreateAssignmentFormModal from "../CreateAssignmentFormModal/CreateAssignmentFormModal";
import CreateMaterialFormModal from "../CreateMaterialFormModal/CreateMaterialFormModal";

const CreateFileButtonGroup = ({ setUploadedResources, classroom }) => {
  const [openCreateButton, setOpenCreateButton] = useState(false);
  const [isCreateAssignmentFormModalOpen, setIsCreateAssignmentFormModalOpen] =
    useState(false);
  const [isCreateMaterialFormModalOpen, setIsCreateMaterialFormModalOpen] =
    useState(false);

  const closeCreateAssignmentFormModal = () => {
    setIsCreateAssignmentFormModalOpen(false);
  };

  const closeCreateMaterialFormModal = () => {
    setIsCreateMaterialFormModalOpen(false);
  };

  return (
    <Group gap={"xl"}>
      <Button
        my={"md"}
        size="md"
        radius={"md"}
        leftSection={openCreateButton ? <IconX /> : <IconPlus />}
        variant={openCreateButton ? "outline" : "filled"}
        color="sazim-green.7"
        onClick={() => setOpenCreateButton(!openCreateButton)}
      >
        <Text fw={500}>Create</Text>
      </Button>
      {openCreateButton ? (
        <Group gap={"lg"} my={"md"}>
          <Button
            size="md"
            radius={"md"}
            leftSection={<IconClipboardText />}
            color="sazim-green.7"
            onClick={() => setIsCreateAssignmentFormModalOpen(true)}
          >
            <Text fw={500}>Add Assignment</Text>
          </Button>

          <Button
            size="md"
            radius={"md"}
            leftSection={<IconBook2 />}
            color="sazim-green.7"
            onClick={() => setIsCreateMaterialFormModalOpen(true)}
          >
            <Text fw={500}>Add Material</Text>
          </Button>
        </Group>
      ) : null}
      <CreateAssignmentFormModal
        open={isCreateAssignmentFormModalOpen}
        close={closeCreateAssignmentFormModal}
        setUploadedResources={setUploadedResources}
        classroom={classroom}
      />
      <CreateMaterialFormModal
        open={isCreateMaterialFormModalOpen}
        close={closeCreateMaterialFormModal}
        setUploadedResources={setUploadedResources}
        classroom={classroom}
      />
    </Group>
  );
};

export default CreateFileButtonGroup;
