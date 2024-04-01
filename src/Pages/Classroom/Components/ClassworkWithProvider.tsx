import Classwork from "@/Pages/Classwork/Classwork";
import { ClassworkProvider } from "@/Shared/Providers/ClassworkProvider/ClassworkProvider";
import { ClassroomType } from "@/Types/SharedTypes";

const ClassworkWithProvider: React.FC<{ classroom: ClassroomType }> = ({
  classroom,
}) => {
  return (
    <ClassworkProvider>
      <Classwork classroom={classroom} />
    </ClassworkProvider>
  );
};

export default ClassworkWithProvider;
