import { Pool } from 'pg';
const postgresUrlDatabaseLocal = process.env.DATABASE_URL_LOCALHOST;

interface ConnectionContructor {
	connectionString: string | "local"
	max?: number
	ssl?: {
		rejectUnauthorized?: boolean
	}
}

class Connection {

	#db: Pool = null

	constructor(configDatabase: ConnectionContructor) {
		if(!configDatabase) {
			throw new Error("Configurações do banco de dados não informadas");
		}

		configDatabase.max = 15;
		configDatabase.ssl = {};
		configDatabase.ssl.rejectUnauthorized = false;

		if(configDatabase.connectionString === "local") {
			this.#db = new Pool({
				...configDatabase,
				connectionString: postgresUrlDatabaseLocal
			})
			return;
		}

		this.#db = new Pool(configDatabase);
	}

	async create() {
        try {
			await this.#db.connect();
        } catch (error) {
            console.log(error);
        }
    }
	
    async close() {
		try {
			await this.#db.end();	
		} catch (error) {
			console.log(error);
		}
    }

    async query(sql: string, values = []) {
		try {
			const response = await this.#db.query(sql, values);
			return response;
		} catch (error) {
			console.log(error);
		}
    }

	get database() {
		return this.#db;
	}
}

export {
    Connection
};
