const connectToMongo = require('./DB');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Available routes
app.use('/patient', require('./routes/patientRoutes'))
app.use('/doctor', require('./routes/doctorRoutes'))
app.use('/transcript', require('./routes/transcriptRoutes'))
app.use('/appointment', require('./routes/appointmentRoutes'))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
