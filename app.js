const express = require('express');
const indexRouter = require('./routes/index');
const cors = require('cors');
const port = process.env.PORT || 4000

const app = express();
app.use(cors())
app.use(express.json());
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Running on port: ${port}`);
})