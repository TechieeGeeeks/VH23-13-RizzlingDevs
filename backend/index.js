const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')
require('dotenv').config();
connectToMongo();

const app = express()
const port = 8080

app.use(cors())
app.use(express.json())


//Available Routes

app.use('/api/auth', require('./routes/auth'))
app.use('/api/company', require('./routes/company'))
// app.use('/api/company', require('./routes/company'))
app.use('/api/certificate',require('./routes/certificateRoutes'))



app.listen(port, () => {
  console.log(`LinkedBlocks Backend listening at port ${port}`)
})
