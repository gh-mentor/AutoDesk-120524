# Inventory Database Creation Script in T-SQL

This file describes the steps to create a script of Transact SQL (T-SQL) command to interact with a database named 'Inventory.' The script will create tables, populate them with sample data, create stored procedures, triggers, and views. The script will be based on version 2019 of SQL Server and comply with rules of referential and column integrity.

# Steps to Create Inventory Database Script in T-SQL

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

