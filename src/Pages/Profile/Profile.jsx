import { useSelector } from "react-redux";
import { SimpleGrid, Title } from "@mantine/core";

import TeacherProfile from "./Components/TeacherProfile/TeacherProfile";
import TeacherUpdateProfileForm from "./Components/TeacherUpdateProfileForm/TeacherUpdateProfileForm";
import StudentProfile from "./Components/StudentProfile/StudentProfile";
import StudentUpdateProfileForm from "./Components/StudentUpdateProfileForm/StudentUpdateProfileForm";
import ProfileContainer from "./Components/ProfileContainer/ProfileContainer";

const Profile = () => {
  const currentUser = useSelector((state) => state.auth.user);

  return (
    <SimpleGrid m={"xl"}>
      <Title mx={"xl"} mt={"md"}>
        Profile
      </Title>

      <ProfileContainer
        ProfileComponent={
          currentUser.role === "teacher" ? TeacherProfile : StudentProfile
        }
        UpdateFormComponent={
          currentUser.role === "teacher"
            ? TeacherUpdateProfileForm
            : StudentUpdateProfileForm
        }
      />
    </SimpleGrid>
  );
};

export default Profile;
