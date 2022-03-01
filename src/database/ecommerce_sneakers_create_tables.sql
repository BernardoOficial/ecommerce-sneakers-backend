DROP TABLE IF EXISTS TB_CUSTOMER;

DROP TABLE IF EXISTS TB_CUSTOMER_CARD;

DROP TABLE IF EXISTS TB_CUSTOMER_TOKEN;

DROP TABLE IF EXISTS TB_CUSTOMER_ADDRESS;

DROP TABLE IF EXISTS TB_ORDER;

DROP TABLE IF EXISTS TB_ORDER_PRODUCT;

DROP TABLE IF EXISTS TB_PRODUCT;

-- Table: TB_CUSTOMER
CREATE TABLE TB_CUSTOMER (
    id_customer SERIAL NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    email VARCHAR(60) NOT NULL,
	password VARCHAR(60) NOT NULL,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    date_birth DATE NOT NULL,
	
    CONSTRAINT TB_CUSTOMER_UNIQUE_CPF UNIQUE (cpf),
    CONSTRAINT TB_CUSTOMER_UNIQUE_EMAIL UNIQUE (email),
    CONSTRAINT TB_CUSTOMER_PK PRIMARY KEY (id_customer)
);

-- Table: TB_CUSTOMER_CARD
CREATE TABLE TB_CUSTOMER_CARD (
    id_card INT NOT NULL,
    name VARCHAR(60) NOT NULL,
    cod_safety CHAR(3) NOT NULL,
    num_card CHAR(16) NOT NULL,
    date_validity DATE NOT NULL,
    id_customer INT NOT NULL,
	
    CONSTRAINT TB_CUSTOMER_CARD_PK PRIMARY KEY (id_card)
);

-- Table: TB_CUSTOMER_TOKEN
CREATE TABLE TB_CUSTOMER_TOKEN (
    id_token SERIAL NOT NULL,
    token VARCHAR(255) NOT NULL,
    id_customer INT NOT NULL,
	
    CONSTRAINT TB_CUSTOMER_TOKEN_TOKEN UNIQUE (token),
    CONSTRAINT TB_CUSTOMER_TOKEN_PK PRIMARY KEY (id_token)
);

-- Table: TB_ENDERECO
CREATE TABLE TB_CUSTOMER_ADDRESS (
    id_address INT NOT NULL,
    street VARCHAR(60) NOT NULL,
    number VARCHAR(30) NOT NULL,
    complement VARCHAR(60) NOT NULL,
    district VARCHAR(40) NOT NULL,
    zipcode CHAR(8) NOT NULL,
    city VARCHAR(40) NOT NULL,
    state VARCHAR(40) NOT NULL,
    id_customer INT NOT NULL,
	
    CONSTRAINT TB_ENDERECO_PK PRIMARY KEY (id_address)
);

-- Table: TB_ORDER
CREATE TABLE TB_ORDER (
    id_order SERIAL NOT NULL,
    num_order INT NOT NULL,
    date_order TIMESTAMPTZ NOT NULL,
    qtda_products INT NOT NULL,
    total_order DECIMAL(9,2) NOT NULL,
    id_transaction TEXT NOT NULL,
    status_payment VARCHAR(30) NOT NULL,
    method_payment VARCHAR(30) NOT NULL,
    id_customer INT NOT NULL,
	
    CONSTRAINT TB_ORDER_PK PRIMARY KEY (id_order)
);

-- Table: TB_ORDER_PRODUCT
CREATE TABLE TB_ORDER_PRODUCT (
    id_order INT NOT NULL,
    id_product INT NOT NULL,
    discount DECIMAL(5,3) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(9,3) NOT NULL,
	
    CONSTRAINT TB_ORDER_PRODUCT_PK PRIMARY KEY (id_order,id_product)
);

-- Table: TB_PRODUCT
CREATE TABLE TB_PRODUCT (
    id_product SERIAL NOT NULL,
    title VARCHAR(60) NOT NULL,
    description VARCHAR(500) NOT NULL,
    status VARCHAR(15) NOT NULL,
    sku VARCHAR(12) NOT NULL,
    price DECIMAL(9,2) NOT NULL,
    compare_at_price DECIMAL(9,2) NOT NULL,
    stock_quantity INT NOT NULL,
    url_images TEXT[] NOT NULL,
	
    CONSTRAINT TB_PRODUCT_PK PRIMARY KEY (id_product)
);

-- FOREIGN KEYS
-- Reference: TB_CUSTOMER_CARD_TB_CUSTOMER (table: TB_CUSTOMER_CARD)
ALTER TABLE TB_CUSTOMER_CARD ADD CONSTRAINT TB_CUSTOMER_CARD_TB_CUSTOMER
    FOREIGN KEY (id_customer)
    REFERENCES TB_CUSTOMER (id_customer)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE;

-- Reference: TB_CUSTOMER_TOKEN_TB_CUSTOMER (table: TB_CUSTOMER_TOKEN)
ALTER TABLE TB_CUSTOMER_TOKEN ADD CONSTRAINT TB_CUSTOMER_TOKEN_TB_CUSTOMER
    FOREIGN KEY (id_customer)
    REFERENCES TB_CUSTOMER (id_customer)
	ON DELETE  CASCADE 
    ON UPDATE  CASCADE;

-- Reference: TB_ENDERECO_TB_CUSTOMER (table: TB_CUSTOMER_ADDRESS)
ALTER TABLE TB_CUSTOMER_ADDRESS ADD CONSTRAINT TB_CUSTOMER_ADDRESS_TB_CUSTOMER
    FOREIGN KEY (id_customer)
    REFERENCES TB_CUSTOMER (id_customer)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE;

-- Reference: TB_ORDER_PRODUCT_TB_ORDER (table: TB_ORDER_PRODUCT)
ALTER TABLE TB_ORDER_PRODUCT ADD CONSTRAINT TB_ORDER_PRODUCT_TB_ORDER
    FOREIGN KEY (id_order)
    REFERENCES TB_ORDER (id_order)
	ON DELETE CASCADE 
    ON UPDATE CASCADE;

-- Reference: TB_ORDER_TB_CUSTOMER (table: TB_ORDER)
ALTER TABLE TB_ORDER ADD CONSTRAINT TB_ORDER_TB_CUSTOMER
    FOREIGN KEY (id_customer)
    REFERENCES TB_CUSTOMER (id_customer)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

-- Reference: TB_PRODUCT_TB_ORDER_PRODUCT (table: TB_ORDER_PRODUCT)
ALTER TABLE TB_PRODUCT ADD CONSTRAINT TB_PRODUCT_TB_ORDER_PRODUCT
    FOREIGN KEY (id_product)
    REFERENCES TB_PRODUCT (id_product)
	ON DELETE CASCADE 
    ON UPDATE CASCADE;
