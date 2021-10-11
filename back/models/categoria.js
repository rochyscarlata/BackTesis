var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var CategoriaSchema = Schema({
    titulo: String,
    descripcion: String,
    

});

mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('categoria', CategoriaSchema);