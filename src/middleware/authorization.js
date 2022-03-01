const { validateToken } = require("../utils/jwt");

function authorization(req, res, next) {

	const authorization = req.headers.authorization;

	if(!authorization) {
		return res.status(401).json({ error: "passe o campo authorization pelo header" });
	}

	if(!authorization.includes("Bearer ")) {
		return res.status(401).json({ error: "passe no campo authorization o trecho 'Bearer ' + token" });
	}

	const token = authorization.replace("Bearer ", "");
	const isTokenValid = validateToken(token);

	if(!isTokenValid) {
		return res.status(401).json({ error: "falha na autenticação" });
	}
	
	next();
}

const safeRoutes = [
	"/customers",
	"/orders",
	"/payments"
]

module.exports = {
	authorization,
	safeRoutes
};