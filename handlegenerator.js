
let jwt = require( 'jsonwebtoken' );
let config = require( './config' );
const usuario = require("./controllers/usuario");
var crypto = require('crypto');


// Clase encargada de la creación del token
class HandlerGenerator {

  login( req, res ) {
    
    // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
    let username = req.body.nombre;
    let password = req.body.contrasena;
    
    // Este usuario y contraseña, en un ambiente real, deben ser traidos de la BD
    
    usuario.getUsuario(req.body.nombre).then((usuario) => {
      let mockedUsername = 'a';
      let mockedPassword = 'a';
      console.log("Usuario", usuario);
      if(usuario!=null){
        mockedUsername = usuario.nombre
        mockedPassword = usuario.contrasena
      }
      username = crypto.createHash('md5').update(username).digest('hex');
      password = crypto.createHash('md5').update(password).digest('hex');
      console.log(mockedUsername, mockedPassword)
      // Si se especifico un usuario y contraseña, proceda con la validación
      // de lo contrario, un mensaje de error es retornado
      if( username && password ) {
  
        // Si los usuarios y las contraseñas coinciden, proceda con la generación del token
        // de lo contrario, un mensaje de error es retornado
        if( username === mockedUsername && password === mockedPassword ) {
          let token
          // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
          if(usuario.rol==="administrador"){
            token = jwt.sign( { username: username },
              config.secret_administrador, { expiresIn: '24h' } );
          }else{
            token = jwt.sign( { username: username },
              config.secret, { expiresIn: '24h' } );
          }
          
          // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
          res.json( {
            success: true,
            message: 'Authentication successful!',
            token: token
          } );
  
        } else {
          
          // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
          res.status( 403 ).send( {
            success: false,
            message: 'Incorrect username or password'
          } );
  
        }
  
      } else {
  
        // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
        res.status( 400 ).send( {
          success: false,
          message: 'Authentication failed! Please check the request'
        } );
  
      }
    });

  }

  index( req, res ) {
    
    // Retorna una respuesta exitosa con previa validación del token
    res.json( {
      success: true,
      message: 'Index page'
    } );

  }
}

module.exports = HandlerGenerator;