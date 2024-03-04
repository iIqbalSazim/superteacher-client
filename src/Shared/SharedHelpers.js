import { notifications } from "@mantine/notifications";

export function handleErrorMessage(error) {
  let message;
  if (error.data) {
    message = error.data.message;
  } else {
    message = error.message;
  }

  if (message) {
    notifications.show({
      color: "red",
      title: "Error",
      message: message,
    });
  }
}

export function handleEducationLevelChange(form, level) {
  if (level == "School") {
    form.setFieldValue("education", {
      english_bangla_medium: "English",
      class_level: "Class 7",
    });
  }

  if (level == "College") {
    form.setFieldValue("education", {
      english_bangla_medium: "English",
      class_level: "Class 11",
    });
  }

  if (level == "University") {
    form.setFieldValue("education", {
      degree_level: "Bachelors",
    });
  }
}
