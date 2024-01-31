import { useSelector } from "react-redux";
import { Title } from "@mantine/core";

import CreateFileButtonGroup from "../CreateFileButtonGroup/CreateFileButtonGroup";

const HeaderSection = ({
  classroom,
  setUploadedAssignments,
  setUploadedMaterials,
}) => {
  const currentUser = useSelector((state) => state.auth.user);
  return (
    <>
      {currentUser.role === "teacher" && (
        <CreateFileButtonGroup
          classroom={classroom}
          setUploadedAssignments={setUploadedAssignments}
          setUploadedMaterials={setUploadedMaterials}
        />
      )}
      <Title my={"md"} visibleFrom="xs">
        Uploaded Resources
      </Title>
      <Title my={"md"} hiddenFrom="xs" order={2}>
        Uploaded Resources
      </Title>
    </>
  );
};

export default HeaderSection;
