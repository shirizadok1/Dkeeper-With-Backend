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
    const notesArray = await dkeeper.readNotes();
    setNotes(notesArray);
  }

  function deleteNote(id) {
    dkeeper.removeNote(id);
    console.log("*** notes before delete?", notes);
    setNotes(prevNotes => {
      const newItems = prevNotes.filter((noteItem, index) => {
        console.log("*** nodeItem?", index , " - " , JSON.stringify(noteItem));
        return index !== id;
      });

      console.log("*** newItems?" + JSON.stringify(newItems));
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
