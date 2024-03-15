DROP DATABASE IF EXISTS SpotifyClone;
CREATE DATABASE IF NOT EXISTS SpotifyClone;
USE SpotifyClone;
CREATE TABLE planos (
	id INT PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(20) NOT NULL,
	valor DECIMAL(5,2) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE pessoas_usuarias (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(255) NOT NULL,
	idade INT NOT NULL,
    data_assinatura DATE NOT NULL,
    plano_id INT NOT NULL,
	FOREIGN KEY (plano_id) REFERENCES planos(id)
) ENGINE=InnoDB;

CREATE TABLE artistas (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE albuns (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(255) NOT NULL,
	artista_id INT NOT NULL,
    ano_lancamento INT NOT NULL,
	FOREIGN KEY (artista_id) REFERENCES artistas(id)
) ENGINE=InnoDB;

CREATE TABLE cancoes (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(255) NOT NULL,
	duracao INT NOT NULL,
    album_id INT NOT NULL,
	FOREIGN KEY (album_id) REFERENCES albuns(id)
) ENGINE=InnoDB;

CREATE TABLE pessoas_seguindo_artistas (
	id_pessoa INT NOT NULL,
	id_artista INT NOT NULL,
    CONSTRAINT PRIMARY KEY (id_pessoa, id_artista),
	FOREIGN KEY (id_pessoa) REFERENCES pessoas_usuarias(id),
    FOREIGN KEY (id_artista) REFERENCES artistas(id)
) ENGINE=InnoDB;

CREATE TABLE historico_de_reproducoes (
	id_cancao INT NOT NULL,
	id_pessoa INT NOT NULL,
	data_reproducao DATETIME NOT NULL,
    CONSTRAINT PRIMARY KEY (id_cancao, id_pessoa),
	FOREIGN KEY (id_cancao) REFERENCES cancoes(id),
    FOREIGN KEY (id_pessoa) REFERENCES pessoas_usuarias(id)
) ENGINE=InnoDB;

INSERT INTO planos (id, descricao, valor)
VALUES
	(1, 'gratuito', 0.00),
    (2, 'familiar', 7.99),
    (3, 'universitário', 5.99),
    (4, 'pessoal', 6.99);

INSERT INTO pessoas_usuarias (id, nome, idade, data_assinatura, plano_id)
VALUES
	(1, 'Barbara Liskov', 82, '2019-10-20', 1),
	(2,'Robert Cecil Martin', 58,'2017-01-06', 1),
    (3,'Ada Lovelace', 37,'2017-12-30', 2),
    (4,'Martin Fowler', 46,'2017-01-17', 2),
    (5,'Sandi Metz', 58,'2018-04-29', 2),
    (6,'Paulo Freire', 19,'2018-02-14', 3),
    (7,'Bell Hooks', 26,'2018-01-05', 3),
    (8,'Christopher Alexander', 85,'2019-06-05', 4),
    (9,'Judith Butler', 45,'2020-05-13', 4),
    (10,'Jorge Amado', 58,'2017-02-17', 4);
    
INSERT INTO artistas (id, nome)
VALUES
	(1, 'Baco Exu do Blues'),
    (2, 'Beyoncé'),
    (3, 'Blind Guardian'),
    (4, 'Elis Regina'),
    (5, 'Nina Simone'),
    (6, 'Queen');

INSERT INTO albuns (id, nome, artista_id, ano_lancamento)
VALUES
	(1, 'Renaissance', 2, 2022),
    (2, 'Jazz', 6, 1978),
    (3, 'Hot Space', 6, 1982),
    (4, 'Falso Brilhante', 4, 1998),
    (5, 'Vento de Maio', 4, 2001),
    (6, 'QVVJFA?', 1, 2003),
    (7, 'Somewhere Far Beyond', 3, 2007),
    (8, 'I Put A Spell On You', 5, 2012);

INSERT INTO cancoes (id, nome, duracao, album_id)
VALUES
	(1, 'BREAK MY SOUL', 279, 1),
    (2, 'VIRGOS GROOVE', 369, 1),
    (3, 'ALIEN SUPERSTAR', 116, 1),
    (4, 'Dont Stop Me Now', 203, 2),
    (5, 'Under Pressure', 152, 3),
    (6, 'Como Nossos Pais', 105, 4),
    (7, 'O Medo de Amar é o Medo de Ser Livre', 207, 5),
    (8, 'Samba em Paris', 267, 6),
    (9, 'The Bards Song', 244, 7),
    (10, 'Feeling Good', 100, 8);

INSERT INTO pessoas_seguindo_artistas (id_pessoa, id_artista)
VALUES
	(1, 2),
    (1, 6),
    (1, 4),
    (2, 2),
    (2, 4),
    (3, 6),
    (4, 1),
    (5, 3),
    (5, 5),
    (6, 5),
    (6, 2),
    (7, 5),
    (9, 4),
    (10, 6);

INSERT INTO historico_de_reproducoes (id_cancao, id_pessoa, data_reproducao)
VALUES
	(8, 1, '2022-02-28 10:45:55'),
    (2, 1, '2020-05-02 05:30:35'),
    (10, 1, '2020-03-06 11:22:33'),
    (10, 2, '2022-08-05 08:05:17'),
    (7, 2, '2020-01-02 07:40:33'),
    (10, 3, '2020-11-13 16:55:13'),
    (2, 3, '2020-12-05 18:38:30'),
    (8, 4, '2021-08-15 17:10:10'),
    (8, 5, '2022-01-09 01:44:33'),
    (5, 5, '2020-08-06 15:23:43'),
    (7, 6, '2017-01-24 00:31:17'),
    (1, 6, '2017-10-12 12:35:20'),
    (4, 7, '2011-12-15 22:30:49'),
    (4, 8, '2012-03-17 14:56:41'),
    (9, 9, '2022-02-24 21:14:22'),
    (3, 10, '2015-12-13 08:30:22');
