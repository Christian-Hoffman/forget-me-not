// import React from 'react';

// import Auth from '../../utils/auth';
// import { Tabs, Text } from '@mantine/core';
// import {
//   Browser as Router,
//   Link,
// } from "react-router-dom"



import React from 'react';
import { useRef, useState, useLayoutEffect } from 'react';

import Auth from '../../utils/auth';
import {
  Tabs,
  Text,
  MediaQuery,
  Drawer,
  Burger,
  Title,
  NavLink,
} from '@mantine/core';
import {
  Browser as Router, Link,
} from "react-router-dom"

function Nav() {
  const [opened, setOpened] = useState(false);
  const title = opened ? 'Close navigation' : 'Open navigation';

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
      paddingTop:"10px",
      fontWeight: "bolder",
      fontSize:"234"
    }

  }

  const [active, setActive] = useState(0);

  const topData = [
    {
      label: "Home", to: "/"
    },
    {
      label: 'New Post', to: "/create"
    },
    {
      label: "Profile", to: "/me"
    },
    {
      label: "Users", to: "/users:id"
    }
  ];

  const bottomData =[
    {
      label: 'Login/Logout', to: "/login"
    },
    {
      label: 'Signup', to: "/signup"
    },
  ]

  const topItems = topData.map((item, index) => (
    <div style={styles.navDiv}>
    <NavLink
      key={item.label}
      label={item.label}
      active={index === active}
      onClick={() => {setActive(index); setOpened(false)}}
      color="#339af0"
      component={Link}
      to={item.to}
      variant="filled"
    />
    </div>
  ));

  const bottomItems = bottomData.map((item, index) => (
    <NavLink
      key={item.label}
      label={item.label}
      onClick={() => {setActive(index); setOpened(false)}}
      color="#339af0"
      component={Link}
      to={item.to}
    />
  ));

  return (
    <div>
      <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
        <Tabs defaultValue="Create" >
          <Tabs.List position="right">
            <Tabs.Tab component={Link} to="/create" value="Create" ><Text variant="link">Create</Text></Tabs.Tab>
            <Tabs.Tab component={Link} to="/login" value="Login" ><Text variant="link">Login</Text></Tabs.Tab>
            <Tabs.Tab component={Link} to="/signup" value="Sign Up" ><Text variant="link">Sign Up</Text></Tabs.Tab>
            <Tabs.Tab component={Link} to="/me" value="Profile" ><Text variant="link">Profile</Text></Tabs.Tab>
            <Tabs.Tab component={Link} to="/users/:id" value="Other Profiles" ><Text variant="link">Other Profiles</Text></Tabs.Tab>
          </Tabs.List>
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
        {topItems}
        <div style={styles.loginDiv}>
          {bottomItems}
        </div>
      </Drawer>
    </div>
  );
}


// function Navbar() {
//   const logout = (event) => {
//     event.preventDefault();
//     Auth.logout();
//   };

//   if (Auth.loggedIn()) {
//     return (
//       <>
//         <Link to="/me">
//           {Auth.getProfile().data.username}'s profile
//         </Link>
//         <button onClick={logout}>
//           Logout
//         </button>
//       </>
//     );
//   }
//   // If logged out show login controls
//   return (
//     <>
//       <Link to="/login">
//         Login
//       </Link>
//       <Link to="/signup">
//         Signup
//       </Link>
//     </>
//   )
// }

export default Nav
