import { Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { createPost } from "../../Api/StreamMethods";

const CreatePostForm = ({ classroom, setPosts }) => {
  const form = useForm({
    initialValues: {
      text: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      const response = await createPost({
        classroom_id: classroom.id,
        text: values.text,
      });

      setPosts((prevState) => [response.data.new_message, ...prevState]);

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
        <Button size="md" color="sazim-blue" onClick={form.reset}>
          Reset
        </Button>
        <Button size="md" color="sazim-blue" type="submit">
          Post
        </Button>
      </Group>
    </form>
  );
};

export default CreatePostForm;
