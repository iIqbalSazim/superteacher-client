import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { SimpleGrid, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import MyLoader from "@/Shared/Components/MyLoader/MyLoader";

import { getStudentProfile, getTeacherProfile } from "./Api/ProfileMethods";
import TeacherProfileContainer from "./Components/TeacherProfileContainer/TeacherProfileContainer";
import StudentProfileContainer from "./Components/StudentProfileContainer/StudentProfileContainer";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { id } = useParams();
  const role = useSelector((state) => state.auth.user.role);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        let response;
        if (role === "teacher") {
          response = await getTeacherProfile(id);
        }
        if (role === "student") {
          response = await getStudentProfile(id);
        }

        setProfile(response.data.profile);
      } catch (error) {
        let message;
        if (error.data) {
          message = error.data.message;
        } else {
          message = error.message;
        }

        if (message) {
          notifications.show({
            color: "red",
            title: "Error",
            message: message,
          });
        }
      }
    };

    getProfileData();
  }, [id, role]);

  return (
    <SimpleGrid m={"xl"}>
      <Title mx={"xl"} mt={"md"}>
        Profile
      </Title>
      {profile ? (
        <>
          {profile.teacher ? (
            <TeacherProfileContainer
              profile={profile}
              setProfile={setProfile}
            />
          ) : null}
          {profile.student ? (
            <>
              <StudentProfileContainer
                profile={profile}
                setProfile={setProfile}
              />
            </>
          ) : null}
        </>
      ) : (
        <MyLoader />
      )}
    </SimpleGrid>
  );
};

export default Profile;
