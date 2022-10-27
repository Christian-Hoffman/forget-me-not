import React from 'react';


import Auth from '../../utils/auth';
import { Tabs, Text } from '@mantine/core';
import {
  Browser as Router,
  Link,
} from "react-router-dom"


function Navbar() {
  return (
    <Tabs defaultValue="gallery" position="right">
      <Tabs.List>
        <Tabs.Tab value="gallery" ><Text component={Link} variant="link" to="/create">Create</Text></Tabs.Tab>
        <Tabs.Tab value="messages" ><Text component={Link} variant="link" to="/login">Login</Text></Tabs.Tab>
        <Tabs.Tab value="settings" ><Text component={Link} variant="link" to="/signup">Sign Up</Text></Tabs.Tab>
        <Tabs.Tab value="settings" ><Text component={Link} variant="link" to="/me">Profile</Text></Tabs.Tab>
        <Tabs.Tab value="settings" ><Text component={Link} variant="link" to="/users/:id">Other Profiles</Text></Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" pt="xs">

      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">

      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="xs">

      </Tabs.Panel>
    </Tabs>
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

export default Navbar
