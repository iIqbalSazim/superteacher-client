import { useContext } from "react";
import {
  Box,
  Button,
  Group,
  Modal,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";

import { updateClassroom } from "@/Stores/Slices/ClassroomSlice";
import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { ClassroomContext } from "@/Providers/ClassroomProvider/ClassroomProvider";
import { useAppDispatch } from "@/Stores/Store";

import { updateClassroomApi } from "../../Api/StreamMethods";
import AddMeetLinkFormSchema from "../../Validation/AddMeetLinkFormSchema";
import {
  AddMeetLinkFormValues,
  AddMeetLinkModalProps,
} from "./AddMeetLinkTypes";
import { zodResolver } from "@hookform/resolvers/zod";

const AddMeetLinkFormModal: React.FC<AddMeetLinkModalProps> = ({
  open,
  close,
  classroom,
}) => {
  const { setClassroom } = useContext(ClassroomContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMeetLinkFormValues>({
    defaultValues: {
      meet_link: classroom.meet_link || "",
    },
    resolver: zodResolver(AddMeetLinkFormSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (values: AddMeetLinkFormValues) => {
    try {
      const response = await updateClassroomApi(classroom.id, {
        ...classroom,
        meet_link: values.meet_link,
      });

      const updatedClassroom = response.data.classroom;

      setClassroom(updatedClassroom);
      dispatch(updateClassroom(updatedClassroom));

      close();

      notifications.show({
        color: "sazim-green",
        title: "Success",
        message: "Meet link added",
        autoClose: 3000,
      });
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <Modal opened={open} onClose={close} centered>
      <Box mx={{ base: "xs", sm: "xl" }}>
        <Text mb={20} fw={700} tt={"uppercase"} size="lg">
          Add Meet Link
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid>
            <TextInput
              size="sm"
              label="Meet Link"
              placeholder="Enter a link"
              withAsterisk
              error={errors.meet_link?.message}
              {...register("meet_link", { required: "Meet Link is required" })}
            />
          </SimpleGrid>

          <Group justify="flex-end" mt="xl" mb={"sm"}>
            <Button size="sm" color="sazim-green.7" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" size="sm" color="sazim-green.7">
              Add
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

export default AddMeetLinkFormModal;
