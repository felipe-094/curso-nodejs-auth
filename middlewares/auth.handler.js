const boom = require('@hapi/boom');

const { config } = require('./../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkAdminRole(req, res, next) { // Este middleware verifica que tipo de rol es y asi mismo
// dependiendo del rol lo deja seguir o no
  const user = req.user; // Aqui verificamos que Nuestro req.user Esta en Nuestro payload el que firmamos
  if (user.role === 'admin') { // Aqui verificamos que si esto es igual a un administrador pues lo deje
      // pasar le doy next()
    next();
  } else { // Si no le digo No estas Autorizado
    next(boom.unauthorized());
  }
}


function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) { //Esta linea verifica si esto es un array de roles voy hacer una
      // pregunta es simplemente saber si dentro
       // de se array de roles Esta el rol del usuario y Esto me devuelve un true o un false y lo voy a dejar pasar o no
      next();
    } else {
      next(boom.unauthorized());
    }
  }
}



module.exports = { checkApiKey, checkAdminRole, checkRoles }
