'use strict'
const Usuario=require('../index');
const User=Usuario.Usuario

function addUser(req, res) {
    User.create({
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