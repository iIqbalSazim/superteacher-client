import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

const AddMeetLinkButton = ({ setIsAddMeetLinkFormModalOpen }) => {
  return (
    <Button
      variant="filled"
      color="sazim-green"
      onClick={() => setIsAddMeetLinkFormModalOpen(true)}
      leftSection={<IconPlus />}
      mx={"xl"}
    >
      Add meet link
    </Button>
  );
};

export default AddMeetLinkButton;
