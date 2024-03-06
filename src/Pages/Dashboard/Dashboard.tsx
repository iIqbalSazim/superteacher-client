import { useState } from "react";
import { Box } from "@mantine/core";

import MyLoader from "@/Shared/Components/MyLoader/MyLoader";
import { ClassroomType } from "@/Types/SharedTypes";

import CardsContainer from "./Components/CardsContainer/CardsContainer";
import { useFetchClassrooms } from "./Hooks/useFetchClassrooms";

const Dashboard: React.FC = () => {
  const [classrooms, setClassrooms] = useState<ClassroomType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useFetchClassrooms(setClassrooms, setLoading);

  return (
    <Box p="md" mih={"100vh"}>
      {loading ? <MyLoader /> : <CardsContainer classrooms={classrooms} />}
    </Box>
  );
};

export default Dashboard;
