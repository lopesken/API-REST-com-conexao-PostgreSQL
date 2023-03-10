create database dindin;

create table
  usuarios (
    id serial primary key,
    nome text not null,
    email text unique not null,
    senha text not null
  );

create table
  categorias (
    id serial primary key, 
    descricao text not null
  );

create type tipo_transacao as ENUM ('entrada', 'saida');

create table
  transacoes (
    id serial primary key,
    descricao text not null,
    valor integer not null,
    data date,
    categoria_id integer not null references categorias (id),
    usuario_id integer not null references usuarios (id),
    tipo tipo_transacao
  );
 