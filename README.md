# Arquitetura 2 Exercicios

### Exercício 1

Utilize a query a seguir e configure uma API com o endpoint GET da entidade.
Lembre-se de aplicar o paradigma POO e a arquitetura em camadas (controller, business e database).
Implemente também roteamento e erros customizados.

CREATE TABLE courses (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    lessons INTEGER NOT NULL
);

INSERT INTO courses (id, name, lessons)
VALUES
("c001", "Javascript", 5),
("c002", "React", 10),
("c003", "Typescript", 15);

#### Atenção

Caso o processo de desenvolvimento da API com POO e Arquitetura ainda esteja complicado, tente implementar sem os conceitos e depois refatore referenciando o que foi feito em aula e no material assíncrono.

### Exercício 2

Agora implemente os endpoints de criação e deleção de lessons.

### Exercício 3

Finalize implementando o endpoint de edição de lessons. Deve ser possível alterar qualquer propriedade.