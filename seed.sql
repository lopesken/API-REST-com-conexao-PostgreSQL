insert into categorias (descricao)
values ('Alimentação'),
  ('Assinaturas e Serviços'),
  ('Casa'),
  ('Mercado'),
  ('Cuidados Pessoais'),
  ('Educação'),
  ('Família'),
  ('Lazer'),
  ('Pets'),
  ('Presentes'),
  ('Roupas'),
  ('Saúde'),
  ('Transporte'),
  ('Salário'),
  ('Vendas'),
  ('Outras receitas'),
  ('Outras despesas');
  
insert into usuarios (nome,email,senha) 
values ('kennya', 'kennya@gmail.com', '12345');

insert into usuarios (nome,email,senha) 
values ('lucas', 'lucas@gmail.com', '12345');

insert into transacoes (descricao, valor, data, categoria_id, usuario_id, tipo) 
values ('teste', 9999, '2023-02-16', 1, 2, 'saida');