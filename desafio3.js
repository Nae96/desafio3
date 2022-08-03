// //   let productoRandom= req.params.productosRandom
       
// //         producto.parsedData.find(productoRandom, (err, producto)=>{
// //       if (err) return res.status(500).send({mensaje:"error al realizar la peticion"})
// //       if (!producto) return res.status(404).send({mensaje : "el product no existe"})
// //    res.status(200).send({productos: producto})

// //   })
// // });

const Contenedor = require('./contenedor.js');
	const express = require("express");
	const app = express();
	const PORT = process.env.PORT || 8080;
	
	const server = app.listen(PORT, () => {
	    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
	});
	
	
	
	let productos = new Contenedor("productos");
	
	app.get("/", (req, res) => {
	    res.send({ Ingrese: "ingrese alguna de las opciones a- /productos o b- /productosRandom" });
	});
	
	app.get('/productos', (req, res)=> {
	    (async () => {
	        await productos.getAll().then((respuesta) => {
	            res.send(respuesta);
	        });
	    })();
	});
	
	app.get('/productoRandom', (req, res)=> {
	    (async () => {
	        await productos.getAll().then((respuesta) => {
                // Math.floor =>Devuelve el maximo entero menor o igual a un numero 
	            let random = Math.floor(Math.random() * respuesta.length);
                // La función Math.random() devuelve un número de coma flotante pseudo-aleatorio, 
                // comprendido en el rango de 0 a menor que 1 (es decir, incluido el 0 pero no el 1),
                //  con una distribución aproximadamente uniforme en este rango.
	            res.send(respuesta[random]);
	        });
	    })();
	});

