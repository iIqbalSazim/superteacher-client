import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, Title } from "@mantine/core";
import ActionCable from "actioncable";

import MyLoader from "@/Shared/Components/MyLoader/MyLoader";
import { ClassroomContext } from "@/Providers/ClassroomProvider/ClassroomProvider";

import People from "../People/People";
import Stream from "../Stream/Stream";
import ClassworkWithProvider from "./Components/ClassworkWithProvider";
import { useFetchClassroom } from "./Hooks/useFetchClassroom";

const Classroom: React.FC = () => {
  const { classroom } = useContext(ClassroomContext);

  const { id, tabValue } = useParams();

  const navigate = useNavigate();

  const cable = ActionCable.createConsumer("ws://localhost:3000/cable");

  if (id) {
    useFetchClassroom(parseInt(id));
  }

  return (
    <>
      {classroom ? (
        <Tabs
          defaultValue="stream"
          color="sazim-green"
          m="md"
          c={"white"}
          value={tabValue}
          onChange={(value) => navigate(`/classroom/${classroom.id}/${value}`)}
        >
          <Tabs.List mx={{ base: "", xs: "xs", sm: "md", md: "xl" }} grow>
            <Tabs.Tab bg={"inherit"} value="stream">
              <Title order={5}>Stream</Title>
            </Tabs.Tab>
            <Tabs.Tab bg={"inherit"} value="classwork">
              <Title order={5}>Classwork</Title>
            </Tabs.Tab>
            <Tabs.Tab bg={"inherit"} value="people">
              <Title order={5}>People</Title>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="stream">
            <Stream classroom={classroom} cable={cable} />
          </Tabs.Panel>
          <Tabs.Panel value="classwork">
            <ClassworkWithProvider classroom={classroom} />
          </Tabs.Panel>
          <Tabs.Panel value="people">
            <People classroom={classroom} />
          </Tabs.Panel>
        </Tabs>
      ) : (
        <MyLoader />
      )}
    </>
  );
};

export default Classroom;
