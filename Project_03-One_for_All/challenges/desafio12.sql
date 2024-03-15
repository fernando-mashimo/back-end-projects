SELECT
	art.nome AS 'artista',
    CASE
		WHEN COUNT(pfm.id_cancao) >= 5 THEN 'A'
        WHEN COUNT(pfm.id_cancao) BETWEEN 3 AND 4 THEN 'B'
        WHEN COUNT(pfm.id_cancao) BETWEEN 1 AND 2 THEN 'C'
        ELSE '-'
 	END AS 'ranking'
FROM artistas AS art
LEFT JOIN albuns AS alb
ON art.id = alb.artista_id
LEFT JOIN cancoes AS can
ON alb.id = can.album_id
LEFT JOIN pessoas_favoritam_musicas AS pfm
ON can.id = pfm.id_cancao
GROUP BY artista
ORDER BY COUNT(pfm.id_cancao) DESC;