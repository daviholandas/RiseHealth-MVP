const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/financeiro_ct',{
    useNewUrlParser:true
}).then(()=>console.log("DB financeiro também rodando!"))
.catch(err => console.log(err));

module.exports = exports = mongoose;