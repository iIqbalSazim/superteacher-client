import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import ActionCable from "actioncable";

import MyLoader from "@/Shared/Components/MyLoader/MyLoader";

import Classwork from "../Classwork/Classwork";
import People from "../People/People";
import Stream from "../Stream/Stream";
import { fetchClassroom } from "./Api/ClassroomMethods";

const Classroom = () => {
  const [classroom, setClassroom] = useState(null);
  const { id, tabValue } = useParams();

  const navigate = useNavigate();

  const cable = ActionCable.createConsumer("ws://localhost:3000/cable");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchClassroom(id);

        setClassroom(response.data.classroom || null);
      } catch (error) {
        let message;
        if (error.data) {
          message = error.data.message;
        } else {
          message = error.message;
        }

        if (message) {
          notifications.show({
            color: "red",
            title: "Error",
            message: message,
          });
        }
      }
    }

    fetchData();
  }, [id]);

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
            <Stream
              classroom={classroom}
              setClassroom={setClassroom}
              cable={cable}
            />
          </Tabs.Panel>
          <Tabs.Panel value="classwork">
            <Classwork classroom={classroom} />
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
