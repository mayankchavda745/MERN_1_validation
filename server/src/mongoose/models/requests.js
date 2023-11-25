const mongoose = require("mongoose");

//setting up the schema
const validfun = (value) => /^[a-zA-z]+$/.test(value);
// const validfun = (value) => value==='mayank'?true:false

const requestsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true,
        minlength:[3,'length should be greter than and equal to 3 ...'],
        // enum:['yug','mayank','manthan'],
        validate:[validfun,'Enter alpha numeric value']
    },
    email: {
        type: String,
        required: true,
        trim:true
    },
    type: {
        type: String,
        required: true,
        trim:true
    },
    status: {
        type: String,
        default: "new"
    },
    raised_on: {
        type: Date,
        default: new Date()
    },
    issue_description: {
        type: String,
        required: true,
        trim:true
    },
    comment: {
        type: String,
        default: "",
        trim:true
    }
});

//setting up the model
const Requests = mongoose.model("Requests", requestsSchema);

module.exports = Requests;
