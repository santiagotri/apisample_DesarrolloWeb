# Ejercicio API
***Por: Andrés Santiago Triana 201923265***


En este ejercicio se realizó la implementación del modelo usuario en el API, el login usando JWS, los roles de los usuarios y el manejo de llaves para la autenticación una vez se obtienen los Loggins.

## Base de datos

El programa usa una mongodb llamada "prueba", que debe estar corriendo en el localhost, **puerto 27017**.

## Tipos de usuarios
Se propuso el rol "administrador" como un usuario que tuviese permisos a todas las funcionalidades del API. Y los demás tipos de usuarios (se propuso el usuario "cliente"), tienen acceso solo a ciertas características del API.

Los usuarios administradores, a diferencia de los demás, tienen la capacidad de enlistar todas las películas, añadir nuevas películas y eliminar películas de la base de datos.

## Creación de usuarios
Realizándo un POST a la ruta http://localhost:3000/api/usuario es posible crear nuevos usuarios con los atributos en un JSON del body; *nombre, contrasena* y *rol*. Tal como se muestra a continuación.


    {

    "nombre" : "Santiago Triana",
    
    "contrasena" : "contrasena123",
    
    "rol" : "administrador"
    
    }

De igual forma se puede crear otro usuario de rol cliente, que tiene permisos limitados tal cual como se dijo anteriormente.

    {
    
    "nombre" : "Andres Triana",
    
    "contrasena" : "contrasena123",
    
    "rol" : "cliente"
    
    }

## Login
Cuando se quiere loggear a un nuevo usuario (que ya existe previamente en la BD), se utiliza la ruta http://localhost:3000/api/login y se pasan en el body un json con el *nombre y contrasena* de dicho usuario. Tal y como se muestra a continuación.

    {
    
    "nombre" : "Santiago Triana",
    
    "contrasena" : "contrasena123"
    
    }

Si el login fue exitoso se responderá con un JSON que contiene el elemento **"token"** el cual debe ser guardado y colocado en el header de siguientes consultas como método de autenticación ante el API.

    {
    
    "success": true,
    
    "message": "Authentication successful!",
    
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhMjRkZGI4ZGE5ZWQxOWU3Y2EyMjNiNTJiZWQ1MjFmIiwiaWF0IjoxNjQ3MTUyNjQ1LCJleHAiOjE2NDcyMzkwNDV9.hTEDAa0HwBdNu5MjRRsVMlm1srJYXJHrsh2uRLGcs2o"
    
    }

## Consultas 

Las consultas de las películas ahora requerían de un login como un usuario registrado.

Para realizar consultas una vez se obtenga el "token" en el login es necesario añadir la llave dada, *en el value de una key* llamada **"authorization"**. Si se realiza login con un usuario administrado (en el ejemplo "Santiago Triana") se tiene acceso a todas las funcionalidades.

Por el caso contrario si se realiza login con un otro tipo de usuario que posea un rol diferente a "administrador" (en el ejemplo "Andres Triana"), se obtendrán limitaciones a la hora de crear, enlistar todas y eliminar películas. 
