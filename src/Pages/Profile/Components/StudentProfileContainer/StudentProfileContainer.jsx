import { useState } from "react";
import { ActionIcon, Flex, SimpleGrid } from "@mantine/core";
import { IconEdit, IconX } from "@tabler/icons-react";

import StudentProfile from "../StudentProfile/StudentProfile";
import StudentUpdateProfileForm from "../StudentUpdateProfileForm/StudentUpdateProfileForm";

const StudentProfileContainer = ({ profile, setProfile }) => {
  const [editStudentProfile, setEditStudentProfile] = useState(false);

  return (
    <SimpleGrid>
      <Flex justify="flex-end">
        <ActionIcon
          mx={"xl"}
          onClick={() => setEditStudentProfile(!editStudentProfile)}
          color="sazim-green"
          variant="outline"
        >
          {editStudentProfile ? <IconX /> : <IconEdit />}
        </ActionIcon>
      </Flex>

      {editStudentProfile ? (
        <StudentUpdateProfileForm profile={profile} setProfile={setProfile} />
      ) : (
        <StudentProfile profile={profile} />
      )}
    </SimpleGrid>
  );
};

export default StudentProfileContainer;
