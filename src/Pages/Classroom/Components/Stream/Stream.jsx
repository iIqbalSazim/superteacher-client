import { BackgroundImage, Box, Flex, SimpleGrid, Text } from "@mantine/core";

const Stream = ({ classroom }) => {
  return (
    <Box mx="auto" py="sm" px="xl" mih={"100vh"} width={"100%"}>
      <Flex mx="auto" mih={"300"}>
        <BackgroundImage
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          radius="lg"
        >
          <Flex
            justify={"flex-end"}
            direction={"column"}
            mih="300"
            ml="xl"
            mb={"sm"}
          >
            <Text size="xl" fw={700} mb={10}>
              {classroom.title}
            </Text>
          </Flex>
        </BackgroundImage>
      </Flex>

      <SimpleGrid>
        <Text size="sm" mt={10}>
          Subject: {classroom.subject}
        </Text>
        <Text size="sm">
          Class Time: {new Date(classroom.class_time).toLocaleTimeString()}
        </Text>
        <Text size="sm">Days: {classroom.days.join(", ")}</Text>
      </SimpleGrid>
    </Box>
  );
};

export default Stream;
