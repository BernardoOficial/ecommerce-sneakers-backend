const { Connection } = require("../database/connection");
const { infoToken } = require("../utils/jwt");

const Customers = {

	async getCustomer(req, res) {

		const token = req.headers.authorization.replace("Bearer ", "");
		const payloadCustomer = infoToken(token);

		const values = [
			payloadCustomer.id_customer
		]

        try {

            const configDatabase = {
                connectionString: process.env.DATABASE_URL || "local"
            }
            const connectionDatabase = new Connection(configDatabase);

            const sql = `SELECT * FROM TB_CUSTOMER WHERE id_customer = $1`;

            const response = await connectionDatabase.query(sql, values);
            const customers = response.rows;
            
            return res.status(200).json({ customers });
            
        } catch (error) {
            return res.status(400).json({ error_message: error.message, error })
        }

    },

    async getCustomers(req, res) {

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
    
    async postCustomer(req, res) {

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
    
    async updateCustomer(req, res) {

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
    
    async deleteCustomer(req, res) {

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

    helpers: {

        validFields(obj) {

            const fieldsDeclarate = {
                "cpf": 0,
                "email": 0,
                "first_name": 0,
                "last_name": 0,
                "age": 0,
            }

            const fields = Object.entries(obj);

            let fieldsInvalid = fields.map(function([key, value]) {
                return {
                    field: key,
                    value,
                    errors: []
                }
            })

            console.log(fieldsInvalid);

            fieldsInvalid.forEach(findFieldsVoid);

            fieldsInvalid = Object.entries(fieldsDeclarate).map(function([key, value]) {

                if(value === 0) {
                    return {
                        field: key,
                        value,
                        errors: [].push(`Campo ${key} não foi enviado`)
                    }
                }
                else {
                    return {
                        field: key,
                        value,
                        errors: []
                    }
                }

            })

            fieldsInvalid = fieldsInvalid.map(findFieldsQtdaCaracters);

            function findFieldsVoid(objField) {
                fieldsDeclarate[objField.field]++;
            }
            
            function findFieldsQtdaCaracters(objField) {

                const { field, value, errors } = objField;

                if(value.length === 0) {
                    return {
                        field,
                        value,
                        errors: errors.push(`Campo ${field} não está preenchido`)
                    }
                }
                return field;

            }

            fieldsInvalid = fieldsInvalid.filter(function(field) {
                return field.errors.length > 0;
            })

            console.log(fieldsInvalid);

            return fieldsInvalid;
        }
    }

}

module.exports = Customers;