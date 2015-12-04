// Importando libreria 
//para parsear datos de la url
var querystring = require('querystring');
 //importando a mi server estatico
 var staticServer = require('./static.server');
 
var tavares = {
	"nombres" : "cesar eduardo",
	"apellidos" : "tavares",
	"edad" : 21,
	"sexo" : "h",
	"puesto" : "Estudiante"	
};

//Exportando el modulo como un todo
module.exports = {
	"/" : function(req, res)	{
		if(req.method == "POST"){
			//el metodo de peticion 
			// es post
			// preparo una variable
			//para guardar la informacion 
			//del formulario
			var postData = "";
			
			// Crear listeners
			req.on('data', function(dataChunks){
				postData += dataChunks;
				// Seguridad
				if(postData.length > 1e6){
					// Si la informacion 
					// excede cierta cantidad
					//la destruyo por seguridad
					req.connection.destroy();
					console.log(" > Se cancela peticion por exeso de carga en la peticion ...")
				}
			});
			
			//creamos un listener que indique 
			// cuando termino la tranferecia de informacion
			req.on('end', function(){
				var data = querystring.parse(postData);
				// Servir html semiharcodeado
				res.writeHead(200, {
					'Content-Type' : 'text/html'
				});
				res.write('<ul style="color:blue">');
				for(var key in data){
					if(data.hasOwnProperty(key)){
						res.write('<li style="color: red">'
						+ key.toString().toUpperCase() 
						+ ' : ' + data[key] +  '</li>');
					}
				}
				res.write('</ul>');
				res.end();
			});
		}else{
			//asumo que es get
			console.log(' > Entra a get ...')
			staticServer.serve('/index.html',res);
		}
	},
	"/tavares" : function(req, res){
			//Manejador de ruta tavares		
		res.writeHead(200, {
			"Content-Type" : "application/json"
		});
		//serializado la respuesta
		var jsonResponse = JSON.stringify(tavares);
		//Contesto con Json
		res.end(jsonResponse);
	},
	"/tavares/gustos" : function(req, res){
				//Manejador de ruta vacia		
		res.writeHead(200, {
			"Content-Type" : "text/plane"
		});
		res.end('Ruta tavares/gustos en construccion ...');		
	}
};