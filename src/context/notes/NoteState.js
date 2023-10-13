import React, { useState } from "react";
import NoteContext from "./NoteContext";    //uses the context

const NoteState = (props) => {

  const host = "http://localhost:5000"

  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  //Add a note
  const addnote = async (title, description, tag) => {

    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkNWZlYzA5MWFiZWVhMGZjYzk4OTY2In0sImlhdCI6MTY3NTM0MzgzOH0.G057m3uExgUFo6NJKMhJOC_DvZxutkIu5AFP1JkBWdQ'
      },
      body: JSON.stringify({ title: title, description: description, tag: tag })
    });

    const json = response.json();


    const note = {
      "_id": "63de649040ef9a7f337791e7",
      "user": "63d5fec091abeea0fcc98966",
      "title": title,
      "description": description,
      "tag": "personal",
      "date": "2023-02-04T13:58:40.800Z",
      "__v": 0
    };

    setNotes(notes.concat(note));
  }

  //Get all note
  const getNotes = async () => {

    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkNWZlYzA5MWFiZWVhMGZjYzk4OTY2In0sImlhdCI6MTY3NTM0MzgzOH0.G057m3uExgUFo6NJKMhJOC_DvZxutkIu5AFP1JkBWdQ'
      }
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);

  }

  //Delete a note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkNWZlYzA5MWFiZWVhMGZjYzk4OTY2In0sImlhdCI6MTY3NTM0MzgzOH0.G057m3uExgUFo6NJKMhJOC_DvZxutkIu5AFP1JkBWdQ'
      }
    });

    const json = await response.json();
    console.log(json);

    console.log(id);
    const newnotes = notes.filter((note) => { return note._id !== id });
    setNotes(newnotes);
  }

  //Update a note
  const editnote = async (id, title, description, tag) => {
    //API call

    const response = await fetch(`${host}/api/notes/updatenote${IDBCursor}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkNWZlYzA5MWFiZWVhMGZjYzk4OTY2In0sImlhdCI6MTY3NTM0MzgzOH0.G057m3uExgUFo6NJKMhJOC_DvZxutkIu5AFP1JkBWdQ'
      },
      body: JSON.stringify({ title, description, tag })
    });

    const json = response.json();


    //login to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes, addnote, deleteNote, editnote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;