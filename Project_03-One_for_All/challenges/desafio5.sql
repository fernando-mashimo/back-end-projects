SELECT
	c.nome AS 'cancao',
    COUNT(h.id_pessoa) AS 'reproducoes'
FROM cancoes AS c
INNER JOIN historico_de_reproducoes AS h
ON c.id = h.id_cancao
GROUP BY c.nome
ORDER BY reproducoes DESC, c.nome
LIMIT 2;