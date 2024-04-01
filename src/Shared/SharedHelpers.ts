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
