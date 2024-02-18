import { useState } from "react";
import { useSelector } from "react-redux";
import { Divider, SimpleGrid, Title } from "@mantine/core";

import ScheduledExam from "../ScheduledExam/ScheduledExam";
import FinishedExam from "../FinishedExam/FinishedExam";
import UpdateExamFormModal from "../UpdateExamFormModal/UpdateExamFormModal";
import ConfirmDeleteExamModal from "../ConfirmDeleteExamModal/ConfirmDeleteExamModal";
import {
  filterFinishedExams,
  filterScheduledExams,
} from "../../ClassworkHelpers";

const ExamsContainer = ({ exams, setExams }) => {
  const [examToBeUpdatedOrDeleted, setExamToBeUpdatedOrDeleted] =
    useState(null);
  const [isUpdateExamModalOpen, setIsUpdateExamModalOpen] = useState(false);
  const [isDeleteExamModalOpen, setIsDeleteExamModalOpen] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);

  const scheduledExams = filterScheduledExams(exams);
  const finishedExams = filterFinishedExams(exams);

  const openUpdateExamModal = (exam) => {
    setExamToBeUpdatedOrDeleted(exam);
    setIsUpdateExamModalOpen(true);
  };

  const openDeleteExamModal = (exam) => {
    setExamToBeUpdatedOrDeleted(exam);
    setIsDeleteExamModalOpen(true);
  };

  const closeUpdateExamModal = () => {
    setIsUpdateExamModalOpen(false);
  };

  const closeDeleteExamModal = () => {
    setIsDeleteExamModalOpen(false);
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
                      setExams={setExams}
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
                      setExams={setExams}
                      key={exam.id}
                      openUpdateExamModal={openUpdateExamModal}
                      openDeleteExamModal={openDeleteExamModal}
                    />
                  ))
                : null}
            </SimpleGrid>
          </SimpleGrid>

          {examToBeUpdatedOrDeleted ? (
            <UpdateExamFormModal
              open={isUpdateExamModalOpen}
              close={closeUpdateExamModal}
              exam={examToBeUpdatedOrDeleted}
              setExams={setExams}
            />
          ) : null}

          {examToBeUpdatedOrDeleted ? (
            <ConfirmDeleteExamModal
              open={isDeleteExamModalOpen}
              close={closeDeleteExamModal}
              exam={examToBeUpdatedOrDeleted}
              setExams={setExams}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default ExamsContainer;
