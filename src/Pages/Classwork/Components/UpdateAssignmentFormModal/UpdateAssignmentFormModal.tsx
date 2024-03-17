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

import { ClassworkContext } from "@/Providers/ClassworkProvider/ClassworkProvider";
import { handleErrorMessage } from "@/Shared/SharedHelpers";

import UpdateAssignmentFormSchema from "../../Validation/UpdateAssignmentFormSchema";
import { updateResource } from "../../Api/ClassworkMethods";
import { formatDate, handleFileUpload } from "../../ClassworkHelpers";
import { CreateAssignmentFormValues } from "../CreateAssignmentFormModal/CreateAssignmentFormModalTypes";
import { UpdateAssignmentFormModalProps } from "./UpdateAssignmentFormModalTypes";

const UpdateAssignmentFormModal: React.FC<UpdateAssignmentFormModalProps> = ({
  open,
  close,
  assignment,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { setUploadedAssignments } = useContext(ClassworkContext);

  const {
    formState: { errors },
    control,
  } = useForm<CreateAssignmentFormValues>({
    defaultValues: {
      title: assignment.title,
      file: null,
      description: assignment.description,
      due_date: new Date(assignment.due_date as string | Date),
    },
    resolver: zodResolver(UpdateAssignmentFormSchema),
  });

  const onSubmit: FormSubmitHandler<CreateAssignmentFormValues> = async (
    formPayload
  ) => {
    try {
      setIsLoading(true);

      const values = formPayload.data;

      let downloadURL = assignment.url;

      if (values.file) {
        const { file } = values;

        downloadURL = await handleFileUpload(file);
      }

      let dueDate = formatDate(values.due_date.toString());

      const response = await updateResource(
        assignment.classroom_id,
        assignment.id,
        {
          resource: {
            title: values.title,
            description: values.description,
            resource_type: "assignment",
            url: downloadURL,
            due_date: dueDate,
          },
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
      handleErrorMessage(error);

      setIsLoading(false);
    }
  };

  return (
    <Modal opened={open} onClose={close} size={"md"} centered>
      <Box mx={{ base: "xs", sm: "xl" }}>
        <Text mb={20} fw={700} tt={"uppercase"} size="lg">
          Update Assignment
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
              Update
            </Button>
          </Group>
        </Form>
      </Box>
    </Modal>
  );
};

export default UpdateAssignmentFormModal;
