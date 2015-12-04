//Omportando handlers
var handlers = 
	require('./handlers'),
	staticServer = 
		require('./static.server'),
	fs = 
		require('fs');

exports.route = function(url, req, res){
	console.log("> Enrutando la peticion"+
	"%s", url);
	//Verificando si la ruta que 
	//se desea servir es 
	//conteniido estatico
	
	// Verificar si existe un manejador 
	//para la url que se pide
	if(typeof(handlers[url]) === 'function') {
		console.log('> Encuentra ruta...');
		// Existe el handler
		// Enrutando url con su handler
		handlers[url](req, res)
	}else {
		// mandamos a servir 
		//la ruta estatica
		staticServer.serve(url, res);
	}
};