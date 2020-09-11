var Venta = require('../models/venta');
var DetalleVenta = require('../models/detalleventa');
var Producto = require('../models/producto');

function registrar(req, res){
 let data = req.body;
 var venta = new Venta();
 venta.idcliente = data.idcliente;
 venta.iduser = data.iduser;


 venta.save((err, venta_save)=>{
     if(venta_save){
        let detalles = data.detalles;

        detalles.forEach((element, index) => {
            var detalleventa = new DetalleVenta();
            detalleventa.idproducto = element.idproducto;
            detalleventa.cantidad = element.cantidad;
            detalleventa.venta = venta_save._id;

            detalleventa.save((err, detalle_save)=>{
                if(detalle_save){
                    Producto.findById({_id:element.idproducto}, (err, producto_data)=>{
                        if(producto_data){
                            Producto.findByIdAndUpdate({_id: producto_data._id}, {stock: parseInt(producto_data.stock) - parseInt(element.cantidad) }, (err, producto_edit)=>{
                                res.end();
                            })
                        }else{
                            res.send('no se encontro el producto');
                        }
                    });
                }else{
                    res.send('no se pudo registrar los datos');
                }
            })
        });

     }else{
         res.send(err);
     }
 })


}

function datos_venta(req,res){
    var id = req.params['id'];

    Venta.findById(id, (err, data_venta)=>{
        if(data_venta){
            DetalleVenta.find({venta: data_venta._id}, (err, data_detalle)=>{
                if(data_detalle){
                    res.status(200).send({
                        venta: data_venta,
                        detalles: data_detalle
                    });
                }
            })
        }
    })
}

module.exports ={
    registrar,
    datos_venta,
}