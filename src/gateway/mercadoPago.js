const mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN_DEV);
module.exports = mercadopago;