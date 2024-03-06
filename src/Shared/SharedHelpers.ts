import { notifications } from "@mantine/notifications";

import { Education } from "@/Types/SharedTypes";

interface ApiError {
  data: {
    message: string;
  };
  message: string;
}

export function handleErrorMessage(error: unknown) {
  let message;

  if (typeof error === "object" && error !== null) {
    const apiError = error as ApiError;

    if (apiError.data) {
      message = apiError.data.message;
    } else {
      message = apiError.message;
    }
  }

  if (message) {
    notifications.show({
      color: "red",
      title: "Error",
      message: message,
    });
  }
}

export function handleEducationLevelChange(
  setFieldValue: (fieldName: string, values: Education) => void,
  level: string
) {
  if (level == "School") {
    setFieldValue("education", {
      level: "School",
      english_bangla_medium: "English",
      class_level: "Class 7",
    });
  }

  if (level == "College") {
    setFieldValue("education", {
      level: "College",
      english_bangla_medium: "English",
      class_level: "Class 11",
    });
  }

  if (level == "University") {
    setFieldValue("education", {
      level: "University",
      degree_level: "Bachelors",
    });
  }
}
