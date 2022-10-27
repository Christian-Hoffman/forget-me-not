import { createStyles, Container, Group, Anchor } from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
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
            <MantineLogo/>
            <Anchor
              color="dimmed"
              key="Fun Link"
              to="/"
              component={Link}
            >
              Home
            </Anchor>
            <Anchor
              color="dimmed"
              href="https://github.com/Christian-Hoffman/forget-me-not"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </Anchor>
            {/* <p>Copyright &copy; 2022</p> */}
          </Group>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;