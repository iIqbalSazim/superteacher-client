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

import { updateResource } from "../../Api/ClassworkMethods";
import UpdateMaterialFormSchema from "../../Validation/UpdateMaterialFormSchema";
import { handleFileUpload } from "../../ClassworkHelpers";
import { UpdateMaterialFormModalProps } from "./UpdateMaterialFormModalTypes";
import { CreateMaterialFormValues } from "../CreateMaterialFormModal/CreateMaterialFormModalTypes";

const UpdateMaterialFormModal: React.FC<UpdateMaterialFormModalProps> = ({
  open,
  close,
  material,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { setUploadedMaterials } = useContext(ClassworkContext);

  const form = useForm({
    initialValues: {
      title: material.title,
      file: null,
      description: material.description,
    },
    validate: yupResolver(UpdateMaterialFormSchema),
  });

  const handleSubmit = async (values: CreateMaterialFormValues) => {
    try {
      setIsLoading(true);

      let downloadURL = material.url;

      if (values.file) {
        const { file } = values;

        downloadURL = await handleFileUpload(file);
      }

      const response = await updateResource(
        material.classroom_id,
        material.id,
        {
          resource: {
            title: values.title,
            description: values.description,
            resource_type: "material",
            url: downloadURL,
          },
        }
      );

      const updatedResource = response.data.resource;

      setUploadedMaterials((prevState) => {
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
        message: "Successfully updated material",
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
          Update Material
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
              Update
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateMaterialFormModal;
