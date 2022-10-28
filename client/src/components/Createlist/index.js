import React from "react";
import { useState, useRef } from "react";
import {
  Grid,
  Chip,
  createStyles,
  Container,
  Input,
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Code,
  Center,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { RichTextEditor } from "@mantine/rte";
import { IconGripVertical } from "@tabler/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Createlist = () => {
  const useStyles = createStyles(() => ({}));
  const { classes } = useStyles();
  // Sets visible for chips when clicked, and sets other connected to opposite value
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  // Sets private and public chip to true/false
  const [visibility, setVisibility] = useState(false);
  // initial value for rte body
  const [orderType, setOrderType] = useState(false);
  const initialValue = "<p>Enter your note here</p>";
  const [value, setValue] = useState(initialValue);
  const textAreaRef = useRef();
  const noteTitleRef = useRef();
  const listTitleRef = useRef();
  const listItemRef = useRef();
  // add list item button
  const listForm = useForm({
    initialValues: {
      list: [{ item: "" }],
    },
  });
  const handleListSubmit = (e) => {
    e.preventDefault();
    const fullList = listForm.values.list;
    let listArr = [];
    for (let i = 0; i < fullList.length; i++) {
      listArr.push(fullList[i].item);
    };
    const listTitle = listTitleRef.current.value;
    const allListItems = listArr;
    const listType = 'isOrdered: ' + orderType;
    const viewStatus = 'isPublic: ' + visibility;
    console.log(listTitle, allListItems, listType, viewStatus);
  };
  const handleNoteSubmit = (e) => {
    e.preventDefault();
    const noteTitle = noteTitleRef.current.value;
    const noteBody = textAreaRef.current.value;
    const viewStatus = 'isPublic: ' + visibility;
    console.log(noteTitle, noteBody, viewStatus);
  };
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

  return (
    <Container>
      <Grid>
        {/* CHOOSE SETTINGS SECTION */}
        <Container align="center" fluid>
          <Grid.Col md={3} lg={3}>
            SETTINGS
            <Chip.Group position="center">
              <Chip
                checked={checked}
                onChange={() => setChecked((v) => !v)}
                value="1"
                onClick={() => setVisibility(true)}
              >
                Public
              </Chip>
              <Chip
                checked={checked}
                onChange={() => setChecked((v) => !v)}
                value="2"
                onClick={() => setVisibility(false)}
              >
                Private
              </Chip>
            </Chip.Group>

            <Chip.Group position="center">
              <Chip
                checked={checked}
                onChange={() => setChecked((v) => !v)}
                value="2"
                onClick={() => setVisible(false)}
              >
                Note
              </Chip>
              <Chip
                id="listCheckBox"
                checked={checked}
                onChange={() => setChecked((v) => !v)}
                value="1"
                onClick={() => setVisible(true)}
              >
                List
              </Chip>
            </Chip.Group>

            {visible ? (
              <Chip.Group
                position="center"
                id="listType"
                className={classes.listType}
              >
                <Chip
                  checked={checked}
                  onChange={() => setChecked((v) => !v)}
                  value="1"
                  onClick={() => setOrderType(true)}
                >
                  Ordered
                </Chip>
                <Chip
                  checked={checked}
                  onChange={() => setChecked((v) => !v)}
                  value="2"
                  onClick={() => setOrderType(false)}
                >
                  Unordered
                </Chip>
              </Chip.Group>
            ) : (
              <p></p>
            )}
          </Grid.Col>
        </Container>

        {/* CREATE NOTE OR LIST SECTION */}
        <Container align="center" fluid>
          <Grid.Col md={9} lg={9}>
            create
          </Grid.Col>
          {visible ? (
            // LIST SECTION
            <Container>
              <form onSubmit={handleListSubmit}>
              <Input placeholder="Title" ref={listTitleRef}/>
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
            </Container>
          ) : (
            // NOTE SECTION
            <Container>
              <form onSubmit={handleNoteSubmit}>
              <Input placeholder="Title" ref={noteTitleRef}/>
              <RichTextEditor
                value={initialValue}
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
              {/* SUBMIT BUTTON FOR NOTE */}
              <Box sx={{ maxWidth: 300 }} mx="auto">
                  <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                  </Group>
              </Box>
              </form>
            </Container>
          )}
        </Container>
      </Grid>
    </Container>
  );
};

export default Createlist;
