import { useEffect, useState } from "react";
import { Tabs, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Stream from "./Components/Stream/Stream";
import Classwork from "./Components/Classwork/Classwork";
import People from "./Components/People/People";

const Classroom = () => {
  const [classroom, setClassroom] = useState(null);

  const { id } = useParams();

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
        <Tabs defaultValue="stream" color="sazim-green" m="md" c={"white"}>
          <Tabs.List>
            <Tabs.Tab bg={"inherit"} value="stream">
              Stream
            </Tabs.Tab>
            <Tabs.Tab bg={"inherit"} value="classwork">
              Classwork
            </Tabs.Tab>
            <Tabs.Tab bg={"inherit"} value="people">
              People
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="stream">
            <Stream classroom={classroom} />
          </Tabs.Panel>
          <Tabs.Panel value="classwork">
            <Classwork />
          </Tabs.Panel>
          <Tabs.Panel value="people">
            <People />
          </Tabs.Panel>
        </Tabs>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
};

export default Classroom;
