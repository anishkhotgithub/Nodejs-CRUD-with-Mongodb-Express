var Userdb=require('../model/model');

//create and save new user
exports.create=(req,res)=>
{
    //validate request
    if(!req.body)
    {
        res.status(400).send({message:"Content Cannot be Empty!"});
        return;
    }
    //new user
    const user =new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })
    //save user in database
    user
    .save(user)
    .then(data=>{
        res.redirect('/adduser')
    })
    .catch(err=>{
      res.status(500).send({
          message:err.message || "Some Error occured while creating a create operation"
      });
    });
}
//retrieve and return all the users/retrive and return a single user
exports.find=(req,res)=>
{
    if(req.query.id)
    {
        const id=req.query.id;

        Userdb.findById(id)
        .then(data=>{
            if(!data)
            {
                res.status(404).send({message:"Not fin the user with id"+id})
            }
            else
            {
                res.send(data)
            }
        })
        .catch(err=>
            {
                res.status(500).send({message:"Error Retriveing the user with id:"+id})
            })
    }
    else
    {
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "Error occured while retrieving the data"
            });
        });
    }
}

//Update a new identified user by userid
exports.update=(req,res)=>
{
    if(!req.body)
    {
        return res
            .status(400)
            .send({message:"Data to update cannot be negative"})
    }
    const id=req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>
        {
            if(!data)
            {
                res.status(404).send({message:`Cannot Update user with ${id}.Maybe user not found`})
            }
            else
            {
                res.send(data);
            }
        })
        .catch(err=>
            {
                res.status(500).send({message:"Error update user information"})
            })
}

//Delete a user with specified user id in the request
exports.delete=(req,res)=>
{
    const id=req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data)
        {
            res.status(404).send({message:`Cannot Delete with ${id}.Maybe id is wrong`})
        }
        else
        {
            res.send({message:"User was deleted successfully!"})
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Could not delete User with id ="+id});
    });
}