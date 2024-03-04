import { useState } from "react";
import {
  Box,
  Button,
  FileInput,
  Group,
  Modal,
  SimpleGrid,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { DateInput } from "@mantine/dates";

import { handleErrorMessage } from "@/Shared/SharedHelpers";

import { createNewResource } from "../../Api/ClassworkMethods";
import CreateAssignmentFormSchema from "../../Validation/CreateAssignmentFormSchema";
import { handleFileUpload } from "../../ClassworkHelpers";

const CreateAssignmentFormModal = ({
  open,
  close,
  setUploadedAssignments,
  classroom,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      file: null,
      description: "",
      due_date: new Date(),
    },
    validate: yupResolver(CreateAssignmentFormSchema),
  });

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const { file } = values;

      const downloadURL = await handleFileUpload(file);

      const newAssignment = {
        title: values.title,
        description: values.description,
        resource_type: "assignment",
        url: downloadURL,
        classroom_id: classroom.id,
        due_date: values.due_date,
      };

      const response = await createNewResource(classroom.id, {
        resource: { ...newAssignment },
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
      form.reset();
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
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <SimpleGrid gutter={"sm"}>
            <TextInput
              size={"md"}
              label="Title"
              placeholder="Enter a title"
              {...form.getInputProps("title")}
            />
            <Textarea
              size={"md"}
              label="Instructions"
              placeholder="Enter instructions"
              {...form.getInputProps("description")}
            />
            <FileInput
              clearable
              size="md"
              label="Upload file"
              placeholder="Upload file"
              {...form.getInputProps("file")}
            />
            <DateInput
              minDate={new Date()}
              size="md"
              label="Due Date"
              {...form.getInputProps("due_date")}
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
        </form>
      </Box>
    </Modal>
  );
};

export default CreateAssignmentFormModal;
