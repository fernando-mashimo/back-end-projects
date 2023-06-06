CREATE TABLE pessoas_favoritam_musicas (
	id_pessoa INT NOT NULL,
	id_cancao INT NOT NULL,
    CONSTRAINT PRIMARY KEY (id_pessoa, id_cancao),
	FOREIGN KEY (id_pessoa) REFERENCES pessoas_usuarias(id),
    FOREIGN KEY (id_cancao) REFERENCES cancoes(id)
) ENGINE=InnoDB;

INSERT INTO pessoas_favoritam_musicas (id_pessoa, id_cancao)
VALUES
	(1, 3),
    (1, 6),
    (1, 10),
    (2, 4),
    (3, 1),
    (3, 3),
    (4, 7),
    (4, 4),
    (5, 10),
    (5, 2),
    (8, 4),
    (9, 7),
    (10, 3);