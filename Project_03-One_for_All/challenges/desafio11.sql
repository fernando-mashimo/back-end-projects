SELECT
	alb.nome AS 'album',
    COUNT(pfm.id_cancao) AS 'favoritadas'
FROM albuns AS alb
INNER JOIN cancoes AS can
ON alb.id = can.album_id
INNER JOIN pessoas_favoritam_musicas AS pfm
ON can.id = pfm.id_cancao
GROUP BY album
ORDER BY favoritadas DESC
LIMIT 3;