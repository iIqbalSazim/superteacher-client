import { ClassroomType } from "@/Types/SharedTypes";

export interface ConfirmDeleteMeetLinkProps {
  open: boolean;
  close: () => void;
  classroom: ClassroomType;
}
