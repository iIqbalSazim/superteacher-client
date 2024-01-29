import { useState } from "react";
import { ActionIcon, Flex, SimpleGrid } from "@mantine/core";
import { IconEdit, IconX } from "@tabler/icons-react";

import TeacherProfile from "../TeacherProfile/TeacherProfile";
import TeacherUpdateProfileForm from "../TeacherUpdateProfileForm/TeacherUpdateProfileForm";

const TeacherProfileContainer = ({ profile, setProfile }) => {
  const [editTeacherProfile, setEditTeacherProfile] = useState(false);

  return (
    <SimpleGrid>
      <Flex justify="flex-end">
        <ActionIcon
          onClick={() => setEditTeacherProfile(!editTeacherProfile)}
          color="sazim-green"
          variant="outline"
        >
          {editTeacherProfile ? <IconX /> : <IconEdit />}
        </ActionIcon>
      </Flex>

      {editTeacherProfile ? (
        <TeacherUpdateProfileForm profile={profile} setProfile={setProfile} />
      ) : (
        <TeacherProfile profile={profile} />
      )}
    </SimpleGrid>
  );
};

export default TeacherProfileContainer;
