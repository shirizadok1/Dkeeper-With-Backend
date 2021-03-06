import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper } from "../../../declarations/dkeeper";


function App() {

  const [notes, setNotes] = useState([]);


  function addNote(newNote) {
    setNotes(prevNotes => {
      dkeeper.createNote(newNote.title, newNote.content)
      return [newNote, ...prevNotes];
    });
  }

  useEffect(() => { //this function triggeres whenever our window loads
    console.log("useEffect is triggered")
    fetchData();
  }, []); //by adding the empty array we ensure that useEffect runs only once

  async function fetchData() {
    const notesArray = await dkeeper.readNotes(); //we see the notes everytime we load or render the window because it's calling readNotes method everytime
    setNotes(notesArray);
  }

  function deleteNote(id) {
    
    dkeeper.removeNote(id);
    setNotes(prevNotes => {
      const newItems = prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
      return newItems;
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
