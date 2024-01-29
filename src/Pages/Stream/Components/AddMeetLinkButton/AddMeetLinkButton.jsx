import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

const AddMeetLinkButton = ({ setIsAddMeetLinkFormModalOpen }) => {
  return (
    <Button
      variant="outline"
      color="green"
      onClick={() => setIsAddMeetLinkFormModalOpen(true)}
      leftSection={<IconPlus />}
    >
      Add meet link
    </Button>
  );
};

export default AddMeetLinkButton;
