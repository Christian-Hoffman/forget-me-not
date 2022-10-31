import React from 'react';
import { useRef, useState, useLayoutEffect } from 'react';
import {
  Tabs,
  Text,
  MediaQuery,
  Drawer,
  Burger,
  Title,
  NavLink,
  Modal,
  Container,
  TextInput
} from '@mantine/core';
import {
  Browser as Router, Link,
} from "react-router-dom"

import Login from "../Login"
import Signup from '../Signup';
import Auth from '../../utils/auth';
import data from "./navData.json"

function Nav() {
  const [opened, setOpened] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const title = opened ? 'Close navigation' : 'Open navigation';
  const token = Auth.loggedIn() || null;

  const styles = {
    burgerNav: {
      display: "flex",
      justifyContent: "flex-end"
    },
    loginDiv: {
      display: "flex",
      alignItems: "flex-end",
      paddingTop: "50px",
    },
    navDiv: {
      paddingTop: "10px",
      fontWeight: "bolder",
      fontSize: "234px"
    }

  }
  //Items that show when user is logged in, small mode
  const [active, setActive] = useState(0);
  const loginItems = data.toggleData.map((item, index) => (
    <div style={styles.navDiv}>
      <NavLink
        key={item.label}
        label={item.label}
        active={index === active}
        onClick={() => { setActive(index); setOpened(false); }}
        color="#339af0"
        component={Link}
        to={item.to}
        variant="filled"
      />
    </div>
  ));

  //Items that show when user is logged out, small mode
  const logoutItems = data.bottomData.map((item, index) => (
    <div style={styles.navDiv}>
      <NavLink
        key={item.label}
        label={item.label}
        active={index === active}
        onClick={() => {
          setActive(index);
          setOpened(false);
          if (index == 2) {
            setLoginOpen(true)
          }
          else if (index == 3) {
            setSignupOpen(true)
          };
        }}
        color="#339af0"
        component={Link}
        to={item.to}
        variant="filled"
      />
    </div>
  ));

  return (
    <div>
      <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
        <Tabs defaultValue="Home" >
          <Tabs.List position="right">
            <Tabs.Tab component={Link} to="/" value="Home"><Text variant="link">Home</Text></Tabs.Tab>
            {token ? (
              <>
                <Tabs.Tab component={Link} to="/create" value="Create" ><Text variant="link">Create</Text></Tabs.Tab>
                <Tabs.Tab component={Link} to="/me" value="Profile" ><Text variant="link">Profile</Text></Tabs.Tab>
                <Tabs.Tab component={Link} to="/" value="Logout" onClick={() => Auth.logout()}><Text variant="link">Logout</Text></Tabs.Tab>
              </>
            ) : (
              <>
                <Tabs.Tab onClick={() => setLoginOpen(true)} value="Login" ><Text variant="link">Login</Text></Tabs.Tab>
                <Tabs.Tab onClick={() => setSignupOpen(true)} value="Sign Up" ><Text variant="link">Sign Up</Text></Tabs.Tab>
                <Modal
                  size="calc(100vw - 87px)"
                  opened={loginOpen}
                  onClose={() => setLoginOpen(false)}
                >
                  <Login />
                </Modal>
                <Modal
                  size="calc(100vw - 87px)"
                  opened={signupOpen}
                  onClose={() => setSignupOpen(false)}
                >
                  <Signup />
                </Modal>
              </>

            )}
            <Tabs.Tab component={Link} to="/users/:id" value="Other Profiles" > <Container>
              <TextInput placeholder="Search For a Profile"/>
            </Container></Tabs.Tab>
            
          </Tabs.List>
          <Tabs.Panel value="Home" pt="xs">
          </Tabs.Panel>

          <Tabs.Panel value="Create" pt="xs">
          </Tabs.Panel>

          <Tabs.Panel value="Login" pt="xs">
          </Tabs.Panel>

          <Tabs.Panel value="Sign Up" pt="xs">
          </Tabs.Panel>

          <Tabs.Panel value="Profile" pt="xs">
          </Tabs.Panel>

          <Tabs.Panel value="Other Profiles" pt="xs">
          </Tabs.Panel>
        </Tabs>

       

      </MediaQuery>
      <div style={styles.burgerNav}>
        <MediaQuery largerThan={"sm"} styles={{ display: "none" }} >
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            title={title}
            size={"lg"}
            color={"#339af0"}
          />
        </MediaQuery>
      </div>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <Title order={1} align="center" mt="lg">Navigation</Title>
        {token ? (
          <>
            {loginItems}
            <div style={styles.navDiv}>
              <NavLink
                label={"Logout"}
                onClick={() => { Auth.logout(); setOpened(false) }}
                component={Link}
                to={"/"}
              />
            </div>
          </>
        ) : (
          logoutItems
        )}

      </Drawer>
    </div>
  );
}
export default Nav
