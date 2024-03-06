import { ActionIcon, Menu } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";

import { EditClassroomMenuParams } from "./EditClassroomMenuTypes";

const EditClassroomMenu: React.FC<EditClassroomMenuParams> = ({
  setIsEditFormModalOpen,
  setIsConfirmDeleteModalOpen,
}) => {
  return (
    <Menu shadow="xl" withArrow offset={-3} position="bottom-end">
      <Menu.Target>
        <ActionIcon m={"lg"} variant="transparent" color="white">
          <IconDots />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={() => setIsEditFormModalOpen(true)}>Edit</Menu.Item>
        <Menu.Item onClick={() => setIsConfirmDeleteModalOpen(true)}>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default EditClassroomMenu;
