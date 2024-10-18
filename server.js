const express = require("express")
const app = express()
const userRouter = require("./routes/users.js")
const showRouter = require("./routes/show.js")

//Create Express Server and initialize on port 3000
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);

})

app.use("/users", userRouter) 
app.use("/shows", showRouter) 