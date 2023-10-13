const connectToMongo = require('./config/db');
var cors = require('cors');

const express = require('express')
connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());   //middleweare  - if you want to access req.body then you will require this

//available routes      no Login Required
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})