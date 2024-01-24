import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, Title } from "@mantine/core";

import MyLoader from "@/Shared/Components/MyLoader/MyLoader";

import Classwork from "../Classwork/Classwork";
import People from "../People/People";
import Stream from "../Stream/Stream";

const Classroom = () => {
  const [classroom, setClassroom] = useState(null);
  const navigate = useNavigate();

  const { id, tabValue } = useParams();

  const allClassrooms = useSelector((state) => state.classroom.classrooms);

  useEffect(() => {
    if (allClassrooms && allClassrooms.length > 0) {
      const foundClassroom = allClassrooms.find(
        (classroom) => classroom.id === parseInt(id)
      );
      setClassroom(foundClassroom || null);
    }
  }, [id, allClassrooms]);

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
          <Tabs.List mx={"xl"}>
            <Tabs.Tab bg={"inherit"} value="stream">
              <Title order={4}>Stream</Title>
            </Tabs.Tab>
            <Tabs.Tab bg={"inherit"} value="classwork">
              <Title order={4}>Classwork</Title>
            </Tabs.Tab>
            <Tabs.Tab bg={"inherit"} value="people">
              <Title order={4}>People</Title>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="stream">
            <Stream classroom={classroom} setClassroom={setClassroom} />
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
