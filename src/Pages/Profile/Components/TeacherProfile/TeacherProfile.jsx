import { Grid, Table, Title } from "@mantine/core";

const TeacherProfile = ({ profile }) => {
  const subjectToTeachRows = profile.subjects_to_teach.map((subject, index) => (
    <Table.Tr key={subject}>
      <Table.Td>
        <Title order={4} ta={"center"}>
          {index + 1}
        </Title>
      </Table.Td>
      <Table.Td>
        <Title order={4} ta={"center"}>
          {subject}
        </Title>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Grid gutter={"xl"} grow mx={"lg"} px={"lg"}>
      <Grid.Col span={{ xs: 6 }}>
        <Title order={4} c={"white"}>
          Email
        </Title>
        <Title order={3}>{profile.teacher.email}</Title>
      </Grid.Col>

      <Grid.Col span={{ xs: 6 }}>
        <Title order={4} c={"white"}>
          Gender
        </Title>
        <Title order={3}>{profile.teacher.gender}</Title>
      </Grid.Col>

      <Grid.Col span={{ xs: 6 }}>
        <Title order={4} c={"white"}>
          First name
        </Title>
        <Title order={3}>{profile.teacher.first_name}</Title>
      </Grid.Col>

      <Grid.Col span={{ xs: 6 }}>
        <Title order={4} c={"white"}>
          Last name
        </Title>
        <Title order={3}>{profile.teacher.last_name}</Title>
      </Grid.Col>

      <Grid.Col span={{ xs: 6 }}>
        <Title order={4} c={"white"}>
          Major Subject
        </Title>
        <Title order={3}>{profile.major_subject}</Title>
      </Grid.Col>

      <Grid.Col span={{ xs: 6 }}>
        <Title order={4} c={"white"}>
          Highest education level
        </Title>
        <Title order={3}>{profile.highest_education_level}</Title>
      </Grid.Col>

      <Grid.Col>
        <Title order={4} c={"white"}>
          Subjects to teach
        </Title>

        <Table maw={"200"} withColumnBorders mt={"xs"} ml={"xs"}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <Title order={4} ta={"center"}>
                  SL.
                </Title>
              </Table.Th>
              <Table.Th>
                <Title order={4} ta={"center"}>
                  Subject
                </Title>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{subjectToTeachRows}</Table.Tbody>
        </Table>
      </Grid.Col>
    </Grid>
  );
};

export default TeacherProfile;
