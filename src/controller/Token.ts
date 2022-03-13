import { Connection } from "../database/connection";
import { generateToken } from "../utils/jwt";
import { Request, Response } from "express";
import { QueryResult } from "pg";

interface CustomerProps {
	password: string
	email: string
	id_customer: number
}

const Token = {

    async getToken(req: Request, res: Response) {

        try {

            const configDatabase = {
                connectionString: process.env.DATABASE_URL || "local"
            }
            const connectionDatabase = new Connection(configDatabase);

            const sql = `SELECT * FROM TB_CUSTOMER`;

            const response = await connectionDatabase.query(sql);
            const customers = response.rows;
            console.log(customers);
            
            return res.status(200).json({ customers });
            
        } catch (error) {
            return res.status(400).json({ error_message: error.message, error })
        }

    },
    
    async postToken(req: Request, res: Response) {
        const customer = req.body;
		const valuesSelectCustomer = [customer.email];

        try {

            const configDatabase = {
                connectionString: process.env.DATABASE_URL || "local"
            }
            const connectionDatabase = new Connection(configDatabase);

            const sqlSelectCustomer = `SELECT id_customer, email, password FROM TB_CUSTOMER WHERE email = $1`; 

			interface responseDatabase extends QueryResult {
				rows: CustomerProps[]
			}

            const responseSelectCustomer: responseDatabase = await connectionDatabase.query(sqlSelectCustomer, valuesSelectCustomer);
			const findCustomers = responseSelectCustomer.rows;

			if(!findCustomers.length) {
				return res.status(401).json(
					{ customers: ["falha na autenticação"] }
				);
			}

			const findCustomer = findCustomers[0];
			if(findCustomer.password !== customer.password) {
				return res.status(401).json(
					{ customers: ["falha na autenticação"] }
				);
			}

			const token = generateToken(findCustomer.email, findCustomer.id_customer);
			console.log(token);

			const valuesInsertToken = [
				token,
				findCustomer.id_customer
			];

			const sqlInsertToken = `INSERT INTO
										TB_CUSTOMER_TOKEN (token, id_customer)
										VALUES ($1, $2)`;

            const responseInsertToken = await connectionDatabase.query(sqlInsertToken, valuesInsertToken);
            console.log(responseInsertToken);
            
            return res.status(201).json({ token });
            
        } catch (error) {
            return res.status(400).json({ error_message: error.message, error })
        }

    },
    
    async updateToken(req: Request, res: Response) {

        const customer = req.body;

        const values = [
            customer.cpf,
            customer.email,
            customer.first_name,
            customer.last_name,
            customer.age,
            customer.id_customer
        ];

        try {

            const configDatabase = {
                connectionString: process.env.DATABASE_URL || "local"
            }
            const connectionDatabase = new Connection(configDatabase);

            const sql = `
                        UPDATE TB_CUSTOMER
                        SET
                            cpf = ?,
                            email = ?,
                            first_name = ?,
                            last_name = ?,
                            age = ? 
                        WHERE id_customer = ?`;

            const response = await connectionDatabase.query(sql, values);
            const statusUpdate = response.rows;
            console.log(statusUpdate);
            
            return res.status(200).json({ customer });
            
        } catch (error) {
            return res.status(400).json({ error_message: error.message, error })
        }

    }

}

export {
	Token
};