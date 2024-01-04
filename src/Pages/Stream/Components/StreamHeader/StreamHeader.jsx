import { BackgroundImage, Flex, Title } from "@mantine/core";

const StreamHeader = ({ classroom }) => {
  return (
    <Flex mx="auto" mih={"300"}>
      <BackgroundImage
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
        radius={"md"}
      >
        <Flex
          justify={"flex-end"}
          direction={"column"}
          mih="300"
          ml="xl"
          mb={"sm"}
        >
          <Title fw={700} mb={10} tt={"uppercase"}>
            {classroom.title}
          </Title>
        </Flex>
      </BackgroundImage>
    </Flex>
  );
};

export default StreamHeader;
