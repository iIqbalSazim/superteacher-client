import { useState } from "react";
import { Box } from "@mantine/core";

import MyLoader from "@/Shared/Components/MyLoader/MyLoader";

import CardsContainer from "./Components/CardsContainer/CardsContainer";
import { useFetchClassrooms } from "./Hooks/useFetchClassrooms";

const Dashboard = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useFetchClassrooms(setClassrooms, setLoading);

  return (
    <Box p="md" mih={"100vh"}>
      {loading ? <MyLoader /> : <CardsContainer classrooms={classrooms} />}
    </Box>
  );
};

export default Dashboard;
