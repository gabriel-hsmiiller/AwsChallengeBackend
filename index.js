const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const routes = require('./routes');
const app = express();
const port = 3003;

// body-parser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// middlewares config
app.use(cors.appHeaders);
app.use(logger.logger);
app.use(logger.errorLog);

app.get('/', (req, res, next) => {
    const msg = 'App running. Get /';
    console.log(msg)
    res.status(200).send({msg});
})

app.use(routes);

// instantiate app
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})