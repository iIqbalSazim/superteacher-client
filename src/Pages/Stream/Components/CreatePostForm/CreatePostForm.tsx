import { Button, Group } from "@mantine/core";
import { Textarea } from "react-hook-form-mantine";
import { Form, FormSubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifications } from "@mantine/notifications";

import { User } from "@/Types/SharedTypes";
import { useAppSelector } from "@/Shared/Redux/Store";
import { handleErrorMessage } from "@/Shared/SharedHelpers";

import {
  CreatePostFormProps,
  CreatePostFormValues,
} from "./CreatePostFormTypes";
import { createPost } from "../../Api/StreamMethods";
import CreatePostFormSchema from "../../Validation/CreatePostFormSchema";

const CreatePostForm: React.FC<CreatePostFormProps> = ({ classroom }) => {
  const {
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: "",
    },
    resolver: zodResolver(CreatePostFormSchema),
  });

  const currentUser = useAppSelector((state) => state.auth.user) as User;

  const onSubmit: FormSubmitHandler<CreatePostFormValues> = async (
    formPayload
  ) => {
    try {
      const response = await createPost(classroom.id, {
        user_id: currentUser.id,
        classroom_id: classroom.id,
        text: formPayload.data.text,
      });

      if (response.data.new_message) {
        notifications.show({
          color: "sazim-green",
          title: "Success",
          message: "Posted!",
        });
      }

      reset();
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <Form control={control} onSubmit={onSubmit}>
      <Textarea
        placeholder="Announce something to your class"
        size="xl"
        control={control}
        name="text"
        error={errors.text?.message}
      />

      <Group justify="flex-end" mt={"md"}>
        <Button size="sm" color="sazim-blue" onClick={() => reset()}>
          Reset
        </Button>
        <Button size="sm" color="sazim-blue" type="submit">
          Post
        </Button>
      </Group>
    </Form>
  );
};

export default CreatePostForm;
