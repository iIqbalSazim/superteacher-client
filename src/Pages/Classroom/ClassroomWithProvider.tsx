import { ClassroomProvider } from "@/Providers/ClassroomProvider/ClassroomProvider";

import Classroom from "./Classroom";

const ClassroomWithProvider: React.FC = () => {
  return (
    <ClassroomProvider>
      <Classroom />
    </ClassroomProvider>
  );
};

export default ClassroomWithProvider;
