const mongoose = require("mongoose");
const Request = require("../models/requests");
require("./mongoose");

//data to be inserted into db
const requests = [
    {
        _id: new mongoose.Types.ObjectId(),
        name: "user one",
        email: "userone@abc.com",
        type: "call",
        raised_on: new Date(),
        issue_description: "Hearing more cross talks in the calls"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "user one",
        email: "userone@abc.com",
        type: "data",
        raised_on: "2023-05-20",
        status: "resolved",
        issue_description: "Internet speed is too slow",
        comment: "We are working on adding up few more towers, it will be resolved soon"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "user two",
        email: "usertwo@abc.com",
        type: "call",
        raised_on: "2023-05-19",
        status: "in-progress",
        issue_description: "Having voice lags during the calls"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "user one",
        email: "usernew@abc.com",
        type: "call",
        raised_on: new Date(),
        issue_description: "Hearing more cross talks in the calls"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "user three",
        email: "userthree@abc.com",
        type: "others",
        raised_on: "2023-05-23",
        status: "rejected",
        issue_description: "Not getting good signal at most of the places"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "user three",
        email: "userthree@abc.com",
        type: "message",
        raised_on: "2023-04-28",
        status: "resolved",
        issue_description: "Message delivery takes more time",
        comment: "We checked your connection and corrected it. Now message won't take much time to delver, Thanks for reaching out to us!!!"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "user four",
        email: "userfour@abc.com",
        type: "data",
        raised_on: new Date(),
        issue_description: "Latency is too high and speed is too slow"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "user one",
        email: "userone@abc.com",
        type: "others",
        raised_on: "2023-03-31",
        status: "resolved",
        issue_description: "Connectivity is too bad in the day time",
        comment: "Hi, it is due to the migration of towers form 4g to 5g, it will get fixed soon"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "user five",
        email: "userone@abc.com",
        type: "call",
        raised_on: "2023-05-22",
        status: "in-progress",
        issue_description: "Calls are always diverted to some other numbers even though I selected not to do that"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "user six",
        email: "usersix@abc.com",
        type: "message",
        raised_on: new Date(),
        issue_description: "All the messages has some data missing in it"
    },
]

//function to seed data into db
const setUpDatabase = async () => {
    await Request.deleteMany();
    for (let i = 0 ; i < requests.length ; i++)
        await Request(requests[i]).save();
    await mongoose.connection.close();
}

//feeding the data
setUpDatabase();
