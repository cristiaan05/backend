'use strict'
var jwt = require('jwt-simple'),
    moment = require('moment'),
    secret = 'secret_pass';
exports.createToken = function(usuario) {
    var payload = {
        sub: usuario._id,
        usuario: usuario.usuario,
        rol:usuario.rol,
        empleadoId:usuario.empleadoId,
        iat: moment().unix(),
        exp: moment().hour(1).unix
    }

    return jwt.encode(payload, secret);
}
