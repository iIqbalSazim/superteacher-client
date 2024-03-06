import { Button, Group, PasswordInput, SimpleGrid } from "@mantine/core";

import { NewPasswordFormProps } from "./NewPasswordFormTypes";

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({
  form,
  onSubmit,
  isLoading,
  onBack,
}) => (
  <form onSubmit={form.onSubmit(onSubmit)}>
    <SimpleGrid spacing="md">
      <PasswordInput
        size="md"
        label="New Password"
        placeholder="Enter your new password"
        withAsterisk
        {...form.getInputProps("new_password")}
      />
      <PasswordInput
        size="md"
        label="Confirm New Password"
        placeholder="Confirm your new password"
        withAsterisk
        {...form.getInputProps("confirm_new_password")}
      />
      <Group justify="flex-end" mt="xl" mb="sm">
        <Button size="sm" color="sazim-green.7" onClick={onBack}>
          Back
        </Button>
        <Button
          type="submit"
          size="sm"
          color="sazim-green.7"
          loading={isLoading}
        >
          Reset Password
        </Button>
      </Group>
    </SimpleGrid>
  </form>
);

export default NewPasswordForm;
