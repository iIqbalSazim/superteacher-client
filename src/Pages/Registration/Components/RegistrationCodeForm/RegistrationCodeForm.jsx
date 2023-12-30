import {
  Anchor,
  Box,
  Button,
  Flex,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link } from "react-router-dom";
import { yupResolver } from "mantine-form-yup-resolver";

import { validateRegistrationCode } from "../../Api/RegistrationMethods";
import RegistrationCodeFormSchema from "../../Validation/RegistrationCodeFormSchema";

const RegistrationCodeForm = ({ setIsRegistrationCodeValid }) => {
  const form = useForm({
    initialValues: {
      code: "",
    },
    validate: yupResolver(RegistrationCodeFormSchema),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await validateRegistrationCode({ ...values });
      if (response.data.code) {
        setIsRegistrationCodeValid(true);
      }
    } catch (error) {
      const { message } = error.data;
      console.log(message);
    }

    form.reset();
  };

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      style={{ minHeight: "100vh" }}
    >
      <Text my={20} fw={700} tt={"uppercase"} size="xl">
        Register as a Teacher
      </Text>
      <Box w={400} maw={700} mx="auto">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            size={"md"}
            label="Enter registration code"
            placeholder="Enter unique code, e.g. ceb486"
            withAsterisk
            {...form.getInputProps("code")}
          />

          <Group justify="space-evenly" mt="lg" py={"sm"}>
            <Button type="submit" size="md" color="sazim-green.7">
              Submit
            </Button>
          </Group>
        </form>

        <Text fw={400} c={"sazim-green.4"} ta={"center"} size="md" mt={"md"}>
          Already have an account?{" "}
          <Anchor component={Link} to={"/login"} c="white">
            Login
          </Anchor>
        </Text>

        <Text fw={400} c={"sazim-green.4"} ta={"center"} size="md">
          <Anchor component={Link} to={"/student"} c="white">
            Register as a student
          </Anchor>
        </Text>
      </Box>
    </Flex>
  );
};

export default RegistrationCodeForm;
