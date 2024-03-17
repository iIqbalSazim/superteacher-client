import { useContext, useState } from "react";
import { Box, Button, Group, Modal, SimpleGrid, Text } from "@mantine/core";
import { TextInput, Textarea, FileInput } from "react-hook-form-mantine";
import { Form, FormSubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

  const {
    formState: { errors },
    control,
  } = useForm<CreateMaterialFormValues>({
    defaultValues: {
      title: material.title,
      file: null,
      description: material.description,
    },
    resolver: zodResolver(UpdateMaterialFormSchema),
  });

  const onSubmit: FormSubmitHandler<CreateMaterialFormValues> = async (
    formPayload
  ) => {
    try {
      setIsLoading(true);

      const values = formPayload.data;

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
        <Form onSubmit={onSubmit} control={control}>
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
              Update
            </Button>
          </Group>
        </Form>
      </Box>
    </Modal>
  );
};

export default UpdateMaterialFormModal;
