import React from 'react';


import Auth from '../../utils/auth';
import { Tabs, Text } from '@mantine/core';
import {
  Browser as Router,
  Link,
} from "react-router-dom"


function Navbar() {
  return (
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
  );
}

// import React from 'react';
// import { useRef, useState, useLayoutEffect } from 'react';

// import Auth from '../../utils/auth';
// import { Tabs, Text, MediaQuery, Burger } from '@mantine/core';
// import {
//   Browser as Router, Link,
// } from "react-router-dom"



// function Nav() {
//   const [opened, setOpened] = useState(false);
//   const title = opened ? 'Close navigation' : 'Open navigation';
//   const handleBurger = () => {
//     setOpened((o) => !o);
//     if(opened){
//       return(
//         <div>Hello WOrld</div>
//       )
//     }
//     else{
//       return(
//         <div>Dont be hello</div>
//       )
//     }
//   }
//   return (
//     <div>
//       <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
//         <Tabs defaultValue="Create" >
//           <Tabs.List position="right">
//             <Tabs.Tab component={Link} to="/create" value="Create" ><Text variant="link">Create</Text></Tabs.Tab>
//             <Tabs.Tab component={Link} to="/login" value="Login" ><Text variant="link">Login</Text></Tabs.Tab>
//             <Tabs.Tab component={Link} to="/signup" value="Sign Up" ><Text variant="link">Sign Up</Text></Tabs.Tab>
//             <Tabs.Tab component={Link} to="/me" value="Profile" ><Text variant="link">Profile</Text></Tabs.Tab>
//             <Tabs.Tab component={Link} to="/users/:id" value="Other Profiles" ><Text variant="link">Other Profiles</Text></Tabs.Tab>
//           </Tabs.List>
//           <Tabs.Panel value="Create" pt="xs">
//           </Tabs.Panel>

//           <Tabs.Panel value="Login" pt="xs">
//           </Tabs.Panel>

//           <Tabs.Panel value="Sign Up" pt="xs">
//           </Tabs.Panel>

//           <Tabs.Panel value="Profile" pt="xs">
//           </Tabs.Panel>

//           <Tabs.Panel value="Other Profiles" pt="xs">
//           </Tabs.Panel>
//         </Tabs>
//       </MediaQuery>
//       <MediaQuery largerThan={"sm"} styles={{ display: "none" }} >
//         <Burger
//           opened={opened}
//           color="#228be6"
//           title={title}
//           onClick={()=> handleBurger()}
//         />

//       </MediaQuery>
//     </div>
//   );
// }


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
