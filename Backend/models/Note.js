const mongoose = require('mongoose');
const {Schema} = mongoose;            //this is must to create schema

const NotesSchema = new Schema({ 
    user : {                            //this is bcz i want to know which user wants notes based on that i will provide his notes
       type : mongoose.Schema.Types.ObjectId,       //this is for foreign key
       ref : 'user'
    },
    title : {
       type : String,
       required : true
    },
    description : {
        type : String,
        required : true
     },
    tag : {
        type : String,
        default : "General"
    },
    date : {
        type : String,
        default : Date.now
    },
    date : {
        type : Date,
        default : Date.now
    },

})
module.exports = mongoose.model('notes',NotesSchema);