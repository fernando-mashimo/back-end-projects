SELECT
	p.nome AS 'pessoa_usuaria',
    COUNT(h.id_cancao) AS 'musicas_ouvidas',
    ROUND(SUM(c.duracao)/60, 2) AS 'total_minutos'
FROM pessoas_usuarias AS p
LEFT JOIN historico_de_reproducoes AS h
ON p.id = h.id_pessoa
LEFT JOIN cancoes AS c
ON h.id_cancao = c.id
GROUP BY p.nome
ORDER BY p.nome;