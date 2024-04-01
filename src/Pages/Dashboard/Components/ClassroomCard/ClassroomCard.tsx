import { useNavigate } from "react-router-dom";
import { Badge, Card, Group, Image, Text } from "@mantine/core";

import { useAppSelector } from "@/Shared/Redux/Store";
import { User } from "@/Types/SharedTypes";

import { ClassroomCardProps } from "./ClassroomCardTypes";

const ClassroomCard: React.FC<ClassroomCardProps> = ({ classroom }) => {
  const currentUser = useAppSelector((state) => state.auth.user) as User;
  const navigate = useNavigate();

  return (
    <Card
      shadow="sm"
      padding="lg"
      my={"md"}
      radius="md"
      key={classroom.id}
      h={330}
      onClick={() => navigate(`/classroom/${classroom.id}/stream`)}
      withBorder
    >
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Classroom Image"
        />
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text size="lg" w={200} maw={200}>
          {classroom.title}
        </Text>
        <Badge color="sazim-purple.4" variant="outline" w={130}>
          {classroom.subject}
        </Badge>
      </Group>
      <Text size="sm">
        <strong>Days:</strong> {classroom.days.join(", ")}
      </Text>
      <Text size="sm">
        <strong>Class Time:</strong>{" "}
        {new Date(classroom.class_time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
      {currentUser && currentUser.role === "student" ? (
        <Text size="sm">
          <strong>Teacher:</strong>{" "}
          {`${classroom.teacher.first_name} ${classroom.teacher.last_name}`}
        </Text>
      ) : null}
    </Card>
  );
};

export default ClassroomCard;
