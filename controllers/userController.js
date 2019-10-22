'use strict'
const db = require('../config/dbConfig');
var jwt = require('../services/jwt');
var bcrypt = require('bcrypt');

const Usuario = db.usuario;


function login(req, res) {
    var usuario = req.body.usuario;
    var password = req.body.password

    Usuario.findOne({ where: { usuario: usuario} }).then(usuario => {
        // if (err) return res.status(500).send({ message: 'Request error' });
        if (usuario) {
           bcrypt.compare(password, usuario.password, (err,check) => {
                if (check) {
                    if (req.body.gettoken) {
                        return res.status(200).send({
                            token: jwt.createToken(usuario)
                        })
                    } else {
                        usuario.password = undefined;
                        return res.status(202).send({ usuario })
                    }
               } else {
                    return res.status(404).send({ message: 'Contraseña incorrecta' })
               }
           })
        } else {
            return res.status(404).send({ message: 'Nombre de usuario inexistente' })
        }
    })
}

module.exports = {
    login
}