import { useSelector } from "react-redux";

import ClassroomCards from "./Components/ClassroomCards/ClassroomCards";
import Header from "./Components/Header/Header";

const Dashboard = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const { role } = currentUser;
  return (
    <>
      <Header currentUser={currentUser} />
      <ClassroomCards role={role} />
    </>
  );
};

export default Dashboard;
