const mongoose = require('mongoose');

const Subjectdata = new mongoose.Schema({
    subjectid :{
        type : String,
        required: true
    },
    subjectName : {
        type : String,
        required: true
    },
    subjectCode : {
        type : String,
        required: true
    }
})

module.exports = mongoose.model('Subjectdata',Subjectdata)