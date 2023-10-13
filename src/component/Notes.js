import React, { useContext, useEffect, useRef,useState } from 'react'
import contextValue from "../context/notes/NoteContext"
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {

    const context = useContext(contextValue);
    const { notes, getNotes,editnote } = context;
    useEffect(() => {
        getNotes();
    }, []);

    const ref = useRef(null);
    const refclose = useRef(null);
    const [note, setNote] = useState({id:"", etitle: "", edesc: "", etag: "" });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id ,etitle : currentNote.title , edescription : currentNote.description , etag : currentNote.tag});
    }

    const handleClick = (e) => {
        refclose.current.click();
        editnote(note.id,note.etitle,note.edescription,note.etag);
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote />
            <button type="button" ref={ref}  className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <h4>Title</h4>
                                    <input type="text" className="form-control" id="etitle" name="title" value={note.etitle} placeholder="name@example.com" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <h4>Description</h4>
                                    <input type="text" className="form-control" placeholder="name@example.com" id="desc" name="desc" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <h4>Tag</h4>
                                    <input type="text" className="form-control" placeholder="name@example.com" id="tag"  name="tag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3 ">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note}></NoteItem>
                })}
            </div>
        </>
    )
}

export default Notes