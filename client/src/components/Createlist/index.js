import React from "react";
import { useState } from "react";
import { Grid, Chip, createStyles } from "@mantine/core";

const Createlist = () => {
  const useStyles = createStyles(() => ({
  }));
  const { classes } = useStyles();
  const [ visible, setVisible ] = useState(false);
  const [checked, setChecked] = useState(false);
  return (
    <Grid>
      <Grid.Col md={6} lg={3}>
        settings
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

          {/* {list ? 
            <Input
              radius="xl"
              size="md"
            />} */}
        </Chip.Group>
        {visible ? (<Chip.Group
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
        </Chip.Group>) :
        (<p></p>)
      }
        
      </Grid.Col>
      <Grid.Col md={6} lg={9}>
        create
      </Grid.Col>
    </Grid>
  );
};

export default Createlist;
