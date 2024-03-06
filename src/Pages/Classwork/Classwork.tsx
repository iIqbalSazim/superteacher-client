import { Box } from "@mantine/core";

import { User } from "@/Types/SharedTypes";
import { useAppSelector } from "@/Stores/Store";

import CreateFileButtonGroup from "./Components/CreateFileButtonGroup/CreateFileButtonGroup";
import ResourcesSection from "./Components/ResourcesSection/ResourcesSection";
import ExamsContainer from "./Components/ExamsContainer/ExamsContainer";
import { useFetchClassroomResources } from "./Hooks/useFetchClassroomResources";
import { useFetchExams } from "./Hooks/useFetchExams";
import { ClassworkProps } from "./ClassworkTypes";

const Classwork: React.FC<ClassworkProps> = ({ classroom }) => {
  const currentUser = useAppSelector((state) => state.auth.user) as User;

  useFetchClassroomResources(classroom.id);

  useFetchExams(classroom.id);

  return (
    <Box
      mx={{ base: "xs", sm: "xl" }}
      py={"sm"}
      px={{ base: "", sm: "md" }}
      mih={"100vh"}
    >
      {currentUser.role === "teacher" && (
        <CreateFileButtonGroup classroom={classroom} />
      )}
      <ExamsContainer />
      <ResourcesSection />
    </Box>
  );
};

export default Classwork;
