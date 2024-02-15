import { useState } from "react";
import { Button, Group, Text } from "@mantine/core";
import {
  IconBook2,
  IconClipboardText,
  IconFilePencil,
  IconPlus,
  IconX,
} from "@tabler/icons-react";

import CreateAssignmentFormModal from "../CreateAssignmentFormModal/CreateAssignmentFormModal";
import CreateMaterialFormModal from "../CreateMaterialFormModal/CreateMaterialFormModal";
import ScheduleExamFormModal from "../ScheduleExamFormModal/ScheduleExamFormModal";

const CreateFileButtonGroup = ({
  setUploadedAssignments,
  setUploadedMaterials,
  setExams,
  classroom,
}) => {
  const [openCreateButton, setOpenCreateButton] = useState(false);
  const [isCreateAssignmentFormModalOpen, setIsCreateAssignmentFormModalOpen] =
    useState(false);
  const [isCreateMaterialFormModalOpen, setIsCreateMaterialFormModalOpen] =
    useState(false);
  const [isScheduleExamFormModalOpen, setIsScheduleExamFormModalOpen] =
    useState(false);

  const closeCreateAssignmentFormModal = () => {
    setIsCreateAssignmentFormModalOpen(false);
  };

  const closeCreateMaterialFormModal = () => {
    setIsCreateMaterialFormModalOpen(false);
  };

  const closeScheduleExamFormModal = () => {
    setIsScheduleExamFormModalOpen(false);
  };

  return (
    <Group gap={"xl"} my={"xl"}>
      <Button
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
        <Group gap={"lg"}>
          <Button
            size="md"
            radius={"md"}
            leftSection={<IconClipboardText />}
            color="sazim-green.7"
            onClick={() => setIsScheduleExamFormModalOpen(true)}
          >
            <Text fw={500}>Schedule Exam</Text>
          </Button>

          <Button
            size="md"
            radius={"md"}
            leftSection={<IconFilePencil />}
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
        setUploadedAssignments={setUploadedAssignments}
        classroom={classroom}
      />
      <CreateMaterialFormModal
        open={isCreateMaterialFormModalOpen}
        close={closeCreateMaterialFormModal}
        setUploadedMaterials={setUploadedMaterials}
        classroom={classroom}
      />
      <ScheduleExamFormModal
        open={isScheduleExamFormModalOpen}
        close={closeScheduleExamFormModal}
        setExams={setExams}
        classroom={classroom}
      />
    </Group>
  );
};

export default CreateFileButtonGroup;
