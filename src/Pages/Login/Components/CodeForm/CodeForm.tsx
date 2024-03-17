import { Button, Group, TextInput } from "@mantine/core";

import { CodeFormProps } from "./CodeFormTypes";

const CodeForm: React.FC<CodeFormProps> = ({
  form,
  onSubmit,
  isLoading,
  onBack,
}) => {
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        size="md"
        label="Code"
        placeholder="Enter the code"
        withAsterisk
        error={errors.code?.message}
        {...form.register("code")}
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
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default CodeForm;
