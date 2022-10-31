// Node Modules
import React, { useState, useEffect, useRef } from "react";
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
import { IconGripVertical } from "@tabler/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Card,
  Text,
  Badge,
  Group,
  Container,
  Button,
  Title,
  List,
  Box,
  Input,
  Chip,
  Code,
  Center,
  Divider,
  TextInput
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { RichTextEditor } from "@mantine/rte";

const Profile = () => {
  const { id } = useParams();

  // Get current user
  const { loading, data, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });

  // Get a list of all users
  const { usersLoading, data: usersData } = useQuery(QUERY_USERS);

  const user = data?.me || data?.user || {};
  const users = usersData?.users || [];

  const [deleteNote] = useMutation(DELETE_NOTE);
  const [deleteList] = useMutation(DELETE_LIST);
  const [editNote] = useMutation(EDIT_NOTE);
  const [editList] = useMutation(EDIT_LIST);

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

  const [listData, setListData] = useState({});
  const [listEditMode, setListEditMode] = useState(false);
  const [listType, setListType] = useState(false);

  const editingListInterface = async (listId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    for (let i = 0; i < data.me.lists.length; i++) {
      if (data.me.lists[i]._id === listId) {
        setListData(data.me.lists[i]);
        console.log(data.me.lists[i]);
      }
    }
    console.log(listData);

    setListEditMode(true);
  };

  const listTitleRef = useRef();

  // const 

  const listForm = useForm({
    initialValues: {
      list: [{ item: "" }],
    },
  });

  // to display and allow addition of more list items
  const fields = listForm.values.list.map((_, index) => (
    <Draggable key={index} index={index} draggableId={index.toString()}>
      {(provided) => (
        <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
          <Center {...provided.dragHandleProps}>
            <IconGripVertical size={18} />
          </Center>
          <TextInput
            placeholder=""
            {...listForm.getInputProps(`list.${index}.item`)}
          />
        </Group>
      )}
    </Draggable>
  ));

  const handleEditList = async (e) => {
    e.preventDefault(e);
    const listTitle = listTitleRef.current.value;
    // const allListItems = ;
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      const { data } = await editList({
        variables: { listIdEL: listData._id, titleEN: listTitle },
      });
    } catch (err) {
      console.log(err);
    }

    setListEditMode(false);
  };

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

  const textAreaRef = useRef();
  const noteTitleRef = useRef();

  const [checked, setChecked] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const editingNoteInterface = async (noteId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    for (let i = 0; i < data.me.notes.length; i++) {
      if (data.me.notes[i]._id === noteId) {
        setNoteData(data.me.notes[i]);
        console.log(data.me.notes[i]);
      }
    }
    console.log(noteData);

    setEditMode(true);
  };

  // same as visibility but for the editing page
  const [viewable, setViewable] = useState(false);

  const handleEditNote = async (e) => {
    e.preventDefault();
    const noteTitle = noteTitleRef.current.value;
    const noteBody = textAreaRef.current.value;
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      const { data } = await editNote({
        variables: {
          noteIdEN: noteData._id,
          titleEN: noteTitle,
          bodyEN: noteBody,
          isPublicEN: viewable,
        },
      });
    } catch (err) {
      console.log(err);
    }

    setEditMode(false);
  };

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

  // const renderUserList = () => {
  //   if (usersLoading) return null;
  //   // Only renders users who's profile we're not currently viewing
  //   const notMeUsers = users.filter((o) => o._id !== user._id);
  //   return <UserList  users={notMeUsers} title="User List" />;
  // };

  const renderCurrentUserInfo = () => {
    if (id) return null;
    return (
      <ul>
        <div
          style={{
            display: "flex",
            fontSize: "30px",
            marginTop: "24px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "80px",
          }}
        >
          <p style={{}}>username: {user.username}</p>
          <p>email: {user.email}</p>
        </div>
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
    <div style={{ marginBottom: "500px" }}>
      <div>
        <Title order={2} style={styles.title}>
          {" "}
          Viewing {id ? `${user.username}'s` : "your"} profile.{" "}
        </Title>
        {renderCurrentUserInfo()}
        {/* {renderUserList()} */}
      </div>
      {/* NOTES */}
      <Container>
        {!editMode ? (
          data.me.notes.map((note) => {
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
                    Delete
                  </Button>
                  <Button onClick={() => editingNoteInterface(note._id)}>
                    Edit
                  </Button>
                </Card.Section>
              </Card>
            );
          })
        ) : (
          <>
            <Chip.Group position="center">
              <Chip
                checked={checked}
                onChange={() => setChecked((v) => !v)}
                value="1"
                onClick={() => setViewable(true)}
              >
                Public
              </Chip>
              <Chip
                checked={checked}
                onChange={() => setChecked((v) => !v)}
                value="2"
                onClick={() => setViewable(false)}
              >
                Private
              </Chip>
            </Chip.Group>
            <form onSubmit={handleEditNote}>
              <Input defaultValue={noteData.title} ref={noteTitleRef} />
              <RichTextEditor
                value={noteData.body}
                ref={textAreaRef}
                id="rte"
                align="left"
                controls={[
                  ["bold", "italic", "underline", "strike", "clean"],
                  ["h1", "h2", "h3", "h4"],
                  ["link", "blockquote", "codeBlock"],
                  ["alignLeft", "alignCenter", "alignRight"],
                ]}
              />
              {/* SAVE BUTTON FOR NOTE */}
              <Box sx={{ maxWidth: 300 }} mx="auto">
                <Group position="right" mt="md">
                  <Button type="submit">Save</Button>
                </Group>
              </Box>
            </form>
          </>
        )}
      </Container>
      ;{/* LISTS */}
      <Container>
        {!listEditMode ? (
          data.me.lists.map((list) => {
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
                    Delete
                  </Button>
                  <Button onClick={() => editingListInterface(list._id)}>
                    Edit
                  </Button>
                </Card.Section>
              </Card>
            );
          })
        ) : (
          <>
            <Chip.Group position="center">
              <Chip
                checked={checked}
                onChange={() => setChecked((v) => !v)}
                value="1"
                onClick={() => setViewable(true)}
              >
                Public
              </Chip>
              <Chip
                checked={checked}
                onChange={() => setChecked((v) => !v)}
                value="2"
                onClick={() => setViewable(false)}
              >
                Private
              </Chip>
            </Chip.Group>
            <Chip.Group
              position="center"
              id="listType"
              // className={classes.listType}
            >
              <Chip
                checked={checked}
                onChange={() => setChecked((v) => !v)}
                value="1"
                onClick={() => setListType(true)}
              >
                Ordered
              </Chip>
              <Chip
                checked={checked}
                onChange={() => setChecked((v) => !v)}
                value="2"
                onClick={() => setListType(false)}
              >
                Unordered
              </Chip>
            </Chip.Group>
            <form onSubmit={handleEditList}>
              <Input defaultValue={listData.title} ref={listTitleRef} />
              <Box sx={{ maxWidth: 500 }} mx="auto">
                <DragDropContext
                  onDragEnd={({ destination, source }) =>
                    listForm.reorderListItem("list", {
                      from: source.index,
                      to: destination.index,
                    })
                  }
                >
                  <Droppable droppableId="dnd-list" direction="vertical">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {fields}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                <Group position="center" mt="md">
                  <Button
                    onClick={() =>
                      listForm.insertListItem("list", { item: "" })
                    }
                  >
                    Add list item
                  </Button>
                </Group>

                {/* FORM VALUES, NOT NEEDED ON PAGE, USED FOR TESTING */}
                <Text size="sm" weight={500} mt="md">
                  Form values:
                </Text>
                <Code block>{JSON.stringify(listForm.values, null, 2)}</Code>
              </Box>

              {/* SUBMIT BUTTON FOR LIST */}
              <Box sx={{ maxWidth: 300 }} mx="auto">
                <Group position="right" mt="md">
                  <Button type="submit">Submit</Button>
                </Group>
              </Box>
            </form>
          </>
        )}
      </Container>
    </div>
  );
};

export default Profile;
