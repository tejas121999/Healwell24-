var bodyParser = require("body-parser")
const routes = require('./routes/api')
const express = require("express")
const app = express()
const cors = require("cors")
const { sequelize } = require("./models")
// const File = require('./new')


app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// sequelize.sync({
//     force: true
// });

sequelize.sync({ force: true })
// parse application/json
app.use(bodyParser.json())
app.use('/api', routes)
app.get('/get', async (req, res) => {
    return res.status(200).json({ "message": "working" });
})
// app.use(File)

module.exports = app
