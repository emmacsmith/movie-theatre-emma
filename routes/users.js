const express = require("express");
const userRouter = express.Router()
userRouter.use(express.json())
userRouter.use(express.urlencoded({extended:true}))
const {User, Show} = require("../models/index.js")    //changed this to index as this already has relational databses set
                                                //up linking users and shows through watched

//The User Router should GET all the users using an endpoint. 
//- For example, /users should return all the users.
userRouter.get('/', async (req, res) => {
    const users = await User.findAll({})
    res.json(users)
})

//gets the info by the id name
//The User Router should GET one user using an endpoint with a param. 
//- For example, /users/1 should return the first user in the database.
userRouter.get("/:id", async (request, response) => {
    const number = request.params.id;
    const userWithId = await User.findByPk(number);
    response.json(userWithId) // returns all users info by finding with that specific id 
})

//adding 2 requirements (above is using 1)
//will need to get the id of the user AND get all the shows they have watched
userRouter.get("/:id/shows", async (request, response) => { //this alone cannot access the information stored in shows, will need to link them
    const number = request.params.id;                       //if you look in index.js show and users are linked through watched
    const userWithId = await User.findByPk(number,
        {
            include: {
                model: Show                             //in relational databases you can have class.findAll({ })
            }                                           //and have included only the key, value pairs you wanted to return
        }                                               //here we have found users by their id and   
);                                                      //all we want included in the, return is the shows
    const shows = userWithId.shows                      //we are JOINING the tables together to include
    response.json(shows)                                //users + shows
                                                        //http://localhost:3000/users/1/shows
})                                                      //this^ returns user with id 1/shows watched


//FAILING 
userRouter.put("/:userid/shows/:showid", async (req, res) => {         //Modify the route to dynamically handle both userId and showId
    //const { userId, showId } = request.params                       //Extract URL Parameters, extracting userId and showId
    
    const userWithId = await User.findByPk(req.params.userid)                  //use userId to find the user in the database 
    const showWithId = await Show.findByPk(req.params.showid)                  //use showId to find the show in the database 
    await userWithId.addShow(showWithId)           //Use your watched table or association method to link the user and the show
    //add a show if someone has watched it 
    //response.json(associatingUserShows)                                        //Send the updated user data as a response.
    res.send("updated")
})


module.exports = userRouter