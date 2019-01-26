DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100),
  department_name VARCHAR(50),
  price DECIMAL(15,4),
  stock_quanity INTEGER(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("TV", "Electronics", 200.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Laptop Computer", "Computer", 500.00, 200);
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Printer", "Computer", 99.00, 20);
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Sports Car", "Automobile", 100000.00, 12);
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Short Wave Radio", "Electronics", 2000.00, 24);
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Golf Club Set", "Sports Equipment", 600.00, 55);
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Drone", "Aircraft", 220.00, 35);
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Cordless Drill", "Power Tools", 211.00,85);
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("DVR", "Electronics", 129.00, 65);
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Scotch Wiskey", "Spirits", 75.00, 300);

