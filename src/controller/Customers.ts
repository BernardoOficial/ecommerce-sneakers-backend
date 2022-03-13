import { Connection } from "../database/connection";
import { infoToken } from "../utils/jwt";
import { Request, Response } from "express";

const Customers = {

	async getCustomer(req: Request, res: Response) {

		const token = req.headers.authorization.replace("Bearer ", "");

		const payloadCustomer = infoToken(token);

		console.log(payloadCustomer);

		if(!payloadCustomer || typeof payloadCustomer === "string") { return }

		const values = [
			payloadCustomer.id_customer
		]

        try {

            const configDatabase = {
                connectionString: process.env.DATABASE_URL || "local"
            }
            const connectionDatabase = new Connection(configDatabase);

            const sql = `SELECT id_customer, cpf, email, first_name, last_name, date_birth FROM TB_CUSTOMER WHERE id_customer = $1`;
			
            const response = await connectionDatabase.query(sql, values);
            const customers = response.rows;
            
            return res.status(200).json({ customers });
            
        } catch (error) {
            return res.status(400).json({ error_message: error.message, error })
        }

    },

    async getCustomers(req: Request, res: Response) {

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
    
    async postCustomer(req: Request, res: Response) {

        const customer = req.body;
        console.log(customer);

        const values = [
            customer.cpf,
            customer.email,
			customer.password,
            customer.first_name,
            customer.last_name,
            customer.date_birth
        ];

        try {

            const configDatabase = {
                connectionString: process.env.DATABASE_URL || "local"
            }
            const connectionDatabase = new Connection(configDatabase);

            const sql = `INSERT INTO
                            TB_CUSTOMER (cpf, email, password, first_name, last_name, date_birth)
                            VALUES ($1, $2, $3, $4, $5, $6)`; 

            const response = await connectionDatabase.query(sql, values);
            const statusInsert = response.rows;
            console.log(statusInsert);
            
            return res.status(201).json({ customer });
            
        } catch (error) {
            return res.status(400).json({ error_message: error.message, error })
        }

    },
    
    async updateCustomer(req: Request, res: Response) {

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
                            cpf = $1,
                            email = $2,
                            first_name = $3,
                            last_name = $4,
                            age = $5 
                        WHERE id_customer = $6`;

            const response = await connectionDatabase.query(sql, values);
            const statusUpdate = response.rows;
            console.log(statusUpdate);
            
            return res.status(200).json({ customer });
            
        } catch (error) {
            return res.status(400).json({ error_message: error.message, error })
        }

    },
    
    async deleteCustomer(req: Request, res: Response) {

        const customerId = req.params.id;

        const values = [ customerId ];

        try {

            const configDatabase = {
                connectionString: process.env.DATABASE_URL || "local"
            }
            const connectionDatabase = new Connection(configDatabase);

            const sql = `DELETE FROM TB_CUSTOMER WHERE id_customer = $1`;

            const response = await connectionDatabase.query(sql, values);
            const statusDelete = response.rows;
            console.log(statusDelete);
            
            return res.status(200).json({ customer: ['customer deleted success'] });
            
        } catch (error) {
            return res.status(400).json({ error_message: error.message, error })
        }

    },

}

export { Customers };