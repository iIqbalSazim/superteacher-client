import { Divider, SimpleGrid, Title } from "@mantine/core";

import Exam from "../Exam/Exam";

const ExamsSection = ({ exams }) => {
  return (
    <>
      <Title my={"sm"} order={2}>
        Exams
      </Title>
      <SimpleGrid>
        <Divider my="sm" />
        <SimpleGrid px={{ base: "", xs: "sm" }}>
          {exams.map((exam) => (
            <Exam exam={exam} key={exam.id} />
          ))}
        </SimpleGrid>
      </SimpleGrid>
    </>
  );
};

export default ExamsSection;
