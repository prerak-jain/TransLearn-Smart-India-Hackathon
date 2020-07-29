import React, { useState, useEffect, Fragment } from "react";
import {
  Button,
  Drawer,
  FormControl,
  Input,
  InputLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import firebase from "../../../config/firebase";
import { makeStyles } from "@material-ui/styles";
import { HelpOutline } from "@material-ui/icons";

import Heading from "./Heading";

const useStyles = makeStyles((theme) => ({
  drawer: {
    height: "50vh",
  },
  drawerPaper: {
    height: "50vh",
  },
}));

function PptGenerator(props) {
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [name, setName] = useState("");

  const bottomDrawer = (
    <Fragment>
      <Drawer
        anchor="bottom"
        className={classes.drawer}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.toolbar} />
        <List disablePadding>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
            }}
            divider
            button
          >
            <ListItemText className={classes.drawerItem}>
              PPT Generator
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <HelpOutline onClick={() => setOpenDrawer(!openDrawer)} />
    </Fragment>
  );

  return (
    <Fragment>
      <Grid container justify="space-around" alignItems="center">
        <Grid item xs={11} style={{ textAlign: "center" }}>
          <Heading />
        </Grid>

        <Grid item xs={1}>
          {bottomDrawer}
        </Grid>

        {/* <FormControl margin="normal" required>
          <InputLabel htmlFor="fname">Firt Name</InputLabel>
          <Input
            name="fname"
            type="fname"
            id="fname"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <Button onClick={handleClick}>Add name to DB</Button> */}
      </Grid>
    </Fragment>
  );
  async function handleClick() {
    console.log("btn clicked");
    // try {
    //   await firebase.addNametoDb(name);
    // } catch (error) {
    //   console.log(error);
    // }
  }
}

export default PptGenerator;
