import { ActionIcon, Menu } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";

import { ResourceEditMenuProps } from "./ResourceEditMenuTypes";

const ResourceEditMenu: React.FC<ResourceEditMenuProps> = ({
  resource,
  setIsUpdateAssignmentModalOpen,
  setIsUpdateMaterialModalOpen,
  setIsDeleteResourceModalOpen,
}) => {
  return (
    <Menu shadow="xl" withArrow offset={-3} position="bottom-end">
      <Menu.Target>
        <ActionIcon m={"lg"} variant="transparent" color="sazim-blue">
          <IconDots />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={() =>
            resource.resource_type === "assignment"
              ? setIsUpdateAssignmentModalOpen(true)
              : setIsUpdateMaterialModalOpen(true)
          }
        >
          Edit
        </Menu.Item>
        <Menu.Item onClick={() => setIsDeleteResourceModalOpen(true)}>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ResourceEditMenu;
