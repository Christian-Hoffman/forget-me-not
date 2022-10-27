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
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  // initial value for rte body
  const initialValue = "<p>Enter your note here</p>";
  const [value, setValue] = useState(initialValue);
  const textAreaRef = useRef();
  // List submit button
  const listSubmitForm = useForm({
    initialValues: {
      text: "",
    },
  });
  const noteSubmitForm = useForm({
    initialValues: {
      text: "",
    },
  });
  // add list item button
  const listForm = useForm({
    initialValues: {
      list: [{ item: "" }],
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(textAreaRef.current.value);
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
              >
                Public
              </Chip>
              <Chip
                checked={checked}
                onChange={() => setChecked((v) => !v)}
                value="2"
              >
                Private
              </Chip>
            </Chip.Group>

            <Chip.Group position="center">
              <Chip
                id="listCheckBox"
                checked={checked}
                onChange={() => setChecked((v) => !v)}
                value="1"
                onClick={() => setVisible(true)}
              >
                List
              </Chip>
              <Chip
                checked={checked}
                onChange={() => setChecked((v) => !v)}
                value="2"
                onClick={() => setVisible(false)}
              >
                Note
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
                >
                  Ordered
                </Chip>
                <Chip
                  checked={checked}
                  onChange={() => setChecked((v) => !v)}
                  value="2"
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
          <Input placeholder="Title" />
          {visible ? (
            // LIST SECTION
            <Container>
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
                <listSubmitForm
                  onSubmit={listSubmitForm.onSubmit((values) =>
                    console.log(values)
                  )}
                >
                  <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                  </Group>
                </listSubmitForm>
              </Box>
            </Container>
          ) : (
            // NOTE SECTION
            <Container>
              <form onSubmit={handleSubmit}>
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
