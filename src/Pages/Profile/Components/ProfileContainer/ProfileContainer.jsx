import { useState } from "react";
import { ActionIcon, Button, Flex, SimpleGrid } from "@mantine/core";
import { IconEdit, IconX } from "@tabler/icons-react";
import ResetPasswordFormModal from "../ResetPasswordFormModal/ResetPasswordFormModal";

const ProfileContainer = ({ ProfileComponent, UpdateFormComponent }) => {
  const [editProfile, setEditProfile] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);

  return (
    <>
      <SimpleGrid>
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

        {editProfile ? <UpdateFormComponent /> : <ProfileComponent />}
      </SimpleGrid>
      <ResetPasswordFormModal
        open={isResetPasswordModalOpen}
        close={() => setIsResetPasswordModalOpen(false)}
      />
    </>
  );
};

export default ProfileContainer;
