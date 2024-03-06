import { ClassroomType } from "@/Types/SharedTypes";

export interface MeetLinkProps {
  classroom: ClassroomType;
  setIsAddMeetLinkFormModalOpen: (value: React.SetStateAction<boolean>) => void;
}
