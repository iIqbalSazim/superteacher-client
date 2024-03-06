import { ClassroomType } from "@/Types/SharedTypes";

export interface EditClassroomParams {
  open: boolean;
  close: () => void;
  classroom: ClassroomType;
}
