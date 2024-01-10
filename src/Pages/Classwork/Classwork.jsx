import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Divider, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import CreateFileButtonGroup from "./Components/CreateFileButtonGroup/CreateFileButtonGroup";
import Resources from "./Components/Resources/Resources";
import { getClassroomResources } from "./Api/ClassworkMethods";

const Classwork = ({ classroom }) => {
  const [uploadedResources, setUploadedResources] = useState([]);

  useEffect(() => {
    const fetchClassroomResources = async () => {
      try {
        const response = await getClassroomResources(classroom.id);

        const resourcesInLatestFirstOrder = response.data.resources
          ? response.data.resources.reverse()
          : [];

        setUploadedResources(resourcesInLatestFirstOrder);
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
    };

    fetchClassroomResources();
  }, [classroom.id]);

  const currentUser = useSelector((state) => state.auth.user);
  return (
    <Box mx={"xl"} py={"sm"} px={"xl"} mih={"100vh"} width={"100%"}>
      {currentUser.role === "teacher" ? (
        <CreateFileButtonGroup
          setUploadedResources={setUploadedResources}
          classroom={classroom}
        />
      ) : null}

      <Title my={"md"}>Uploaded Resources</Title>

      <Divider my="lg" />

      {uploadedResources && uploadedResources.length !== 0 ? (
        <Resources uploadedResources={uploadedResources} />
      ) : (
        <Title order={2} mx={"xl"}>
          No resources available
        </Title>
      )}
    </Box>
  );
};

export default Classwork;
