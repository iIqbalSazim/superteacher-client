import { useState } from "react";
import { SimpleGrid, Title } from "@mantine/core";

import {
  User,
  TeacherProfileType,
  StudentProfileType,
} from "@/Types/SharedTypes";
import { useAppSelector } from "@/Stores/Store";

import ResetPasswordFormModal from "./Components/ResetPasswordFormModal/ResetPasswordFormModal";
import TeacherProfileContainer from "./Components/TeacherProfileContainer/TeacherProfileContainer";
import StudentProfileContainer from "./Components/StudentProfileContainer/StudentProfileContainer";
import EditProfileButtonGroup from "./Components/EditProfileButtonGroup/EditProfileButtonGroup";

const Profile: React.FC = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);

  const currentUser = useAppSelector((state) => state.auth.user) as User;

  const profile = currentUser.profile as
    | TeacherProfileType
    | StudentProfileType;

  return (
    <SimpleGrid m={"xl"}>
      <Title mx={"xl"} mt={"md"}>
        Profile
      </Title>

      <EditProfileButtonGroup
        editProfile={editProfile}
        setEditProfile={setEditProfile}
        setIsResetPasswordModalOpen={setIsResetPasswordModalOpen}
      />

      {currentUser.role === "teacher" ? (
        <TeacherProfileContainer
          editProfile={editProfile}
          profile={profile as TeacherProfileType}
        />
      ) : (
        <StudentProfileContainer
          editProfile={editProfile}
          profile={profile as StudentProfileType}
        />
      )}

      <ResetPasswordFormModal
        open={isResetPasswordModalOpen}
        close={() => setIsResetPasswordModalOpen(false)}
      />
    </SimpleGrid>
  );
};

export default Profile;
