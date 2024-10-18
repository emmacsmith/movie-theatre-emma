const express = require("express");
const showRouter = express.Router()
const { Show } = require("../models")

//The Show Router should GET all the shows using an endpoint. 
//- For example, /shows should return all the shows.
showRouter.get('/', async (req, res) => {
    const show = await Show.findAll({})
    res.json(show)
})

showRouter.get("/:id", async (request, response) => {
    const number = request.params.id;
    const showWithId = await Show.findByPk(number);
    response.json(showWithId) // returns shows info by finding with that specific id 
})

showRouter.get("/:id/users", async (request, response) => { //this alone cannot access the information stored in shows, will need to link them
    const number = request.params.id;                       //if you look in index.js show and users are linked through watched
    const showWithId = await User.findByPk(number,
        {
            include: {
                model: User                           
            }                                       
        }                                             
);                                                      
    const users = showWithId.users                      
    response.json(users)                                
})   

showRouter.put("/:id/available", async (req, res) => {        
    
    //const userWithId = await User.findByPk(req.params.userid)              
    const showWithId = await Show.findByPk(req.params.id)     
    let showUpdate = {                          //had to create within an object 
        available: !showWithId.available
    }
    //await userWithId.addShow(showWithId)       
    let availableShows = await showWithId.update(showUpdate)
    res.json(availableShows)                //updates on database and can see with snowman 
})

showRouter.delete("/:id", async (request, response) => {
    const deletedShow = await Show.destroy({where: {id: request.params.id}});
    let shows = await Show.findAll()
    response.json(shows)
})



//to get genre, need to use where queries 
module.exports = showRouter