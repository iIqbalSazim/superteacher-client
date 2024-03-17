import { Button, Group, TextInput } from "@mantine/core";

import { EmailFormProps } from "./EmailFormTypes";

const EmailForm: React.FC<EmailFormProps> = ({
  form,
  onSubmit,
  isLoading,
  onCancel,
}) => {
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        size="md"
        label="Email"
        placeholder="Enter your email"
        withAsterisk
        error={errors.email?.message}
        {...form.register("email")}
      />
      <Group justify="flex-end" mt="xl" mb="sm">
        <Button size="sm" color="sazim-green.7" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          color="sazim-green.7"
          loading={isLoading}
        >
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default EmailForm;
