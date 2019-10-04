'use strict'
const Usuario=require('../index');

function addUser(req, res) {
    Usuario.Usuario.create({
        usuario: req.params.usuario,
        password: req.params.password
    }).then(user => {
        // Send created customer to client
        res.send(user);
    });
}

module.exports = {
    addUser
}