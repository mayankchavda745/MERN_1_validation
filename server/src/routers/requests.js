const express = require("express");
const Requests = require("../mongoose/models/requests");

//setting up the request router
const requestRouter = express.Router();

/**
 * url -> /requests
 * method -> POST
 * purpose -> create a new document inside requests collection
 * response -> 
 *          If success -> 
 *              status code -> 201
 *              body -> { 
                            "type": "Created", 
                            "message": "Request registered successfully with request id {_id}" 
                        }
                The {_id} should be filled with the _id generated for the document
 *          If there is any active requests(i.e) with the status of new or in-progress for the user (use the email that comes with the request body to find if there are any active requests for the user) ->
                status code -> 403
                body -> { 
                            "type": "Forbidden", 
                            "message": "You cannot raise multiple requests at a time" 
                        }
**/
requestRouter.post('/requests',async(req,res)=>{
    try {
        const {email} = req.body;
        const data = await Requests.find({email});
        if(data.length>0 && data.find(d=>d.status==='resolved' || d.status==='rejected')){
            res.status(403).send({ 
                "type": "Forbidden", 
                "message": "You cannot raise multiple requests at a time" 
            });
        }else{
            const {_id} = await Requests.create(req.body);
            res.status(201).send({ 
                "type": "Created", 
                "message":` Request registered successfully with request id ${_id}` 
            });
        }
    } catch (error) {
        res.status(404).send({error:error.message});
    }
});


/**
 * url -> /requests
 * method -> GET
 * purpose -> fetching data from the requests collection
 * response -> 
 *          If success -> 
 *              status code -> 200
 *              body -> fetched data (refer to problem statement for sample data)
**/
requestRouter.get('/requests',async(req,res)=>{
    try {
        const data = await Requests.find();
        res.status(200).send({
            type:'Ok',requests:data
        });
    } catch (error) {
        res.status(404).send({error:error.message});
    }
});

/**
 * url -> /requests/:id
 * method -> PATCH
 * purpose -> This should update the document in the requests collections that has _id equal to the id that comes with the request
 * response -> 
 *          If the status of the request is new or in-progress, then the status and the comment of the document should be updated -> 
 *              status code -> 200
 *              body -> { 
                            "type": "Created",
                            "message": "Request status updates successfully"
                        }
 *          If the status of the request is resolved or rejected -> 
                status code -> 403
                body -> { 
                            "type": "Forbidden",
                            "message": "Cannot perform this operation on this request"
                        }
**/
requestRouter.patch('/requests/:id',async(req,res)=>{
    try {
        const {status} = await Requests.findById(req.params.id);
        if(status==='resolved' || status==='rejected'){
            res.status(403).send( { 
                "type": "Forbidden",
                "message": "Cannot perform this operation on this request"
            });
        }else if(status==='new' || status==='in-progress'){
            await Requests.findByIdAndUpdate(id,req.body);
            res.status(200).send({
                type:'Ok',
                message: "Request status updates successfully"
            });
        }
    } catch (error) {
        res.status(404).send({error:error.message});
    }
});

//exporting the router
module.exports = requestRouter;