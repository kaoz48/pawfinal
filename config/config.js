//configurador
var ip = process.env.IP || '127.0.0.1';
var port = process.env.PORT || 3000;
//Exportando valores de IP y PORT
exports.IP = ip;
exports.PORT = port;