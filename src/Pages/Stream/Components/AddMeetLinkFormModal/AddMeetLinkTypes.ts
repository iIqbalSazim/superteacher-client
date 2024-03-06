import { ClassroomType } from "@/Types/SharedTypes";

export interface AddMeetLinkModalProps {
  classroom: ClassroomType;
  open: boolean;
  close: () => void;
}

export interface AddMeetLinkFormValues {
  meet_link: string;
}
