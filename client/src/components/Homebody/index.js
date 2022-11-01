import React from "react";
import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
} from "@mantine/core";

const mockdata = [
  {
    title: "My Top 5 Favorite Movies",
    description: (
      <ol>
        <li>Fight Club</li>
        <li>Star Wars Ep. IV</li>
        <li>Spiderman: Into the Spiderverse</li>
        <li>Godzilla vs. Mecha-Godzilla</li>
        <li>A Bug's Life</li>
      </ol>
    ),
  },
  {
    title: "Grocery List",
    description: (
      <ul>
        <li>Milk</li>
        <li>Eggs</li>
        <li>Butter</li>
        <li>Bread</li>
        <li>Cheese</li>
        <li>Beer</li>
        <li>Taco Shells</li>
        <li>Orange Juice</li>
      </ul>
    ),
  },
  {
    title: "How to Test a Font",
    description: (
      <p>
        lorem ipsum dolor sit, amet consectetur adipiscing elit. fugiat
        perspiciatis, debitis a perferendis error quaerat, nulla exercitationem
        minus, quam libero in ab obcaecati praesentium hic ipsum possimus
        voluptate modi eius?
      </p>
    ),
  },
];

const Homebody = () => {
  const useStyles = createStyles((theme) => ({
    title: {
      fontSize: 40,
      fontWeight: 900,
      [theme.fn.smallerThan("sm")]: {
        fontSize: 34,
      },
    },

    description: {
      maxWidth: 600,
      margin: "auto",
      padding: 30,

      "&::after": {
        content: '""',
        display: "block",
        backgroundColor: theme.fn.primaryColor(),
        width: 45,
        height: 2,
        marginTop: theme.spacing.sm,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },

    card: {
      border: `5px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1]
      }`,
    },

    cardTitle: {
      "&::after": {
        content: '""',
        display: "block",
        backgroundColor: theme.fn.primaryColor(),
        width: 45,
        height: 2,
        marginTop: theme.spacing.sm,
      },
    },
  }));
  const { classes, theme } = useStyles();

  return (
    <Container size="lg" py="xl">
      <Group position="center">
        <Badge variant="filled" size="lg">
          Forget-Me-Not
        </Badge>
      </Group>

      <Title order={2} className={classes.title} align="center" mt="lg">
        Welcome to Forget-Me-Not, a user-friendly note taking, list making
        utility!
      </Title>

      <Text
        color="dimmed"
        className={classes.description}
        align="center"
        mt="md"
      >
        Featured below are some common uses, sign-up today to begin creating and
        sharing with other users.
      </Text>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {mockdata.map((feature) => (
          <Card
            key={feature.title}
            shadow="md"
            radius="md"
            className={classes.card}
            p="xl"
          >
            <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
              {feature.title}
            </Text>
            <Text size="lg" color="dimmed" m="sm">
              {feature.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Homebody;
