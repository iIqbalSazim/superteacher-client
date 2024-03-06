import { useContext, useState } from "react";
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

  const form = useForm({
    initialValues: {
      title: "",
      file: null,
      description: "",
    },
    validate: yupResolver(CreateMaterialFormSchema),
  });

  const handleSubmit = async (values: CreateMaterialFormValues) => {
    try {
      setIsLoading(true);

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
        form.reset();
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
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <SimpleGrid>
            <TextInput
              size={"md"}
              label="Title"
              placeholder="Enter a title"
              {...form.getInputProps("title")}
            />
            <Textarea
              size={"md"}
              label="Description"
              placeholder="Enter a description"
              {...form.getInputProps("description")}
            />
            <FileInput
              clearable
              size="md"
              label="Upload file"
              placeholder="Upload file"
              {...form.getInputProps("file")}
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

export default CreateMaterialFormModal;
