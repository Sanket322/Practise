const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');   //this is for validaror from website
const fetchuser = require('../middleware/fetchuser'); //for the fetchuser
const Note = require('../models/Note');     //model

//ROUTE 1 : Get all the nodes using GET : "/api/notes/getuser" , login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server  Error Occured");
    }

})


//ROUTE 2 : Add a new Note using POST : "/api/notes/addnote" , login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter A valid title').isLength({ min: 3 }),
    body('description', 'Description Must be Atleast 5 charactes').isLength({ min: 5 }),
], async (req, res) => {

    try {

        const { title, description, tag } = req.body;

        // if there are error return bad request and the errors
        //the below code is for validation which is taken from express-validator website
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //creating note for database
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savenotes = await note.save();

        res.json(savenotes);

    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server  Error Occured");
    }

})

//ROUTE 3 : Update an existing Note using PUT : "/api/notes/updatenote" , login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;

    //Create a newnote object
    const newNote = {};

    if (title) { newNote.title = title; };
    if (description) { newNote.description = description; };
    if (tag) { newNote.tag = tag; };

    //Find the node to be updated and update it
    //This is used to check whether user is valid or not
    let note = await Note.findById(req.params.id);
    if (!note) {
        res.status(404).send("Not Found");
    }

    //note.user.toString() will return me the id of note if it is not equal to req.user.id it means that someone else is trying to update note
    if (note.user.toString() != req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json(note);

})


//ROUTE 4 : Delete an existing Note using DELETE : "/api/notes/deletenote" , login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
         //chacking that user is valid or not
        //Find the node to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found"); }

        //allow deletion only if user owns this note
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note Has Been Deleted" });

    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server  Error Occured");
    }

})


module.exports = router;