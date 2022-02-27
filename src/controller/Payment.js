const mercadopago = require("../gateway/mercadoPago");
const { Connection } = require("../database/connection");

const Payment = {

    async getPayment(req, res) {

        try {
            
        } catch (error) {
            return res.status(400).json({ error_message: error.message, error })
        }

    },
    
    async postPayment(req, res) {
        console.log(req.body);

        const values = [
            order.num_order,
            order.date_order,
            order.qtda_products,
            order.total_order,
            order.id_customer
        ];

        try {
            const responseGateway = await mercadopago.payment.save(req.body);
            const { status, status_detail, id } = await responseGateway.body;
            
            const configDatabase = {
                connectionString: process.env.POSTGRES_DATABASE_TRANSPORTADORAS || "local"
            }
            const connectionDatabase = new Connection(configDatabase);
    
            const sql = `INSERT INTO
                            TB_ORDER (num_order, date_order, qtda_products, total_order, id_customer)
                            VALUES (?, ?, ?, ?, ?)`; 

            const response = await connectionDatabase.query(sql, values);
            const statusInsert = response.rows;
            console.log(statusInsert);

            res.status(response.status).json({ status, status_detail, id });

        } catch (error) {
            console.log(error);
            console.log(error.message);
            return res.status(400).json({ error });
        }

    },

}

module.exports = Payment;