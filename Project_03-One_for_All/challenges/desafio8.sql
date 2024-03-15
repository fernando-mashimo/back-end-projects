SELECT
	art.nome AS 'artista',
    alb.nome AS 'album'
FROM artistas AS art
INNER JOIN albuns AS alb
ON art.id = alb.artista_id
HAVING artista = 'Elis Regina'
ORDER BY album;