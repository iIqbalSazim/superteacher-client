import { useSelector } from "react-redux";
import { Divider, SimpleGrid, Title } from "@mantine/core";

import ScheduledExam from "../ScheduledExam/ScheduledExam";
import FinishedExam from "../FinishedExam/FinishedExam";
import {
  filterFinishedExams,
  filterScheduledExams,
} from "../../ClassworkHelpers";

const ExamsSection = ({ exams }) => {
  const currentUser = useSelector((state) => state.auth.user);

  const scheduledExams = filterScheduledExams(exams);
  const finishedExams = filterFinishedExams(exams);

  return (
    <>
      {exams.length === 0 ||
      (currentUser.role === "student" && scheduledExams.length === 0) ? null : (
        <>
          <Title my={"sm"} order={2}>
            Exams
          </Title>
          <SimpleGrid>
            <Divider my="sm" />
            <SimpleGrid px={{ base: "", xs: "sm" }}>
              {scheduledExams.length !== 0 &&
                scheduledExams.map((exam) => {
                  return <ScheduledExam exam={exam} key={exam.id} />;
                })}
              {finishedExams.length !== 0 && currentUser.role === "teacher"
                ? finishedExams.map((exam) => (
                    <FinishedExam exam={exam} key={exam.id} />
                  ))
                : null}
            </SimpleGrid>
          </SimpleGrid>
        </>
      )}
    </>
  );
};

export default ExamsSection;
