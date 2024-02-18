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

import UpdateAssignmentFormSchema from "../../Validation/UpdateAssignmentFormSchema";
import { updateResource, uploadFile } from "../../Api/ClassworkMethods";

const UpdateAssignmentFormModal = ({
  open,
  close,
  setUploadedAssignments,
  assignment,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      title: assignment.title,
      file: null,
      description: assignment.description,
      due_date: new Date(assignment.due_date),
    },
    validate: yupResolver(UpdateAssignmentFormSchema),
  });

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const { file } = values;

      let downloadURL = assignment.url;

      if (file) {
        let formData = new FormData();
        formData.append("file", file);

        const res = await uploadFile(formData);

        downloadURL = res.data.url;
      }

      const updatedAssignment = {
        title: values.title,
        description: values.description,
        resource_type: "assignment",
        url: downloadURL,
        due_date: values.due_date,
      };

      const response = await updateResource(
        assignment.classroom_id,
        assignment.id,
        {
          resource: { ...updatedAssignment },
        }
      );

      const updatedResource = response.data.resource;

      setUploadedAssignments((prevState) => {
        return prevState.map((resource) => {
          if (resource.id === updatedResource.id) {
            return updatedResource;
          } else {
            return resource;
          }
        });
      });

      notifications.show({
        color: "sazim-green",
        title: "Success",
        message: "Successfully updated assignment",
        autoClose: 3000,
      });

      setIsLoading(false);
      close();
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

      setIsLoading(false);
    }
  };

  return (
    <Modal opened={open} onClose={close} size={"md"} centered>
      <Box mx={{ base: "xs", sm: "xl" }}>
        <Text mb={20} fw={700} tt={"uppercase"} size="lg">
          Update Assignment
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
              Update
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateAssignmentFormModal;
