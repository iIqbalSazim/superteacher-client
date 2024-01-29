import { Box, Button, Group, Modal, Text } from "@mantine/core";

const ConfirmRemoveStudentModal = ({ open, close, removeStudent, student }) => {
  return (
    <Modal opened={open} onClose={close} size={"md"} centered>
      <Box mx="xl" py={"md"}>
        <Text mb={20} fw={700} tt={"uppercase"} size="lg">
          Are you sure you want to remove {student.first_name}{" "}
          {student.last_name} from the classroom?
        </Text>
        <Group justify="flex-end" mt={"xl"} pt="md">
          <Button color="sazim-purple" onClick={close}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              removeStudent(student.id);
              close();
            }}
            color="sazim-purple"
          >
            Confirm
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};

export default ConfirmRemoveStudentModal;
