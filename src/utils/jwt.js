const jwt = require('jsonwebtoken');

function generateToken(email, id_customer) {
	
	const payload = {
		email,
		id_customer,
		exp: Math.floor(Date.now() / 1000) + (60 * 60)
	}

	const options = {
		algorithm: 'HS256', // DEFAULT: HS256
	}

	try {
		const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, options);
		return token;
	} catch (error) {
		console.log(error);
		return false;
	}

}

function validateToken(token) {

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		return payload;
	} catch (error) {
		console.log(error.message);
		return false;
	}
}

module.exports = {
	generateToken,
	validateToken
}