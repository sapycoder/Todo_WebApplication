import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
} from "@material-ui/core";
import React, { useState } from "react";
import { db } from "./firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import "./Todo.css";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  //documentation in mateial ui
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const updateTodo = (event) => {
    //update todo_item with new input text
    event.preventDefault();
    db.collection("TODOS").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    ); //NOT REMOVE THE ID BUT TO MERGE THE TIMESTAMP AND UPDATE
    setOpen(false);
    setInput("");
  };

  return (
    <>
      <div className="todo">
        {/* TODO ITEM */}

        <List className="todo_item">
          <ListItem>
            <ListItemAvatar></ListItemAvatar>
            <h>{props.todo.todo}</h>
            {/* <ListItemText primary={props.todo.todo} secondary="deadline" /> */}
          </ListItem>
        </List>

        <div className="todo_container">
          {/* EDIT TODO */}
          <div className="todo_edit">
            
              <Modal open={open} onClose={(e) => setOpen(false)}>
                <div className={classes.paper}>
                <h1>Update Your To-do Here</h1>
                <form>
                  <input
                    className="todo_input"
                    placeholder={props.todo.todo}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                  />
                  <Button
                    className="todo_update_button"
                    type="submit"       //this is important
                    onClick={updateTodo}
                    variant="contained"
                    color="primary"
                  >
                    Update the To-do
                  </Button>
                  </form>
                </div>
              </Modal>

          </div>

          {/* DELETE TODO */}
          <DeleteIcon
            className="todo_delete_icon"
            onClick={(event) => {
              db.collection("TODOS").doc(props.todo.id).delete();
            }}
          >
            DELETE THIS ITEM
          </DeleteIcon>

          <button className="todo_edit_button" onClick={(e) => setOpen(true)}>
            EDIT TODO
          </button>
        </div>
      </div>
    </>
  );
}
export default Todo;
