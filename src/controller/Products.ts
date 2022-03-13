import { Connection } from "../database/connection";
import { Request, Response } from "express";

const Products = {

    async getProducts(req: Request, res: Response) {

        try {

            const configDatabase = {
                connectionString: process.env.DATABASE_URL || "local"
            }
            const connectionDatabase = new Connection(configDatabase);

            const sql = `SELECT * FROM TB_PRODUCT`;

            const response = await connectionDatabase.query(sql);
            const products = response.rows;

            return res.status(200).json({ products });
            
        } catch (error) {
            return res.status(400).json({ error_message: error.message, error })
        }

    },

    async postProduct(req: Request, res: Response) {

        const product = req.body;

        const values = [
            product.title,
            product.description,
            product.status,
            product.sku,
            product.price,
            product.compare_at_price,
            product.stock_quantity,
            ...product.url_images
        ]

        try {

            const configDatabase = {
                connectionString: process.env.DATABASE_URL || "local"
            }
            const connectionDatabase = new Connection(configDatabase);

            const sql = `INSERT INTO
                            TB_PRODUCT (title, 
                                        description, 
                                        status, 
                                        sku, 
                                        price, 
                                        compare_at_price, 
                                        stock_quantity, 
                                        url_image_1, 
                                        url_image_2, 
                                        url_image_3, 
                                        url_image_4)
                            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`; 

            const response = await connectionDatabase.query(sql, values);
            const statusInsert = response.rows;
            console.log(statusInsert);

            return res.status(200).json({ product });
            
        } catch (error) {
            return res.status(400).json({ error_message: error.message, error })
        }

    },

    async updateProduct(req: Request, res: Response) {

        const product = req.body;

        const values = [
            product.title,
            product.description,
            product.status,
            product.sku,
            product.price,
            product.compare_at_price,
            product.stock_quantity,
            ...product.url_images,
            product.id_product
        ]

        try {

            const configDatabase = {
                connectionString: process.env.DATABASE_URL || "local"
            }
            const connectionDatabase = new Connection(configDatabase);

            const sql = `
                        UPDATE TB_PRODUCT
                        SET
                            title = ?,
                            description = ?,
                            status = ?,
                            sku = ?,
                            price = ?,
                            compare_at_price = ?,
                            stock_quantity = ?,
                            url_image_1 = ?,
                            url_image_2 = ?,
                            url_image_3 = ?,
                            url_image_4 = ?
                        WHERE id_product = ?`; 

            const response = await connectionDatabase.query(sql, values);
            const statusUpdate = response.rows;
            console.log(statusUpdate);

            return res.status(200).json({ product });
            
        } catch (error) {
            return res.status(400).json({ error_message: error.message, error })
        }

    },

    async deleteProduct(req: Request, res: Response) {

        const productId = req.params.id;
        const values = [ productId ];

        try {

            const configDatabase = {
                connectionString: process.env.DATABASE_URL || "local"
            }
            const connectionDatabase = new Connection(configDatabase);

            const sql = `DELETE FROM TB_PRODUCT WHERE id_product = ?`; 

            const response = await connectionDatabase.query(sql, values);
            const statusDelete = response.rows;
            console.log(statusDelete);

            return res.status(200).json({ product: ['product deleted success'] });
            
        } catch (error) {
            return res.status(400).json({ error_message: error.message, error })
        }

    }

}

export {
	Products
};