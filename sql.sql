CREATE DATABASE clublink;

CREATE TABLE pass(
    username VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE promo(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(255),
    date VARCHAR(255),
    club VARCHAR(255),
    numsections VARCHAR(255),
    pic VARCHAR(255)
);

CREATE TABLE clubbers(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255), 
    date VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255)
);

