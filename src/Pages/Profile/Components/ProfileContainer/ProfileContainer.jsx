import { useState } from "react";
import { ActionIcon, Flex, SimpleGrid } from "@mantine/core";
import { IconEdit, IconX } from "@tabler/icons-react";

const ProfileContainer = ({ ProfileComponent, UpdateFormComponent }) => {
  const [editProfile, setEditProfile] = useState(false);

  return (
    <SimpleGrid>
      <Flex justify="flex-end">
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
  );
};

export default ProfileContainer;
