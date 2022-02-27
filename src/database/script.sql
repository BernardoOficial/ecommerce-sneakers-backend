-- CRIAR TABELA CLIENTE
DROP TABLE IF EXISTS TB_CUSTOMER;

CREATE TABLE TB_CUSTOMER (
	id_customer SERIAL PRIMARY KEY,
  	cpf VARCHAR(11) UNIQUE NOT NULL,
  	email VARCHAR(30) UNIQUE NOT NULL,
  	first_name VARCHAR(30) NOT NULL,
  	last_name VARCHAR(60) NOT NULL,
  	age INTEGER NOT NULL
);

INSERT INTO TB_CUSTOMER (cpf, email, first_name, last_name, age)
VALUES 
	('11111111111', 'bernardo@usebob.com.br', 'Bernardo', 'Pereira', 20),
    ('22222222222', 'breno@usebob.com.br', 'Breno', 'Pereira', 12),
    ('33333333333', 'bruno@usebob.com.br', 'Bruno', 'Pereira', 18),
    ('44444444444', 'alfredo@usebob.com.br', 'Alfredo', 'Pereira', 45);
    
SELECT * FROM TB_CUSTOMER;

UPDATE TB_CUSTOMER
SET
	cpf = 1000,
	email = 'bernardo12@usebob.com.br',
    first_name = 'Bernardinho',
    last_name = 'Pereira Oliveira',
    age = 25
WHERE id_customer = 1;





-- CRIAR TABELA PRODUTO
DROP TABLE IF EXISTS TB_PRODUCT;

CREATE TABLE TB_PRODUCT (
	id_product SERIAL PRIMARY KEY,
  	title VARCHAR(30) NOT NULL,
  	description VARCHAR(255) NOT NULL,
  	status VARCHAR(15) NOT NULL DEFAULT 'disabled',
  	sku VARCHAR(15) NOT NULL,
  	price NUMERIC(9, 2) NOT NULL DEFAULT 0.0,
  	compare_at_price NUMERIC(9, 2) NOT NULL DEFAULT 0.0,
  	stock_quantity INTEGER NOT NULL DEFAULT 0,
  	url_image_1 VARCHAR(80) DEFAULT '',
    url_image_2 VARCHAR(80) DEFAULT '',
    url_image_3 VARCHAR(80) DEFAULT '',
    url_image_4 VARCHAR(80) DEFAULT ''
);

INSERT INTO TB_PRODUCT (title, 
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
VALUES
	('shampoo purificante', 'ativo', 'SH01', 45.00, 200),
    ('shampoo detox', 'ativo', 'SH02', 45.00, 150),
    ('shampoo hidratante', 'ativo', 'SH03', 45.00, 120),
    ('shampoo nutritivo', 'ativo', 'SH04', 45.00, 180);

SELECT * FROM TB_PRODUCT;

UPDATE TB_PRODUCT
SET
	title = 'shampoo kids',
	status = 'ativo',
    sku = 'SH05',
    price = 49.00,
    stock_quantity = 250
WHERE id_product = 5;





-- CRIAR TABELA PEDIDO
DROP TABLE IF EXISTS TB_ORDER;

CREATE TABLE TB_ORDER (
	id_order SERIAL PRIMARY KEY,
  	num_order INTEGER UNIQUE NOT NULL,
  	date_order TIMESTAMPTZ NOT NULL,
  	qtda_products INTEGER NOT NULL,
  	total_order NUMERIC(9, 2) NOT NULL,
  	
  	id_customer INTEGER NOT NULL,
  
  	FOREIGN KEY (id_customer)
  	REFERENCES TB_CUSTOMER (id_customer) 
  		ON UPDATE CASCADE 
    	ON DELETE CASCADE
  
);

INSERT INTO TB_ORDER (num_order, date_order, qtda_products, total_order, id_customer)
VALUES
	(1, '2022-01-10 10:15:00', 3, 100.50, 1),
    (2, '2022-01-12 10:15:00', 7, 300.50, 2),
    (3, '2022-01-15 10:15:00', 6, 500.50, 3),
    (4, '2022-01-17 10:15:00', 2, 50.50, 4);
    
SELECT * FROM TB_ORDER;

UPDATE TB_ORDER
SET
	num_order = 5,
	date_order = '2022-01-18 10:15:00',
    qtda_products = 2,
    total_order = 55.70,
    id_customer = 4
WHERE id_order = 1;




-- CRIAR TABELA PEDIDO <> PRODUTO
DROP TABLE IF EXISTS TB_ORDER_PRODUCT;

CREATE TABLE TB_ORDER_PRODUCT (
	id_order INTEGER NOT NULL,
  	id_product INTEGER NOT NULL,
  	discount NUMERIC(5, 3) NOT NULL,
  	quantity INTEGER NOT NULL,
  	price NUMERIC(9, 2) NOT NULL,
  	
  	FOREIGN KEY (id_order)
  	REFERENCES TB_ORDER (id_order) 
  		ON UPDATE CASCADE 
    	ON DELETE CASCADE,
  
  	FOREIGN KEY (id_product)
  	REFERENCES TB_PRODUCT (id_product) 
  		ON UPDATE CASCADE 
    	ON DELETE CASCADE
  
);

INSERT INTO TB_ORDER_PRODUCT (id_order, id_product, discount, quantity, price)
VALUES
	 (1, 1, 0.0, 1, 25.50),
     (1, 2, 0.0, 2, 25.50),
     (2, 1, 0.0, 3, 25.50),
     (2, 1, 0.0, 4, 25.50),
     (3, 1, 0.0, 1, 25.50),
     (3, 2, 0.0, 2, 25.50),
     (3, 3, 0.0, 3, 25.50),
     (4, 4, 0.0, 2, 25.50);








-- VISUALIZANDO UM PEDIDO
SELECT * FROM TB_ORDER WHERE id_order = 1;

-- BUSCANDO CLIENTE QUE FEZ A COMPRA
SELECT * FROM TB_CUSTOMER WHERE id_customer = 1;

-- BUSCANDO PRODUTOS COMPRADOS
SELECT * FROM TB_ORDER_PRODUCT WHERE id_order = 1;
SELECT * FROM TB_PRODUCT WHERE id_product = 1;
SELECT * FROM TB_PRODUCT WHERE id_product = 2;

-- DELETANDO UM PEDIDO
DELETE FROM TB_ORDER WHERE id_order = 1;

-- ATUALIZANDO UM CUSTOMER
UPDATE TB_CUSTOMER SET first_name = 'Bernardão' WHERE id_customer = 1;
UPDATE TB_CUSTOMER SET id_customer = 10 WHERE id_customer = 2;

-- BUSCANDO TABELA DE PEDIDOS E CLIENTES
SELECT num_order, qtda_products, total_order, cpf, email, first_name, last_name, age 
FROM TB_ORDER
JOIN TB_CUSTOMER
ON TB_ORDER.id_customer = TB_CUSTOMER.id_customer

-- BUSCANDO TABELA DE PEDIDOS E PRODUTOS
SELECT *
FROM TB_ORDER_PRODUCT
JOIN TB_ORDER
ON TB_ORDER.id_order = TB_ORDER_PRODUCT.id_order

JOIN TB_CUSTOMER
ON TB_ORDER.id_customer = TB_CUSTOMER.id_customer