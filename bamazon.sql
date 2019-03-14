DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30),
  department_name VARCHAR(20),
  price DECIMAL (10,2),
  stock_quantity INTEGER (10),
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
   department_id INTEGER (11) AUTO_INCREMENT NOT NULL,
   department_name VARCHAR (20),
   over_head_costs INTEGER (10),
   PRIMARY KEY (department_id)
)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("toilet paper", "household", 15.50, 100),
("paper towel", "household", 10.00, 80),
("napkin", "household", 5.50, 50),
("fabric softner", "laundry", 15.50, 100),
("laundry detergent", "laundry", 20.50, 50),
("bleach", "laundry", 3.00, 100),
("diet coke", "beverags", 6.50, 150),
("iced tea", "beverage", 6.50, 100),
("orange juice", "beverage", 8.00, 90),
("sparkling water", "beverage", 7.50, 70)

SELECT * FROM products;

 
 