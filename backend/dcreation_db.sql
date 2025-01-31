CREATE database dcreation_db;

USE dcreation_db;

CREATE TABLE sliders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    public_id VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    order_number INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

SELECT * FROM sliders;
SELECT * FROM Contacts;
DROP TABLE Contacts;

CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    name VARCHAR(255),
    description TEXT,
    image_url VARCHAR(255),
    public_id VARCHAR(255),
    price VARCHAR(100),
    features JSON,
    order_number INT DEFAULT 0
);

CREATE TABLE service_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    icon VARCHAR(100),
    description TEXT,
    order_number INT DEFAULT 0
);

