import React, { useContext, useState } from 'react'
import contextValue from "../context/notes/NoteContext"

const AddNote = () => {

  const context = useContext(contextValue);
  const { addnote } = context;

  const [note, setNote] = useState({ title: "", desc: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addnote(note.title, note.desc, note.tag);
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h2>Add a Note</h2>
      <form>
        <div className="mb-3">
          <h4>Title</h4>
          <input type="text" className="form-control" id="title" name="title" placeholder="name@example.com" onChange={onChange} />
        </div>
        <div className="mb-3">
          <h4>Description</h4>
          <input type="text" className="form-control" placeholder="name@example.com" id="desc" name="desc" onChange={onChange} />
        </div>
        <div className="mb-3">
          <h4>Tag</h4>
          <input type="text" className="form-control" placeholder="name@example.com" id="tag" name="tag" onChange={onChange} />
        </div>
        <button type="submit" className='btn btn-primary' onClick={handleClick}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote
