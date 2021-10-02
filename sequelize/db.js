const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('development', 'root', 'toor', {
    host: 'localhost',
    dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Foo = require("./models/foo")(sequelize, Sequelize);

db.Tutorial = require("./models/tutorial.js")(sequelize, Sequelize);
db.Comment = require("./models/comments.js")(sequelize, Sequelize);

db.User = require("./models/user")(sequelize, Sequelize);
db.Company = require("./models/company")(sequelize, Sequelize);

db.Book = require("./models/book")(sequelize, Sequelize);
db.Author = require("./models/author")(sequelize, Sequelize);

db.Movie = require("./models/movie")(sequelize, Sequelize);
db.Actor = require("./models/actor")(sequelize, Sequelize);

db.Items = require("./models/items")(sequelize, Sequelize);

require('./models/relations/user_company')(db);
require('./models/relations/tutorial_post')(db);
require('./models/relations/book_author')(db);
require('./models/relations/movie_actor')(db);

module.exports = db;
