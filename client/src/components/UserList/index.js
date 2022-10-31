import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../../utils/queries';

const UserList = () => {
  // if (!users.length) return <h3>No Users</h3>;
  const { username } = useParams();
  const user = useQuery(QUERY_USERS)

  const renderUsers = async () => {
    console.log(user.data)
    // for(let i = 0; i < user.data.users.length; i++){
    //   if(user.data.users[i].username == username){
    //     console.log(user.data.users[i]._id)
    //   }
    // }


    // if (!users) return null;
    // return users.map(user => <User key={user._id} {...user} />);

  }

  return (
    <>
      {renderUsers()}
    </>
  );
};

export default UserList;
