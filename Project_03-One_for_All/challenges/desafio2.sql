SELECT
	COUNT(c.id) AS 'cancoes',
    COUNT(DISTINCT(a.artista_id)) AS 'artistas',
    COUNT(DISTINCT(a.id)) AS 'albuns'
FROM cancoes AS c
INNER JOIN albuns AS a
ON c.album_id = a.id;