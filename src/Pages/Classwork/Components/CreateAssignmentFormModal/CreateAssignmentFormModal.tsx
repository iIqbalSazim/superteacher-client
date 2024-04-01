import { useContext, useState } from "react";
import { Box, Button, Group, Modal, SimpleGrid, Text } from "@mantine/core";
import {
  TextInput,
  Textarea,
  FileInput,
  DateInput,
} from "react-hook-form-mantine";
import { Form, FormSubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifications } from "@mantine/notifications";

import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { ClassworkContext } from "@/Shared/Providers/ClassworkProvider/ClassworkProvider";

import { createNewResource } from "../../Api/ClassworkMethods";
import CreateAssignmentFormSchema from "../../Validation/CreateAssignmentFormSchema";
import { handleFileUpload, formatDate } from "../../ClassworkHelpers";
import {
  CreateAssignmentFormModalProps,
  CreateAssignmentFormValues,
} from "./CreateAssignmentFormModalTypes";

const CreateAssignmentFormModal: React.FC<CreateAssignmentFormModalProps> = ({
  open,
  close,
  classroom,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { setUploadedAssignments } = useContext(ClassworkContext);

  const {
    formState: { errors },
    reset,
    control,
  } = useForm<CreateAssignmentFormValues>({
    defaultValues: {
      title: "",
      file: null,
      description: "",
      due_date: new Date(),
    },
    resolver: zodResolver(CreateAssignmentFormSchema),
  });

  const onSubmit: FormSubmitHandler<CreateAssignmentFormValues> = async (
    formPayload
  ) => {
    try {
      setIsLoading(true);

      const values = formPayload.data;

      if (values.file) {
        const { file } = values;

        let downloadURL = await handleFileUpload(file);

        const dueDate: string = formatDate(values.due_date.toString());

        const response = await createNewResource(classroom.id, {
          resource: {
            title: values.title,
            description: values.description,
            resource_type: "assignment",
            url: downloadURL,
            classroom_id: classroom.id,
            due_date: dueDate,
          },
        });

        setUploadedAssignments((prevState) => [
          response.data.resource,
          ...prevState,
        ]);

        notifications.show({
          color: "sazim-green",
          title: "Success",
          message: "Successfully uploaded",
          autoClose: 3000,
        });

        setIsLoading(false);
        close();
        reset();
      }
    } catch (error) {
      handleErrorMessage(error);
      setIsLoading(false);
    }
  };

  return (
    <Modal opened={open} onClose={close} size={"md"} centered>
      <Box mx={{ base: "xs", sm: "xl" }}>
        <Text mb={20} fw={700} tt={"uppercase"} size="lg">
          Create Assignment
        </Text>
        <Form control={control} onSubmit={onSubmit}>
          <SimpleGrid>
            <TextInput
              size={"md"}
              label="Title"
              placeholder="Enter a title"
              control={control}
              name="title"
              error={errors.title?.message}
            />

            <Textarea
              size={"md"}
              label="Instructions"
              placeholder="Enter instructions"
              control={control}
              name="description"
              error={errors.description?.message}
            />

            <FileInput
              clearable
              size="md"
              label="Upload file"
              placeholder="Upload file"
              control={control}
              name="file"
              error={errors.file?.message}
            />

            <DateInput
              minDate={new Date()}
              size="md"
              label="Due Date"
              control={control}
              name="due_date"
              error={errors.due_date?.message}
            />
          </SimpleGrid>

          <Group justify="flex-end" mt="xl" mb={"sm"}>
            <Button size="sm" color="sazim-green.7" onClick={close}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              color="sazim-green.7"
              loading={isLoading}
            >
              Create
            </Button>
          </Group>
        </Form>
      </Box>
    </Modal>
  );
};

export default CreateAssignmentFormModal;
