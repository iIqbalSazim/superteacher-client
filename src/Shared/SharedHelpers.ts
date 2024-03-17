import { notifications } from "@mantine/notifications";

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

export function handleEducationLevelChange(level: string) {
  if (level === "School") {
    return {
      level: "School",
      english_bangla_medium: "English",
      class_level: "Class 7",
      degree_level: "",
      semester_year: "",
    };
  } else if (level === "College") {
    return {
      level: "College",
      english_bangla_medium: "English",
      class_level: "Class 11",
      degree_level: "",
      semester_year: "",
    };
  } else if (level === "University") {
    return {
      level: "University",
      degree_level: "Bachelors",
      english_bangla_medium: "",
      class_level: "",
      semester_year: "",
    };
  } else {
    return {
      english_bangla_medium: "",
      class_level: "",
      degree_level: "",
      semester_year: "",
    };
  }
}
