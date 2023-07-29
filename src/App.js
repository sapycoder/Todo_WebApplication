import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Todo from "./Todo";
import { db } from "./firebase";
import firebase from 'firebase'

function App() {
  const [todos, setTodos] = useState(["TODO", "YOYO", "YES YES","TODO", "YOYO", "YES YES"]);
  const [input, setInput] = useState(""); //INITIALLY EMPTY INPUT mamking it blank

  // when app loads, need to listen from db and fetxh new todos as they get added or removed
  useEffect(() => {
    //this code fires when app runs
    db.collection('TODOS').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => (
        {  id: doc.id,
          todo: doc.data().todo
        }
      )))
  })

  }, [input])     //once it loads this fires .. and then we need to fire it whe it changes

  const addTodo = (event) => {
    //TO FIRE OFF DATA ON BUTTON CLICK
    event.preventDefault(); //form submits evrytime on enter click but refreshes so to prevent that ---> default used

    db.collection('TODOS').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setTodos([...todos, input]); //making array and keeping the prev state and update it with input
    setInput(""); //to clear the input after hitting enter
  };
  return (
    <div className="app">
      <h1>MY TO-DO LIST</h1>
      <form>
        {/* <input className="input" value={input} onChange={event => setInput(event.target.value) }/>     value >>  empty as intialised empty at first  setinput >>> to change everytime input on change of value keeps the input rendered and we have it in memory */}
        {/* <button onClick={addTodo}>ADD TO TODO LIST</button> */}

        <FormControl className="input_container">
          <InputLabel className="app_heading"></InputLabel>
          <input
            placeholder="Write A Task Here..."
            className="app_input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          ></input>
          <Button
            className="app_button"
            disabled={!input}
            type="submit"
            onClick={addTodo}
            variant="contained"
            color="primary"
          >
            ADD TO LIST
          </Button>
        </FormControl>
      </form>
      <ul className="app_items">
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}{" "}
        {/*todos>>>array map>>>goes to each element in the array todo>>>the element in the array*/}
      </ul>
    </div>
  );
}

export default App;
