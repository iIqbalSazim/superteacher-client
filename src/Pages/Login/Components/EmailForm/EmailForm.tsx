import { Button, Group, TextInput } from "@mantine/core";

import { EmailFormProps } from "./EmailFormTypes";

const EmailForm: React.FC<EmailFormProps> = ({
  form,
  onSubmit,
  isLoading,
  onCancel,
}) => (
  <form onSubmit={form.onSubmit(onSubmit)}>
    <TextInput
      size="md"
      label="Email"
      placeholder="Enter your email"
      withAsterisk
      {...form.getInputProps("email")}
    />
    <Group justify="flex-end" mt="xl" mb="sm">
      <Button size="sm" color="sazim-green.7" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" size="sm" color="sazim-green.7" loading={isLoading}>
        Submit
      </Button>
    </Group>
  </form>
);

export default EmailForm;
