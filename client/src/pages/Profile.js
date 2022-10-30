// Node Modules
import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
// Utilities
import Auth from "../utils/auth";
import { QUERY_USERS, QUERY_USER, QUERY_ME } from "../utils/queries";
import {
  DELETE_LIST,
  DELETE_NOTE,
  EDIT_LIST,
  EDIT_NOTE,
} from "../utils/mutations";
// Components
import UserList from "../components/UserList";
import {
  Card,
  Text,
  Badge,
  Group,
  Container,
  Button,
  Title,
  List,
} from "@mantine/core";

const Profile = () => {
  const { id } = useParams();

  // Get current user
  const { loading, data, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });

  // console.log(data);

  // Get a list of all users
  const { usersLoading, data: usersData } = useQuery(QUERY_USERS);

  const user = data?.me || data?.user || {};
  const users = usersData?.users || [];

  const [deleteNote] = useMutation(DELETE_NOTE);
  const [deleteList] = useMutation(DELETE_LIST);
  const [editNote] = useMutation(EDIT_NOTE);
  // const [editList] = useMutation(EDIT_LIST);

  const handleDeleteList = async (listIdDL) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      const { data } = await deleteList({ variables: { listIdDL: listIdDL } });
    } catch (err) {
      console.log(err);
    }
  };

  const editingListInterface = () => {};

  const handleDeleteNote = async (noteIdDN) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      const { data } = await deleteNote({ variables: { noteIdDN: noteIdDN } });
    } catch (err) {
      console.log(err);
    }
  };

  const [noteData, setNoteData] = useState({});

  const editingNoteInterface = async (noteId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    for (let i = 0; i < data.me.notes.length; i++) {
      if (data.me.notes[i]._id === noteId) {
        setNoteData(data.me.notes[i]);
      }
    }
    console.log(noteData);
    console.log(noteData.title);
    // <Container>
    //   <form onSubmit={handleNoteSubmit}>
    //     <Input placeholder="Title" value={noteData.title} />
    //     <RichTextEditor
    //       value={noteData.body}
    //       id="rte"
    //       align="left"
    //       controls={[
    //         ["bold", "italic", "underline", "strike", "clean"],
    //         ["h1", "h2", "h3", "h4"],
    //         ["link", "blockquote", "codeBlock"],
    //         ["alignLeft", "alignCenter", "alignRight"],
    //       ]}
    //     />
    //     {/* SUBMIT BUTTON FOR NOTE */}
    //     <Box sx={{ maxWidth: 300 }} mx="auto">
    //       <Group position="right" mt="md">
    //         <Button type="submit">Submit</Button>
    //       </Group>
    //     </Box>
    //   </form>
    // </Container>;

    // try {
    //   const { data } = await editNote({ variables: noteId });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  // const handleEditNote = async (formData) => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;
  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     const { data } = await editNote({ variables: formData });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  if (error) console.log(error);

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === id) {
    return <Navigate to="/me" replace />;
  }

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const renderUserList = () => {
    if (usersLoading) return null;
    // Only renders users who's profile we're not currently viewing
    const notMeUsers = users.filter((o) => o._id !== user._id);
    return <UserList users={notMeUsers} title="User List" />;
  };

  const renderCurrentUserInfo = () => {
    if (id) return null;
    return (
      <ul>
        <li>username: {user.username}</li>
        <li>email: {user.email}</li>
      </ul>
    );
  };

  //Rendering Note Body in pure HTML
  const renderNoteBody = (note) => {
    return <div dangerouslySetInnerHTML={{ __html: note.body }} />;
  };

  const styles = {
    title: {
      display: "flex",
      justifyContent: "center",
    },
    card: {
      padding: "20px",
    },
  };
  return (
    <div>
      <div>
        <Title order={2} style={styles.title}>
          {" "}
          Viewing {id ? `${user.username}'s` : "your"} profile.{" "}
        </Title>
        {renderCurrentUserInfo()}
        {renderUserList()}
      </div>
      {/* NOTES */}
      <Container>
        {data.me.notes.map((note) => {
          return (
            <Card
              shadow="lg"
              p="lg"
              radius="md"
              withBorder
              key={note._id}
              style={styles.card}
            >
              <Card.Section>
                <Group position="left">
                  <div></div>
                  <Title order={2}>{note.title}</Title>
                </Group>
                {renderNoteBody(note)}
                <Text>{note.createdAt}</Text>
                <Button onClick={() => handleDeleteNote(note._id)}>
                  Delete Note
                </Button>
                <Button onClick={() => editingNoteInterface(note._id)}>
                  Edit Note
                </Button>
              </Card.Section>
            </Card>
          );
        })}
      </Container>
      {/* <Container>
        <form onSubmit={handleNoteSubmit}>
          <Input placeholder="Title" value={noteData.title} />
          <RichTextEditor
            value={noteData.body}
            id="rte"
            align="left"
            controls={[
              ["bold", "italic", "underline", "strike", "clean"],
              ["h1", "h2", "h3", "h4"],
              ["link", "blockquote", "codeBlock"],
              ["alignLeft", "alignCenter", "alignRight"],
            ]}
          /> */}
      {/* SUBMIT BUTTON FOR NOTE */}
      {/* <Box sx={{ maxWidth: 300 }} mx="auto">
            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </Box>
        </form>
      </Container> */}
      ;{/* LISTS */}
      <Container>
        {data.me.lists.map((list) => {
          return (
            <Card
              shadow="lg"
              p="lg"
              radius="md"
              withBorder
              key={list._id}
              style={styles.card}
            >
              <Card.Section>
                <Group position="left">
                  <div></div>
                  <Title order={2}>{list.title}</Title>
                </Group>

                <Text>
                  {list.isOrdered ? (
                    <List type="ordered">
                      {list.listItems.map((i) => (
                        <List.Item>{[i]}</List.Item>
                      ))}
                    </List>
                  ) : (
                    <List>
                      {list.listItems.map((i) => (
                        <List.Item>{[i]}</List.Item>
                      ))}
                    </List>
                  )}
                </Text>

                <Text>{list.createdAt}</Text>
                <Button onClick={() => handleDeleteList(list._id)}>
                  Delete Note
                </Button>
                <Button onClick={() => editingListInterface(list._id)}>
                  Edit Note
                </Button>
              </Card.Section>
            </Card>
          );
        })}
      </Container>
    </div>
  );
};

export default Profile;
