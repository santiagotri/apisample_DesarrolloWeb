const mongo = require("../lib/mongo");
var crypto = require('crypto');
const ObjectID = require("mongodb").ObjectId;

function getUsuarios() {
  return mongo.then((client) => {
    return client.db("prueba").collection("usuarios").find({}).toArray();
  });
}

function getUsuario(nombre) {
  nombre = crypto.createHash('md5').update(String(nombre)).digest('hex');
  return mongo.then((client) => {
    return client
      .db("prueba")
      .collection("usuarios")
      .findOne({ "nombre": nombre });
  });
}

function createUsuario(usuario) {
  usuario.nombre = crypto.createHash('md5').update(usuario.nombre).digest('hex');
  usuario.contrasena = crypto.createHash('md5').update(usuario.contrasena).digest('hex');
  return mongo.then((client) => {
    return client.db("prueba").collection("usuarios").insertOne(usuario);
  });
}

function deleteUsuario(nombre) {
  nombre = crypto.createHash('md5').update(nombre).digest('hex');
  return mongo.then((client) => {
    return client
      .db("prueba")
      .collection("usuarios")
      .deleteOne({ _nombre: new ObjectID(nombre) });
  });
}

const usuario = { getUsuarios, getUsuario, createUsuario, deleteUsuario};

module.exports = usuario;
