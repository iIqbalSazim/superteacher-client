import { Grid, Title } from "@mantine/core";

import { User } from "@/Types/SharedTypes";
import { useAppSelector } from "@/Stores/Store";

import { StudentProfileProps } from "./StudentProfileTypes";

const StudentProfile: React.FC<StudentProfileProps> = ({ profile }) => {
  const currentUser = useAppSelector((state) => state.auth.user) as User;

  return (
    <Grid gutter={"xl"} grow mx={"lg"} px={"lg"}>
      <Grid.Col span={{ xs: 6 }}>
        <Title order={4} c={"white"}>
          Email
        </Title>
        <Title order={3}>{currentUser.email}</Title>
      </Grid.Col>

      <Grid.Col span={{ xs: 6 }}>
        <Title order={4} c={"white"}>
          Gender
        </Title>
        <Title order={3}>{currentUser.gender}</Title>
      </Grid.Col>

      <Grid.Col span={{ xs: 6 }}>
        <Title order={4} c={"white"}>
          First name
        </Title>
        <Title order={3}>{currentUser.first_name}</Title>
      </Grid.Col>

      <Grid.Col span={{ xs: 6 }}>
        <Title order={4} c={"white"}>
          Last name
        </Title>
        <Title order={3}>{currentUser.last_name}</Title>
      </Grid.Col>

      <Grid.Col span={{ xs: 6 }}>
        <Title order={4} c={"white"}>
          Address
        </Title>
        <Title order={3}>{profile.address}</Title>
      </Grid.Col>

      <Grid.Col span={{ xs: 6 }}>
        <Title order={4} c={"white"}>
          Phone number
        </Title>
        <Title order={3}>{currentUser.phone_number}</Title>
      </Grid.Col>

      <Grid.Col span={{ xs: 6 }}>
        <Title order={4} c={"white"}>
          Education level
        </Title>
        <Title order={3}>{profile.education.level}</Title>
      </Grid.Col>

      {profile.education.level === "College" ||
      profile.education.level === "School" ? (
        <>
          <Grid.Col span={{ xs: 6 }}>
            <Title order={4} c={"white"}>
              English/Bangla Medium
            </Title>
            <Title order={3}>{profile.education.english_bangla_medium}</Title>
          </Grid.Col>

          <Grid.Col span={{ xs: 6 }}>
            <Title order={4} c={"white"}>
              Class level
            </Title>
            <Title order={3}>{profile.education.class_level}</Title>
          </Grid.Col>
        </>
      ) : (
        <>
          <Grid.Col span={{ xs: 6 }}>
            <Title order={4} c={"white"}>
              Degree level
            </Title>
            <Title order={3}>{profile.education.degree_level}</Title>
          </Grid.Col>

          <Grid.Col span={{ xs: 6 }}>
            <Title order={4} c={"white"}>
              Semester/Year
            </Title>
            <Title order={3}>{profile.education.semester_year}</Title>
          </Grid.Col>
        </>
      )}
    </Grid>
  );
};

export default StudentProfile;
