import StudentProfile from "../StudentProfile/StudentProfile";
import StudentUpdateProfileForm from "../StudentUpdateProfileForm/StudentUpdateProfileForm";
import { StudentProfileContainerProps } from "./StudentProfileContainerTypes";

const StudentProfileContainer: React.FC<StudentProfileContainerProps> = ({
  editProfile,
  profile,
}) => {
  return (
    <>
      {!editProfile ? (
        <StudentProfile profile={profile} />
      ) : (
        <StudentUpdateProfileForm profile={profile} />
      )}
    </>
  );
};

export default StudentProfileContainer;
