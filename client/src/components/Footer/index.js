import { createStyles, Container, Group, Anchor } from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    display: 'flex',
    justifyContent: 'align-items',
    alignItems: 'center',
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'align-items',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'row',
    },
  },
  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));



const Footer = () => {
  const { classes } = useStyles();

  return (
    <footer>
      <div className={classes.footer}>
        <Container className={classes.inner}>
          <Group className={classes.links}>
            <MantineLogo 
            width={200}
            fit="contain"/>
            <p>Copyright &copy; 2022</p>
            <Anchor
              color="dimmed"
              key="Fun Link"
              to="/"
              component={Link}
            >
              Home
            </Anchor>
            {/* <Anchor
              color="dimmed"
              key="Fun Link"
              to="/create"
              component={Link}
            >
              Create
            </Anchor> */}
            <Anchor
              color="dimmed"
              key="Fun Link"
              to="/me"
              component={Link}
            >
              Profile
            </Anchor>
            <Anchor
              color="dimmed"
              key="Fun Link"
              to="/users/:id"
              component={Link}
            >
              Other Profiles
            </Anchor>
            <Anchor
              color="dimmed"
              href="https://github.com/Christian-Hoffman/forget-me-not"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </Anchor>
          </Group>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;