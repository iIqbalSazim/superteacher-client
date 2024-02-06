import { useSelector } from "react-redux";
import { Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { createPost } from "../../Api/StreamMethods";

const CreatePostForm = ({ classroom }) => {
  const form = useForm({
    initialValues: {
      text: "",
    },
  });

  const currentUser = useSelector((state) => state.auth.user);

  const handleSubmit = async (values) => {
    try {
      const response = await createPost(classroom.id, {
        global_message: {
          user_id: currentUser.id,
          classroom_id: classroom.id,
          text: values.text,
        },
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
