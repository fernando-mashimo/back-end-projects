SELECT
	art.nome AS 'artista',
    alb.nome AS 'album',
    COUNT(psa.id_pessoa) AS 'pessoas_seguidoras'
FROM artistas AS art
LEFT JOIN albuns AS alb
	ON art.id = alb.artista_id
LEFT JOIN pessoas_seguindo_artistas AS psa
	ON art.id = psa.id_artista
GROUP BY art.nome, alb.nome
ORDER BY
	pessoas_seguidoras DESC,
    artista,
    album;