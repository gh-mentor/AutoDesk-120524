/*
# Inventory Database Creation Script in T-SQL

This file describes the steps to create a script of Transact SQL (T-SQL) command to interact with a database named 'Inventory.' The script will create tables, populate them with sample data, create stored procedures, triggers, and views. The script will be based on version 2019 of SQL Server and comply with rules of referential and column integrity.

Steps:
1) Check if the database 'Inventory' exists, if not, recreate it
2) Sets the default database to 'Inventory'.
3) Create a 'suppliers' table. Use the following columns:
- id: integer, primary key
- name: 50 characters, not null
- address: 255 characters, nullable
- city: 50 characters, not null
- state: 2 characters, not null
4) Create the 'categories' table with a one-to-many relation to the 'suppliers'. Use the following columns:
- id:  integer, primary key
- name: 50 characters, not null
- description:  255 characters, nullable
- supplier_id: int, foreign key references suppliers(id)
5) Create the 'products' table with a one-to-many relation to the 'categories' table. Use the following columns:
- id: integer, primary key
- name: 50 characters, not null
- price: decimal (10, 2), not null
- category_id: int, foreign key references categories(id)
6) Populate the 'suppliers' table with sample data.
7) Populate the 'categories' table with sample data.
8) Populate the 'products' table with sample data.
9) Create a stored procedure named 'GetProductsByCategory' that receives a category name as input and returns the products in that category.
10) Create a stored procedure named 'GetSuppliersByState' that receives a state abbreviation as input and returns the suppliers in that state.
11) Create a trigger that logs the changes made to the 'products' table in a separate table named 'products_audit'.
12) Create a view named 'ProductsWithSuppliers' that joins the 'products' and 'suppliers' tables to display the product name, price, and supplier name.
*/

-- Check if the database 'Inventory' exists, if not, recreate it
IF EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = N'Inventory')
BEGIN
    ALTER DATABASE Inventory SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE Inventory;
END
GO

CREATE DATABASE Inventory;
GO

-- Sets the default database to 'Inventory'
USE Inventory;
GO

-- Create a 'suppliers' table
CREATE TABLE suppliers (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(50) NOT NULL,
    state CHAR(2) NOT NULL
);
GO

-- Create the 'categories' table with a one-to-many relation to the 'suppliers'
CREATE TABLE categories (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    supplier_id INT,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);
GO

-- Create the 'products' table with a one-to-many relation to the 'categories' table
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    -- add a column for the creation date
    created_at DATETIME DEFAULT GETDATE(),
    -- add a column for the last update date
    updated_at DATETIME DEFAULT GETDATE()
);
GO

-- Populate the 'suppliers' table with sample data
INSERT INTO suppliers (id, name, address, city, state)
VALUES (1, 'Supplier A', '123 Main St', 'City A', 'CA'),
       (2, 'Supplier B', '456 Elm St', 'City B', 'NY'),
       (3, 'Supplier C', '789 Oak St', 'City C', 'TX');
GO

-- Populate the 'categories' table with sample data
INSERT INTO categories (id, name, description, supplier_id)
VALUES (1, 'Category A', 'Description A', 1),
       (2, 'Category B', 'Description B', 2),
       (3, 'Category C', 'Description C', 3);
GO

-- Populate the 'products' table with sample data
INSERT INTO products (id, name, price, category_id)
VALUES (1, 'Product A', 10.00, 1),
       (2, 'Product B', 20.00, 2),
       (3, 'Product C', 30.00, 3);
GO

-- Create a stored procedure named 'GetProductsByCategory' that receives a category name as input and returns the products in that category
CREATE PROCEDURE GetProductsByCategory
    @categoryName VARCHAR(50)
AS
BEGIN
    SELECT p.name, p.price
    FROM products p
    INNER JOIN categories c ON p.category_id = c.id
    WHERE c.name = @categoryName;
END
GO

-- Create a stored procedure named 'GetSuppliersByState' that receives a state abbreviation as input and returns the suppliers in that state
CREATE PROCEDURE GetSuppliersByState
    @state CHAR(2)
AS
BEGIN
    SELECT *
    FROM suppliers
    WHERE state = @state;
END
GO

-- Create a trigger that logs the changes made to the 'products' table in a separate table named 'products_audit'
CREATE TABLE products_audit (
    id INT,
    name VARCHAR(50),
    price DECIMAL(10, 2),
    category_id INT,
    action VARCHAR(10),
    action_date DATETIME
);
GO

CREATE TRIGGER products_audit_trigger
ON products
AFTER INSERT, UPDATE, DELETE 
AS

DECLARE @action VARCHAR(10);

IF EXISTS (SELECT * FROM inserted) 
BEGIN
    IF EXISTS (SELECT * FROM deleted)
    BEGIN
        SET @action = 'UPDATE';
    END
    ELSE
    BEGIN
        SET @action = 'INSERT';
    END
END
ELSE
BEGIN
    SET @action = 'DELETE';
END



