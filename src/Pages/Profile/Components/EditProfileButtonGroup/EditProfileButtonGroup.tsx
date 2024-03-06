import { Flex, Button, ActionIcon } from "@mantine/core";
import { IconEdit, IconX } from "@tabler/icons-react";

import { EditProfileButtonGroupProps } from "./EditProfileButtonGroupTypes";

const EditProfileButtonGroup: React.FC<EditProfileButtonGroupProps> = ({
  editProfile,
  setEditProfile,
  setIsResetPasswordModalOpen,
}) => {
  return (
    <Flex justify="flex-end" gap={"md"} align={"center"}>
      <Button
        size="compact-md"
        variant="outline"
        color="sazim-green"
        onClick={() => setIsResetPasswordModalOpen(true)}
      >
        Reset Password
      </Button>
      <ActionIcon
        onClick={() => setEditProfile(!editProfile)}
        color="sazim-green"
        variant="outline"
      >
        {editProfile ? <IconX /> : <IconEdit />}
      </ActionIcon>
    </Flex>
  );
};

export default EditProfileButtonGroup;
