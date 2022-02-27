const { Connection } = require("../database/connection");

const Customers = {

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

        console.log(customer)

        // const isValid = Customers.helpers.validFields(customer);

        // if(isValid != true) {

        //     const message = isValid.reduce((message, [key, value]) => {
        //         message += `Campo ${key} não está preenchido \n`;
        //         return message;
        //     }, '')

        //     return res.status(400).json({ error_message: message })
        // }

        const values = [
            customer.cpf,
            customer.email,
            customer.first_name,
            customer.last_name,
            customer.age
        ];

        try {

            const configDatabase = {
                connectionString: process.env.POSTGRES_DATABASE_TRANSPORTADORAS || "local"
            }
            const connectionDatabase = new Connection(configDatabase);

            const sql = `INSERT INTO
                            TB_CUSTOMER (cpf, email, first_name, last_name, age)
                            VALUES (?, ?, ?, ?, ?)`; 

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
                connectionString: process.env.POSTGRES_DATABASE_TRANSPORTADORAS || "local"
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

    },
    
    async deleteCustomer(req, res) {

        const customerId = req.params.id;

        const values = [ customerId ];

        try {

            const configDatabase = {
                connectionString: process.env.POSTGRES_DATABASE_TRANSPORTADORAS || "local"
            }
            const connectionDatabase = new Connection(configDatabase);

            const sql = `DELETE FROM TB_CUSTOMER WHERE id_customer = ?`;

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