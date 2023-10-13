import React, { useContext } from 'react'
import contextValue from "../context/notes/NoteContext"

const NoteItem = (props) => {
    const context = useContext(contextValue);
    const { deleteNote } = context;
    const {note,updateNote} = props;

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <button onClick={()=>{deleteNote(note._id)}}>Delete</button>
                        <button className="mx-3" onClick={() => {updateNote(note)}}>Update</button>
                    </div>
            </div>
        </div>
    )
}

export default NoteItem