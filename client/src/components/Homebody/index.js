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
  List,
} from "@mantine/core";

// const mockdata = [
//   {
//     title: "Extreme performance",
//     description:
//       "This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit",
//   },
//   {
//     title: "Privacy focused",
//     description:
//       "People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma",
//   },
//   {
//     title: "No third parties",
//     description:
//       "They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves",
//   },
// ];

const Homebody = () => {
  const useStyles = createStyles((theme) => ({
    title: {
      fontSize: 34,
      fontWeight: 900,
      [theme.fn.smallerThan("sm")]: {
        fontSize: 24,
      },
    },

    description: {
      maxWidth: 600,
      margin: "auto",

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
      border: `1px solid ${
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
          Best company ever
        </Badge>
      </Group>

      <Title order={2} className={classes.title} align="center" mt="sm">
        Integrate effortlessly with any technology stack
      </Title>

      <Text
        color="dimmed"
        className={classes.description}
        align="center"
        mt="md"
      >
        Every once in a while, you’ll see a Golbat that’s missing some fangs.
        This happens when hunger drives it to try biting a Steel-type Pokémon.
      </Text>

      <SimpleGrid
        cols={2}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        <Card shadow="md" radius="md" className={classes.card} p="xl">
          <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
            Best foods
          </Text>
          <Text size="sm" color="dimmed" mt="sm">
            <List>
              <List.Item>Pizza</List.Item>
              <List.Item>Install dependencies with yarn</List.Item>
              <List.Item>
                To start development server run npm start command
              </List.Item>
              <List.Item>
                Run tests to make sure your changes do not break the build
              </List.Item>
              <List.Item>Submit a pull request once you are done</List.Item>
            </List>
          </Text>
        </Card>
        <Card shadow="md" radius="md" className={classes.card} p="xl">
          <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
            Best foods
          </Text>
          <Text size="sm" color="dimmed" mt="sm">
            <List type="ordered">
              <List.Item>Pizza</List.Item>
              <List.Item>Install dependencies with yarn</List.Item>
              <List.Item>
                To start development server run npm start command
              </List.Item>
              <List.Item>
                Run tests to make sure your changes do not break the build
              </List.Item>
              <List.Item>Submit a pull request once you are done</List.Item>
            </List>
          </Text>
        </Card>
        <Card shadow="md" radius="md" className={classes.card} p="xl">
          <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
            Best foods
          </Text>
          <Text size="sm" color="dimmed" mt="sm">
            <List>
              <List.Item>Pizza</List.Item>
              <List.Item>Install dependencies with yarn</List.Item>
              <List.Item>
                To start development server run npm start command
              </List.Item>
              <List.Item>
                Run tests to make sure your changes do not break the build
              </List.Item>
              <List.Item>Submit a pull request once you are done</List.Item>
            </List>
          </Text>
        </Card>
      </SimpleGrid>
    </Container>
  );
};

export default Homebody;
