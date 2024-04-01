import { useContext, useEffect, useState } from "react";
import { Divider, SimpleGrid, Title } from "@mantine/core";

import { useAppSelector } from "@/Shared/Redux/Store";
import { User } from "@/Types/SharedTypes";
import { ClassworkContext } from "@/Shared/Providers/ClassworkProvider/ClassworkProvider";

import ScheduledExam from "../ScheduledExam/ScheduledExam";
import FinishedExam from "../FinishedExam/FinishedExam";
import UpdateExamFormModal from "../UpdateExamFormModal/UpdateExamFormModal";
import ConfirmDeleteExamModal from "../ConfirmDeleteExamModal/ConfirmDeleteExamModal";
import {
  filterFinishedExams,
  filterScheduledExams,
} from "../../ClassworkHelpers";
import { ExamType } from "../../ClassworkTypes";

const ExamsContainer: React.FC = () => {
  const [scheduledExams, setScheduledExams] = useState<ExamType[]>([]);
  const [finishedExams, setFinishedExams] = useState<ExamType[]>([]);
  const [examToBeUpdatedOrDeleted, setExamToBeUpdatedOrDeleted] =
    useState<ExamType>();
  const [isUpdateExamModalOpen, setIsUpdateExamModalOpen] = useState(false);
  const [isDeleteExamModalOpen, setIsDeleteExamModalOpen] = useState(false);

  const { exams } = useContext(ClassworkContext);
  const currentUser = useAppSelector((state) => state.auth.user) as User;

  useEffect(() => {
    setScheduledExams(filterScheduledExams(exams));
    setFinishedExams(filterFinishedExams(exams));
  }, [exams]);

  const openUpdateExamModal = (exam: ExamType) => {
    setExamToBeUpdatedOrDeleted(exam);
    setIsUpdateExamModalOpen(true);
  };

  const openDeleteExamModal = (exam: ExamType) => {
    setExamToBeUpdatedOrDeleted(exam);
    setIsDeleteExamModalOpen(true);
  };

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
                  return (
                    <ScheduledExam
                      exam={exam}
                      key={exam.id}
                      openUpdateExamModal={openUpdateExamModal}
                      openDeleteExamModal={openDeleteExamModal}
                    />
                  );
                })}
              {finishedExams.length !== 0 && currentUser.role === "teacher"
                ? finishedExams.map((exam) => (
                    <FinishedExam
                      exam={exam}
                      key={exam.id}
                      openUpdateExamModal={openUpdateExamModal}
                      openDeleteExamModal={openDeleteExamModal}
                    />
                  ))
                : null}
            </SimpleGrid>
          </SimpleGrid>

          {isUpdateExamModalOpen && examToBeUpdatedOrDeleted ? (
            <UpdateExamFormModal
              open={isUpdateExamModalOpen}
              close={() => setIsUpdateExamModalOpen(false)}
              exam={examToBeUpdatedOrDeleted}
            />
          ) : null}

          {isDeleteExamModalOpen && examToBeUpdatedOrDeleted ? (
            <ConfirmDeleteExamModal
              open={isDeleteExamModalOpen}
              close={() => setIsDeleteExamModalOpen(false)}
              exam={examToBeUpdatedOrDeleted}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default ExamsContainer;
