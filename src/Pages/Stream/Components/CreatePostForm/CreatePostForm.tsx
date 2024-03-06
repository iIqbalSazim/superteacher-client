import { Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { User } from "@/Types/SharedTypes";
import { useAppSelector } from "@/Stores/Store";
import { handleErrorMessage } from "@/Shared/SharedHelpers";

import { createPost } from "../../Api/StreamMethods";
import {
  CreatePostFormProps,
  CreatePostFormValues,
} from "./CreatePostFormTypes";

const CreatePostForm: React.FC<CreatePostFormProps> = ({ classroom }) => {
  const form = useForm({
    initialValues: {
      text: "",
    },
  });

  const currentUser = useAppSelector((state) => state.auth.user) as User;

  const handleSubmit = async (values: CreatePostFormValues) => {
    try {
      const response = await createPost(classroom.id, {
        user_id: currentUser.id,
        classroom_id: classroom.id,
        text: values.text,
      });

      if (response.data.new_message) {
        notifications.show({
          color: "sazim-green",
          title: "Success",
          message: "Posted!",
        });
      }

      form.reset();
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Textarea
        placeholder="Announce something to your class"
        size="xl"
        {...form.getInputProps("text")}
      />
      <Group justify="flex-end" mt={"md"}>
        <Button size="sm" color="sazim-blue" onClick={form.reset}>
          Reset
        </Button>
        <Button size="sm" color="sazim-blue" type="submit">
          Post
        </Button>
      </Group>
    </form>
  );
};

export default CreatePostForm;
