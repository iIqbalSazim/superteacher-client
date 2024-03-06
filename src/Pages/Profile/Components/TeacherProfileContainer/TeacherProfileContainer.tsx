import TeacherProfile from "../TeacherProfile/TeacherProfile";
import TeacherUpdateProfileForm from "../TeacherUpdateProfileForm/TeacherUpdateProfileForm";
import { TeacherProfileContainerProps } from "./TeacherProfileContainerTypes";

const TeacherProfileContainer: React.FC<TeacherProfileContainerProps> = ({
  editProfile,
  profile,
}) => {
  return (
    <>
      {!editProfile ? (
        <TeacherProfile profile={profile} />
      ) : (
        <TeacherUpdateProfileForm profile={profile} />
      )}
    </>
  );
};

export default TeacherProfileContainer;
