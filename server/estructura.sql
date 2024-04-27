-- Drop tables if they exist
DROP TABLE IF EXISTS products;

DROP TABLE IF EXISTS iphone_models;

DROP TABLE IF EXISTS product_models;

-- Create tables
CREATE TABLE IF NOT EXISTS
  products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price TEXT NOT NULL,
    category_id INTEGER,
    stock TEXT NOT NULL,
    discount TEXT DEFAULT '0',
    FOREIGN KEY (category_id) REFERENCES categories (id),
  );

CREATE TABLE IF NOT EXISTS
  iphone_models (id INTEGER PRIMARY KEY, name TEXT NOT NULL);

CREATE TABLE IF NOT EXISTS
  product_models (
    product_id INTEGER,
    model_id INTEGER,
    PRIMARY KEY (product_id, model_id),
    FOREIGN KEY (product_id) REFERENCES products (id),
    FOREIGN KEY (model_id) REFERENCES iphone_models (id)
  );

CREATE TABLE IF NOT EXISTS
  categories (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
