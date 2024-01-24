import { Grid, Title } from "@mantine/core";

const StudentProfile = ({ profile }) => {
  return (
    <Grid gutter={"xl"} grow mx={"xl"} px={"lg"}>
      <Grid.Col span={6}>
        <Title order={4} c={"white"}>
          Email
        </Title>
        <Title order={3}>{profile.student.email}</Title>
      </Grid.Col>

      <Grid.Col span={6}>
        <Title order={4} c={"white"}>
          Gender
        </Title>
        <Title order={3}>{profile.student.gender}</Title>
      </Grid.Col>

      <Grid.Col span={6}>
        <Title order={4} c={"white"}>
          First name
        </Title>
        <Title order={3}>{profile.student.first_name}</Title>
      </Grid.Col>

      <Grid.Col span={6}>
        <Title order={4} c={"white"}>
          Last name
        </Title>
        <Title order={3}>{profile.student.last_name}</Title>
      </Grid.Col>

      <Grid.Col span={6}>
        <Title order={4} c={"white"}>
          Address
        </Title>
        <Title order={3}>{profile.address}</Title>
      </Grid.Col>

      <Grid.Col span={6}>
        <Title order={4} c={"white"}>
          Phone number
        </Title>
        <Title order={3}>{profile.student.phone_number}</Title>
      </Grid.Col>

      <Grid.Col span={6}>
        <Title order={4} c={"white"}>
          Education level
        </Title>
        <Title order={3}>{profile.education.level}</Title>
      </Grid.Col>

      {profile.education.level === "College" ||
      profile.education.level === "School" ? (
        <>
          <Grid.Col span={6}>
            <Title order={4} c={"white"}>
              English/Bangla Medium
            </Title>
            <Title order={3}>{profile.education.english_bangla_medium}</Title>
          </Grid.Col>

          <Grid.Col span={6}>
            <Title order={4} c={"white"}>
              Class level
            </Title>
            <Title order={3}>{profile.education.class_level}</Title>
          </Grid.Col>
        </>
      ) : (
        <>
          <Grid.Col span={6}>
            <Title order={4} c={"white"}>
              Degree level
            </Title>
            <Title order={3}>{profile.education.degree_level}</Title>
          </Grid.Col>

          <Grid.Col span={6}>
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
