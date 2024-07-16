const mongoose = require('mongoose');

function dbConnection() {
    mongoose.connect(process.env.MONGODB_URL).then(()=> {
        console.log("Dtabase connection done");
    });
}

module.exports = dbConnection;