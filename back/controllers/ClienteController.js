var Cliente = require('../models/cliente');


function registrar(req,res){
    let data = req.body;

    var cliente =  new Cliente();

    cliente.nombres = data.nombres;
    cliente.correo = data.correo;
    cliente.puntos = 10;

    cliente.save((err, cliente_save)=>{
        if(cliente_save){
            res.status(200).send({cliente: cliente_save});
        }else{
            res.status(500).send(err);
        }
    })

}

function editar(req, res){
    let id = req.params['id'];
    let data = req.body;

    Cliente.findByIdAndUpdate(id, {nombres: data.nombres, correo: data.correo}, (err, cliente_edit)=>{
        if(cliente_edit){
            res.status(200).send({cliente: cliente_edit})
        }else{
            res.status(500).send(err);
        }
    })


}

function eliminar(req, res){
    let id = req.params['id'];
    Cliente.findByIdAndRemove(id, (err, cliente_delete)=>{
        if(cliente_delete){
            res.status(200).send({cliente: cliente_delete})
        }else{
            res.status(500).send(err);
        }
    })
}



module.exports = {
    registrar,
    editar,
    eliminar
}