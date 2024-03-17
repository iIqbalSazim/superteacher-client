import { useContext, useState } from "react";
import { Box, Button, Group, Modal, SimpleGrid, Text } from "@mantine/core";
import { TextInput, Textarea, FileInput } from "react-hook-form-mantine";
import { Form, FormSubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifications } from "@mantine/notifications";

import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { ClassworkContext } from "@/Providers/ClassworkProvider/ClassworkProvider";

import { createNewResource } from "../../Api/ClassworkMethods";
import CreateMaterialFormSchema from "../../Validation/CreateMaterialFormSchema";
import { handleFileUpload } from "../../ClassworkHelpers";
import {
  CreateMaterialFormModalProps,
  CreateMaterialFormValues,
} from "./CreateMaterialFormModalTypes";

const CreateMaterialFormModal: React.FC<CreateMaterialFormModalProps> = ({
  open,
  close,
  classroom,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { setUploadedMaterials } = useContext(ClassworkContext);

  const {
    formState: { errors },
    reset,
    control,
  } = useForm<CreateMaterialFormValues>({
    defaultValues: {
      title: "",
      file: null,
      description: "",
    },
    resolver: zodResolver(CreateMaterialFormSchema),
  });

  const onSubmit: FormSubmitHandler<CreateMaterialFormValues> = async (
    formPayload
  ) => {
    try {
      setIsLoading(true);

      const values = formPayload.data;

      if (values.file) {
        const { file } = values;

        const downloadURL: string = await handleFileUpload(file);

        const response = await createNewResource(classroom.id, {
          resource: {
            title: values.title,
            description: values.description,
            resource_type: "material",
            url: downloadURL,
            classroom_id: classroom.id,
          },
        });

        setUploadedMaterials((prevState) => [
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
    <Modal opened={open} onClose={close} size={"md"} centered px={"xl"}>
      <Box mx="xl">
        <Text mb={20} fw={700} tt={"uppercase"} size="lg">
          Upload Material
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
              label="Description"
              placeholder="Enter a description"
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

export default CreateMaterialFormModal;
