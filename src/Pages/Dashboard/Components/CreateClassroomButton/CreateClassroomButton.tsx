import { useState } from "react";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import CreateClassroomFormModal from "@/Shared/Components/CreateClassroomFormModal/CreateClassroomFormModal";

const CreateClassroomButton: React.FC = () => {
  const [isClassroomFormModalOpen, setIsClassroomFormModalOpen] =
    useState<boolean>(false);

  return (
    <>
      <Button
        leftSection={<IconPlus />}
        color={"white"}
        variant="light"
        size="lg"
        radius={"lg"}
        onClick={() => setIsClassroomFormModalOpen(true)}
      >
        Create a classroom
      </Button>
      <CreateClassroomFormModal
        open={isClassroomFormModalOpen}
        close={() => setIsClassroomFormModalOpen(false)}
      />
    </>
  );
};

export default CreateClassroomButton;
