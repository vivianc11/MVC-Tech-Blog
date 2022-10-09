// Importing
const express = require('express');
const expressHBS = require('express-handlebars');
const helpers = require('./utils/helpers');
const path = require('path');
const session = require('express-session');

// Initializing express and establishing port
const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelSessStor = require('connect-session-sequelize');
const { Sequelize } = require('../module-14/config/connection');

// Setting up options for session
const sess = {
    secret: 'Super Secret Key',
    cookie: {},
    resave: false,
    saveUninitiated: true,
    store: new SequelSessStor({
        db: sequelize
    })
};

app.use(session(sess));

const hbs = expressHBS.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./routes'));

app.listen(PORT, () => {
    console.log(`App now listening on port ${PORT}`);
    sequelize.sync({ force: false });
});