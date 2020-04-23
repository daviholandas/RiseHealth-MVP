const mongoose = require('mongoose');


let connectionDB = mongoose.connect(process.env.DB_ATLAS,{
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(console.log(`APP is connected on MongoDB SHELL!`))
.catch(err =>console.log(err));

module.exports = connectionDB;