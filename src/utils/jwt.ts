import jwt from 'jsonwebtoken';

interface TokenPayload {
	email: string
	id_customer: number
	exp: number
}

function generateToken(email: string, id_customer: number) {
	
	const payload: TokenPayload = {
		email,
		id_customer,
		exp: Math.floor(Date.now() / 1000) + (60 * 60)
	}

	try {
		const token: string = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
		return token;
	} catch (error) {
		console.log(error);
		return false;
	}

}

function validateToken(token: string) {

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		return payload;
	} catch (error) {
		console.log("validateToken", error.message);
		return <string>error.message;
	}
}

function infoToken(token: string) {
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		return payload;
	} catch (error) {
		console.log("infoToken", error.message);
		return <string>error.message;
	}
}

export {
	generateToken,
	validateToken,
	infoToken
}