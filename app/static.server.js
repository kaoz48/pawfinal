var fs = require('fs'),
    mime = require('mime');
// Modulo encargado 
// de servir contenido estatico
exports.serve = function(url, res){
			//1. acompleto la ruta estatica
		var staticPath = './static' + url;
			//2. verifica existe
		fs.exists(staticPath,function(exists){
			if(exists){
				//si existe esa ruta
				//estatica
		fs.readFile(staticPath,function(err, content){
					if(err){
						// si hubo al leer el recurso
						res.writeHead(500,{
							"Content-Type" : "text/html"
						});
						res.end(
							"<h1 style = 'color:red'> 500 FUERA DE SERVICIO</h1>");
					}else{
						//seleccionar mime
						var contentType = mime.lookup(staticPath);
						// No hubo error al leer el server
						res.writeHead(200,{
					 	"Content-Type" : contentType,
						'Server' : 'ITGAM@1.0.0'
					});
						res.end(content, 'utf-8');
					}
				});
			}else{
		// no existe el handler
		res.writeHead(404,{
			"Content-Type" : "text/html"
		});
		res.end("<h1 style='color:red'>404.NOT FOUND</h1>");
	}
		});
};