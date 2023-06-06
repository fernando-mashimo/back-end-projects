# 1. Exiba apenas os nomes dos produtos na tabela products (1 ponto de dificuldade)
SELECT product_name FROM products;

# 2. Exiba os dados de todas as colunas da tabela products (1 ponto de dificuldade)
SELECT * FROM products;

# 3. Escreva uma query que exiba os valores da coluna que representa a primary key da tabela products (1 ponto de dificuldade)
SELECT id FROM products;

# 4. Conte quantos registros existem na coluna product_name da tabela products (1 ponto de dificuldade)
SELECT COUNT(product_name) FROM products;

# 5. Monte uma query que exiba os dados da tabela products a partir do quarto registro até o décimo terceiro (1 ponto de dificuldade)
SELECT * FROM products
	LIMIT 10 OFFSET 3;

# 6. Exiba os dados das colunas product_name e id da tabela products de maneira que os resultados estejam em ordem alfabética dos nomes (1 ponto de dificuldade)
SELECT product_name, id FROM products
	ORDER BY product_name;

# 7. Mostre apenas os ids dos 5 últimos registros da tabela products (a ordernação deve ser baseada na coluna id) (2 pontos de dificuldade)
SELECT id from products
	ORDER BY id DESC
    LIMIT 5;

# 8. Faça uma consulta na tabela employees que retorne o nome completo da pessoa colaboradora (colunas first_name e last_name)
# com o nome full_name e também a localização completa (colunas city, state_province e address) com o nome location.
SELECT
	CONCAT(first_name, ' ', last_name) AS full_name,
    CONCAT(city, '-', state_province, ', ', address) AS location
FROM employees;

# 9. Mostre todos os valores de notes da tabela purchase_orders que não são nulos (1 ponto de dificuldade)
SELECT notes FROM purchase_orders
	WHERE notes IS NOT NULL;

# 10. Mostre todos os dados da tabela purchase_orders em ordem decrescente, ordenados por created_by em que
# o created_by é maior ou igual a 3 (2 pontos de dificuldade)
SELECT * FROM purchase_orders
	WHERE created_by >= 3
    ORDER BY created_by DESC;

# 11. Exiba os dados da coluna notes da tabela purchase_orders em que seu valor de 
# Purchase generated based on Order é maior ou igual a 30 e menor ou igual a 39 (1 ponto de dificuldade)
SELECT notes FROM purchase_orders
	ORDER BY notes ASC
    LIMIT 5 OFFSET 12;

# 12. Mostre as submitted_date de purchase_orders em que a submitted_date é do dia 26 de abril de 2006
# (2 pontos de dificuldade)
SELECT submitted_date FROM purchase_orders
	WHERE DATE(submitted_date) = '2006-04-26';

# 13. Mostre o supplier_id das purchase_orders em que o supplier_id seja 1 ou 3 (1 ponto de dificuldade)
SELECT supplier_id FROM purchase_orders
	WHERE supplier_id IN (1, 3);

# 14. Mostre os resultados da coluna supplier_id da tabela purchase_orders em que o supplier_id 
# seja maior ou igual a 1 e menor ou igual 3 (1 ponto de dificuldade)
SELECT supplier_id FROM purchase_orders
	WHERE supplier_id BETWEEN 1 AND 3;

# 15. Mostre somente as horas (sem os minutos e os segundos) da coluna submitted_date de todos
# registros da tabela purchase_orders (1 ponto de dificuldade) (1 ponto de dificuldade)
SELECT HOUR(submitted_date) AS submitted_hour FROM purchase_orders;

# 16. Exiba a submitted_date das purchase_orders que estão entre 2006-01-26 00:00:00
# e 2006-03-31 23:59:59 (1 ponto de dificuldade)
SELECT submitted_date FROM purchase_orders
	WHERE submitted_date BETWEEN '2006-01-26 00:00:00' AND '2006-03-31 23:59:59';

# 17. Mostre os registros das colunas id e supplier_id das purchase_orders em que os
# supplier_id sejam tanto 1, ou 3, ou 5, ou 7 (1 ponto de dificuldade)
SELECT id, supplier_id FROM purchase_orders
	WHERE supplier_id IN (1, 3, 5, 7);

# 18. Mostre todos os registros de purchase_orders que tem o supplier_id igual a 3
# e status_id igual a 2 (1 ponto de dificuldade)
SELECT * FROM purchase_orders
	WHERE supplier_id = 3
    AND status_id = 2;

# 19. Mostre a quantidade de pedidos que foram feitos na tabela orders pelo employee_id igual
# a 5 ou 6, e que foram enviados através do método(coluna) shipper_id igual a 2 (2 pontos de dificuldade)
SELECT COUNT(*) AS orders_count FROM orders
	WHERE employee_id IN (5, 6)
    AND shipper_id = 2;

# 20. Adicione à tabela order_details um registro com order_id: 69, product_id: 80, quantity: 15.0000,
# unit_price: 15.0000, discount: 0, status_id: 2, date_allocated: NULL, purchase_order_id: NULL
# e inventory_id: 129 (1 ponto de dificuldade)
INSERT INTO order_details (order_id, product_id, quantity, unit_price, discount, status_id, date_allocated, purchase_order_id, inventory_id) VALUES
	(69, 80, 15.0000, 15.0000, 0, 2, NULL, NULL, 129);

# 21. Adicione com um único INSERT, duas linhas à tabela order_details com os mesmos dados do
# requisito 20 (1 ponto de dificuldade)
INSERT IGNORE INTO order_details (order_id, product_id, quantity, unit_price, discount, status_id, date_allocated, purchase_order_id, inventory_id) VALUES
	(69, 80, 15.0000, 15.0000, 0, 2, NULL, NULL, 129),
    (69, 80, 15.0000, 15.0000, 0, 2, NULL, NULL, 129);

# 22. Atualize os dados de discount do order_details para 15 (1 ponto de dificuldade)
# SET SQL_SAFE_UPDATES = 0;
UPDATE order_details
	SET discount = 15;

# 23. Atualize os dados da coluna discount da tabela order_details para 30, onde o valor na coluna unit_price
# seja menor que 10.0000 (1 ponto de dificuldade)
UPDATE order_details
	SET discount = 30
    WHERE unit_price < 10;

# 24. Atualize os dados da coluna discount da tabela order_details para 45, onde o valor na coluna
# unit_price seja maior que 10.0000 e o id seja um número entre 30 e 40 (2 pontos de dificuldade)
UPDATE order_details
	SET discount = 45
    WHERE unit_price > 10
    AND id BETWEEN 30 AND 40;

# 25.  Delete todos os dados em que a unit_price da tabela order_details seja menor que 10.0000
# (1 ponto de dificuldade)
DELETE FROM order_details
	WHERE unit_price < 10.0000;

# 26.  Delete todos os dados em que a unit_price da tabela order_details seja maior que 10.0000
# (1 ponto de dificuldade)
# SELECT * FROM order_details;
DELETE FROM order_details
	WHERE unit_price > 10.0000;

# 27. Delete todos os dados da tabela order_details (1 ponto de dificuldade
DELETE FROM order_details;