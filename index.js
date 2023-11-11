const express = require('express');
// const sequelize = require('./config/connection.js');

const CLI = require('./lib/cli.js');
const cli = new CLI();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// sequelize.sync().then(() => {
//     app.listen(PORT, () => console.log('Now Listening'))
// });

cli.run();
