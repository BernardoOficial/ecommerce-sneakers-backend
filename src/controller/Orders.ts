import { Connection } from "../database/connection";
import { Request, Response } from "express";

const Orders = {

    async getOrders(req: Request, res: Response) {

        try {

            const configDatabase = {
                connectionString: process.env.DATABASE_URL || "local"
            }
            const connectionDatabase = new Connection(configDatabase);

            const sql = `SELECT * FROM TB_ORDER`;

            const response = await connectionDatabase.query(sql);
            const orders = response.rows;
            console.log(orders);

            return res.status(200).json({ orders });
            
        } catch (error) {
            return res.status(400).json({ error_message: error.message, error })
        }

    },
    
    async postOrder(req: Request, res: Response) {

        const order = req.body;

        const values = [
            order.num_order,
            order.date_order,
            order.qtda_products,
            order.total_order,
            order.id_customer
        ]

        try {
            
            const configDatabase = {
                connectionString: process.env.DATABASE_URL || "local"
            }
            const connectionDatabase = new Connection(configDatabase);

            const sql = `INSERT INTO
                            TB_ORDER (num_order, date_order, qtda_products, total_order, id_customer)
                            VALUES (?, ?, ?, ?, ?)`; 

            const response = await connectionDatabase.query(sql, values);
            const statusInsert = response.rows;
            console.log(statusInsert);

            return res.status(201).json({ order });

        } catch (error) {
            return res.status(400).json({ error_message: error.message, error })
        }

    },
    
    async updateOrder(req: Request, res: Response) {

        const order = req.body;

        const values = [
            order.num_order,
            order.date_order,
            order.qtda_products,
            order.total_order,
            order.id_customer,
            order.id_order,
        ]

        try {
            
            const configDatabase = {
                connectionString: process.env.DATABASE_URL || "local"
            }
            const connectionDatabase = new Connection(configDatabase);

            const sql = `
                        UPDATE TB_ORDER
                        SET
                            num_order = ?,
                            date_order = ?,
                            qtda_products = ?,
                            total_order = ?,
                            id_customer = ?
                        WHERE id_order = ?`; 

            const response = await connectionDatabase.query(sql, values);
            const statusUpdate = response.rows;
            console.log(statusUpdate);

            return res.status(200).json({ order });

        } catch (error) {
            return res.status(400).json({ error_message: error.message, error })
        }

    },

    async deleteOrder(req: Request, res: Response) {

        const orderid = req.params.id;
        const values = [ orderid ];

        try {
            
            const configDatabase = {
                connectionString: process.env.DATABASE_URL || "local"
            }
            const connectionDatabase = new Connection(configDatabase);

            const sql = `DELETE FROM TB_ORDER WHERE id_order = ?`;

            const response = await connectionDatabase.query(sql, values);
            const statusDelete = response.rows;
            console.log(statusDelete);

            return res.status(200).json({ order: ['order deleted success'] });

        } catch (error) {
            return res.status(400).json({ error_message: error.message, error })
        }

    },

}

export {
	Orders
};