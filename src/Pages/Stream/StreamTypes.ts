import { Cable } from "actioncable";

import { ClassroomType } from "@/Types/SharedTypes";

export interface StreamParams {
  classroom: ClassroomType;
  cable: Cable;
}
