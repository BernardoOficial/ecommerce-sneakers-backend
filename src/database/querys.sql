INSERT INTO TB_CUSTOMER (cpf, email, first_name, last_name, age)
VALUES 
	('11111111111', 'bernardo@usebob.com.br', 'Bernardo', 'Pereira', 20),
    ('22222222222', 'breno@usebob.com.br', 'Breno', 'Pereira', 12),
    ('33333333333', 'bruno@usebob.com.br', 'Bruno', 'Pereira', 18),
    ('44444444444', 'alfredo@usebob.com.br', 'Alfredo', 'Pereira', 45);
    
SELECT * FROM TB_CUSTOMER;

DELETE FROM TB_CUSTOMER WHERE id_customer = 2;

UPDATE TB_CUSTOMER
SET
	cpf = 1000,
	email = 'bernardo12@usebob.com.br',
    first_name = 'Bernardinho',
    last_name = 'Pereira Oliveira',
    age = 25
WHERE id_customer = 1;


SELECT * FROM TB_CUSTOMER_TOKEN;
DELETE FROM TB_CUSTOMER_TOKEN WHERE id_customer = 4;


INSERT INTO TB_PRODUCT
(title, status, sku, price, compare_at_price, stock_quantity, 
 url_images, description)
VALUES
	('Fall Limited Edition Sneakers', 'ativo', 'SN01', 125.00, 200.00, 1000,
	ARRAY[
		'https://cdn.shopify.com/s/files/1/0605/7911/9344/files/product-1-image-1.jpg?v=1642989900',
		'https://cdn.shopify.com/s/files/1/0605/7911/9344/files/product-1-image-2.jpg?v=1642989901',
		'https://cdn.shopify.com/s/files/1/0605/7911/9344/files/product-1-image-3.jpg?v=1642989900',
		'https://cdn.shopify.com/s/files/1/0605/7911/9344/files/product-1-image-4.jpg?v=1642989900'
	], 
	'Nunca há um momento errado para ficar de pé. Criado para as quadras, mas levado para as ruas, o Fall Limited Edition Sneakers dá ao ícone do basquete dos anos 80 a elevação perfeita. Com seu design clássico de cano alto, essência esportiva e entressola elevada, ele permanece fiel ao DNA dos aros, permitindo que você canalize sua confiança a cada passo.'),
	
    ('Brown Kelp', 'ativo', 'SN02', 325.00, 350.00, 1000,
	ARRAY[
		'https://cdn.shopify.com/s/files/1/0605/7911/9344/files/product-2-image-1.jpg?v=1642994738',
		'https://cdn.shopify.com/s/files/1/0605/7911/9344/files/product-2-image-2.jpg?v=1642994739',
		'https://cdn.shopify.com/s/files/1/0605/7911/9344/files/product-2-image-3.jpg?v=1642994738',
		'https://cdn.shopify.com/s/files/1/0605/7911/9344/files/product-2-image-4.jpg?v=1642994738'
	], 
	'Detalhes off-court e aparência robusta, com pelo menos 20% de material reciclado, essa bota usa material sintético na parte superior para ecoar a aparência clássica do ícone das quadras. Grandes saliências na sola proporcionam tração, enquanto um revestimento na parte superior ajuda a manter longe o frio e a umidade para que você possa enfrentar o inverno com estilo.');

SELECT * FROM TB_PRODUCT;

UPDATE TB_PRODUCT
SET
	title = 'shampoo kids',
	status = 'ativo',
    sku = 'SH05',
    price = 49.00,
    stock_quantity = 250
WHERE id_product = 5;





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