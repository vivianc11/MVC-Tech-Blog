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
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Sequelize } = require('./config/connection');

// Configuring and linking a session object with the sequelize store
const sess = {
    secret: 'Super Secret Key',
    // will logout after 24 hours
    cookie: { maxAge: 24 * 60 * 60 * 1000},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// Adding express-session and store as Express.js middleware
app.use(session(sess));

const hbs = expressHBS.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers'));

app.listen(PORT, () => {
    console.log(`App now listening on port ${PORT}`);
    sequelize.sync({ force: false });
});