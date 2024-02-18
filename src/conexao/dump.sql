create database testeCgs;

create table clientes(
id serial,
nome varchar(255),
telefone varchar(255),
cpf char(11) unique primary key,
email varchar(255) unique,
cep char(8),
rua varchar(255),
cidade varchar(255),
estado char(2)  
);